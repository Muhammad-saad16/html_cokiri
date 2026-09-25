import { notFound } from "next/navigation";
import { getItem } from "@/lib/cms";
import { fmtDate } from "@/lib/format";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import FitImage from "@/components/FitImage";

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
    <article className="max-w-5xl mx-auto px-6 py-16">
      <Reveal>
        <p className="text-sm text-orange-700 font-medium">
          {[fmtDate(album.date), album.location].filter(Boolean).join(" · ")}
        </p>
        <h1 className="mt-2 text-3xl font-serif text-slate-900" style={{ fontFamily: "var(--font-source-serif)" }}>{album.title}</h1>
        {album.description && <p className="mt-4 text-slate-600 max-w-2xl">{album.description}</p>}
      </Reveal>

      <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {(album.images || []).map((img) => (
          <StaggerItem key={img.id}>
            <figure className="h-full">
              <a href={img.url} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl">
                <FitImage src={img.url} alt={img.altText || album.title} className="w-full h-56" imgClassName="hover:scale-105 transition-transform duration-500" />
              </a>
              {img.caption && <figcaption className="mt-2 text-xs text-slate-600 leading-snug">{img.caption}</figcaption>}
            </figure>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {(!album.images || album.images.length === 0) && (
        <p className="mt-8 text-slate-500">No images in this album yet.</p>
      )}
    </article>
  );
}
