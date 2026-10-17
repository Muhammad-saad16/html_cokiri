import { getList, getSettings } from "@/lib/cms";
import { PersonCard } from "@/components/Cards";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import FourPillars from "@/components/FourPillars";
import FitImage from "@/components/FitImage";
import { PageHeader, SectionTitle, Honorific } from "@/components/Ornaments";

export const metadata = {
  title: "About — Vision, Mission & Leadership",
  description:
    "City of Knowledge Islamic Research Institute, Karachi — our introduction, vision and mission, leadership and facilities.",
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
      <PageHeader
        arabic="رُؤْيَتُنَا وَرِسَالَتُنَا"
        kicker="Islamic Research Institute"
        title="Vision & Mission"
        intro="A project of ITQAN Educational & Research Foundation"
      />

      <section className="bg-coal py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div>
            <SectionTitle index="01" kicker="Who we are" title="An institute for knowledge, research and Tarbiyyah." />
            <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-ivory/85">
              {paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:leading-none first-letter:text-gold" : ""}>
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.1} className="space-y-4">
            <FitImage src="/images/building-front.jpg" alt="City of Knowledge building" className="h-72 w-full shadow-[10px_10px_0_0_var(--color-gold)]" />
            <FitImage src="/images/prof-zahid-hadith-workshop.jpg" alt="Workshop on the Significance of Hadith" className="h-60 w-full" />
          </Reveal>
        </div>
      </section>

      <FourPillars index="02" />

      {leaders.length > 0 && (
        <section id="leadership" className="scroll-mt-20 bg-coal-2 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl space-y-20 px-4 sm:px-6 lg:px-8">
            <SectionTitle index="03" kicker="Guidance" title="Leadership." />
            {leaders.map((p, i) => (
              <div key={p.id} className={`grid items-center gap-12 ${i % 2 ? "md:grid-cols-[1fr_20rem]" : "md:grid-cols-[20rem_1fr]"}`}>
                <Reveal className={`relative mx-auto w-full max-w-xs ${i % 2 ? "md:order-2" : ""}`}>
                                    <div className="relative aspect-[4/5] overflow-hidden shadow-[12px_12px_0_0_var(--color-gold)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.photoUrl} alt={p.name} className="h-full w-full object-cover object-top" />
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <span className="label inline-block bg-gold px-3 py-1.5 text-black">{p.designation}</span>
                  <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-ivory sm:text-5xl">{p.name}</h2>
                  <div className="mt-5 space-y-4 leading-relaxed text-ivory/85">
                    {(p.bio || "").split("\n\n").map((para, j) => (
                      <p key={j}>
                        <Honorific text={para} />
                      </p>
                    ))}
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </section>
      )}

      {advisors.length > 0 && (
        <section className="bg-coal py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionTitle index="04" kicker="Counsel" title="Advisory Board." />
            <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-3">
              {advisors.map((p) => (
                <StaggerItem key={p.id}>
                  <PersonCard person={{ ...p, designation: p.designation?.replace(/^Advisory Board — /, "") }} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      )}

      <section id="facilities" className="bg-coal scroll-mt-20 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            index="05"
            kicker="Our facilities"
            title="A rich environment conducive to deep learning."
            intro="Located in a serene and respectable neighbourhood, CoK offers an environment that reflects dignity, respect and academic excellence — well-furnished, spacious, fully air-conditioned classrooms with modern ed-tech tools."
          />
          <StaggerGroup className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            {FACILITY_PHOTOS.map(([src, caption]) => (
              <StaggerItem key={src}>
                <figure>
                  <FitImage src={src} alt={caption} className="h-52 w-full" />
                  <figcaption className="mt-3 font-display text-lg font-bold text-ivory">{caption}</figcaption>
                </figure>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal className="mt-12 border-l-4 border-gold bg-coal-2 p-7">
            <h3 className="font-display text-2xl font-bold text-ivory">City of Knowledge Library</h3>
            <p className="mt-2 leading-relaxed text-ivory/80">
              The institute is adorned with a well-equipped, resource-rich library — a beautiful collection of the latest and
              historical literary works on Tafsir, Hadith, History, Sirah, Shariah, Islamic Philosophy, Travelogues and more.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
