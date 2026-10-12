import Reveal from "./motion/Reveal";

/** Gold line — floral knot — line. */
export function Ornament({ className = "", light = false }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${light ? "text-gold-light" : "text-gold"} ${className}`} aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-current sm:w-28" />
      <svg viewBox="0 0 48 16" className="h-4 w-12" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M24 2l4 6-4 6-4-6 4-6Z" fill="currentColor" fillOpacity=".25" />
        <path d="M20 8c-3-4-7-4-9-1.5S12 11 15 9.5M28 8c3-4 7-4 9-1.5S36 11 33 9.5" />
        <circle cx="4" cy="8" r="1.2" fill="currentColor" />
        <circle cx="44" cy="8" r="1.2" fill="currentColor" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-current sm:w-28" />
    </div>
  );
}

export function SectionHeading({ eyebrow, title, children, dark = false, align = "center", className = "" }) {
  const left = align === "left";
  return (
    <Reveal className={`${left ? "" : "mx-auto text-center"} max-w-3xl ${className}`}>
      <div
        className={`flex items-center gap-3 text-xs font-semibold tracking-[0.3em] uppercase ${left ? "" : "justify-center"} ${
          dark ? "text-gold-light" : "text-maroon"
        }`}
      >
        {!left && <span className="h-px w-10 bg-current opacity-50 sm:w-16" />}
        <span aria-hidden>✦</span>
        {eyebrow}
        <span aria-hidden>✦</span>
        <span className="h-px w-10 bg-current opacity-50 sm:w-16" />
      </div>
      <h2 className={`mt-4 font-serif text-3xl leading-tight font-semibold sm:text-4xl lg:text-5xl ${dark ? "text-ivory" : "text-navy"}`}>
        {title}
      </h2>
      <Ornament className={`mt-4 ${left ? "!justify-start" : ""}`} light={dark} />
      {children && <p className={`mt-4 text-base sm:text-lg ${dark ? "text-ivory/75" : "text-muted"}`}>{children}</p>}
    </Reveal>
  );
}

/** Mihrab-style arched edge used where a dark band meets a light one. */
export function ArchEdge({ className = "", fill = "var(--color-ivory)" }) {
  return (
    <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className={`block h-10 w-full sm:h-16 ${className}`} aria-hidden>
      <path d="M0 72V44c40 0 60-16 84-16h560c34 0 50-28 76-28s42 28 76 28h560c24 0 44 16 84 16v28Z" fill={fill} />
      <path
        d="M0 44c40 0 60-16 84-16h560c34 0 50-28 76-28s42 28 76 28h560c24 0 44 16 84 16"
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Dark page header used by every inner page. */
export function PageHero({ title, arabic, subtitle, eyebrow }) {
  return (
    <section className="pattern-navy relative overflow-hidden text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/50 to-transparent" />
      <div className="relative mx-auto max-w-4xl px-4 pt-14 pb-20 sm:pt-20 sm:pb-24">
        <Reveal>
          {arabic && (
            <p className="font-arabic text-3xl text-gold-light sm:text-4xl" lang="ar" dir="rtl">
              {arabic}
            </p>
          )}
          {eyebrow && <p className="mt-3 text-xs font-semibold tracking-[0.3em] text-gold-light/80 uppercase">{eyebrow}</p>}
          <h1 className="mt-3 font-serif text-4xl font-semibold text-ivory sm:text-5xl lg:text-6xl">{title}</h1>
          <Ornament className="mt-5" light />
          {subtitle && <p className="mx-auto mt-5 max-w-2xl text-ivory/75 sm:text-lg">{subtitle}</p>}
        </Reveal>
      </div>
      <ArchEdge className="absolute inset-x-0 -bottom-px" />
    </section>
  );
}

/** Renders "ﷺ" in the Arabic face, a little larger, so it stays legible inside Latin text. */
export function Honorific({ text = "" }) {
  const parts = String(text).split("ﷺ");
  return parts.map((p, i) => (
    <span key={i}>
      {p}
      {i < parts.length - 1 && <span className="mx-0.5 font-arabic text-[1.3em] leading-none text-gold">ﷺ</span>}
    </span>
  ));
}
