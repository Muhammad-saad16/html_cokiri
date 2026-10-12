"use client";

import Image from "@/components/Img";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Slide } from "@/lib/site";

const DURATION = 6500;
/** Video slides move on when the video ends, but never stay longer than this. */
const MAX_VIDEO_DURATION = 30000;

/** Home page hero — edit in /admin → Home Page → Hero Slider. */
export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [videoMs, setVideoMs] = useState<Record<number, number>>({});
  // Browsers only allow videos to start on their own when muted — the visitor turns the sound on.
  const [soundOn, setSoundOn] = useState(false);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const count = slides.length;
  const active = slides[i];
  const duration = active?.video ? Math.min(videoMs[i] ?? DURATION, MAX_VIDEO_DURATION) : DURATION;

  useEffect(() => {
    if (paused || count < 2) return;
    const t = setTimeout(() => setI((n) => (n + 1) % count), duration);
    return () => clearTimeout(t);
  }, [i, paused, count, duration]);

  // Only the visible slide's video plays, from the start each time it comes back.
  // A single video slide just keeps looping, even while the mouse is over it.
  useEffect(() => {
    videos.current.forEach((v, n) => {
      if (!v) return;
      if (n === i && (!paused || count === 1)) {
        if (v.dataset.slide !== String(i) || v.ended) v.currentTime = 0;
        v.dataset.slide = String(i);
        v.play().catch(() => {});
      } else {
        v.pause();
        if (n !== i) delete v.dataset.slide;
      }
    });
  }, [i, paused, count]);

  useEffect(() => {
    videos.current.forEach((v) => {
      if (v) v.muted = !soundOn;
    });
  }, [soundOn]);

  if (count === 0) return null;
  const go = (n: number) => setI((n + count) % count);

  return (
    <section
      className={`hero${paused ? " is-paused" : ""}`}
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ "--hero-duration": `${duration}ms` } as React.CSSProperties}
    >
      {slides.map((s, n) => (
        <div
          key={s.id}
          className={`hero__slide${n === i ? " is-active" : ""}${s.video ? " hero__slide--video" : ""}`}
          aria-hidden={n !== i}
        >
          <div className="hero__media">
            {s.video ? (
              <video
                ref={(el) => {
                  videos.current[n] = el;
                }}
                src={s.video}
                poster={s.image || undefined}
                muted
                loop={count === 1}
                playsInline
                preload={n === 0 ? "auto" : "metadata"}
                aria-label={s.alt}
                onLoadedMetadata={(e) => {
                  const ms = Math.round(e.currentTarget.duration * 1000);
                  if (ms > 0) setVideoMs((m) => ({ ...m, [n]: ms }));
                }}
              />
            ) : (
              <Image src={s.image} alt={s.alt} fill priority={n === 0} sizes="(max-width: 860px) 100vw, 50vw" />
            )}
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
              <Link href={s.link} className="btn btn--ghost" tabIndex={n === i && !s.video ? 0 : -1}>{s.buttonLabel}</Link>
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
      {active?.video && (
        <button
          type="button"
          className="hero__sound"
          onClick={() => setSoundOn((on) => !on)}
          aria-pressed={soundOn}
          aria-label={soundOn ? "Mute video" : "Play video with sound"}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
            <path d="M4 9h4l5-4v14l-5-4H4Z" />
            {soundOn ? (
              <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />
            ) : (
              <path d="m17 9.5 5 5m0-5-5 5" />
            )}
          </svg>
          <span>{soundOn ? "Sound on" : "Tap for sound"}</span>
        </button>
      )}
    </section>
  );
}
