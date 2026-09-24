"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const SLIDES = [
  {
    image: "/media/necklace-2.jpg",
    alt: "Woman wearing a Kangan gold necklace",
    eyebrow: "Since 2012 | Bahrain & Pakistan",
    title: "Discover Your Style.",
    em: "Express Your Elegance.",
    text: "Elegant jewellery, trending handbags, beautiful perfumes and premium watches — delivered to your door.",
    cta: { href: "/shop", label: "Shop Now" },
  },
  {
    image: "/media/earrings.jpg",
    alt: "Emerald kundan chandbali earrings",
    eyebrow: "Bridal & Festive",
    title: "Wear Your Statement.",
    em: "Kundan & Chandbali.",
    text: "Statement earrings and necklace sets made for weddings, Eid and every celebration.",
    cta: { href: "/collections/jewellery", label: "Shop Jewellery" },
  },
  {
    image: "/media/anklet.jpg",
    alt: "Kundan pearl payal anklets",
    eyebrow: "New In",
    title: "Wear Your Love.",
    em: "Payal, Bangles & More.",
    text: "Traditional pieces with a modern finish — the perfect final touch to your look.",
    cta: { href: "/products/kj-104", label: "Shop Payal" },
  },
];

export default function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((n) => (n + 1) % SLIDES.length), 6000);
    return () => clearTimeout(t);
  }, [i, paused]);

  const go = (n: number) => setI((n + SLIDES.length) % SLIDES.length);

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((s, n) => (
        <div key={s.image} className={`hero__slide${n === i ? " is-active" : ""}`} aria-hidden={n !== i}>
          <div className="hero__media">
            <Image src={s.image} alt={s.alt} fill priority={n === 0} sizes="100vw" />
          </div>
          <div className="container hero__content">
            <p className="eyebrow">{s.eyebrow}</p>
            <h1>
              {s.title}
              <br />
              <em>{s.em}</em>
            </h1>
            <p className="hero__text">{s.text}</p>
            <div className="hero__actions">
              <Link href={s.cta.href} className="btn btn--gold" tabIndex={n === i ? 0 : -1}>{s.cta.label}</Link>
              <Link href="/about" className="btn btn--ghost" tabIndex={n === i ? 0 : -1}>Our Story</Link>
            </div>
          </div>
        </div>
      ))}

      <button className="hero__arrow hero__arrow--prev" onClick={() => go(i - 1)} aria-label="Previous slide">‹</button>
      <button className="hero__arrow hero__arrow--next" onClick={() => go(i + 1)} aria-label="Next slide">›</button>
      <div className="hero__dots">
        {SLIDES.map((s, n) => (
          <button
            key={s.image}
            className={n === i ? "is-active" : undefined}
            onClick={() => go(n)}
            aria-label={`Slide ${n + 1}`}
            aria-current={n === i}
          />
        ))}
      </div>
    </section>
  );
}
