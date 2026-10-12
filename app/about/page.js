import { getList, getSettings } from "@/lib/cms";
import { PersonCard } from "@/components/Cards";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import FourPillars from "@/components/FourPillars";
import FitImage from "@/components/FitImage";
import { PageHero, SectionHeading, Honorific } from "@/components/Ornaments";

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
      <PageHero
        arabic="رُؤْيَتُنَا وَرِسَالَتُنَا"
        eyebrow="Islamic Research Institute"
        title="Vision & Mission"
        subtitle="A project of ITQAN Educational & Research Foundation"
      />

      <section className="pattern-ivory py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div>
            <SectionHeading eyebrow="Who We Are" title="Introduction" align="left" />
            <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-ink/85">
              {paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:leading-none first-letter:text-maroon" : ""}>
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.1} className="space-y-4">
            <FitImage src="/images/building-front.jpg" alt="City of Knowledge building" className="h-72 w-full rounded-2xl border-4 border-white shadow-xl" />
            <FitImage src="/images/prof-zahid-hadith-workshop.jpg" alt="Workshop on the Significance of Hadith" className="h-60 w-full rounded-2xl border-4 border-white shadow-xl" />
          </Reveal>
        </div>
      </section>

      <FourPillars />

      {leaders.length > 0 && (
        <section id="leadership" className="scroll-mt-20 bg-ivory-2 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl space-y-20 px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Guidance" title="Leadership" />
            {leaders.map((p, i) => (
              <div key={p.id} className={`grid items-center gap-12 ${i % 2 ? "md:grid-cols-[1fr_20rem]" : "md:grid-cols-[20rem_1fr]"}`}>
                <Reveal className={`relative mx-auto w-full max-w-xs ${i % 2 ? "md:order-2" : ""}`}>
                  <div className="arch absolute -inset-3 border-2 border-gold/60" aria-hidden />
                  <div className="arch relative aspect-[4/5] overflow-hidden border-4 border-gold shadow-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.photoUrl} alt={p.name} className="h-full w-full object-cover object-top" />
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <span className="inline-block rounded-md bg-maroon px-3 py-1 text-xs font-semibold tracking-[0.15em] text-gold-light uppercase">{p.designation}</span>
                  <h2 className="mt-3 font-serif text-4xl font-semibold text-navy">{p.name}</h2>
                  <div className="mt-5 space-y-4 leading-relaxed text-ink/85">
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
        <section className="pattern-ivory py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Counsel" title="Advisory Board" />
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

      <section id="facilities" className="pattern-ivory scroll-mt-20 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Our Facilities" title="A Rich Environment Conducive to Deep Learning">
            Located in a serene and respectable neighbourhood, CoK offers an environment that reflects dignity, respect, and
            academic excellence. Our well-furnished, spacious, and fully air-conditioned classrooms are equipped with modern
            interactive ed-tech tools.
          </SectionHeading>
          <StaggerGroup className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {FACILITY_PHOTOS.map(([src, caption]) => (
              <StaggerItem key={src}>
                <figure>
                  <FitImage src={src} alt={caption} className="h-52 w-full rounded-2xl border-4 border-white shadow-lg" />
                  <figcaption className="mt-3 text-center font-serif text-lg text-navy">{caption}</figcaption>
                </figure>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal className="mx-auto mt-12 max-w-3xl rounded-2xl border border-gold/40 bg-white/80 p-6 text-center">
            <h3 className="font-serif text-2xl font-semibold text-maroon">City of Knowledge Library</h3>
            <p className="mt-2 leading-relaxed text-ink/80">
              The institute is adorned with a well-equipped, resource-rich library — a beautiful collection of the latest and
              historical literary works on Tafsir, Hadith, History, Sirah, Shariah, Islamic Philosophy, Travelogues and more.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
