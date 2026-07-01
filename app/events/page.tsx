import EventCard from "../components/EventCard";
import { events } from "../data/events";

export default function EventsPage() {
  return (
    <main className="flex flex-col bg-paper-white">
      {/* Header */}
      <section className="pt-4 pb-4 md:pt-6 md:pb-6">
        <div className="mx-auto max-w-[1280px] px-5 text-center md:px-20">
          <span className="mb-4 inline-block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
            Events
          </span>
          <h1 className="font-serif text-[28px] font-semibold leading-9 text-on-surface md:text-[48px] md:font-bold md:leading-[56px]">
            Upcoming Events & Gatherings
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-6 text-on-surface-variant md:text-lg md:leading-7">
            Join our study circles, lectures, seminars, and community programs
            designed for learning, reflection, and spiritual growth.
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.title} {...event} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
