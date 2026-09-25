import { getList, getSettings } from "@/lib/cms";
import { PersonCard } from "@/components/Cards";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import AmbientBackground from "@/components/motion/AmbientBackground";
import FourPillars from "@/components/FourPillars";
import FitImage from "@/components/FitImage";

export const metadata = {
  title: "About — Vision, Mission & Leadership",
  description:
    "City of Knowledge Islamic Research Institute, Karachi — our introduction, vision and mission, leadership, advisory board and facilities.",
};

const FACILITY_PHOTOS = [
  ["/images/main-hall.jpg", "Main lecture hall"],
  ["/images/lounge.jpg", "Reception lounge"],
  ["/images/reception.jpg", "Guest area"],
  ["/images/library.jpg", "City of Knowledge Library"],
];

export default async function AboutPage() {
  const [people, settings] = await Promise.all([getList("people"), getSettings()]);
  const paragraphs = (settings?.aboutContent || "").split("\n\n").filter(Boolean);
  const leaders = people.filter((p) => p.order < 10);
  const advisors = people.filter((p) => p.order >= 10);

  return (
    <div>
      <section className="relative overflow-hidden bg-slate-900">
        <AmbientBackground />
        <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.2em] text-orange-400 font-medium">Islamic Research Institute</p>
            <h1 className="mt-3 text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-white">
              Vision & Mission
            </h1>
            <p className="mt-4 text-slate-300">A Project of ITQAN Educational & Research Foundation</p>
          </Reveal>
        </div>
      </section>

      <article className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12">
        <div className="text-slate-700 leading-relaxed space-y-5">
          {paragraphs.length > 0 ? (
            paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p>{p}</p>
              </Reveal>
            ))
          ) : (
            <p>[Institutional overview not yet added — go to Site Settings in the CMS to add it.]</p>
          )}
        </div>
        <Reveal delay={0.1} className="space-y-3">
          <FitImage src="/images/building-front.jpg" alt="City of Knowledge building" className="w-full h-64 rounded-2xl" />
          <FitImage src="/images/prof-zahid-hadith-workshop.jpg" alt="Workshop on the Significance of Hadith" className="w-full h-56 rounded-2xl" />
        </Reveal>
      </article>

      <FourPillars />

      {leaders.length > 0 && (
        <section id="leadership" className="bg-white border-y border-slate-200 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
            {leaders.map((p, i) => (
              <Reveal key={p.id} className={`grid grid-cols-1 gap-8 items-start ${i % 2 ? "md:grid-cols-[1fr_16rem]" : "md:grid-cols-[16rem_1fr]"}`}>
                {p.photoUrl && (
                  <FitImage src={p.photoUrl} alt={p.name} className={`w-64 h-72 rounded-2xl ${i % 2 ? "md:order-2" : ""}`} />
                )}
                <div>
                  <span className="inline-block rounded bg-slate-900 text-white text-sm px-2.5 py-0.5">{p.designation}</span>
                  <h2 className="mt-2 text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-orange-600 leading-tight">{p.name}</h2>
                  <div className="mt-4 space-y-4 text-slate-700 leading-relaxed">
                    {(p.bio || "").split("\n\n").map((para, j) => <p key={j}>{para}</p>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {advisors.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-orange-600 mb-8">Advisory Board</h2>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {advisors.map((p) => (
              <StaggerItem key={p.id}>
                <PersonCard person={{ ...p, designation: p.designation?.replace(/^Advisory Board — /, "") }} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>
      )}

      <section id="facilities" className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-200 scroll-mt-20">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-orange-600">Our Facilities</h2>
          <p className="mt-3 inline-block rounded bg-slate-900 text-white text-sm px-2.5 py-0.5">A Rich Environment Conducive to Deep Learning</p>
          <p className="mt-4 max-w-3xl text-slate-700 leading-relaxed">
            Located in a serene and respectable neighbourhood, CoK offers an environment that reflects dignity, respect,
            and academic excellence. Our well-furnished, spacious, and fully air-conditioned classrooms are equipped with
            modern interactive ed-tech tools. The institute attracts well-educated, courteous, and well-rounded
            individuals, fostering a community ideal for meaningful learning and personal growth.
          </p>
          <h3 className="mt-8 inline-block rounded bg-orange-600 text-white text-sm px-2.5 py-0.5">City of Knowledge Library</h3>
          <p className="mt-3 max-w-3xl text-slate-700 leading-relaxed">
            The institute is adorned with a well-equipped, resource-rich library. It boasts a beautiful collection of the
            latest and the historical literary works encompassing a vast array of topics such as ‘Tafsir’, ‘Hadith’,
            ‘History’, ‘Sirah’, ‘Shariah’, ‘Islamic Philosophy’, ‘Travelogues’, etc.
          </p>
        </Reveal>
        <StaggerGroup className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {FACILITY_PHOTOS.map(([src, caption]) => (
            <StaggerItem key={src}>
              <figure>
                <FitImage src={src} alt={caption} className="w-full h-44 rounded-xl" />
                <figcaption className="mt-2 text-xs text-slate-500">{caption}</figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>
    </div>
  );
}
