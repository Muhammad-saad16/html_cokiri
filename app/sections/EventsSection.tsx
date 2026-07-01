import Link from "next/link";
import EventCard from "../components/EventCard";
import { events } from "../data/events";

const featuredEvents = events.slice(0, 3);

interface EventsSectionProps {
  compactTop?: boolean;
}

export default function EventsSection({ compactTop = false }: EventsSectionProps) {
  return (
    <section
      className={`bg-paper-white pb-16 md:pb-24 ${
        compactTop ? "pt-0" : "pt-16 md:pt-24"
      }`}
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-20">
        {/* Header */}
        <div className="mb-10 text-center md:mb-12">
          <span className="mb-4 inline-block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
            Upcoming Events
          </span>
          <h2 className="font-serif text-[28px] font-semibold leading-9 text-on-surface md:text-[40px] md:leading-[48px]">
            Join Our Gatherings
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-6 text-on-surface-variant md:text-lg md:leading-7">
            Study circles, lectures, seminars, and community programs for
            learning and reflection.
          </p>
        </div>

        {/* Featured Events Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredEvents.map((event) => (
            <EventCard key={event.title} {...event} />
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
