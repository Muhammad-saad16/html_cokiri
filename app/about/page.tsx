import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { getAbout } from "../../sanity/lib/queries";
import { urlFor } from "../../sanity/lib/image";

const defaultPillars = [
  {
    title: "Ilm",
    subtitle: "Knowledge",
    description:
      "Pursuit and dissemination of authentic Islamic knowledge through structured courses, research, and scholarly discourse.",
  },
  {
    title: "Da'wah",
    subtitle: "Communication",
    description:
      "Inviting people toward the teachings of Islam with wisdom, clarity, and contemporary relevance.",
  },
  {
    title: "Islah",
    subtitle: "Reformation",
    description:
      "Encouraging spiritual and social reformation grounded in the Qur'an and Sunnah for individuals and communities.",
  },
  {
    title: "Khidmah",
    subtitle: "Service",
    description:
      "Serving society through education, outreach, and community welfare programs that reflect Islamic compassion.",
  },
];

export default async function AboutPage() {
  const about = await getAbout();

  const title = about?.title || "Bridging Tradition and Contemporary Thought";
  const imageUrl = about?.image
    ? urlFor(about.image).width(640).height(480).url()
    : "/institute.png";
  const missionTitle =
    about?.missionTitle || "Propagate authentic knowledge for positive change";
  const missionDescription =
    about?.missionDescription ||
    "To cultivate a community rooted in authentic Islamic teachings, critical thinking, and ethical leadership through education, research, and public engagement.";
  const visionTitle =
    about?.visionTitle || "A leading center of Islamic learning and research";
  const visionDescription =
    about?.visionDescription ||
    "To be recognized as a trusted institution that bridges classical scholarship with contemporary challenges, serving learners locally and globally.";
  const pillars = about?.pillars?.length ? about.pillars : defaultPillars;

  return (
    <main className="flex flex-col bg-paper-white">
      {/* Introduction */}
      <section className="pt-10 pb-16 md:pt-14 md:pb-24">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-10 px-5 md:flex-row md:items-center md:gap-16 md:px-20">
          <div className="flex-1 text-center md:text-left">
            <span className="mb-4 inline-block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
              Our Story
            </span>
            <h2 className="font-serif text-[24px] font-semibold leading-8 text-on-surface md:text-[32px] md:leading-10">
              {title}
            </h2>
            <div className="mt-5 space-y-4 text-base leading-6 text-on-surface-variant md:text-lg md:leading-7 [&_p]:m-0">
              {about?.description?.length ? (
                <PortableText value={about.description} />
              ) : (
                <>
                  <p>
                    Founded in Karachi, City of Knowledge serves as a center for
                    rigorous academic inquiry and spiritual growth. The institute
                    offers structured courses, research opportunities, and community
                    programs designed for students, professionals, and lifelong
                    learners.
                  </p>
                  <p className="mt-4">
                    Under the guidance of respected scholars, the institute blends
                    classical Islamic sciences with modern disciplines such as
                    philosophy, law, history, and contemporary issues.
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="flex-1">
            <div className="overflow-hidden rounded-lg border border-outline-variant/40 shadow-[0_8px_24px_-10px_rgba(31,41,55,0.2)]">
              <Image
                src={imageUrl}
                alt="City of Knowledge institute building"
                width={640}
                height={480}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-manuscript-tint py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-20">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded border border-outline-variant/40 bg-surface-container-low p-6 md:p-8">
              <span className="mb-3 inline-block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
                Mission
              </span>
              <h3 className="font-serif text-[20px] font-semibold leading-7 text-on-surface md:text-[24px] md:leading-8">
                {missionTitle}
              </h3>
              <p className="mt-4 text-base leading-6 text-on-surface-variant">
                {missionDescription}
              </p>
            </div>
            <div className="rounded border border-outline-variant/40 bg-surface-container-low p-6 md:p-8">
              <span className="mb-3 inline-block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
                Vision
              </span>
              <h3 className="font-serif text-[20px] font-semibold leading-7 text-on-surface md:text-[24px] md:leading-8">
                {visionTitle}
              </h3>
              <p className="mt-4 text-base leading-6 text-on-surface-variant">
                {visionDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-20">
          <div className="mb-10 text-center md:mb-14">
            <span className="mb-4 inline-block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
              Our Foundation
            </span>
            <h2 className="font-serif text-[24px] font-semibold leading-8 text-on-surface md:text-[32px] md:leading-10">
              Four Pillars of Service
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded border border-outline-variant/40 bg-paper-white p-6 text-center transition-shadow duration-200 hover:shadow-[0_8px_24px_-10px_rgba(75,54,33,0.12)]"
              >
                <h3 className="font-serif text-[20px] font-semibold text-on-surface">
                  {pillar.title}
                </h3>
                <span className="mt-1 block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
                  {pillar.subtitle}
                </span>
                <p className="mt-4 text-sm leading-5 text-on-surface-variant">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
