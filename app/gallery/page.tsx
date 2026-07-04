import { Metadata } from "next";
import GalleryGrid from "../components/GalleryGrid";
import { galleryImages } from "../data/gallery";

export const metadata: Metadata = {
  title: "Gallery | City of Knowledge",
  description:
    "Browse images from City of Knowledge Islamic Research Institute — campus, events, programs, and community gatherings.",
};

export default function GalleryPage() {
  return (
    <main className="flex flex-col bg-paper-white">
      {/* Page Header */}
      <section className="pt-10 pb-8 md:pt-14 md:pb-10">
        <div className="mx-auto max-w-[1280px] px-5 text-center md:px-20">
          <span className="mb-4 inline-block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
            Gallery
          </span>
          <h1 className="font-serif text-[28px] font-semibold leading-9 text-on-surface md:text-[48px] md:font-bold md:leading-[56px]">
            Moments from the Institute
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-6 text-on-surface-variant md:text-lg md:leading-7">
            A visual journey through our campus, events, programs, and community
            gatherings.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-20">
          <GalleryGrid images={galleryImages} />
        </div>
      </section>
    </main>
  );
}
