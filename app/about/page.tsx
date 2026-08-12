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

  const drUmair = {
    name: "Dr. Umair Mahmood Siddiqui",

    designation:
      "Associate Professor, Department of Islamic Learning, University of Karachi",

    positions: [
      "Researcher, International Islamic Fiqh Academy (OIC), Jeddah",
      "Honorary Chairman, City of Knowledge Islamic Research Institute",
      "Former Member, Council of Islamic Ideology, Government of Pakistan",
    ],

    website: "www.drumairsiddiqui.com",

    youtube: "DrUmairMahmoodSiddiqui",

    email: "Btml432@gmail.com",

    phones: [
      "+92 310 2083355",
      "+92 300 9221167",
    ],
  };


  return (
    <main className="flex flex-col bg-paper-white">
      {/* Introduction */}
     <section className="pt-10 pb-16 md:pt-14 md:pb-24">
  <div className="mx-auto max-w-[1280px] px-5 md:px-20 flex justify-center">
    <Image
      src="/images/about-banner.jpg"
      alt="Dr. Umair Mahmood Siddiqui"
      width={1100}
      height={1400}
      className="w-full max-w-5xl h-auto rounded-lg shadow-lg"
      priority
    />
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
