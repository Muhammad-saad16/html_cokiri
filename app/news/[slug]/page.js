import { notFound } from "next/navigation";
import { getItem } from "@/lib/cms";
import { fmtDate } from "@/lib/format";
import Reveal from "@/components/motion/Reveal";
import FitImage from "@/components/FitImage";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getItem("news", slug);
  if (!post) return {};
  return { title: post.title, description: post.summary?.slice(0, 160) };
}

export default async function NewsDetailPage({ params }) {
  const { slug } = await params;
  const post = await getItem("news", slug);
  if (!post) notFound();

  return (
    <Reveal as="article" className="max-w-3xl mx-auto px-6 py-16">
      {post.coverImageUrl && (
        <FitImage src={post.coverImageUrl} alt={post.title} className="w-full h-72 rounded-xl mb-8" />
      )}
      <p className="text-sm text-orange-700 font-medium">{fmtDate(post.publishedAt || post.createdAt)}</p>
      <h1 className="mt-2 text-3xl font-serif text-slate-900" style={{ fontFamily: "var(--font-source-serif)" }}>{post.title}</h1>
      {post.content && (
        <div className="mt-6 text-slate-700 leading-relaxed whitespace-pre-wrap">{post.content}</div>
      )}
    </Reveal>
  );
}
