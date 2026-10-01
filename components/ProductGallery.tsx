"use client";

import Image from "@/components/Img";
import { useState } from "react";

type Slide = { type: "image"; src: string } | { type: "video"; src: string };

export default function ProductGallery({ images, video, name }: { images: string[]; video?: string; name: string }) {
  const slides: Slide[] = [
    ...images.map((src) => ({ type: "image" as const, src })),
    ...(video ? [{ type: "video" as const, src: video }] : []),
  ];
  const [active, setActive] = useState(0);
  const current = slides[active];

  return (
    <div className="gallery">
      <div className="gallery__main">
        {current.type === "image" ? (
          <Image src={current.src} alt={name} fill priority sizes="(max-width: 860px) 100vw, 600px" />
        ) : (
          <video key={current.src} src={current.src} autoPlay muted loop playsInline controls />
        )}
      </div>
      {slides.length > 1 && (
        <div className="gallery__thumbs">
          {slides.map((s, i) => (
            <button
              key={s.src}
              className={i === active ? "is-active" : undefined}
              onClick={() => setActive(i)}
              aria-label={s.type === "video" ? "Play video" : `View image ${i + 1}`}
            >
              {s.type === "image" ? (
                <Image src={s.src} alt="" fill sizes="90px" />
              ) : (
                <span className="gallery__play">▶<small>Video</small></span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
