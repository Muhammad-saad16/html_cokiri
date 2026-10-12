import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./motion/Reveal";

/**
 * Editorial section title: a numbered kicker, a bold left-aligned headline,
 * and an optional "view all" link on the right.
 */
export function SectionTitle({ index, kicker, title, intro, action, dark = false, className = "" }) {
  return (
    <Reveal className={`grid gap-6 md:grid-cols-[1fr_auto] md:items-end ${className}`}>
      <div className="max-w-3xl">
        <p className={`label flex items-center gap-3 ${dark ? "text-gold" : "text-crimson"}`}>
          {index && <span className={`font-display text-sm ${dark ? "text-white/50" : "text-ink/40"}`}>{index}</span>}
          <span className={`h-px w-8 ${dark ? "bg-gold" : "bg-crimson"}`} />
          {kicker}
        </p>
        <h2 className={`mt-4 font-display text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl ${dark ? "text-white" : "text-ink"}`}>
          {title}
        </h2>
        {intro && <p className={`mt-4 max-w-2xl text-lg ${dark ? "text-white/70" : "text-muted"}`}>{intro}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className={`group inline-flex items-center gap-2 border-b-2 pb-1 text-sm font-bold ${
            dark ? "border-gold text-white hover:text-gold" : "border-crimson text-ink hover:text-crimson"
          }`}
        >
          {action.label} <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      )}
    </Reveal>
  );
}

/** Inner-page header: sand band, Kufic motif, breadcrumb, oversized title. */
export function PageHeader({ kicker, title, intro, arabic, crumbs = [] }) {
  return (
    <section className="kufic-light relative overflow-hidden border-b border-line bg-sand">
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-14 sm:px-6 sm:pt-14 sm:pb-20 lg:px-8">
        <Reveal>
          <nav className="label flex flex-wrap items-center gap-2 text-ink/50" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-crimson">Home</Link>
            {crumbs.map((c) => (
              <span key={c.href} className="flex items-center gap-2">
                <span>/</span>
                <Link href={c.href} className="hover:text-crimson">{c.label}</Link>
              </span>
            ))}
          </nav>
          <div className="mt-8 grid items-end gap-6 lg:grid-cols-[1fr_auto]">
            <div>
              {kicker && <p className="label text-crimson">{kicker}</p>}
              <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] font-bold tracking-tight text-ink sm:text-6xl lg:text-7xl">
                <Honorific text={title} />
              </h1>
              {intro && <p className="mt-5 max-w-2xl text-lg text-muted">{intro}</p>}
            </div>
            {arabic && (
              <p className="font-arabic text-5xl text-crimson/15 select-none sm:text-7xl" lang="ar" dir="rtl" aria-hidden>
                {arabic}
              </p>
            )}
          </div>
        </Reveal>
      </div>
      <div className="h-1.5 bg-gradient-to-r from-crimson via-crimson to-gold" />
    </section>
  );
}

/** Renders "ﷺ" in the Arabic face so it stays legible inside Latin text. */
export function Honorific({ text = "" }) {
  const parts = String(text).split("ﷺ");
  return parts.map((p, i) => (
    <span key={i}>
      {p}
      {i < parts.length - 1 && <span className="mx-0.5 font-honorific text-[1.25em] leading-none">ﷺ</span>}
    </span>
  ));
}
