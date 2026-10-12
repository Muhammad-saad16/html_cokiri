import Link from "next/link";
import { CalendarDays, MapPin, Play, Clock, Images } from "lucide-react";
import { fmtDate, categoryLabel } from "@/lib/format";
import FitImage from "@/components/FitImage";
import { Honorific } from "@/components/Ornaments";

function CardImage({ src, alt, className = "h-48" }) {
  if (!src) return <div className={`w-full bg-gradient-to-br from-navy to-maroon-dark ${className}`} />;
  return (
    <FitImage src={src} alt={alt} className={`w-full ${className}`} imgClassName="transition-transform duration-500 group-hover:scale-105" />
  );
}

export function EventCard({ event }) {
  return (
    <Link href={`/events/${event.slug}`} className="card group flex h-full flex-col">
      <div className="relative">
        <CardImage src={event.coverImageUrl} alt={event.title} />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-navy/90 px-2.5 py-1 text-[11px] font-semibold tracking-wider text-gold-light uppercase">
          <CalendarDays size={12} /> {fmtDate(event.startDate)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-xl leading-snug font-semibold text-navy transition-colors group-hover:text-maroon">
          <Honorific text={event.title} />
        </h3>
        {event.summary && <p className="mt-2 line-clamp-2 text-sm text-muted">{event.summary}</p>}
        {event.location && (
          <p className="mt-auto flex items-start gap-1.5 pt-4 text-xs text-gold-dark">
            <MapPin size={13} className="mt-0.5 shrink-0" /> {event.location}
          </p>
        )}
      </div>
    </Link>
  );
}

export function VideoCard({ video, dark = false }) {
  return (
    <Link
      href={`/media/${video.slug}`}
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
        dark ? "border-gold/30 bg-navy-deep/60 hover:border-gold" : "border-gold/30 bg-white/80 hover:border-gold"
      }`}
    >
      <div className="relative aspect-video overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={video.thumbnailUrl} alt={video.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        <span className="absolute inset-0 grid place-items-center bg-navy-deep/0 transition group-hover:bg-navy-deep/30">
          <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-ivory/90 bg-navy-deep/50 text-ivory transition group-hover:border-gold group-hover:bg-gold group-hover:text-navy-deep">
            <Play size={18} className="ml-0.5" fill="currentColor" />
          </span>
        </span>
        <span className="absolute top-2 left-2 rounded bg-gold px-2 py-0.5 text-[10px] font-bold tracking-widest text-navy-deep uppercase">
          {categoryLabel(video.category)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className={`line-clamp-2 font-serif text-lg leading-snug font-semibold ${dark ? "text-ivory" : "text-navy"}`}>
          <Honorific text={video.title} />
        </h3>
        <p className={`mt-auto pt-3 text-xs ${dark ? "text-ivory/55" : "text-muted"}`}>
          {fmtDate(video.publishedAt)}
          {video.views && <> · {video.views} views</>}
        </p>
      </div>
    </Link>
  );
}

export function PublicationCard({ publication }) {
  return (
    <Link href={`/research/${publication.slug}`} className="card group flex h-full flex-col">
      <div className="flex h-64 items-center justify-center bg-gradient-to-b from-ivory-2 to-ivory p-5">
        {publication.coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={publication.coverImageUrl}
            alt={publication.title}
            className="h-full w-auto rounded-r-md rounded-l-sm object-contain shadow-[8px_10px_20px_rgba(14,31,61,0.35)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-navy to-maroon-dark" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4 text-center">
        <h3 className="font-serif text-lg leading-snug font-semibold text-navy group-hover:text-maroon">
          <Honorific text={publication.title} />
        </h3>
        {publication.summary && <p className="mt-1.5 line-clamp-2 text-sm text-muted">{publication.summary}</p>}
      </div>
    </Link>
  );
}

export function ProgramCard({ program }) {
  return (
    <Link href={`/programs/${program.slug}`} className="card group flex h-full flex-col">
      <CardImage src={program.coverImageUrl} alt={program.title} className="h-52" />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-2xl leading-snug font-semibold text-navy group-hover:text-maroon">
          <Honorific text={program.title} />
        </h3>
        {program.schedule && (
          <p className="mt-2 flex items-start gap-1.5 text-sm font-medium text-maroon">
            <Clock size={15} className="mt-0.5 shrink-0" /> {program.schedule}
          </p>
        )}
        {program.description && <p className="mt-3 line-clamp-3 text-sm text-muted">{program.description.split("\n\n")[0]}</p>}
        <span className="mt-auto pt-5 text-xs font-semibold tracking-[0.2em] text-gold-dark uppercase">Details →</span>
      </div>
    </Link>
  );
}

export function NewsCard({ post }) {
  return (
    <Link href={`/news/${post.slug}`} className="card group flex h-full flex-col">
      <CardImage src={post.coverImageUrl} alt={post.title} />
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold tracking-wider text-maroon uppercase">{fmtDate(post.publishedAt || post.createdAt)}</p>
        <h3 className="mt-2 font-serif text-xl leading-snug font-semibold text-navy group-hover:text-maroon">
          <Honorific text={post.title} />
        </h3>
        {post.summary && (
          <p className="mt-2 line-clamp-2 text-sm text-muted">
            <Honorific text={post.summary} />
          </p>
        )}
      </div>
    </Link>
  );
}

export function GalleryCard({ album }) {
  return (
    <Link href={`/gallery/${album.slug}`} className="group relative block overflow-hidden rounded-2xl border border-gold/40 shadow-lg">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={album.coverImageUrl} alt={album.title} className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-gold px-2.5 py-1 text-[11px] font-bold tracking-wider text-navy-deep uppercase">
          <Images size={12} /> {album.images?.length || 0} photos
        </span>
        <h3 className="mt-3 font-serif text-2xl font-semibold text-ivory">{album.title}</h3>
        {(album.date || album.location) && (
          <p className="mt-1 text-sm text-ivory/70">{[fmtDate(album.date), album.location].filter(Boolean).join(" · ")}</p>
        )}
      </div>
    </Link>
  );
}

export function PersonCard({ person }) {
  return (
    <div className="card h-full text-center">
      {person.photoUrl ? (
        <FitImage src={person.photoUrl} alt={person.name} className="h-56 w-full" />
      ) : (
        <div className="flex h-56 w-full items-center justify-center bg-gradient-to-br from-navy to-maroon-dark font-serif text-4xl text-gold-light">
          {person.name?.split(" ").map((n) => n[0]).slice(0, 2).join("")}
        </div>
      )}
      <div className="p-4">
        <h3 className="font-serif text-xl font-semibold text-navy">{person.name}</h3>
        {person.designation && <p className="mt-0.5 text-sm text-maroon">{person.designation}</p>}
      </div>
    </div>
  );
}
