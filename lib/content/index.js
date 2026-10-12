// All site content lives here (it used to come from a Payload CMS).
// Sources: Dr. Umair Mahmood Siddiqui's Facebook page and YouTube channel, Oct 2026.
// Dates: "YYYY-MM-DD" when exact, "YYYY-MM" when only the month is known.
// Images live under public/content/.

export { videos } from "./videos";

const COK = "City of Knowledge, B-105, 13D/1, Gulshan-e-Iqbal, Karachi";

export const settings = {
  seoTitle: null, // falls back to the default in app/layout.js
  seoDescription: null,
  contactPhone: "+92-336-2342386",
  contactEmail: "iricn786@gmail.com",
  address: "B-105, 13D/1, Gulshan-e-Iqbal, Karachi, Pakistan",
  socialLinks: JSON.stringify({
    "YouTube (Dr. Umair)": "https://www.youtube.com/@DrUmairMahmoodSiddiquiOfficial",
    "Facebook (Dr. Umair)": "https://www.facebook.com/DrUmairMahmoodSiddiqui",
    WhatsApp: "https://wa.me/923362342386",
  }),
  aboutContent: [
    "City of Knowledge – Islamic Research Institute (CoK) serves as a dynamic hub for encyclopaedic knowledge and multidisciplinary research that not only imparts “Knowledge and Tarbiyyah”, “Learning and Teaching”, and “Intellectual Acumen” among all knowledge pursuers and knowledge contributors, but also pays significant attention to spiritual growth, preparing the minds to serve Islam with dedication.",
    "We strive to provide knowledge for both men and women of all ages, and even provide Tarbiyyah for young children through specifically designed courses to broaden their understanding and guide them through to a better future.",
    "CoK is a project of ITQAN Educational & Research Foundation, under the supervision of Dr. Umair Mahmood Siddiqui — Associate Professor at the University of Karachi, researcher at the International Islamic Fiqh Academy (OIC), and former member of the Council of Islamic Ideology.",
    "Every week the institute hosts Dr. Umair's Dars-e-Quran, along with lectures, workshops and gatherings that bring together scholars, students and families.",
  ].join("\n\n"),
};

export const people = [
  {
    id: "dr-umair",
    slug: "dr-umair-mahmood-siddiqui",
    order: 1,
    name: "Dr. Umair Mahmood Siddiqui",
    designation: "Honorary Chairman",
    photoUrl: "/content/people/dr-umair.jpg",
    bio: [
      "Dr. Umair Mahmood Siddiqui is an esteemed Islamic scholar of international renown and a Professor of Comparative Study of Religions in the Department of Islamic Studies at the University of Karachi. He has served as a member of the Council of Islamic Ideology under Pakistan's Federal Ministry of Law, and serves as the Patron-in-Chief of City of Knowledge.",
      "He represents Pakistan at conferences of the International Islamic Fiqh Academy (OIC) and has authored numerous books on theology, comparative religion, Islamic jurisprudence, law and history. He advocates a balanced approach he calls dynamic orthodoxy, firmly rooted in the Qur'an and the Seerah of the Prophet Muhammad ﷺ.",
    ].join("\n\n"),
  },
];

