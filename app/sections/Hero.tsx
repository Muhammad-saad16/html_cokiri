"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

const slides = [
  { src: "/founder.png", alt: "Institute founder" },
  { src: "/institute.png", alt: "Institute building" },
  { src: "/image.png", alt: "Institute activity" },
  { src: "/events/image1.png", alt: "Event image 1" },
  { src: "/events/image2.png", alt: "Event image 2" },
  { src: "/events/image3.png", alt: "Event image 3" },
  { src: "/events/image4.png", alt: "Event image 4" },
  { src: "/events/image5.png", alt: "Event image 5" },
  { src: "/events/image6.png", alt: "Event image 6" },
];

const AUTOPLAY_DELAY = 5000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setCurrent((index + slides.length) % slides.length);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(goToNext, AUTOPLAY_DELAY);
    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext]);

  return (
    <section
      aria-label="Hero banner"
      aria-roledescription="carousel"
      className="relative min-h-[420px] overflow-hidden md:min-h-[560px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background slides */}
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${slides.length}`}
            aria-hidden={index !== current}
            className="relative h-full w-full flex-shrink-0"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-research-grey/75" />

      {/* Text content */}
      <div className="relative z-10 flex h-full min-h-[420px] items-center justify-center px-5 py-20 md:min-h-[560px]">
        <div className="mx-auto max-w-[1280px] text-center">
          <span className="mb-4 inline-block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
            City of Knowledge
          </span>
          <h1 className="mx-auto max-w-3xl font-serif text-[28px] font-semibold leading-9 text-paper-white md:text-[48px] md:font-bold md:leading-[56px]">
            Authentic, scholarly Islamic education and research
          </h1>
        </div>
      </div>

      {/* Previous button */}
      <button
        type="button"
        onClick={goToPrevious}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded bg-paper-white/90 text-on-surface shadow-sm transition-colors duration-200 hover:bg-paper-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange focus-visible:ring-offset-2 focus-visible:ring-offset-research-grey md:left-5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      {/* Next button */}
      <button
        type="button"
        onClick={goToNext}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded bg-paper-white/90 text-on-surface shadow-sm transition-colors duration-200 hover:bg-paper-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange focus-visible:ring-offset-2 focus-visible:ring-offset-research-grey md:right-5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div
        className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2"
        role="tablist"
        aria-label="Slide indicators"
      >
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={index === current}
            onClick={() => goTo(index)}
            className={`h-2.5 w-2.5 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange focus-visible:ring-offset-2 focus-visible:ring-offset-research-grey md:h-3 md:w-3 ${
              index === current
                ? "bg-heritage-orange"
                : "bg-paper-white/80 hover:bg-paper-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
