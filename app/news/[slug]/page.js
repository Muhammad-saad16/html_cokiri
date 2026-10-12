import { notFound } from "next/navigation";
import { getItem } from "@/lib/cms";
import { fmtDate } from "@/lib/format";
import Reveal from "@/components/motion/Reveal";
import FitImage from "@/components/FitImage";
import { DetailHeader, Prose } from "@/components/Detail";

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
    <>
      <DetailHeader back={{ href: "/news", label: "News" }} eyebrow={fmtDate(post.publishedAt || post.createdAt)} title={post.title} />
      <section className="pattern-ivory pb-20">
        <Reveal as="article" className="mx-auto -mt-6 max-w-3xl px-4 sm:px-6">
          {post.coverImageUrl && (
            <FitImage src={post.coverImageUrl} alt={post.title} className="h-72 w-full rounded-2xl border-4 border-white shadow-xl sm:h-96" />
          )}
          {post.summary && <Prose text={post.summary} className="mt-8 font-serif !text-2xl text-navy" />}
          <Prose text={post.content} className="mt-6" />
        </Reveal>
      </section>
    </>
  );
}
