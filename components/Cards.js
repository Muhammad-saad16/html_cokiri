import Link from "next/link";
import { ArrowUpRight, MapPin, Play, Clock, Images } from "lucide-react";
import { fmtDate, categoryLabel } from "@/lib/format";
import FitImage from "@/components/FitImage";
import { Honorific } from "@/components/Ornaments";

function Cover({ src, alt, className = "h-52" }) {
  if (!src) return <div className={`kufic w-full bg-black ${className}`} />;
  return <FitImage src={src} alt={alt} className={`w-full ${className}`} imgClassName="transition-transform duration-500 group-hover:scale-105" />;
}

export function EventCard({ event }) {
  return (
    <Link href={`/events/${event.slug}`} className="tile group flex h-full flex-col">
      <Cover src={event.coverImageUrl} alt={event.title} />
      <div className="flex flex-1 flex-col p-6">
        <p className="label text-gold">{fmtDate(event.startDate)}</p>
        <h3 className="mt-3 font-display text-xl leading-snug font-bold text-ivory">
          <Honorific text={event.title} />
        </h3>
        {event.location && (
          <p className="mt-auto flex items-start gap-1.5 pt-5 text-xs text-muted">
            <MapPin size={13} className="mt-0.5 shrink-0 text-gold" /> {event.location}
          </p>
        )}
      </div>
    </Link>
  );
}

export function VideoCard({ video, dark = false }) {
  return (
    <Link href={`/media/${video.slug}`} className={`group block ${dark ? "text-white" : "text-ivory"}`}>
      <div className="relative aspect-video overflow-hidden bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={video.thumbnailUrl} alt={video.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute bottom-0 left-0 grid h-11 w-11 place-items-center bg-gold text-black transition group-hover:w-14">
          <Play size={16} fill="currentColor" />
        </span>
      </div>
      <p className={`label mt-4 ${dark ? "text-gold" : "text-gold"}`}>{categoryLabel(video.category)}</p>
      <h3 className="mt-2 line-clamp-2 font-display text-lg leading-snug font-bold group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">
        <Honorific text={video.title} />
      </h3>
      <p className={`mt-2 text-xs ${dark ? "text-white/50" : "text-muted"}`}>
        {fmtDate(video.publishedAt)}
        {video.views && <> · {video.views} views</>}
      </p>
    </Link>
  );
}

export function PublicationCard({ publication }) {
  return (
    <Link href={`/research/${publication.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-coal-2 shadow-[6px_6px_0_0_var(--color-line)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0_0_var(--color-gold)]">
        {publication.coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={publication.coverImageUrl} alt={publication.title} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div className="kufic h-full w-full bg-black" />
        )}
      </div>
      <h3 className="mt-4 font-display text-lg leading-snug font-bold text-ivory group-hover:text-gold">
        <Honorific text={publication.title} />
      </h3>
      {publication.summary && <p className="mt-1 line-clamp-2 text-sm text-muted">{publication.summary}</p>}
    </Link>
  );
}

export function ProgramCard({ program }) {
  return (
    <Link href={`/programs/${program.slug}`} className="tile group flex h-full flex-col">
      <Cover src={program.coverImageUrl} alt={program.title} className="h-56" />
      <div className="flex flex-1 flex-col p-6">
        {program.day && <span className="label w-fit bg-gold px-2 py-1 text-black">{program.day}</span>}
        <h3 className="mt-4 font-display text-2xl leading-tight font-bold text-ivory">
          <Honorific text={program.title} />
        </h3>
        {program.schedule && (
          <p className="mt-2 flex items-start gap-1.5 text-sm font-semibold text-gold">
            <Clock size={15} className="mt-0.5 shrink-0" /> {program.schedule}
          </p>
        )}
        {program.description && <p className="mt-3 line-clamp-3 text-sm text-muted">{program.description.split("\n\n")[0]}</p>}
        <span className="mt-auto flex items-center gap-1 pt-5 text-sm font-bold text-ivory group-hover:text-gold">
          Details <ArrowUpRight size={15} />
        </span>
      </div>
    </Link>
  );
}

export function NewsCard({ post, featured = false }) {
  return (
    <Link href={`/news/${post.slug}`} className={`group grid h-full gap-5 ${featured ? "" : "sm:grid-cols-[10rem_1fr]"}`}>
      <Cover src={post.coverImageUrl} alt={post.title} className={featured ? "h-72" : "h-40 sm:h-full sm:min-h-28"} />
      <div>
        <p className="label text-gold">{fmtDate(post.publishedAt || post.createdAt)}</p>
        <h3 className={`mt-2 font-display leading-snug font-bold text-ivory group-hover:text-gold ${featured ? "text-3xl" : "text-lg"}`}>
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

export function GalleryCard({ album, large = false }) {
  return (
    <Link href={`/gallery/${album.slug}`} className="group relative block h-full min-h-72 overflow-hidden bg-black">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={album.coverImageUrl} alt={album.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[50%_22%] opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <span className="label inline-flex items-center gap-1.5 bg-gold px-2 py-1 text-black">
          <Images size={12} /> {album.images?.length || 0} photos
        </span>
        <h3 className={`mt-3 font-display font-bold text-white ${large ? "text-3xl sm:text-4xl" : "text-2xl"}`}>{album.title}</h3>
        {(album.date || album.location) && <p className="mt-1 text-sm text-white/70">{[fmtDate(album.date), album.location].filter(Boolean).join(" · ")}</p>}
      </div>
    </Link>
  );
}

export function PersonCard({ person }) {
  return (
    <div className="tile h-full">
      {person.photoUrl ? (
        <FitImage src={person.photoUrl} alt={person.name} className="h-64 w-full" />
      ) : (
        <div className="kufic flex h-64 w-full items-center justify-center bg-black font-display text-5xl font-bold text-gold">
          {person.name?.split(" ").map((n) => n[0]).slice(0, 2).join("")}
        </div>
      )}
      <div className="p-5">
        <h3 className="font-display text-xl font-bold text-ivory">{person.name}</h3>
        {person.designation && <p className="label mt-1 text-gold">{person.designation}</p>}
      </div>
    </div>
  );
}
