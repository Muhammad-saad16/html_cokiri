import { notFound } from "next/navigation";
import { getItem, getList } from "@/lib/cms";
import { categoryLabel, fmtDate } from "@/lib/format";
import Reveal from "@/components/motion/Reveal";
import { VideoCard } from "@/components/Cards";
import { DetailHeader, Prose } from "@/components/Detail";
import { SectionHeading } from "@/components/Ornaments";

function toEmbedUrl(url) {
  if (!url) return null;
  const id = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{6,})/)?.[1];
  return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0` : url;
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
  const related = (await getList("videos")).filter((v) => v.category === video.category && v.slug !== video.slug).slice(0, 3);

  return (
    <>
      <DetailHeader
        back={{ href: "/media", label: "Media" }}
        eyebrow={categoryLabel(video.category)}
        title={video.title}
        meta={[fmtDate(video.publishedAt), video.views && `${video.views} views`].filter(Boolean).join(" · ")}
      />
      <section className="pattern-ivory pb-20">
        <Reveal as="article" className="mx-auto -mt-6 max-w-5xl px-4 sm:px-6">
          {embedUrl && (
            <div className="aspect-video overflow-hidden rounded-2xl border-4 border-gold bg-navy-deep shadow-2xl">
              <iframe
                src={embedUrl}
                title={video.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
          <Prose text={video.description} className="mx-auto mt-8 max-w-3xl" />
        </Reveal>

        {related.length > 0 && (
          <div className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Keep Watching" title={`More ${categoryLabel(video.category)}`} />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((v) => (
                <VideoCard key={v.id} video={v} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
