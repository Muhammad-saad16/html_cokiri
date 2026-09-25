import { getList } from "@/lib/cms";
import { GalleryCard } from "@/components/Cards";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export const metadata = { title: "Gallery" };

export default async function GalleryPage() {
  const albums = await getList("gallery-albums");

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <Reveal>
        <h1 className="text-3xl font-serif text-slate-900" style={{ fontFamily: "var(--font-source-serif)" }}>Gallery</h1>
        <p className="mt-3 text-slate-600 max-w-2xl">Programs, events and institutional activities.</p>
      </Reveal>

      <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {albums.map((a) => <StaggerItem key={a.id}><GalleryCard album={a} /></StaggerItem>)}
      </StaggerGroup>

      {albums.length === 0 && <p className="mt-8 text-slate-500">No albums yet.</p>}
    </div>
  );
}
