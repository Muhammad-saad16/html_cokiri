"use client";

import { useEffect, useRef, useState } from "react";
import type { StatsBlock } from "@/lib/site";

const ICONS: Record<string, React.ReactNode> = {
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />,
  bag: (
    <>
      <path d="M5 8h14l-1.2 12H6.2L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6-5.6-6-11a6 6 0 0 1 12 0c0 5.4-6 11-6 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </>
  ),
  star: <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5Z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l2.5 2" />
    </>
  ),
};

/** One number that counts up from 0 the first time it scrolls into view. */
function CountUp({ value, start }: { value: number; start: boolean }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return;
    }
    const duration = 2200;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setN(Math.round(value * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value]);

  return <>{n.toLocaleString("en-US")}</>;
}

export default function StatsBand({ stats }: { stats: StatsBlock }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!stats.show || stats.items.length === 0) return null;

  return (
    <section ref={ref} className={`stats${visible ? " is-visible" : ""}`}>
      <div className="container">
        {stats.heading && <h2 className="stats__heading">{stats.heading}</h2>}
        <ul className="stats__grid">
          {stats.items.map((s, i) => (
            <li key={s.label} style={{ "--i": i } as React.CSSProperties}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" aria-hidden="true">
                {ICONS[s.icon] ?? ICONS.heart}
              </svg>
              <strong>
                <CountUp value={s.value} start={visible} />
                {s.suffix}
              </strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
