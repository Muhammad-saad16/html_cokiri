"use client";

import Image from "@/components/Img";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Testimonial } from "@/lib/site";

/** Customer reviews — one large quote at a time with a soft cross-fade. */
export default function Testimonials({ items }: { items: Testimonial[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;

  useEffect(() => {
    if (paused || count < 2) return;
    const t = setTimeout(() => setI((n) => (n + 1) % count), 6000);
    return () => clearTimeout(t);
  }, [i, paused, count]);

  if (count === 0) return null;

  return (
    <section className="section testimonials" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="container">
        <div className="section__head section__head--rule">
          <p className="eyebrow">Kind Words</p>
          <h2>What Our Customers Say</h2>
        </div>

        <div className="quotes" aria-live="polite">
          {items.map((t, n) => (
            <figure key={t.id} className={`quote-card${n === i ? " is-active" : ""}`} aria-hidden={n !== i}>
              <span className="quote-card__mark" aria-hidden="true">&ldquo;</span>
              <div className="quote-card__stars" aria-label={`${t.rating} out of 5 stars`}>
                {"★".repeat(t.rating)}
                <span>{"★".repeat(5 - t.rating)}</span>
              </div>
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                {t.photo && (
                  <span className="quote-card__photo">
                    <Image src={t.photo} alt="" fill sizes="56px" />
                  </span>
                )}
                <span>
                  <strong>{t.name}</strong>
                  {t.place && <small>{t.place}</small>}
                  {t.product && (
                    <Link href={t.product.href} tabIndex={n === i ? 0 : -1}>
                      Bought: {t.product.name}
                    </Link>
                  )}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {count > 1 && (
          <div className="quotes__dots">
            {items.map((t, n) => (
              <button
                key={t.id}
                className={n === i ? "is-active" : undefined}
                onClick={() => setI(n)}
                aria-label={`Review ${n + 1}`}
                aria-current={n === i}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
