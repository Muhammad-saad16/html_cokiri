import Link from "next/link";
import { ArrowRight, BookOpen, Users2, GraduationCap, Library, Images } from "lucide-react";
import { getList, getSettings, mediaUrl } from "@/lib/cms";
import { EventCard, VideoCard, PublicationCard, ProgramCard, NewsCard, GalleryCard } from "@/components/Cards";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import AmbientBackground from "@/components/motion/AmbientBackground";
import Counter from "@/components/motion/Counter";
import Hero from "@/components/Hero";
import FourPillars from "@/components/FourPillars";
import FitImage from "@/components/FitImage";

const serif = { fontFamily: "var(--font-source-serif)" };

function SectionHeader({ title, href, label = "View all" }) {
  return (
    <Reveal>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-slate-900">{title}</h2>
        {href && (
          <Link href={href} className="group flex items-center gap-1 text-sm text-orange-700 hover:text-orange-800">
            {label} <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </Reveal>
  );
}

export default async function HomePage() {
  const [events, videos, publications, people, programs, news, albums, settings] = await Promise.all([
    getList("events", { limit: 3 }),
    getList("videos", { limit: 3 }),
    getList("publications"),
    getList("people"),
    getList("programs"),
    getList("news", { limit: 3 }),
    getList("gallery-albums"),
    getSettings(),
  ]);

  const leaders = people.filter((p) => p.order < 10);

  const stats = [
    { icon: GraduationCap, value: programs.length, label: "Programs & Courses" },
    { icon: BookOpen, value: publications.length, label: "Books & Publications" },
    { icon: Users2, value: people.length, label: "Leadership & Advisors" },
    { icon: Images, value: albums.length, label: "Photo Albums" },
  ];

  return (
    <div>
      <Hero description={settings?.seoDescription} imageUrl="/images/building-front.jpg" />

      <section className="relative border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StaggerItem key={stat.label} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                  <stat.icon size={20} className="text-orange-700" strokeWidth={1.75} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">
                    <Counter value={stat.value || 0} />
                  </div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <h2 className="text-4xl font-extrabold uppercase tracking-tight text-orange-600">Introduction</h2>
          <p className="mt-5 text-slate-700 leading-relaxed">
            City of Knowledge – Islamic Research Institute (CoK) serves as a dynamic hub for encyclopaedic knowledge and
            multidisciplinary research that not only imparts “Knowledge and Tarbiyyah”, “Learning and Teaching”, and
            “Intellectual Acumen” among all knowledge pursuers and knowledge contributors, but also pays significant
            attention to spiritual growth, preparing the minds to serve Islam with dedication.
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            We strive to provide knowledge for both men and women of all ages, and even provide Tarbiyyah for young
            children through specifically designed courses to broaden their understanding and guide them through to a
            better future.
          </p>
          <Link href="/about" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-orange-700 hover:text-orange-800">
            Read our Vision & Mission <ArrowRight size={14} />
          </Link>
        </Reveal>
        <Reveal delay={0.1} className="grid grid-cols-2 gap-3">
          <FitImage src="/images/visit-imam-soharwardi.jpg" alt="Imam Syed Badi-ud-Din Soharwardi visiting City of Knowledge" className="col-span-2 w-full h-56 rounded-xl" />
          <FitImage src="/images/kids-course-speech.jpg" alt="A child speaking during a children's course" className="w-full h-40 rounded-xl" />
          <FitImage src="/images/hadith-workshop-audience.jpg" alt="Workshop on the Significance of Hadith" className="w-full h-40 rounded-xl" />
        </Reveal>
      </section>

      <FourPillars />

      {programs.length > 0 && (
        <section className="relative max-w-6xl mx-auto px-6 py-16 border-t border-slate-200">
          <SectionHeader title="Academic Activities" href="/programs" />
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.slice(0, 6).map((p) => <StaggerItem key={p.id}><ProgramCard program={p} /></StaggerItem>)}
          </StaggerGroup>
        </section>
      )}

      {leaders.length > 0 && (
        <section className="bg-white border-y border-slate-200">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <SectionHeader title="Leadership" href="/about#leadership" label="Leadership & Advisory Board" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {leaders.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.1} className="flex flex-col sm:flex-row gap-6 items-start">
                  {p.photoUrl && (
                    <FitImage src={p.photoUrl} alt={p.name} className="w-36 h-40 rounded-2xl shrink-0" />
                  )}
                  <div>
                    <span className="inline-block rounded bg-slate-900 text-white text-xs px-2 py-0.5">{p.designation}</span>
                    <h3 className="mt-2 text-xl font-extrabold uppercase text-orange-600 leading-tight">{p.name}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-5">{p.bio?.split("\n\n")[0]}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {events.length > 0 && (
        <section className="relative max-w-6xl mx-auto px-6 py-16">
          <SectionHeader title="Upcoming & Recent Events" href="/events" />
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((e) => <StaggerItem key={e.id}><EventCard event={e} /></StaggerItem>)}
          </StaggerGroup>
        </section>
      )}

      <section className="relative max-w-6xl mx-auto px-6 py-16 border-t border-slate-200 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <Reveal className="order-2 lg:order-1">
          <FitImage src="/images/library.jpg" alt="City of Knowledge Library" className="w-full h-80 rounded-2xl" />
        </Reveal>
        <Reveal delay={0.1} className="order-1 lg:order-2">
          <h2 className="text-4xl font-extrabold uppercase tracking-tight text-orange-600">Our Facilities</h2>
          <p className="mt-2 text-sm font-medium text-slate-900">A Rich Environment Conducive to Deep Learning</p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Located in a serene and respectable neighbourhood, CoK offers an environment that reflects dignity, respect,
            and academic excellence. Our well-furnished, spacious, and fully air-conditioned classrooms are equipped with
            modern interactive ed-tech tools.
          </p>
          <div className="mt-5 flex gap-3 items-start rounded-xl bg-orange-50 p-4">
            <Library size={20} className="text-orange-700 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-700">
              <span className="font-semibold">City of Knowledge Library</span> — a resource-rich collection of the latest
              and historical works on Tafsir, Hadith, History, Sirah, Shariah, Islamic Philosophy, Travelogues and more.
            </p>
          </div>
        </Reveal>
      </section>

      {publications.length > 0 && (
        <section className="relative max-w-6xl mx-auto px-6 py-16 border-t border-slate-200">
          <SectionHeader title="Books by Dr. Umair Mahmood Siddiqui" href="/research" />
          <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {publications.slice(0, 4).map((p) => <StaggerItem key={p.id}><PublicationCard publication={p} /></StaggerItem>)}
          </StaggerGroup>
        </section>
      )}

      {albums.length > 0 && (
        <section className="relative max-w-6xl mx-auto px-6 py-16 border-t border-slate-200">
          <SectionHeader title="Gallery" href="/gallery" />
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {albums.slice(0, 3).map((a) => <StaggerItem key={a.id}><GalleryCard album={a} /></StaggerItem>)}
          </StaggerGroup>
        </section>
      )}

      {videos.length > 0 && (
        <section className="relative max-w-6xl mx-auto px-6 py-16 border-t border-slate-200">
          <SectionHeader title="Media" href="/media" />
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((v) => <StaggerItem key={v.id}><VideoCard video={v} /></StaggerItem>)}
          </StaggerGroup>
        </section>
      )}

      {news.length > 0 && (
        <section className="relative max-w-6xl mx-auto px-6 py-16 border-t border-slate-200">
          <SectionHeader title="News & Announcements" href="/news" />
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((n) => <StaggerItem key={n.id}><NewsCard post={n} /></StaggerItem>)}
          </StaggerGroup>
        </section>
      )}

      <section className="relative border-t border-slate-200 overflow-hidden">
        <AmbientBackground />
        <Reveal className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h2 className="text-2xl md:text-3xl text-slate-900" style={serif}>
            Interested in our programs, admissions or the weekly Dars-e-Quran?
          </h2>
          <p className="mt-3 text-slate-600">Call or WhatsApp {settings?.contactPhone || "+92-336-2342386"} — or send us a message.</p>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-orange-600 text-white text-sm font-medium px-6 py-3 hover:bg-orange-700 transition"
          >
            Contact Us <ArrowRight size={15} />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
