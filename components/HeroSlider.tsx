"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const DURATION = 6500;

type Slide = {
  image: string;
  alt: string;
  position?: string;
  /** Small offer / highlight label above the title */
  badge: string;
  /** Slide 1 shows the full Kangan wordmark instead of a headline. */
  brand?: boolean;
  title?: string;
  em?: string;
  text: string;
  cta: { href: string; label: string };
};

const SLIDES: Slide[] = [
  {
    image: "/media/bangle-model.jpg",
    alt: "Woman wearing Kangan crystal bangles and earrings",
    position: "center 30%",
    badge: "Serving you since 2012",
    brand: true,
    text: "Elegant jewellery, stylish bags, watches and premium fragrances — all in one place.",
    cta: { href: "/shop", label: "Shop Now" },
  },
  {
    image: "/media/necklace-3.jpg",
    alt: "Model wearing a Kangan gold necklace on an emerald outfit",
    position: "50% 40%",
    badge: "Bridal Season Offer",
    title: "Wear Your Statement",
    em: "Bridal & Festive Jewellery",
    text: "Kundan, zircon and 18K gold-plated pieces made for weddings, Eid and every celebration.",
    cta: { href: "/collections/jewellery", label: "Shop Jewellery" },
  },
  {
    image: "/media/bag-green.jpg",
    alt: "Kangan emerald structured tote",
    position: "center 45%",
    badge: "New Arrivals",
    title: "Carry Your Style",
    em: "The Emerald Handbag Edit",
    text: "Structured totes and top-handle bags — polished for the office, elegant for evenings.",
    cta: { href: "/collections/handbags", label: "Shop Handbags" },
  },
  {
    image: "/media/perfume-2.jpg",
    alt: "Kangan 12 AM Eau de Parfum",
    position: "center 40%",
    badge: "Signature Scent",
    title: "Elegance in Every Drop",
    em: "Kangan 12 AM",
    text: "Our signature midnight fragrance — warm, sophisticated and unforgettable.",
    cta: { href: "/products/kp-301", label: "Discover 12 AM" },
  },
];

export default function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((n) => (n + 1) % SLIDES.length), DURATION);
    return () => clearTimeout(t);
  }, [i, paused]);

  const go = (n: number) => setI((n + SLIDES.length) % SLIDES.length);

  return (
    <section
      className={`hero${paused ? " is-paused" : ""}`}
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ "--hero-duration": `${DURATION}ms` } as React.CSSProperties}
    >
      {SLIDES.map((s, n) => (
        <div key={s.image} className={`hero__slide${n === i ? " is-active" : ""}`} aria-hidden={n !== i}>
          <div className="hero__media">
            <Image
              src={s.image}
              alt={s.alt}
              fill
              priority={n === 0}
              sizes="(max-width: 860px) 100vw, 50vw"
              style={{ objectPosition: s.position }}
            />
          </div>
          <div className="hero__content">
            <p className="hero__badge">{s.badge}</p>
            {s.brand ? (
              <h1 className="hero__brand">
                <Image src="/brand/logo-cream.png" alt="Kangan — since 2012" width={575} height={228} priority={n === 0} />
              </h1>
            ) : (
              <h1>
                {s.title}
                <em>{s.em}</em>
              </h1>
            )}
            <p className="hero__values">
              <span>Love</span><span>Fashion</span><span>Beauty</span><span>Passion</span>
            </p>
            <p className="hero__text">{s.text}</p>
            <div className="hero__actions">
              <Link href={s.cta.href} className="btn btn--ghost" tabIndex={n === i ? 0 : -1}>{s.cta.label}</Link>
            </div>
          </div>
        </div>
      ))}

      <div className="hero__controls">
        <button className="hero__arrow" onClick={() => go(i - 1)} aria-label="Previous slide">←</button>
        <div className="hero__dots">
          {SLIDES.map((s, n) => (
            <button
              key={s.image}
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
    </section>
  );
}
