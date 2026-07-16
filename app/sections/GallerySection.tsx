import GalleryGrid, { GalleryGridImage } from "../components/GalleryGrid";
import { getGalleryImages } from "../../sanity/lib/queries";
import { urlFor } from "../../sanity/lib/image";

interface GallerySectionProps {
  images?: GalleryGridImage[];
  eyebrow?: string;
  heading?: string;
  description?: string;
}

export default async function GallerySection({
  images,
  eyebrow = "Moments from the Institute",
  heading = "Gallery",
  description = "A glimpse into our campus, events, programs, and community gatherings.",
}: GallerySectionProps) {
  const galleryImages =
    images ??
    (await getGalleryImages()).map((g) => ({
      src: urlFor(g.image).width(600).height(450).url(),
      alt: g.alt,
    }));

  return (
    <section className="bg-paper-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-20">
        {/* Header */}
        <div className="mb-10 text-center md:mb-12">
          <span className="mb-4 inline-block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
            {eyebrow}
          </span>
          <h2 className="font-serif text-[28px] font-semibold leading-9 text-on-surface md:text-[40px] md:leading-[48px]">
            {heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-6 text-on-surface-variant md:text-lg md:leading-7">
            {description}
          </p>
        </div>

        <GalleryGrid images={galleryImages} />
      </div>
    </section>
  );
}
