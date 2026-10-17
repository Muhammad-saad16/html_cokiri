import Link from "next/link";

/** Horizontally scrolling row of book covers, editorial style. */
export default function BookShelf({ books }) {
  return (
    <div className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      {books.map((b, i) => (
        <Link key={b.id} href={`/research/${b.slug}`} className="group w-40 shrink-0 snap-start sm:w-48">
          <div className="relative aspect-[3/4] overflow-hidden bg-coal-2 shadow-[6px_6px_0_0_var(--color-line)] transition duration-300 group-hover:-translate-y-2 group-hover:shadow-[8px_8px_0_0_var(--color-gold)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={b.coverImageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <p className="mt-4 font-display text-xs font-bold text-gold">{String(i + 1).padStart(2, "0")}</p>
          <p className="mt-1 font-display text-base leading-snug font-bold text-ivory group-hover:text-gold">{b.title}</p>
        </Link>
      ))}
    </div>
  );
}