export const programs = [
  {
    id: "weekly-dars-e-quran",
    slug: "weekly-dars-e-quran",
    title: "Weekly Dars-e-Quran — Surah Al-Jinn",
    schedule: "Every Saturday · 9:00 – 10:00 pm",
    coverImageUrl: "/content/posters/poster-surah-jinn.jpg",
    description: [
      "Dr. Umair Mahmood Siddiqui's weekly Dars-e-Quran, currently on Surah Al-Jinn, followed by Du'a Hizb al-Bahr and a Mehfil of Durood-o-Salam.",
      `Venue: ${COK}.`,
      "Men may attend with their families; a separate arrangement is made for women.",
    ].join("\n\n"),
  },
  {
    id: "jumuah-dars",
    slug: "jumuah-khutbah-dars-e-quran",
    title: "Jumu'ah Khutbah & Dars-e-Quran — Surah Hud",
    schedule: "Every Friday · Dars 1:00 – 1:45 pm · Jumu'ah 2:00 pm",
    coverImageUrl: "/content/posters/poster-surah-hud.jpg",
    description: [
      "A Friday Dars-e-Quran by Dr. Umair Mahmood Siddiqui, currently on Surah Hud, followed by the Jumu'ah khutbah and prayer.",
      "Venue: Jamia Masjid Ali Haider Karrar, Bilawal Chowrangi, Clifton, Karachi.",
      "Organised by Anjuman Qamar-ul-Islam Sulemania. Purdah arrangement for women.",
    ].join("\n\n"),
  },
  {
    id: "dars-e-shamail",
    slug: "dars-e-shamail-muhammadiyyah",
    title: "Dars-e-Shama'il Muhammadiyyah",
    schedule: "Ongoing series · 46+ lessons on YouTube",
    coverImageUrl: "/content/videos/yt7L5atFgRc.jpg",
    description: [
      "A lesson-by-lesson study of Al-Shama'il al-Muhammadiyyah — the noble character, appearance, habits and daily life of the Prophet Muhammad ﷺ — taught by Dr. Umair Mahmood Siddiqui.",
      "Recent lessons cover the Prophet's ﷺ blessed names, his age, his lifestyle, his humility and modesty, and Sunnahs such as hijama and washing the hands before eating. Watch the series in the Media section.",
    ].join("\n\n"),
  },
];

export const events = [
  {
    id: "cok-gathering-2026-09-28",
    slug: "city-of-knowledge-gathering-september-2026",
    title: "Gathering at City of Knowledge",
    startDate: "2026-09-28",
    location: COK,
    coverImageUrl: "/content/gallery/cok-2026-09-28-01.jpg",
    summary: "An evening gathering at the institute with Dr. Umair Mahmood Siddiqui, guest scholars, students and families.",
    description: "See the full photo album in the Gallery.",
  },
  {
    id: "milad-kids-2026",
    slug: "milad-un-nabi-kids-program-2026",
    title: "Milad-un-Nabi ﷺ Kids Program — Children & the Internet",
    startDate: "2026-09",
    location: null,
    coverImageUrl: "/content/videos/T1jFm3LvbTI.jpg",
    summary: "A Milad-un-Nabi ﷺ program for children on growing up safely and wisely with the internet.",
    description: "Watch: https://www.youtube.com/watch?v=T1jFm3LvbTI",
  },
  {
    id: "ku-human-rights-gaza",
    slug: "panel-human-rights-gaza-pakistan",
    title: "Panel Discussion: Human Rights, Gaza & Pakistan",
    startDate: "2026-09",
    location: "University of Karachi",
    coverImageUrl: "/content/videos/ZXy_GAkuJXg.jpg",
    summary: "Dr. Umair Mahmood Siddiqui on a University of Karachi panel discussing human rights, Gaza and Pakistan.",
    description: "Watch: https://www.youtube.com/watch?v=ZXy_GAkuJXg",
  },
  {
    id: "iifa-mwl-symposium",
    slug: "iifa-mwl-symposium-violence-against-women-ai",
    title: "IIFA & Muslim World League Symposium: Violence Against Women and AI",
    startDate: "2026-09",
    location: null,
    coverImageUrl: "/content/videos/a2Zk6RHHYv0.jpg",
    summary: "Dr. Umair Mahmood Siddiqui's contribution to a symposium of the International Islamic Fiqh Academy and the Muslim World League.",
    description: "Watch: https://www.youtube.com/watch?v=a2Zk6RHHYv0",
  },
  {
    id: "ku-youth-identity",
    slug: "panel-youth-identity-crisis",
    title: "Panel Discussion: The Identity Crisis of Youth in the Age of Western Imperialism",
    startDate: "2026-09",
    location: "Audio Visual Centre, Arts Lobby, University of Karachi",
    coverImageUrl: "/content/videos/OcgSwww9buU.jpg",
    summary: "A two-part panel discussion at the University of Karachi, followed by Q&A sessions on extremism, religion & media, and Gen Z & internet addiction.",
    description: [
      "Part 2: https://www.youtube.com/watch?v=OcgSwww9buU",
      "Q&A — Religious or Secular Extremism?: https://www.youtube.com/watch?v=SoEaAkXHrZk",
      "Q&A — Religion & Media: https://www.youtube.com/watch?v=JcEYySPP1tM",
      "Q&A — Gen Z & Internet Addiction: https://www.youtube.com/watch?v=lteCbURq6nc",
    ].join("\n"),
  },
];

