import { notFound } from "next/navigation";
import { CalendarClock } from "lucide-react";
import { getItem } from "@/lib/cms";
import { fmtDate } from "@/lib/format";
import Reveal from "@/components/motion/Reveal";
import FitImage from "@/components/FitImage";
import { DetailHeader, Prose, EnquiryBox } from "@/components/Detail";

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
    <>
      <DetailHeader back={{ href: "/programs", label: "Programs" }} kicker="Academic Activity" title={program.title} />
      <section className="bg-coal pb-20">
        <Reveal as="article" className="mx-auto mt-12 max-w-4xl px-4 sm:px-6">
          {program.coverImageUrl && (
            <FitImage src={program.coverImageUrl} alt={program.title} className="h-72 w-full sm:h-[28rem]" />
          )}
          {program.schedule && (
            <p className="mt-8 flex items-start gap-3 border border-line bg-coal-3 px-5 py-4 font-medium text-ivory">
              <CalendarClock size={20} className="mt-0.5 shrink-0 text-gold" /> {program.schedule}
            </p>
          )}
          {(program.startDate || program.endDate) && (
            <p className="mt-3 text-sm font-medium text-gold">
              {fmtDate(program.startDate)}
              {program.endDate ? ` – ${fmtDate(program.endDate)}` : ""}
            </p>
          )}
          <Prose text={program.description} className="mt-8" />
          <EnquiryBox />
        </Reveal>
      </section>
    </>
  );
}
