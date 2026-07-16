/**
 * One-off script to migrate the site's original static content into Sanity.
 * Not part of the app runtime — run manually, once, after content review.
 *
 * Usage:
 *   1. Add SANITY_API_WRITE_TOKEN=<a write-capable token> to .env.local
 *      (create one at https://www.sanity.io/manage -> project 0mhnrbkc -> API -> Tokens)
 *   2. npx tsx --env-file=.env.local scripts/seed-sanity.ts
 *
 * Safe to re-run: documents use deterministic _ids and are upserted with
 * createOrReplace, and image uploads are cached per source file per run.
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "0mhnrbkc";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-07-16";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error(
    "Missing SANITY_API_WRITE_TOKEN. Add it to .env.local, then run with:\n" +
      "  npx tsx --env-file=.env.local scripts/seed-sanity.ts"
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

const publicDir = path.join(process.cwd(), "public");
const assetCache = new Map<string, string>();

const MAX_RETRIES = 4;

async function withRetry<T>(fn: () => Promise<T>, label: string): Promise<T> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      const isNetworkError = /ECONNRESET|ETIMEDOUT|EPIPE|socket hang up/i.test(message);
      if (!isNetworkError || attempt === MAX_RETRIES) throw err;
      const delayMs = attempt * 1500;
      console.log(`  ${label} failed (${message}), retrying in ${delayMs}ms... (${attempt}/${MAX_RETRIES})`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  throw new Error("unreachable");
}

// Node's TLS stack drops large uploads on this network (ECONNRESET), while
// curl's does not. Shell out to curl for the binary upload. The auth header
// is written to a private temp config file (curl -K) so the token never
// appears in process argv (visible to other local processes) or logs.
function curlUploadImage(filePath: string, filename: string): { _id: string } {
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/assets/images/${dataset}?filename=${encodeURIComponent(filename)}`;
  const configPath = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "sanity-seed-")), "curl.cfg");
  fs.writeFileSync(
    configPath,
    `header = "Authorization: Bearer ${token}"\n` + `header = "Content-Type: application/octet-stream"\n`,
    { mode: 0o600 }
  );
  try {
    const output = execFileSync(
      "curl",
      ["-sS", "--fail", "--max-time", "120", "-K", configPath, "-X", "POST", url, "--data-binary", `@${filePath}`],
      { encoding: "utf-8" }
    );
    return JSON.parse(output).document;
  } finally {
    fs.rmSync(path.dirname(configPath), { recursive: true, force: true });
  }
}

async function uploadImage(relativePath: string): Promise<string> {
  if (assetCache.has(relativePath)) return assetCache.get(relativePath)!;
  const filePath = path.join(publicDir, relativePath);
  const asset = await withRetry(
    () => Promise.resolve(curlUploadImage(filePath, path.basename(filePath))),
    `upload ${relativePath}`
  );
  assetCache.set(relativePath, asset._id);
  console.log(`  uploaded ${relativePath}`);
  return asset._id;
}

function imageRef(assetId: string) {
  return { _type: "image" as const, asset: { _type: "reference" as const, _ref: assetId } };
}

function toEventDate(dateStr: string): string | undefined {
  const cleaned = dateStr.split("(")[0].trim();
  const parsed = new Date(cleaned);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
}

function toDisplayTime(dateStr: string, timeStr: string): string {
  const cleaned = dateStr.split("(")[0].trim();
  const isRecurring = Number.isNaN(new Date(cleaned).getTime());
  return isRecurring ? `${dateStr} • ${timeStr}` : timeStr;
}

const AUTHOR = "Dr. Umair Mahmood Siddiqui";

const books = [
  { title: "What Is Ahmadism?", image: "books/book1.png" },
  { title: "40 Ahadiths For Kids", image: "books/book2.png" },
  { title: "Ojhri Khane Ki Sharai Hesiat", image: "books/book3.png" },
  { title: "The Beacon Light", image: "books/book4.png" },
  { title: "Tazkira", image: "books/book5.png" },
  { title: "Sheikh Ibn Arabi", image: "books/book6.png" },
  { title: "Pakistan Ka Matlab Kya?", image: "books/book7.png" },
  { title: "Ghazwa-e-Hind", image: "books/book8.png" },
  { title: "Muhammad: The Glory Of The Ages", image: "books/book9.png" },
  { title: "40 Ahadith", image: "books/book10.png" },
  { title: "Communist Challenge To Islam", image: "books/book11.png" },
  { title: "Dr. Fazlur Rahman Ansari", image: "books/book12.png" },
  { title: "Islamic Jurisprudence", image: "books/book13.png" },
  { title: "Introduction To Islamic Economics", image: "books/book14.png" },
  { title: "Islamic Theology", image: "books/book15.png" },
  { title: "Revival Of Muslim Thought", image: "books/book16.png" },
];

const events = [
  {
    title: "Ta'alu Nun'ish al-Arwah — A Nasheed Evening",
    date: "July 9, 2026",
    time: "After Asr",
    location: "City of Knowledge, B-105, 13D/1, Gulshan-e-Iqbal, Karachi",
    description:
      "An evening of Arabic nasheeds and praise for the Prophet ﷺ, featuring renowned munshid Haseeb Khan alongside guest scholars.",
    image: "events/event1.jpg",
    alt: "Nasheed evening poster featuring Munshid Haseeb Khan",
  },
  {
    title: "Dars-e-Shamail-e-Muhammadiya",
    date: "Every Saturday",
    time: "9:00 PM – 10:00 PM",
    location: "City of Knowledge, B-105, 13D/1, Gulshan-e-Iqbal, Karachi",
    description:
      "A weekly gathering reflecting on the noble character and traits of the Prophet Muhammad ﷺ, open to men and their families.",
    image: "events/event2.jpg",
    alt: "Dars-e-Shamail-e-Muhammadiya gathering photo",
  },
  {
    title: "Al-Azhar Scholars Guest Lecture — Sayed Lakht-e-Hasnain Shah",
    date: "July 9, 2026",
    time: "After Asr",
    location: "City of Knowledge, B-105, 13D/1, Gulshan-e-Iqbal, Karachi",
    description:
      "A gathering of senior Al-Azhar scholars sharing insights on Hadith, Islamic creed, and the Arabic language, with an Ijazah in Hadith Sharif.",
    image: "events/event3.jpg",
    alt: "Al-Azhar scholars guest lecture poster",
  },
  {
    title: "Al-Azhar Scholars Guest Lecture — Dr. Muhammad Naeemuddin Al-Azhari",
    date: "July 9, 2026",
    time: "After Asr",
    location: "City of Knowledge, B-105, 13D/1, Gulshan-e-Iqbal, Karachi",
    description:
      "A gathering of senior Al-Azhar scholars sharing insights on Hadith, Islamic creed, and the Arabic language, with an Ijazah in Hadith Sharif.",
    image: "events/event4.jpg",
    alt: "Al-Azhar scholars guest lecture poster",
  },
  {
    title: "Majlis-e-Zikr: Imam Hasan (RA) & Shuhada-e-Karbala",
    date: "June 24, 2026 (9 Muharram 1448H)",
    time: "After Maghrib",
    location: "City of Knowledge, B-105, 13D/1, Gulshan-e-Iqbal, Karachi",
    description:
      "A remembrance gathering honoring Sayyiduna Imam Hasan (RA) and the martyrs of Karbala, with a special address by Dr. Umair Mahmood Siddiqui.",
    image: "events/event5.jpg",
    alt: "Majlis-e-Zikr Imam Hasan and Shuhada-e-Karbala poster",
  },
  {
    title: "Al-Shamail Al-Muhammadiya",
    date: "Every Saturday",
    time: "9:00 PM – 10:00 PM",
    location: "City of Knowledge, B-105, 13D/1, Gulshan-e-Iqbal, Karachi",
    description:
      "A weekly session on the blessed character of the Prophet ﷺ, taught by Dr. Umair Mahmood Siddiqui, open to men with family attendance permitted.",
    image: "events/event6.jpg",
    alt: "Al-Shamail Al-Muhammadiya poster",
  },
  {
    title: "Dars-e-Quran: Surah Yunus (Ayat 25–30)",
    date: "Every Friday",
    time: "Dars 1:00 PM – 1:45 PM, Jumma 2:00 PM",
    location: "Jamia Masjid Ali Haider Kirar, Bilawal Chowrangi, Karachi",
    description:
      "A weekly Qur'anic study session followed by Friday congregational prayer, with a special address by Dr. Umair Mahmood Siddiqui.",
    image: "events/event7.jpg",
    alt: "Dars-e-Quran Surah Yunus poster",
  },
  {
    title: "Majlis-e-Zikr: Imam Hasan (RA) & Shuhada-e-Karbala",
    date: "June 24, 2026 (9 Muharram 1448H)",
    time: "After Maghrib",
    location: "City of Knowledge, B-105, 13D/1, Gulshan-e-Iqbal, Karachi",
    description:
      "A remembrance gathering honoring Sayyiduna Imam Hasan (RA) and the martyrs of Karbala, with a special address by Dr. Umair Mahmood Siddiqui.",
    image: "events/event8.jpg",
    alt: "Majlis-e-Zikr Imam Hasan and Shuhada-e-Karbala poster",
  },
];

const galleryImages = Array.from({ length: 15 }, (_, i) => ({
  image: `Gallery/Gall${i + 1}.jpg`,
  alt: `City of Knowledge gallery photo ${i + 1}`,
}));

const personalityVisits = Array.from({ length: 8 }, (_, i) => ({
  image: `events/event${i + 1}.jpg`,
  alt: "Interaction with a visiting personality",
}));

const programs = [
  {
    title: "One-Year Shariah Diploma",
    shortDescription:
      "A comprehensive diploma covering foundational Islamic sciences, including Fiqh, Hadith, Qur'anic studies, and Islamic ethics for serious learners.",
    duration: "1 Year",
    eligibility: "Open to men and women with basic Islamic literacy",
    audience: "Aspiring students and working professionals",
    format: "On-campus",
    applyLink: "/apply/shariah-diploma",
  },
  {
    title: "Ilm-e-Din Course",
    shortDescription:
      "A structured foundational course designed to strengthen essential beliefs, worship, and daily Islamic practices for learners from all walks of life.",
    duration: "6 Months",
    eligibility: "Open to all men and women",
    audience: "Beginners and lifelong learners",
    format: "On-campus",
    applyLink: "/apply/ilm-e-din",
  },
  {
    title: "Dars-e-Qur'an & Sirah",
    shortDescription:
      "Weekly study circles exploring the Qur'an and the life of the Prophet Muhammad (peace be upon him) with practical, contemporary relevance.",
    duration: "Ongoing (Weekly)",
    eligibility: "Open to all",
    audience: "Local community members and seekers",
    format: "On-campus / Online",
  },
  {
    title: "4-Year Dars-e-Nizami (Aalim)",
    shortDescription:
      "A classical Aalim program covering the traditional Dars-e-Nizami curriculum with modern academic engagement for male students.",
    duration: "4 Years",
    eligibility: "Male students with commitment to full-time study",
    audience: "Aspiring scholars",
    format: "On-campus",
    applyLink: "/apply/dars-e-nizami",
  },
  {
    title: "Dars-e-Nizami for Professionals",
    shortDescription:
      "A part-time evening Aalim program tailored for working professionals who wish to pursue advanced Islamic studies alongside their careers.",
    duration: "4 Years (Part-time)",
    eligibility: "Working male professionals",
    audience: "Professionals seeking structured part-time learning",
    format: "On-campus (Evenings)",
    applyLink: "/apply/dars-e-nizami-professionals",
  },
  {
    title: "Online Learning",
    shortDescription:
      "Recorded lectures, webinars, and digital courses allowing global learners to access authentic Islamic education from anywhere in the world.",
    duration: "Self-paced / Scheduled",
    eligibility: "Open to all",
    audience: "Online and global learners",
    format: "Online",
    applyLink: "/apply/online-learning",
  },
];

const testimonials = [
  {
    name: "Ahmed Raza",
    designation: "Shariah Diploma Graduate",
    message:
      "The One-Year Shariah Diploma gave me a foundation I could not have built on my own. The teachers are patient, knowledgeable, and genuinely invested in every student's growth.",
  },
  {
    name: "Fatima Sheikh",
    designation: "Parent of a Student",
    message:
      "Sending my son to City of Knowledge was one of the best decisions we made as a family. He has grown in character as much as in knowledge.",
  },
  {
    name: "Bilal Hussain",
    designation: "Ilm-e-Din Course Alumnus",
    message:
      "The Ilm-e-Din course is structured beautifully for people balancing work and study. I finished it feeling confident in essentials I had always wanted to learn properly.",
  },
  {
    name: "Ayesha Malik",
    designation: "Weekly Tafsir Circle Attendee",
    message:
      "Every session of the Tafsir circle leaves me with something practical to reflect on. The scholars explain complex ideas in a way that stays with you all week.",
  },
  {
    name: "Usman Tariq",
    designation: "Research Symposium Participant",
    message:
      "Presenting at the Research Symposium connected me with scholars and students who share the same passion for Islamic thought and contemporary research.",
  },
  {
    name: "Zainab Qureshi",
    designation: "Dars-e-Qur'an & Sirah Student",
    message:
      "I have attended many study circles over the years, but the depth and warmth of teaching here is unmatched. It truly feels like a city built around knowledge.",
  },
];

const videoIds = [
  "aGnsP7h0iUk",
  "uzA8lKhA7dA",
  "X4HdhZLXlMc",
  "Z3_hfoqLCuc",
  "gCk0AXkeWlw",
  "c2bJP7-kaSU",
  "1wz9aWrkwD4",
  "450t5F6WIws",
];

const heroSlides = [
  { image: "events/image1.jpg", alt: "Event image 1" },
  { image: "events/image2.jpg", alt: "Event image 2" },
  { image: "events/image3.jpg", alt: "Event image 3" },
  { image: "events/image4.jpg", alt: "Event image 4" },
  { image: "events/image5.jpg", alt: "Event image 5" },
];

const carouselSlides = [
  { image: "Carousel/car1.jpg", caption: "Hazrat Pir Syed Lakht-e-Hasnain" },
  { image: "Carousel/car2.jpg", caption: "Mufti Sher Muhammad Khan Sahib" },
  { image: "Carousel/car3.jpg", caption: "Sheikh Muhammad Al-Khamis Suleiman Usman" },
  { image: "Carousel/car4.jpg", caption: "Prof Imam Syed Badiuddin Soharwardy" },
  { image: "Carousel/car5.jpg", caption: "Zainul Abidin Rasheed" },
  { image: "Carousel/car6.jpg", caption: "Dr. Muhammad Eid Al-Mansour" },
];

async function seedBooks() {
  console.log("Seeding books...");
  for (const [i, b] of books.entries()) {
    const assetId = await uploadImage(b.image);
    await client.createOrReplace({
      _id: `book-${i + 1}`,
      _type: "book",
      title: b.title,
      author: AUTHOR,
      cover: imageRef(assetId),
      order: i + 1,
      isActive: true,
    });
  }
}

async function seedEvents() {
  console.log("Seeding events...");
  for (const [i, e] of events.entries()) {
    const assetId = await uploadImage(e.image);
    await client.createOrReplace({
      _id: `event-${i + 1}`,
      _type: "event",
      title: e.title,
      image: imageRef(assetId),
      alt: e.alt,
      eventDate: toEventDate(e.date),
      time: toDisplayTime(e.date, e.time),
      location: e.location,
      description: e.description,
      order: i + 1,
      isActive: true,
    });
  }
}

async function seedGallery() {
  console.log("Seeding gallery images...");
  for (const [i, g] of galleryImages.entries()) {
    const assetId = await uploadImage(g.image);
    await client.createOrReplace({
      _id: `galleryImage-${i + 1}`,
      _type: "galleryImage",
      image: imageRef(assetId),
      alt: g.alt,
      displayOrder: i + 1,
      isActive: true,
    });
  }
}

async function seedPersonalityVisits() {
  console.log("Seeding personality visits...");
  for (const [i, p] of personalityVisits.entries()) {
    const assetId = await uploadImage(p.image);
    await client.createOrReplace({
      _id: `personalityVisit-${i + 1}`,
      _type: "personalityVisit",
      image: imageRef(assetId),
      alt: p.alt,
      displayOrder: i + 1,
      isActive: true,
    });
  }
}

async function seedPrograms() {
  console.log("Seeding programs...");
  for (const [i, p] of programs.entries()) {
    await client.createOrReplace({
      _id: `program-${i + 1}`,
      _type: "program",
      title: p.title,
      shortDescription: p.shortDescription,
      duration: p.duration,
      eligibility: p.eligibility,
      audience: p.audience,
      format: p.format,
      applyLink: p.applyLink,
      displayOrder: i + 1,
      isFeatured: false,
      isActive: true,
    });
  }
}

async function seedTestimonials() {
  console.log("Seeding testimonials...");
  for (const [i, t] of testimonials.entries()) {
    await client.createOrReplace({
      _id: `testimonial-${i + 1}`,
      _type: "testimonial",
      name: t.name,
      designation: t.designation,
      message: t.message,
      rating: 5,
      order: i + 1,
      isActive: true,
    });
  }
}

async function seedVideos() {
  console.log("Seeding videos...");
  for (const [i, id] of videoIds.entries()) {
    await client.createOrReplace({
      _id: `video-${i + 1}`,
      _type: "video",
      title: `City of Knowledge — Video Lecture ${i + 1}`,
      youtubeUrl: `https://www.youtube.com/watch?v=${id}`,
      order: i + 1,
      isActive: true,
    });
  }
}

async function seedHero() {
  console.log("Seeding hero slides...");
  for (const [i, h] of heroSlides.entries()) {
    const assetId = await uploadImage(h.image);
    await client.createOrReplace({
      _id: `hero-${i + 1}`,
      _type: "hero",
      title: h.alt,
      image: imageRef(assetId),
      alt: h.alt,
      displayOrder: i + 1,
      isActive: true,
    });
  }
}

async function seedCarousel() {
  console.log("Seeding carousel slides...");
  for (const [i, c] of carouselSlides.entries()) {
    const assetId = await uploadImage(c.image);
    await client.createOrReplace({
      _id: `carousel-${i + 1}`,
      _type: "carousel",
      title: c.caption,
      image: imageRef(assetId),
      alt: `City of Knowledge campus photo ${i + 1}`,
      caption: c.caption,
      displayOrder: i + 1,
      isActive: true,
    });
  }
}

async function main() {
  await seedBooks();
  await seedEvents();
  await seedGallery();
  await seedPersonalityVisits();
  await seedPrograms();
  await seedTestimonials();
  await seedVideos();
  await seedHero();
  await seedCarousel();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
