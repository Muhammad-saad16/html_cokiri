import Image from "next/image";
import { GalleryImage } from "../data/gallery";

interface GalleryGridProps {
  images: GalleryImage[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-5">
      {images.map((image) => (
        <figure
          key={image.src}
          className="group overflow-hidden rounded-lg border border-outline-variant/40 bg-surface-container-low shadow-sm transition-shadow duration-200 hover:shadow-[0_8px_24px_-10px_rgba(31,41,55,0.15)]"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-research-grey">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          </div>
        </figure>
      ))}
    </div>
  );
}
