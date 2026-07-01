import Link from "next/link";
import ProgramCard from "../components/ProgramCard";
import { programs } from "../data/programs";

const featuredPrograms = programs.slice(0, 3);

export default function ProgramsSection() {
  return (
    <section className="bg-paper-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-20">
        {/* Header */}
        <div className="mb-10 text-center md:mb-12">
          <span className="mb-4 inline-block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
            Our Programs
          </span>
          <h2 className="font-serif text-[28px] font-semibold leading-9 text-on-surface md:text-[40px] md:leading-[48px]">
            Structured Learning for Every Seeker
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-6 text-on-surface-variant md:text-lg md:leading-7">
            Discover programs designed to cultivate knowledge, critical thinking,
            and spiritual growth.
          </p>
        </div>

        {/* Featured Programs Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPrograms.map((program) => (
            <ProgramCard key={program.title} {...program} />
          ))}
        </div>

        {/* Explore More */}
        <div className="mt-10 flex justify-center md:mt-12">
          <Link
            href="/programs"
            className="inline-flex h-12 items-center justify-center rounded bg-heritage-orange px-6 font-hanken text-xs font-bold uppercase tracking-[0.05em] text-paper-white transition-colors duration-200 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange focus-visible:ring-offset-2 focus-visible:ring-offset-paper-white"
          >
            Explore More
          </Link>
        </div>
      </div>
    </section>
  );
}
