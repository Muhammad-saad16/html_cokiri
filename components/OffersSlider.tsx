"use client";

import Image from "@/components/Img";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Offer } from "@/lib/site";

/** Compact auto-playing strip of current offers (admin panel → Home Page → Offers). */
export default function OffersSlider({ offers }: { offers: Offer[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = offers.length;

  useEffect(() => {
    if (paused || count < 2) return;
    const t = setTimeout(() => setI((n) => (n + 1) % count), 5000);
    return () => clearTimeout(t);
  }, [i, paused, count]);

  if (count === 0) return null;
  const go = (n: number) => setI((n + count) % count);

  return (
    <section className="offers-wrap">
      <div className="container">
        <div
          className="offers"
          aria-roledescription="carousel"
          aria-label="Current offers"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="offers__track" style={{ transform: `translateX(-${i * 100}%)` }}>
            {offers.map((o, n) => (
              <Link
                key={o.id}
                href={o.link}
                className={`offer${n === i ? " is-active" : ""}`}
                aria-hidden={n !== i}
                tabIndex={n === i ? 0 : -1}
              >
                <span className="offer__body">
                  <span className="offer__badge">{o.badge}</span>
                  <span className="offer__title">{o.title}</span>
                  {o.text && <span className="offer__text">{o.text}</span>}
                  <span className="offer__cta">{o.buttonLabel} →</span>
                </span>
                <span className="offer__media">
                  <Image src={o.image} alt="" fill sizes="(max-width: 860px) 100vw, 520px" />
                </span>
              </Link>
            ))}
          </div>

          {count > 1 && (
            <div className="offers__nav">
              <button onClick={() => go(i - 1)} aria-label="Previous offer">←</button>
              {offers.map((o, n) => (
                <button
                  key={o.id}
                  className={`offers__dot${n === i ? " is-active" : ""}`}
                  onClick={() => go(n)}
                  aria-label={`Offer ${n + 1}`}
                  aria-current={n === i}
                />
              ))}
              <button onClick={() => go(i + 1)} aria-label="Next offer">→</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
