import ImageCarousel from "../components/ImageCarousel";

const campusSlides = [
  {
    src: "/Carousel/car1.jpg",
    alt: "City of Knowledge campus photo 1",
    caption: "Hazrat Pir Syed Lakht-e-Hasnain",
  },
  {
    src: "/Carousel/car2.jpg",
    alt: "City of Knowledge campus photo 2",
    caption: "Mufti Sher Muhammad Khan Sahib",
  },
  {
    src: "/Carousel/car3.jpg",
    alt: "City of Knowledge campus photo 3",
    caption: "Sheikh Muhammad Al-Khamis Suleiman Usman",
  },
  {
    src: "/Carousel/car4.jpg",
    alt: "City of Knowledge campus photo 4",
    caption: "Prof Imam Syed Badiuddin Soharwardy",
  },
  {
    src: "/Carousel/car5.jpg",
    alt: "City of Knowledge campus photo 5",
    caption: "Zainul Abidin Rasheed",
  },
  {
    src: "/Carousel/car6.jpg",
    alt: "City of Knowledge campus photo 6",
    caption: "Dr. Muhammad Eid Al-Mansour",
  },
];

interface CarouselSectionProps {
  compactTop?: boolean;
}

export default function CarouselSection({ compactTop = false }: CarouselSectionProps) {
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
