import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import { getItem } from "@/lib/cms";
import Reveal from "@/components/motion/Reveal";
import FitImage from "@/components/FitImage";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const pub = await getItem("publications", slug);
  if (!pub) return {};
  return { title: pub.title, description: pub.summary?.slice(0, 160) };
}

export default async function ResearchDetailPage({ params }) {
  const { slug } = await params;
  const pub = await getItem("publications", slug);
  if (!pub) notFound();

  return (
    <Reveal as="article" className="max-w-3xl mx-auto px-6 py-16">
      {pub.coverImageUrl && (
        <FitImage src={pub.coverImageUrl} alt={pub.title} className="w-full h-72 rounded-xl mb-8" />
      )}
      <p className="text-xs uppercase tracking-wide text-orange-700 font-medium">{pub.type?.replace("_", " ")}</p>
      <h1 className="mt-2 text-3xl font-serif text-slate-900" style={{ fontFamily: "var(--font-source-serif)" }}>{pub.title}</h1>
      {pub.summary && <p className="mt-4 text-lg text-slate-600">{pub.summary}</p>}
      {pub.content && (
        <div className="mt-6 text-slate-700 leading-relaxed whitespace-pre-wrap">{pub.content}</div>
      )}
      {pub.fileUrl && (
        <a
          href={pub.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 text-white text-sm font-medium px-6 py-3.5 hover:bg-slate-800 transition shadow-lg shadow-slate-900/10"
        >
          <Download size={15} /> Download
        </a>
      )}
    </Reveal>
  );
}
