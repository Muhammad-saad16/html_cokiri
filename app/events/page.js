import { getList } from "@/lib/cms";
import { EventCard } from "@/components/Cards";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export const metadata = { title: "Events" };

export default async function EventsPage() {
  const events = await getList("events");
  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.startDate) >= now);
  const past = events.filter((e) => new Date(e.startDate) < now);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <Reveal>
        <h1 className="text-3xl font-serif text-slate-900" style={{ fontFamily: "var(--font-source-serif)" }}>Events</h1>
      </Reveal>

      {upcoming.length > 0 && (
        <section className="mt-10">
          <Reveal><h2 className="text-lg font-medium text-slate-800 mb-4">Upcoming</h2></Reveal>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcoming.map((e) => <StaggerItem key={e.id}><EventCard event={e} /></StaggerItem>)}
          </StaggerGroup>
        </section>
      )}

      {past.length > 0 && (
        <section className="mt-12">
          <Reveal><h2 className="text-lg font-medium text-slate-800 mb-4">Past</h2></Reveal>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {past.map((e) => <StaggerItem key={e.id}><EventCard event={e} /></StaggerItem>)}
          </StaggerGroup>
        </section>
      )}

      {events.length === 0 && <p className="mt-8 text-slate-500">No events published yet.</p>}
    </div>
  );
}
