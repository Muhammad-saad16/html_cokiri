import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Honorific } from "./Ornaments";

/** Weekly programs as a timetable: day block · title · time · venue. */
export default function Timetable({ programs }) {
  return (
    <div className="mt-12 border-t-2 border-ink">
      {programs.map((p) => (
        <Link
          key={p.id}
          href={`/programs/${p.slug}`}
          className="group grid items-center gap-4 border-b border-line py-6 transition hover:bg-sand sm:grid-cols-[7rem_1.4fr_1fr_auto] sm:gap-8 sm:px-4"
        >
          <span className="w-fit bg-ink px-4 py-3 text-center font-display text-xl font-extrabold text-white uppercase transition group-hover:bg-crimson sm:w-full">
            {p.day || "—"}
          </span>
          <span>
            <span className="block font-display text-2xl leading-tight font-bold text-ink">
              <Honorific text={p.title} />
            </span>
            <span className="mt-1 block text-sm text-muted">{p.description?.split("\n\n")[0]?.slice(0, 110)}…</span>
          </span>
          <span className="text-sm">
            <span className="block font-bold text-crimson">{p.time}</span>
            {p.venue && (
              <span className="mt-1 flex items-start gap-1.5 text-muted">
                <MapPin size={14} className="mt-0.5 shrink-0" /> {p.venue}
              </span>
            )}
          </span>
          <ArrowUpRight size={28} className="hidden text-ink/30 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-crimson sm:block" />
        </Link>
      ))}
    </div>
  );
}
