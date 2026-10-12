import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./motion/Reveal";

/** Two-row bookshelf of covers standing on a gold ledge. */
export default function BookShelf({ books, perRow = 4, rows = 2 }) {
  const shelves = Array.from({ length: rows }, (_, r) => books.slice(r * perRow, (r + 1) * perRow)).filter((s) => s.length);
  return (
    <div className="mx-auto mt-14 max-w-5xl">
      {shelves.map((row, r) => (
        <Reveal key={r} delay={r * 0.1} className={r ? "mt-12" : ""}>
          <div className="grid grid-cols-4 items-end gap-3 px-2 sm:gap-8 sm:px-8">
            {row.map((b) => (
              <Link key={b.id} href={`/research/${b.slug}`} className="group block" aria-label={b.title}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-r-md rounded-l-sm shadow-[6px_8px_16px_rgba(14,31,61,0.35)] transition duration-300 group-hover:-translate-y-3 group-hover:shadow-[10px_18px_28px_rgba(14,31,61,0.4)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.coverImageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
                  <span className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/35 to-transparent" aria-hidden />
                </div>
              </Link>
            ))}
          </div>
          <div className="h-3 rounded-sm bg-gradient-to-b from-gold-light via-gold to-gold-dark shadow-[0_10px_18px_-6px_rgba(14,31,61,0.45)]" aria-hidden />
          <div className="grid grid-cols-4 gap-3 px-2 pt-3 sm:gap-8 sm:px-8">
            {row.map((b) => (
              <p key={b.id} className="text-center font-serif text-xs leading-snug font-semibold text-navy sm:text-base">
                {b.title}
              </p>
            ))}
          </div>
        </Reveal>
      ))}
      <Reveal className="mt-12 text-center">
        <Link href="/research" className="btn-navy">
          All {books.length} books <ArrowRight size={16} />
        </Link>
      </Reveal>
    </div>
  );
}
