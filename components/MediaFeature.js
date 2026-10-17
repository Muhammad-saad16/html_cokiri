import Link from "next/link";
import { Play } from "lucide-react";
import { categoryLabel, fmtDate } from "@/lib/format";
import { Honorific } from "./Ornaments";

/** One large featured video beside a numbered playlist of the next few. */
export default function MediaFeature({ videos }) {
  const [featured, ...rest] = videos;
  if (!featured) return null;
  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <Link href={`/media/${featured.slug}`} className="group block">
        <div className="relative aspect-video overflow-hidden bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={featured.thumbnailUrl} alt={featured.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-20 w-20 place-items-center bg-gold text-black shadow-2xl transition group-hover:scale-110">
              <Play size={30} fill="currentColor" className="ml-1" />
            </span>
          </span>
        </div>
        <p className="label mt-5 text-gold">Latest · {categoryLabel(featured.category)}</p>
        <h3 className="mt-2 font-display text-2xl leading-snug font-bold text-white group-hover:underline group-hover:decoration-gold group-hover:underline-offset-4 sm:text-3xl">
          <Honorific text={featured.title} />
        </h3>
        <p className="mt-2 text-sm text-white/50">
          {fmtDate(featured.publishedAt)}
          {featured.views && <> · {featured.views} views</>}
        </p>
      </Link>

      <ol className="divide-y divide-white/10 border-y border-white/10">
        {rest.map((v, i) => (
          <li key={v.id}>
            <Link href={`/media/${v.slug}`} className="group grid grid-cols-[2rem_7rem_1fr] items-center gap-4 py-4">
              <span className="font-display text-lg font-bold text-white/30 group-hover:text-gold">{String(i + 2).padStart(2, "0")}</span>
              <span className="relative aspect-video overflow-hidden bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.thumbnailUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
              </span>
              <span>
                <span className="label block text-gold/80">{categoryLabel(v.category)}</span>
                <span className="mt-1 line-clamp-2 block text-sm leading-snug font-semibold text-white group-hover:text-gold">
                  <Honorific text={v.title} />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
