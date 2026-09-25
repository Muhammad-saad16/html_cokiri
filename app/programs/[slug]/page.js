import { notFound } from "next/navigation";
import { getItem } from "@/lib/cms";
import Link from "next/link";
import { CalendarClock, Phone } from "lucide-react";
import { fmtDate } from "@/lib/format";
import Reveal from "@/components/motion/Reveal";
import FitImage from "@/components/FitImage";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const program = await getItem("programs", slug);
  if (!program) return {};
  return { title: program.title, description: program.description?.slice(0, 160) };
}

export default async function ProgramDetailPage({ params }) {
  const { slug } = await params;
  const program = await getItem("programs", slug);
  if (!program) notFound();

  return (
    <Reveal as="article" className="max-w-3xl mx-auto px-6 py-16">
      {program.coverImageUrl && (
        <FitImage src={program.coverImageUrl} alt={program.title} className="w-full h-80 rounded-2xl mb-8" />
      )}
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">{program.title}</h1>
      {program.schedule && (
        <p className="mt-4 flex items-start gap-2 rounded-xl bg-orange-50 px-4 py-3 text-sm font-medium text-orange-800">
          <CalendarClock size={16} className="mt-0.5 shrink-0" /> {program.schedule}
        </p>
      )}
      {(program.startDate || program.endDate) && (
        <p className="mt-2 text-sm text-orange-700 font-medium">
          {fmtDate(program.startDate)}{program.endDate ? ` – ${fmtDate(program.endDate)}` : ""}
        </p>
      )}
      {program.description && (
        <div className="mt-6 text-slate-700 leading-relaxed whitespace-pre-wrap">{program.description}</div>
      )}
      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-slate-900">Admissions & enquiries</p>
          <p className="text-sm text-slate-500">Call or WhatsApp us for the next batch, fees and timings.</p>
        </div>
        <div className="flex gap-3">
          <a href="https://wa.me/923362342386" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-orange-600 text-white text-sm font-medium px-5 py-2.5 hover:bg-orange-700 transition">
            <Phone size={14} /> WhatsApp
          </a>
          <Link href="/contact" className="inline-flex items-center rounded-full border border-slate-300 text-sm font-medium px-5 py-2.5 hover:border-slate-400 transition">
            Contact
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
