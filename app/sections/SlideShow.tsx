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

export default function SlideShow() {
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
      aria-label="Image slideshow"
      aria-roledescription="carousel"
      className="bg-manuscript-tint py-12 md:py-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-20">
        <div className="relative overflow-hidden rounded-lg bg-surface-container-low">
          {/* Slides track */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.src}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1} of ${slides.length}`}
                aria-hidden={index !== current}
                className="w-full flex-shrink-0"
              >
                <div className="relative aspect-[16/9] w-full bg-research-grey">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-contain"
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 1280px"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Previous button */}
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded bg-paper-white/90 text-on-surface shadow-sm transition-colors duration-200 hover:bg-paper-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange focus-visible:ring-offset-2 focus-visible:ring-offset-manuscript-tint md:left-5"
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
            className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded bg-paper-white/90 text-on-surface shadow-sm transition-colors duration-200 hover:bg-paper-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange focus-visible:ring-offset-2 focus-visible:ring-offset-manuscript-tint md:right-5"
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
            className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2"
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
                className={`h-2.5 w-2.5 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange focus-visible:ring-offset-2 focus-visible:ring-offset-manuscript-tint md:h-3 md:w-3 ${
                  index === current
                    ? "bg-heritage-orange"
                    : "bg-paper-white/80 hover:bg-paper-white"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
