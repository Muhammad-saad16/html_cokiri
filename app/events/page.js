import { getList } from "@/lib/cms";
import { EventCard } from "@/components/Cards";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { PageHeader, SectionTitle } from "@/components/Ornaments";

export const metadata = { title: "Events" };

// A month-only date ("YYYY-MM") counts as late in that month, so it isn't filed as past too early.
const when = (d) => (/^\d{4}-\d{2}$/.test(d) ? new Date(`${d}-28`) : new Date(d));

export default async function EventsPage() {
  const events = await getList("events");
  const now = new Date();
  const upcoming = events.filter((e) => when(e.startDate) >= now);
  const past = events.filter((e) => when(e.startDate) < now);

  const grid = (list) => (
    <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {list.map((e) => (
        <StaggerItem key={e.id} className="h-full">
          <EventCard event={e} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  );

  return (
    <>
      <PageHeader arabic="مَجَالِسُ العِلْم" title="Events" intro="Gatherings, lectures, panel discussions and programs." />
      <section className="bg-coal py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {upcoming.length > 0 && (
            <div className="mb-20">
              <SectionTitle kicker="Coming Up" title="Upcoming Events" />
              {grid(upcoming)}
            </div>
          )}
          {past.length > 0 && (
            <>
              <SectionTitle kicker="Archive" title="Recent & Past Events" />
              {grid(past)}
            </>
          )}
          {events.length === 0 && <p className="text-center text-muted">No events published yet.</p>}
        </div>
      </section>
    </>
  );
}
