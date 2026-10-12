import { BookOpenText, GraduationCap, Lightbulb, HeartHandshake } from "lucide-react";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import { SectionHeading } from "./Ornaments";

const PILLARS = [
  { icon: BookOpenText, title: "Knowledge & Tarbiyyah", description: "Authentic knowledge paired with character building for all ages." },
  { icon: GraduationCap, title: "Learning & Teaching", description: "Structured diplomas, specializations and language courses." },
  { icon: Lightbulb, title: "Intellectual Acumen", description: "Research, seminars and dialogue on contemporary issues." },
  { icon: HeartHandshake, title: "Spiritual Growth", description: "Dars-e-Quran, Zikr and Tarbiyyah that nurture the heart." },
];

export default function FourPillars() {
  return (
    <section className="pattern-navy py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Our Foundation" title="What We Impart" dark />
        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <StaggerItem key={p.title} className="h-full">
              <div className="group h-full rounded-2xl border border-gold/30 bg-navy-deep/50 p-7 text-center transition duration-300 hover:-translate-y-1 hover:border-gold">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold/60 text-gold-light transition group-hover:bg-gold group-hover:text-navy-deep">
                  <p.icon size={28} strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 font-serif text-xl font-semibold text-gold-light">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/70">{p.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
