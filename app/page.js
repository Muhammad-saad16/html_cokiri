import Link from "next/link";
import { ArrowUpRight, Library } from "lucide-react";
import { getList, getSettings } from "@/lib/cms";
import { EventCard, NewsCard, GalleryCard } from "@/components/Cards";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import Counter from "@/components/motion/Counter";
import Hero from "@/components/Hero";
import FourPillars from "@/components/FourPillars";
import Timetable from "@/components/Timetable";
import MediaFeature from "@/components/MediaFeature";
import BookShelf from "@/components/BookShelf";
import { SectionTitle, Honorific } from "@/components/Ornaments";

const FACILITIES = [
  ["/images/library.jpg", "The Library", "Tafsir, Hadith, Sirah, Shariah, philosophy and travelogues."],
  ["/images/main-hall.jpg", "Main Hall", "Spacious, air-conditioned and equipped with ed-tech tools."],
  ["/images/lounge.jpg", "Reception Lounge", "A dignified space to welcome scholars and guests."],
  ["/images/reception.jpg", "Guest Area", "Comfortable seating for families and visitors."],
];

export default async function HomePage() {
  const [events, videos, publications, people, programs, news, albums] = await Promise.all([
    getList("events", { limit: 3 }),
    getList("videos"),
    getList("publications"),
    getList("people"),
    getList("programs"),
    getList("news", { limit: 4 }),
    getList("gallery-albums"),
    getSettings(),
  ]);
  const leader = people.find((p) => p.order < 10);

  const schedule = programs.map((p) => ({ href: `/programs/${p.slug}`, day: p.day, title: p.title.split(" — ")[0], time: p.time }));
  const ticker = [
    ...programs.map((p) => `${p.title} — ${p.schedule}`),
    ...news.slice(0, 2).map((n) => n.title),
  ];
  const stats = [
    { value: programs.length, label: "Weekly programs" },
    { value: videos.length, label: "Lectures online" },
    { value: publications.length, label: "Books published" },
    { value: albums.reduce((n, a) => n + (a.images?.length || 0), 0), label: "Photos archived" },
  ];
  const [leadNews, ...moreNews] = news;

  return (
    <div>
      <Hero imageUrl="/images/library.jpg" schedule={schedule} ticker={ticker} />

      {/* 01 — Introduction */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionTitle index="01" kicker="Introduction" title="Knowledge and Tarbiyyah for every age." />
              <Reveal delay={0.1} className="mt-8 space-y-5 text-lg leading-relaxed text-ivory/80">
                <p>
                  City of Knowledge – Islamic Research Institute (CoK) serves as a dynamic hub for encyclopaedic knowledge and
                  multidisciplinary research — imparting “Knowledge and Tarbiyyah”, “Learning and Teaching” and “Intellectual
                  Acumen”, while paying significant attention to spiritual growth.
                </p>
                <p className="text-base text-muted">
                  We provide knowledge for both men and women of all ages, and Tarbiyyah for young children through
                  specially designed courses.
                </p>
              </Reveal>
              <Reveal delay={0.15} className="mt-10 grid grid-cols-2 border-t-2 border-gold sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label} className="border-b border-line py-5 pr-4 sm:border-b-0">
                    <p className="font-display text-5xl font-extrabold text-gold">
                      <Counter value={s.value || 0} />
                    </p>
                    <p className="mt-1 text-xs font-semibold text-muted">{s.label}</p>
                  </div>
                ))}
              </Reveal>
            </div>
            <Reveal delay={0.1} className="relative min-h-[28rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/building-front.jpg" alt="City of Knowledge building" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute -bottom-5 -left-5 bg-gold px-5 py-4 text-black shadow-xl">
                <p className="font-display text-3xl font-extrabold">CoK</p>
                <p className="label text-black/70">A project of ITQAN Foundation</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <FourPillars index="02" />

      {/* 03 — Weekly timetable */}
      {programs.length > 0 && (
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              index="03"
              kicker="Weekly timetable"
              title="Join a circle of knowledge this week."
              intro="Open to men, women and families — no registration needed for the weekly Dars."
              action={{ href: "/programs", label: "All programs" }}
            />
            <Timetable programs={programs} />
          </div>
        </section>
      )}

      {/* 04 — Media */}
      {videos.length > 0 && (
        <section className="kufic bg-black py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle index="04" kicker="Media library" title="Lectures, Dars & discussions." action={{ href: "/media", label: `All ${videos.length} videos` }} dark />
            <MediaFeature videos={videos.slice(0, 5)} />
          </div>
        </section>
      )}

      {/* 05 — Leadership */}
      {leader && (
        <section className="overflow-hidden">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
            <Reveal className="relative min-h-[26rem] bg-coal-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={leader.photoUrl} alt={leader.name} className="absolute inset-0 h-full w-full object-cover object-top" />
              <span className="label absolute top-6 left-6 bg-gold px-3 py-1.5 text-black">{leader.designation}</span>
            </Reveal>
            <div className="px-4 py-16 sm:px-10 lg:px-14 lg:py-24">
              <SectionTitle index="05" kicker="Under the supervision of" title={leader.name} />
              <Reveal delay={0.1} className="mt-6 space-y-4 leading-relaxed text-ivory/80">
                {leader.bio?.split("\n\n").map((para, i) => (
                  <p key={i}>
                    <Honorific text={para} />
                  </p>
                ))}
              </Reveal>
              <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-3">
                <Link href="/about#leadership" className="btn-ink">
                  Read more <ArrowUpRight size={16} />
                </Link>
                <a href="https://drumairsiddiqui.com" target="_blank" rel="noopener noreferrer" className="btn-line">
                  drumairsiddiqui.com
                </a>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* 06 — Events */}
      {events.length > 0 && (
        <section className="bg-coal-2 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle index="06" kicker="Events" title="Recent gatherings." action={{ href: "/events", label: "All events" }} />
            <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3">
              {events.map((e) => (
                <StaggerItem key={e.id} className="h-full">
                  <EventCard event={e} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      )}

      {/* 07 — Facilities */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            index="07"
            kicker="Our campus"
            title="A setting built for deep learning."
            intro="A serene, respectable neighbourhood; well-furnished, spacious and fully air-conditioned classrooms."
            action={{ href: "/about#facilities", label: "Facilities" }}
          />
          <StaggerGroup className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {FACILITIES.map(([src, title, text], i) => (
              <StaggerItem key={src} className="group bg-coal">
                <div className="relative h-56 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <p className="font-display text-xs font-bold text-gold">0{i + 1}</p>
                  <h3 className="mt-1 flex items-center gap-2 font-display text-xl font-bold text-ivory">
                    {i === 0 && <Library size={18} className="text-gold" />} {title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 08 — Books */}
      {publications.length > 0 && (
        <section className="bg-coal-2 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              index="08"
              kicker="Research & publications"
              title="Books by Dr. Umair Mahmood Siddiqui."
              action={{ href: "/research", label: `All ${publications.length} books` }}
            />
            <BookShelf books={publications} />
          </div>
        </section>
      )}

      {/* 09 — Gallery */}
      {albums.length > 0 && (
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle index="09" kicker="Gallery" title="Moments from the institute." action={{ href: "/gallery", label: "Open gallery" }} />
            <StaggerGroup className="mt-12 grid gap-4 md:h-[32rem] md:grid-cols-[1.6fr_1fr]">
              {albums.slice(0, 2).map((a, i) => (
                <StaggerItem key={a.id} className="h-full">
                  <GalleryCard album={a} large={i === 0} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      )}

      {/* 10 — News */}
      {leadNews && (
        <section className="border-t border-line py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle index="10" kicker="Announcements" title="News & updates." action={{ href: "/news", label: "All news" }} />
            <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
              <Reveal>
                <NewsCard post={leadNews} featured />
              </Reveal>
              <StaggerGroup className="space-y-8 border-t-2 border-gold pt-8 lg:border-t-0 lg:border-l lg:border-line lg:pt-0 lg:pl-10">
                {moreNews.map((n) => (
                  <StaggerItem key={n.id}>
                    <NewsCard post={n} />
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
