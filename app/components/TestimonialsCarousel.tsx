"use client";

import { useCallback, useEffect, useState } from "react";
import TestimonialCard from "./TestimonialCard";
import type { Testimonial } from "../data/testimonials";

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  autoplayDelay?: number;
}

function useItemsPerView() {
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const mdQuery = window.matchMedia("(min-width: 768px)");
    const lgQuery = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      setItemsPerView(lgQuery.matches ? 3 : mdQuery.matches ? 2 : 1);
    };

    update();
    mdQuery.addEventListener("change", update);
    lgQuery.addEventListener("change", update);
    return () => {
      mdQuery.removeEventListener("change", update);
      lgQuery.removeEventListener("change", update);
    };
  }, []);

  return itemsPerView;
}

export default function TestimonialsCarousel({
  testimonials,
  autoplayDelay = 6000,
}: TestimonialsCarouselProps) {
  const itemsPerView = useItemsPerView();
  const pageCount = Math.ceil(testimonials.length / itemsPerView);
  const [page, setPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setPage((prev) => Math.min(prev, pageCount - 1));
  }, [pageCount]);

  const goTo = useCallback(
    (index: number) => setPage((index + pageCount) % pageCount),
    [pageCount],
  );

  const goToPrevious = useCallback(() => {
    setPage((prev) => (prev - 1 + pageCount) % pageCount);
  }, [pageCount]);

  const goToNext = useCallback(() => {
    setPage((prev) => (prev + 1) % pageCount);
  }, [pageCount]);

  useEffect(() => {
    if (isPaused || pageCount <= 1) return;

    const interval = setInterval(goToNext, autoplayDelay);
    return () => clearInterval(interval);
  }, [isPaused, goToNext, autoplayDelay, pageCount]);

  return (
    <div
      role="region"
      aria-label="Testimonials"
      aria-roledescription="carousel"
      className="group relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {Array.from({ length: pageCount }).map((_, pageIndex) => {
            const pageItems = testimonials.slice(
              pageIndex * itemsPerView,
              pageIndex * itemsPerView + itemsPerView,
            );

            return (
              <div
                key={pageIndex}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${pageIndex + 1} of ${pageCount}`}
                aria-hidden={pageIndex !== page}
                className="flex w-full flex-shrink-0 gap-6"
              >
                {pageItems.map((testimonial, itemIndex) => {
                  const absoluteIndex = pageIndex * itemsPerView + itemIndex;
                  return (
                    <div
                      key={absoluteIndex}
                      style={{
                        width: `calc((100% - ${(itemsPerView - 1) * 24}px) / ${itemsPerView})`,
                      }}
                      className="flex-shrink-0"
                    >
                      <TestimonialCard {...testimonial} />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {pageCount > 1 && (
        <>
          {/* Previous button */}
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Previous testimonials"
            className="absolute left-0 top-1/2 inline-flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper-white text-on-surface opacity-0 shadow-md transition-opacity duration-200 hover:bg-surface-container-low focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange focus-visible:ring-offset-2 group-hover:opacity-100 md:h-12 md:w-12"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
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
            aria-label="Next testimonials"
            className="absolute right-0 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-paper-white text-on-surface opacity-0 shadow-md transition-opacity duration-200 hover:bg-surface-container-low focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange focus-visible:ring-offset-2 group-hover:opacity-100 md:h-12 md:w-12"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
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
            className="mt-8 flex justify-center gap-2"
            role="tablist"
            aria-label="Testimonial slide indicators"
          >
            {Array.from({ length: pageCount }).map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-label={`Go to slide ${index + 1}`}
                aria-selected={index === page}
                onClick={() => goTo(index)}
                className={`h-2 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange focus-visible:ring-offset-2 ${
                  index === page
                    ? "w-6 bg-heritage-orange"
                    : "w-2 bg-outline-variant hover:bg-outline"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
