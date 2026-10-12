import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { getItem } from "@/lib/cms";
import { fmtDate } from "@/lib/format";
import Reveal from "@/components/motion/Reveal";
import FitImage from "@/components/FitImage";
import { DetailHeader, Prose } from "@/components/Detail";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = await getItem("events", slug);
  if (!event) return {};
  return {
    title: event.title,
    description: event.summary || event.description?.slice(0, 160),
    openGraph: { images: event.coverImageUrl ? [event.coverImageUrl] : [] },
  };
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params;
  const event = await getItem("events", slug);
  if (!event) notFound();

  return (
    <>
      <DetailHeader back={{ href: "/events", label: "All events" }} kicker="Event" title={event.title} />
      <section className="bg-white pb-20">
        <Reveal as="article" className="mx-auto mt-12 max-w-4xl px-4 sm:px-6">
          {event.coverImageUrl && (
            <FitImage src={event.coverImageUrl} alt={event.title} className="h-72 w-full sm:h-96" />
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 bg-ink px-3 py-2 text-sm text-gold">
              <CalendarDays size={16} /> {fmtDate(event.startDate)}
            </span>
            {event.location && (
              <span className="inline-flex items-center gap-2 border border-line bg-white/80 px-3 py-2 text-sm text-ink">
                <MapPin size={16} className="text-crimson" /> {event.location}
              </span>
            )}
          </div>
          {event.summary && <p className="mt-6 font-display text-2xl leading-snug text-ink">{event.summary}</p>}
          <Prose text={event.description} className="mt-6" />
          {event.googleFormUrl && (
            <a href={event.googleFormUrl} target="_blank" rel="noopener noreferrer" className="btn-red mt-8">
              Register for this event <ArrowRight size={16} />
            </a>
          )}
        </Reveal>
      </section>
    </>
  );
}
