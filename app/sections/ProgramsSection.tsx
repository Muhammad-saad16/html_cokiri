import Link from "next/link";
import Image from "next/image";
import { personalityVisits } from "../data/personalities";

export default function ProgramsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-20">
        {/* Header */}
        <div className="mb-10 text-center md:mb-12">
          <span className="mb-4 inline-block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
            Our Programs
          </span>
          <h2 className="font-serif text-[28px] font-semibold leading-9 text-on-surface md:text-[40px] md:leading-[48px]">
            Latest Events and Programs
          </h2>
          
        </div>

        {/* Featured Visits Grid */}
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {personalityVisits.map((visit, index) => (
            <Link
              key={index}
              href="/interactions-with-personalities"
              className="group relative block aspect-[3/4] overflow-hidden rounded-lg border border-outline-variant/40 transition-all duration-200 hover:border-outline/60 hover:shadow-[0_12px_24px_-10px_rgba(75,54,33,0.08)]"
            >
              <Image
                src={visit.image}
                alt={visit.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
          ))}
        </div>

        {/* Explore More */}
        <div className="mt-10 flex justify-center md:mt-12">
          <Link
            href="/events"
            className="inline-flex h-12 items-center justify-center rounded bg-heritage-orange px-6 font-hanken text-xs font-bold uppercase tracking-[0.05em] text-paper-white transition-colors duration-200 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange focus-visible:ring-offset-2 focus-visible:ring-offset-paper-white"
          >
            Explore More
          </Link>
        </div>
      </div>
    </section>
  );
}
