import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getItem } from "@/lib/cms";
import { fmtDate } from "@/lib/format";
import Reveal from "@/components/motion/Reveal";
import FitImage from "@/components/FitImage";

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
    <Reveal as="article" className="max-w-3xl mx-auto px-6 py-16">
      {event.coverImageUrl && (
        <FitImage src={event.coverImageUrl} alt={event.title} className="w-full h-72 rounded-xl mb-8" />
      )}
      <p className="text-sm text-orange-700 font-medium">{fmtDate(event.startDate)}{event.location ? ` · ${event.location}` : ""}</p>
      <h1 className="mt-2 text-3xl font-serif text-slate-900" style={{ fontFamily: "var(--font-source-serif)" }}>{event.title}</h1>

      {event.summary && <p className="mt-4 text-lg text-slate-600">{event.summary}</p>}
      {event.description && (
        <div className="mt-6 text-slate-700 leading-relaxed whitespace-pre-wrap">{event.description}</div>
      )}

      {event.googleFormUrl && (
        <a
          href={event.googleFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 text-white text-sm font-medium px-6 py-3.5 hover:bg-slate-800 transition shadow-lg shadow-slate-900/10"
        >
          Register for this event
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </a>
      )}
    </Reveal>
  );
}
