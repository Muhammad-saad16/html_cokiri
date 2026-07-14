export interface GalleryImage {
  src: string;
  alt: string;
}

export const galleryImages: GalleryImage[] = Array.from(
  { length: 15 },
  (_, i) => ({
    src: `/Gallery/Gall${i + 1}.jpg`,
    alt: `City of Knowledge gallery photo ${i + 1}`,
  })
);