const book = (id, title, file, summary, fileUrl) => ({
  id,
  slug: id,
  title,
  type: "BOOK",
  coverImageUrl: `/content/books/${file}`,
  summary,
  fileUrl,
});

export const publications = [
  book("what-is-ahmadism", "What is Ahmadism?", "book16.jpg", "An in-depth study of Qadianism, its beliefs and claims."),
  book("40-ahadith-for-kids", "40 Ahadith for Kids", "book1.jpeg", "A simplified collection of 40 Ahadith for children."),
  book(
    "ojhri-khane-ki-sharai-hesiat",
    "Ojhri Khane Ki Sharai Hesiat",
    "book17.jpg",
    "The Shariah ruling on eating tripe (ojhri).",
    "https://drive.google.com/file/d/1ER4oIXQi_nqrSyCFov3v9LSC3bSkR2Ho/view?usp=sharing",
  ),
  book("the-beacon-light", "The Beacon Light", "book2.jpeg", "A collection of writings of Dr. Umair Mahmood Siddiqui."),
  book("tazkira", "Tazkira", "book3.jpeg", "A comprehensive source exposing Qadianiat through its own content."),
  book("sheikh-ibn-arabi", "Sheikh Ibn Arabi", "book4.jpeg", "An analysis of the life and teachings of Sheikh Ibn Arabi."),
  book("pakistan-ka-matlab-kya", "Pakistan Ka Matlab Kya?", "book5.jpeg", "A discourse on the meaning and significance of Pakistan."),
  book("ghazwa-e-hind", "Ghazwa-e-Hind", "book6.jpeg", "A discussion on the concept and implications of Ghazwa-e-Hind."),
  book("muhammad-the-glory-of-the-ages", "Muhammad: The Glory of the Ages", "book7.jpeg", "A tribute to the life and legacy of the Prophet Muhammad ﷺ."),
  book("40-ahadith", "40 Ahadith", "book8.jpeg", "A curated selection of 40 Ahadith with commentary."),
  book("communist-challenge-to-islam", "Communist Challenge to Islam", "book9.jpeg", "An exposition on the conflict between communism and Islam."),
  book("dr-fazlur-rahman-ansari", "Dr. Fazlur Rahman Ansari", "book10.jpeg", "A biography highlighting Dr. Fazlur Rahman Ansari's scholarly contributions."),
  book("islamic-jurisprudence", "Islamic Jurisprudence", "book11.jpeg", "A comprehensive guide to Islamic law and its principles."),
  book("introduction-to-islamic-economics", "Introduction to Islamic Economics", "book12.jpeg"),
  book("islamic-theology", "Islamic Theology", "book13.jpeg"),
  book("revival-of-muslim-thought", "Revival of Muslim Thought", "book14.jpeg"),
];

const cokPhotos = Array.from({ length: 32 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return { id: `cok-${n}`, url: `/content/gallery/cok-2026-09-28-${n}.jpg`, altText: "Gathering at City of Knowledge, 28 September 2026" };
});

