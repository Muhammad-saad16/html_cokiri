"use client";

import { BookOpenText, GraduationCap, Lightbulb, HeartHandshake } from "lucide-react";
import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";

const PILLARS = [
  { icon: BookOpenText, title: "Knowledge & Tarbiyyah", description: "Authentic knowledge paired with character building for all ages." },
  { icon: GraduationCap, title: "Learning & Teaching", description: "Structured diplomas, specializations and language courses." },
  { icon: Lightbulb, title: "Intellectual Acumen", description: "Research, seminars and dialogue on contemporary issues." },
  { icon: HeartHandshake, title: "Spiritual Growth", description: "Dars-e-Quran, Zikr and Tarbiyyah that nurture the heart." },
];

export default function FourPillars() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-200">
      <Reveal>
        <h2 className="text-2xl font-serif text-slate-900" style={{ fontFamily: "var(--font-source-serif)" }}>
          What We Impart
        </h2>
      </Reveal>
      <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">
        {PILLARS.map((p) => (
          <StaggerItem key={p.title}>
            <div className="group h-full border border-slate-200 rounded-xl bg-white p-5 hover:border-orange-300 hover:shadow-lg hover:shadow-slate-900/[0.05] transition-all hover:-translate-y-1">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                <p.icon size={18} className="text-orange-700" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 font-medium text-slate-900">{p.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{p.description}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
