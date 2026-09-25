import { categoryLabel } from "@/lib/format";
import { notFound } from "next/navigation";
import { getItem } from "@/lib/cms";
import Reveal from "@/components/motion/Reveal";

function toEmbedUrl(url) {
  if (!url) return null;
  const idMatch = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{6,})/);
  const id = idMatch?.[1];
  return id ? `https://www.youtube.com/embed/${id}` : url;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const video = await getItem("videos", slug);
  if (!video) return {};
  return { title: video.title, description: video.description?.slice(0, 160) };
}

export default async function MediaDetailPage({ params }) {
  const { slug } = await params;
  const video = await getItem("videos", slug);
  if (!video) notFound();

  const embedUrl = toEmbedUrl(video.youtubeUrl);

  return (
    <Reveal as="article" className="max-w-3xl mx-auto px-6 py-16">
      <p className="text-xs uppercase tracking-wide text-orange-700 font-medium">{categoryLabel(video.category)}</p>
      <h1 className="mt-2 text-3xl font-serif text-slate-900" style={{ fontFamily: "var(--font-source-serif)" }}>{video.title}</h1>

      {embedUrl && (
        <div className="mt-6 aspect-video rounded-xl overflow-hidden bg-slate-900 shadow-lg">
          <iframe
            src={embedUrl}
            title={video.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {video.description && (
        <div className="mt-6 text-slate-700 leading-relaxed whitespace-pre-wrap">{video.description}</div>
      )}
    </Reveal>
  );
}
