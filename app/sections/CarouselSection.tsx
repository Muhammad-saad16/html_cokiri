import ImageCarousel from "../components/ImageCarousel";
import { getCarouselSlides } from "../../sanity/lib/queries";
import { urlFor } from "../../sanity/lib/image";

interface CarouselSectionProps {
  compactTop?: boolean;
}

export default async function CarouselSection({ compactTop = false }: CarouselSectionProps) {
  const campusSlides = (await getCarouselSlides()).map((slide) => ({
    src: urlFor(slide.image).width(800).height(600).url(),
    alt: slide.alt,
    caption: slide.caption,
  }));

  return (
    <section
      className={`pb-16 md:pb-24 ${
        compactTop ? "pt-0" : "pt-16 md:pt-24"
      }`}
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-20">
        {/* Header */}
        <div className="mb-10 text-center md:mb-12">
          <span className="mb-4 inline-block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
            Our Visits
          </span>
          <h2 className="font-serif text-[28px] font-semibold leading-9 text-on-surface md:text-[40px] md:leading-[48px]">
            Interactions with Personalities
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-6 text-on-surface-variant md:text-lg md:leading-7">
            Moments from visits and meetings with scholars, leaders, and
            personalities who have graced City of Knowledge.
          </p>
        </div>

        {/* Campus & Community Carousel */}
        <ImageCarousel slides={campusSlides} />
      </div>
    </section>
  );
}
