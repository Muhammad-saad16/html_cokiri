import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Images, PlayCircle, Library, Phone, MessageCircle } from "lucide-react";
import { getList, getSettings } from "@/lib/cms";
import { EventCard, VideoCard, ProgramCard, NewsCard, GalleryCard } from "@/components/Cards";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import Counter from "@/components/motion/Counter";
import Hero from "@/components/Hero";
import FourPillars from "@/components/FourPillars";
import FitImage from "@/components/FitImage";
import BookShelf from "@/components/BookShelf";
import { SectionHeading, Ornament } from "@/components/Ornaments";

function MoreLink({ href, children, light = false }) {
  return (
    <Reveal className="mt-12 text-center">
      <Link href={href} className={light ? "btn-outline-light" : "btn-navy"}>
        {children} <ArrowRight size={16} />
      </Link>
    </Reveal>
  );
}

export default async function HomePage() {
  const [events, videos, publications, people, programs, news, albums, settings] = await Promise.all([
    getList("events", { limit: 3 }),
    getList("videos", { limit: 6 }),
    getList("publications"),
    getList("people"),
    getList("programs"),
    getList("news", { limit: 3 }),
    getList("gallery-albums"),
    getSettings(),
  ]);
  const allVideos = await getList("videos");
  const leader = people.find((p) => p.order < 10);
  const phone = settings?.contactPhone || "+92-336-2342386";

  const stats = [
    { icon: GraduationCap, value: programs.length, label: "Weekly Programs" },
    { icon: PlayCircle, value: allVideos.length, label: "Lectures & Videos" },
    { icon: BookOpen, value: publications.length, label: "Books Published" },
    { icon: Images, value: albums.reduce((n, a) => n + (a.images?.length || 0), 0), label: "Photos in Gallery" },
  ];

  return (
    <div>
      <Hero
        description={settings?.seoDescription}
        imageUrl="/images/building-front.jpg"
        highlight={programs[0] && { href: `/programs/${programs[0].slug}`, title: programs[0].title.split(" — ")[0], schedule: programs[0].schedule }}
      />

      {/* Stats */}
      <section className="pattern-ivory pt-20 pb-6 sm:pt-24">
        <StaggerGroup className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="rounded-2xl border border-gold/30 bg-white/80 p-5 text-center shadow-sm">
                <s.icon size={26} className="mx-auto text-maroon" strokeWidth={1.6} />
                <div className="mt-2 font-serif text-4xl font-bold text-navy">
                  <Counter value={s.value || 0} />
                </div>
                <div className="text-xs font-semibold tracking-wider text-gold-dark uppercase">{s.label}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Introduction */}
      <section className="pattern-ivory py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading eyebrow="Introduction" title="A Dynamic Hub of Knowledge & Tarbiyyah" align="left" />
            <Reveal delay={0.1}>
              <p className="mt-6 leading-relaxed text-ink/80">
                City of Knowledge – Islamic Research Institute (CoK) serves as a dynamic hub for encyclopaedic knowledge and
                multidisciplinary research that not only imparts “Knowledge and Tarbiyyah”, “Learning and Teaching”, and
                “Intellectual Acumen” among all knowledge pursuers and knowledge contributors, but also pays significant
                attention to spiritual growth, preparing the minds to serve Islam with dedication.
              </p>
              <p className="mt-4 leading-relaxed text-ink/80">
                We strive to provide knowledge for both men and women of all ages, and even provide Tarbiyyah for young
                children through specifically designed courses to broaden their understanding and guide them through to a
                better future.
              </p>
              <Link href="/about" className="btn-outline mt-8">
                Read our Vision &amp; Mission <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="grid grid-cols-2 gap-4">
            <FitImage src="/images/visit-imam-soharwardi.jpg" alt="Imam Syed Badi-ud-Din Soharwardi visiting City of Knowledge" className="col-span-2 h-64 w-full rounded-2xl border-4 border-white shadow-xl" />
            <FitImage src="/images/kids-course-speech.jpg" alt="A child speaking during a children's course" className="h-48 w-full rounded-2xl border-4 border-white shadow-xl" />
            <FitImage src="/images/hadith-workshop-audience.jpg" alt="Workshop on the Significance of Hadith" className="h-48 w-full rounded-2xl border-4 border-white shadow-xl" />
          </Reveal>
        </div>
      </section>

      <FourPillars />

      {/* Weekly programs */}
      {programs.length > 0 && (
        <section className="pattern-ivory py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Join Us Every Week" title="Academic Activities">
              Weekly Dars-e-Quran, the Friday Dars and Khutbah, and the Dars-e-Shama&apos;il series.
            </SectionHeading>
            <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3">
              {programs.slice(0, 6).map((p) => (
                <StaggerItem key={p.id} className="h-full">
                  <ProgramCard program={p} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      )}

      {/* Leadership */}
      {leader && (
        <section className="bg-ivory-2 py-20 sm:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <Reveal className="relative mx-auto w-full max-w-sm">
              <div className="arch absolute -inset-3 border-2 border-gold/60" aria-hidden />
              <div className="arch relative aspect-[4/5] overflow-hidden border-4 border-gold shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={leader.photoUrl} alt={leader.name} className="h-full w-full object-cover object-top" />
              </div>
            </Reveal>
            <div>
              <SectionHeading eyebrow={leader.designation} title={leader.name} align="left" />
              <Reveal delay={0.1} className="mt-6 space-y-4 leading-relaxed text-ink/80">
                {leader.bio?.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
              </Reveal>
              <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-4">
                <Link href="/about#leadership" className="btn-navy">
                  Leadership <ArrowRight size={16} />
                </Link>
                <a href="https://drumairsiddiqui.com" target="_blank" rel="noopener noreferrer" className="btn-outline">
                  drumairsiddiqui.com
                </a>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* Events */}
      {events.length > 0 && (
        <section className="pattern-ivory py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Majalis & Gatherings" title="Recent Events" />
            <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3">
              {events.map((e) => (
                <StaggerItem key={e.id} className="h-full">
                  <EventCard event={e} />
                </StaggerItem>
              ))}
            </StaggerGroup>
            <MoreLink href="/events">All events</MoreLink>
          </div>
        </section>
      )}

      {/* Media */}
      {videos.length > 0 && (
        <section className="pattern-navy py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Lectures & Dars" title="Latest from the Media Library" dark />
            <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((v) => (
                <StaggerItem key={v.id} className="h-full">
                  <VideoCard video={v} dark />
                </StaggerItem>
              ))}
            </StaggerGroup>
            <MoreLink href="/media" light>
              Browse {allVideos.length} videos
            </MoreLink>
          </div>
        </section>
      )}

      {/* Facilities */}
      <section className="pattern-ivory py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <Reveal className="grid grid-cols-3 grid-rows-2 gap-4">
            <FitImage src="/images/library.jpg" alt="City of Knowledge Library" className="col-span-2 row-span-2 h-full min-h-80 w-full rounded-2xl border-4 border-white shadow-xl" />
            <FitImage src="/images/main-hall.jpg" alt="Main lecture hall" className="h-full min-h-36 w-full rounded-2xl border-4 border-white shadow-xl" />
            <FitImage src="/images/lounge.jpg" alt="Reception lounge" className="h-full min-h-36 w-full rounded-2xl border-4 border-white shadow-xl" />
          </Reveal>
          <div>
            <SectionHeading eyebrow="Our Facilities" title="A Rich Environment for Deep Learning" align="left" />
            <Reveal delay={0.1}>
              <p className="mt-6 leading-relaxed text-ink/80">
                Located in a serene and respectable neighbourhood, CoK offers an environment that reflects dignity, respect,
                and academic excellence. Our well-furnished, spacious, and fully air-conditioned classrooms are equipped with
                modern interactive ed-tech tools.
              </p>
              <div className="mt-6 flex items-start gap-4 rounded-2xl border border-gold/40 bg-white/80 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy text-gold-light">
                  <Library size={20} />
                </span>
                <p className="text-sm leading-relaxed text-ink/80">
                  <span className="font-semibold text-navy">City of Knowledge Library</span> — a resource-rich collection of
                  the latest and historical works on Tafsir, Hadith, History, Sirah, Shariah, Islamic Philosophy, Travelogues and
                  more.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Books */}
      {publications.length > 0 && (
        <section className="bg-ivory-2 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Research & Publications" title="Books by Dr. Umair Mahmood Siddiqui">
              {publications.length} works on theology, comparative religion, jurisprudence and history.
            </SectionHeading>
            <BookShelf books={publications} />
          </div>
        </section>
      )}

      {/* Gallery */}
      {albums.length > 0 && (
        <section className="pattern-ivory py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Moments" title="Gallery" />
            <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2">
              {albums.slice(0, 2).map((a) => (
                <StaggerItem key={a.id}>
                  <GalleryCard album={a} />
                </StaggerItem>
              ))}
            </StaggerGroup>
            <MoreLink href="/gallery">Open gallery</MoreLink>
          </div>
        </section>
      )}

      {/* News */}
      {news.length > 0 && (
        <section className="bg-ivory-2 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Announcements" title="News & Updates" />
            <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3">
              {news.map((n) => (
                <StaggerItem key={n.id} className="h-full">
                  <NewsCard post={n} />
                </StaggerItem>
              ))}
            </StaggerGroup>
            <MoreLink href="/news">All news</MoreLink>
          </div>
        </section>
      )}

      {/* Call to action */}
      <section className="relative overflow-hidden bg-maroon py-20 text-center">
        <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "url(/pattern-gold.svg)", backgroundSize: "96px" }} aria-hidden />
        <Reveal className="relative mx-auto max-w-3xl px-4">
          <p className="font-arabic text-3xl text-gold-light" lang="ar">أَهْلًا وَسَهْلًا</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-ivory sm:text-4xl">
            Interested in our programs, admissions or the weekly Dars-e-Quran?
          </h2>
          <Ornament className="mt-5" light />
          <p className="mt-5 text-ivory/80">Call or WhatsApp {phone} — or send us a message.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href={`https://wa.me/${phone.replace(/[^\d]/g, "")}`} target="_blank" rel="noopener noreferrer" className="btn-gold">
              <MessageCircle size={16} /> WhatsApp
            </a>
            <Link href="/contact" className="btn-outline-light">
              <Phone size={16} /> Contact us
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
