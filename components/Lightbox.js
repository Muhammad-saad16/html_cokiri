"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/** Masonry photo grid with a keyboard-navigable full-screen viewer. */
export default function Lightbox({ images, fallbackAlt = "" }) {
  const [index, setIndex] = useState(null);
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback((d) => setIndex((i) => (i === null ? i : (i + d + images.length) % images.length)), [images.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  const current = index !== null ? images[index] : null;

  return (
    <>
      <div className="mt-10 columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
        {images.map((img, i) => (
          <button
            key={img.id || img.url}
            onClick={() => setIndex(i)}
            className="group mb-3 block w-full break-inside-avoid overflow-hidden border border-line bg-sand shadow-sm transition hover:border-gold hover:shadow-lg sm:mb-4"
            aria-label={`Open photo ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.url} alt={img.altText || fallbackAlt} loading="lazy" className="h-auto w-full transition duration-500 group-hover:scale-[1.03]" />
            {img.caption && <span className="block px-3 py-2 text-left text-xs leading-snug text-muted">{img.caption}</span>}
          </button>
        ))}
      </div>

      {current && (
        <div role="dialog" aria-modal="true" aria-label={current.altText || fallbackAlt} className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4" onClick={close}>
          <button onClick={close} className="absolute top-4 right-4 grid h-11 w-11 place-items-center border border-line text-white hover:bg-gold hover:text-ink" aria-label="Close">
            <X size={22} />
          </button>
          <div className="relative flex max-w-6xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current.url} alt={current.altText || fallbackAlt} className="max-h-[80vh] w-auto border border-white/20 object-contain shadow-2xl" />
            <p className="mt-4 text-center text-sm text-white/75">
              {current.caption && <span className="mr-2 text-white">{current.caption}</span>}
              {index + 1} / {images.length}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-2 grid h-12 w-12 place-items-center bg-ink/80 text-gold hover:bg-gold hover:text-ink sm:left-6"
            aria-label="Previous photo"
          >
            <ChevronLeft size={26} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-2 grid h-12 w-12 place-items-center bg-ink/80 text-gold hover:bg-gold hover:text-ink sm:right-6"
            aria-label="Next photo"
          >
            <ChevronRight size={26} />
          </button>
        </div>
      )}
    </>
  );
}
