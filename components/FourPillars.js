import { BookOpenText, GraduationCap, Lightbulb, HeartHandshake } from "lucide-react";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import { SectionTitle } from "./Ornaments";

const PILLARS = [
  { icon: BookOpenText, title: "Knowledge & Tarbiyyah", description: "Authentic knowledge paired with character building for all ages." },
  { icon: GraduationCap, title: "Learning & Teaching", description: "Structured diplomas, specializations and language courses." },
  { icon: Lightbulb, title: "Intellectual Acumen", description: "Research, seminars and dialogue on contemporary issues." },
  { icon: HeartHandshake, title: "Spiritual Growth", description: "Dars-e-Quran, Zikr and Tarbiyyah that nurture the heart." },
];

/** Bento grid: a photo tile beside four numbered pillars. */
export default function FourPillars({ index = "02" }) {
  return (
    <section className="bg-coal-2 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle index={index} kicker="What we impart" title="Four pillars of everything we teach." />
        <StaggerGroup className="mt-12 grid gap-4 md:grid-cols-4 md:grid-rows-2">
          <StaggerItem className="relative min-h-72 overflow-hidden md:col-span-2 md:row-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hadith-workshop-audience.jpg" alt="Students at a City of Knowledge workshop" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <p className="absolute right-6 bottom-6 left-6 font-display text-2xl leading-snug font-bold text-white sm:text-3xl">
              “Preparing minds to serve Islam with dedication.”
            </p>
          </StaggerItem>
          {PILLARS.map((p, i) => (
            <StaggerItem key={p.title} className="h-full">
              <div className="tile group flex h-full flex-col p-6">
                <div className="flex items-start justify-between">
                  <p.icon size={30} strokeWidth={1.5} className="text-gold" />
                  <span className="font-display text-3xl font-bold text-ivory/10 group-hover:text-gold/30">0{i + 1}</span>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-ivory">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
