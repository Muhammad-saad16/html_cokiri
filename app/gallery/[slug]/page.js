import { notFound } from "next/navigation";
import { getItem } from "@/lib/cms";
import { fmtDate } from "@/lib/format";
import Reveal from "@/components/motion/Reveal";
import Lightbox from "@/components/Lightbox";
import { DetailHeader } from "@/components/Detail";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const album = await getItem("gallery-albums", slug);
  if (!album) return {};
  return { title: album.title, description: album.description?.slice(0, 160) };
}

export default async function GalleryAlbumPage({ params }) {
  const { slug } = await params;
  const album = await getItem("gallery-albums", slug);
  if (!album) notFound();

  return (
    <>
      <DetailHeader
        back={{ href: "/gallery", label: "Gallery" }}
        kicker={`${album.images?.length || 0} photos`}
        title={album.title}
        meta={[fmtDate(album.date), album.location].filter(Boolean).join(" · ")}
      />
      <section className="bg-white pt-4 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {album.description && (
            <Reveal>
              <p className="mx-auto max-w-2xl text-center text-lg text-muted">{album.description}</p>
            </Reveal>
          )}
          {album.images?.length ? (
            <Lightbox images={album.images} fallbackAlt={album.title} />
          ) : (
            <p className="mt-8 text-center text-muted">No images in this album yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
