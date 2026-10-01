"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { OFFERS } from "@/lib/site";

/** Compact auto-playing strip of current offers (edit them in lib/site.ts → OFFERS). */
export default function OffersSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || OFFERS.length < 2) return;
    const t = setTimeout(() => setI((n) => (n + 1) % OFFERS.length), 5000);
    return () => clearTimeout(t);
  }, [i, paused]);

  if (OFFERS.length === 0) return null;
  const go = (n: number) => setI((n + OFFERS.length) % OFFERS.length);

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
            {OFFERS.map((o, n) => (
              <Link
                key={o.title}
                href={o.href}
                className={`offer${n === i ? " is-active" : ""}`}
                aria-hidden={n !== i}
                tabIndex={n === i ? 0 : -1}
              >
                <span className="offer__body">
                  <span className="offer__badge">{o.badge}</span>
                  <span className="offer__title">{o.title}</span>
                  <span className="offer__text">{o.text}</span>
                  <span className="offer__cta">{o.cta} →</span>
                </span>
                <span className="offer__media">
                  <Image src={o.image} alt="" fill sizes="(max-width: 860px) 100vw, 520px" />
                </span>
              </Link>
            ))}
          </div>

          {OFFERS.length > 1 && (
            <div className="offers__nav">
              <button onClick={() => go(i - 1)} aria-label="Previous offer">←</button>
              {OFFERS.map((o, n) => (
                <button
                  key={o.title}
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
