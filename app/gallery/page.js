import { getList } from "@/lib/cms";
import { GalleryCard } from "@/components/Cards";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { PageHero } from "@/components/Ornaments";

export const metadata = { title: "Gallery" };

export default async function GalleryPage() {
  const albums = await getList("gallery-albums");

  return (
    <>
      <PageHero arabic="مَعْرِضُ الصُّوَر" title="Gallery" subtitle="Programs, events and institutional activities." />
      <section className="pattern-ivory py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerGroup className="grid gap-6 md:grid-cols-2">
            {albums.map((a) => (
              <StaggerItem key={a.id}>
                <GalleryCard album={a} />
              </StaggerItem>
            ))}
          </StaggerGroup>
          {albums.length === 0 && <p className="text-center text-muted">No albums yet.</p>}
        </div>
      </section>
    </>
  );
}