const visitPhotos = [
  ["slode41.jpg", "Workshop on Islamic Banking at City of Knowledge"],
  ["slode39.jpg", "Workshop on Islamic Banking — the need and contemporary practices"],
  ["slode81.png", "Al-Azhar scholars at City of Knowledge"],
  ["slode84.jpg", "Al-Azhar scholars' visit to City of Knowledge"],
  ["slode83.jpg", "Da'wat-e-Islam aur Daur-e-Jadeed"],
  ["slode82.png", "With visiting scholars from Al-Azhar"],
  ["slode42.jpg", "Summer Camp certificate distribution ceremony"],
  ["e64.jpg", "Convocation ceremony 2024–25 — Takhassus fil Fiqh al-Islami"],
  ["e67.jpg", "Convocation ceremony 2024–25"],
  ["slode43.jpg", "Panel discussion: The Identity Crisis of Youth, University of Karachi"],
  ["slode45.jpg", "Dr. Umair Mahmood Siddiqui delivering a lecture"],
].map(([file, caption], i) => ({ id: `visit-${i + 1}`, url: `/content/visits/${file}`, altText: caption, caption }));

export const galleryAlbums = [
  {
    id: "cok-gathering-2026-09-28",
    slug: "city-of-knowledge-gathering-september-2026",
    title: "Gathering at City of Knowledge",
    date: "2026-09-28",
    location: COK,
    description: "Photos from the evening gathering at the institute on 28 September 2026.",
    coverImageUrl: cokPhotos[0].url,
    images: cokPhotos,
  },
  {
    id: "workshops-convocations",
    slug: "workshops-convocations-and-visits",
    title: "Workshops, Convocations & Visits",
    date: null,
    location: "Karachi and abroad",
    description: "Workshops, convocations and scholarly visits with Dr. Umair Mahmood Siddiqui.",
    coverImageUrl: visitPhotos[0].url,
    images: visitPhotos,
  },
];

export const news = [
  {
    id: "shamail-part-46",
    slug: "dars-e-shamail-part-46",
    title: "Dars-e-Shama'il Muhammadiyyah reaches Part 46",
    publishedAt: "2026-10-06",
    coverImageUrl: "/content/videos/yt7L5atFgRc.jpg",
    summary: "The latest lesson, “The Age of Prophet Muhammad ﷺ”, is now on YouTube.",
    content:
      "Dr. Umair Mahmood Siddiqui's series on Al-Shama'il al-Muhammadiyyah continues with Part 46, “The Age of Prophet Muhammad ﷺ”.\n\nWatch: https://www.youtube.com/watch?v=yt7L5atFgRc",
  },
  {
    id: "surah-al-jinn",
    slug: "weekly-dars-e-quran-surah-al-jinn",
    title: "Weekly Dars-e-Quran: Surah Al-Jinn",
    publishedAt: "2026-10",
    coverImageUrl: "/content/posters/poster-surah-jinn.jpg",
    summary: "Every Saturday, 9:00 – 10:00 pm at City of Knowledge — with Du'a Hizb al-Bahr and Mehfil-e-Durood.",
    content:
      "The weekly Dars-e-Quran at City of Knowledge is now on Surah Al-Jinn.\n\nEvery Saturday, 9:00 – 10:00 pm, followed by Du'a Hizb al-Bahr and a Mehfil of Durood-o-Salam. Families are welcome; a separate arrangement is made for women.\n\n" +
      COK,
  },
  {
    id: "jilani-series",
    slug: "new-lectures-shaykh-abdul-qadir-jilani",
    title: "New lectures on Shaykh Abdul Qadir Jilani",
    publishedAt: "2026-10-11",
    coverImageUrl: "/content/videos/cD7_pTbXP24.jpg",
    summary: "What Imam al-Dhahabi, Ibn Taymiyyah and Ibn Arabi wrote about Ghaus-e-Azam — new videos on YouTube.",
    content: [
      "A new set of lectures by Dr. Umair Mahmood Siddiqui on Shaykh Abdul Qadir Jilani:",
      "• Shaykh Abdul Qadir Jilani and Imam al-Dhahabi — https://www.youtube.com/watch?v=cD7_pTbXP24",
      "• Ibn Taymiyyah on Shaykh Abdul Qadir Jilani — https://www.youtube.com/watch?v=y187n8xABu8",
      "• Sirr al-Asrar & Futuh al-Ghaib — https://www.youtube.com/watch?v=4Q3EQXtMACk",
      "• What Ibn Arabi says about Ghaus-e-Azam — https://www.youtube.com/watch?v=XyC7D1v11fE",
    ].join("\n"),
  },
];
