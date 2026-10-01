"use client";

import Image from "@/components/Img";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Slide } from "@/lib/site";

const DURATION = 6500;

/** Home page hero — edit HERO_SLIDES in lib/content.ts. */
export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  useEffect(() => {
    if (paused || count < 2) return;
    const t = setTimeout(() => setI((n) => (n + 1) % count), DURATION);
    return () => clearTimeout(t);
  }, [i, paused, count]);

  if (count === 0) return null;
  const go = (n: number) => setI((n + count) % count);

  return (
    <section
      className={`hero${paused ? " is-paused" : ""}`}
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ "--hero-duration": `${DURATION}ms` } as React.CSSProperties}
    >
      {slides.map((s, n) => (
        <div key={s.id} className={`hero__slide${n === i ? " is-active" : ""}`} aria-hidden={n !== i}>
          <div className="hero__media">
            <Image src={s.image} alt={s.alt} fill priority={n === 0} sizes="(max-width: 860px) 100vw, 50vw" />
          </div>
          <div className="hero__content">
            <p className="hero__badge">{s.badge}</p>
            {s.showLogo ? (
              <h1 className="hero__brand">
                <Image src="/brand/logo-cream.png" alt="Kangan — since 2012" width={575} height={228} priority={n === 0} />
              </h1>
            ) : (
              <h1>
                {s.title}
                {s.subtitle && <em>{s.subtitle}</em>}
              </h1>
            )}
            <p className="hero__values">
              <span>Love</span><span>Fashion</span><span>Beauty</span><span>Passion</span>
            </p>
            <p className="hero__text">{s.text}</p>
            <div className="hero__actions">
              <Link href={s.link} className="btn btn--ghost" tabIndex={n === i ? 0 : -1}>{s.buttonLabel}</Link>
            </div>
          </div>
        </div>
      ))}

      {count > 1 && (
        <div className="hero__controls">
          <button className="hero__arrow" onClick={() => go(i - 1)} aria-label="Previous slide">←</button>
          <div className="hero__dots">
            {slides.map((s, n) => (
              <button
                key={s.id}
                className={n === i ? "is-active" : undefined}
                onClick={() => go(n)}
                aria-label={`Slide ${n + 1}`}
                aria-current={n === i}
              >
                <span />
              </button>
            ))}
          </div>
          <button className="hero__arrow" onClick={() => go(i + 1)} aria-label="Next slide">→</button>
        </div>
      )}
    </section>
  );
}
