"use client";

import Link from "next/link";
import { fmtDate, categoryLabel } from "@/lib/format";
import { motion } from "motion/react";
import FitImage from "@/components/FitImage";


function CardShell({ href, children }) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group border border-slate-200 rounded-xl overflow-hidden bg-white hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/[0.06] transition-shadow"
    >
      <Link href={href} className="block">
        {children}
      </Link>
    </motion.div>
  );
}

function CardImage({ src, alt }) {
  if (!src) {
    return <div className="w-full h-40 bg-gradient-to-br from-slate-100 to-slate-200" />;
  }
  return (
    <FitImage src={src} alt={alt} className="w-full h-40" imgClassName="transition-transform duration-500 group-hover:scale-105" />
  );
}

export function EventCard({ event }) {
  return (
    <CardShell href={`/events/${event.slug}`}>
      <CardImage src={event.coverImageUrl} alt={event.title} />
      <div className="p-4">
        <div className="text-xs text-orange-700 font-medium">{fmtDate(event.startDate)}</div>
        <h3 className="mt-1 font-medium text-slate-900 group-hover:text-orange-800 transition-colors">{event.title}</h3>
        {event.location && <p className="text-sm text-slate-500 mt-1">{event.location}</p>}
      </div>
    </CardShell>
  );
}

export function VideoCard({ video }) {
  return (
    <CardShell href={`/media/${video.slug}`}>
      <CardImage src={video.thumbnailUrl} alt={video.title} />
      <div className="p-4">
        <div className="text-xs uppercase tracking-wide text-orange-700 font-medium">{categoryLabel(video.category)}</div>
        <h3 className="mt-1 font-medium text-slate-900 group-hover:text-orange-800 transition-colors">{video.title}</h3>
      </div>
    </CardShell>
  );
}

export function PublicationCard({ publication }) {
  return (
    <CardShell href={`/research/${publication.slug}`}>
      <div className="w-full h-64 bg-slate-100 flex items-center justify-center overflow-hidden p-4">
        {publication.coverImageUrl ? (
          <motion.img
            src={publication.coverImageUrl}
            alt={publication.title}
            variants={{ rest: { scale: 1 }, hover: { scale: 1.04 } }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-auto object-contain shadow-lg shadow-slate-900/20"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200" />
        )}
      </div>
      <div className="p-4">
        <div className="text-xs uppercase tracking-wide text-orange-700 font-medium">{publication.type?.replace("_", " ")}</div>
        <h3 className="mt-1 font-medium text-slate-900 group-hover:text-orange-800 transition-colors">{publication.title}</h3>
        {publication.summary && <p className="text-sm text-slate-500 mt-1 line-clamp-2">{publication.summary}</p>}
      </div>
    </CardShell>
  );
}

export function ProgramCard({ program }) {
  return (
    <CardShell href={`/programs/${program.slug}`}>
      <CardImage src={program.coverImageUrl} alt={program.title} />
      <div className="p-5">
        <h3 className="font-medium text-slate-900 group-hover:text-orange-800 transition-colors">{program.title}</h3>
        {program.schedule && <p className="text-xs text-orange-700 font-medium mt-1.5">{program.schedule}</p>}
        {program.description && <p className="text-sm text-slate-500 mt-1.5 line-clamp-3">{program.description}</p>}
      </div>
    </CardShell>
  );
}

export function NewsCard({ post }) {
  return (
    <CardShell href={`/news/${post.slug}`}>
      <CardImage src={post.coverImageUrl} alt={post.title} />
      <div className="p-4">
        <div className="text-xs text-orange-700 font-medium">{fmtDate(post.publishedAt || post.createdAt)}</div>
        <h3 className="mt-1 font-medium text-slate-900 group-hover:text-orange-800 transition-colors">{post.title}</h3>
        {post.summary && <p className="text-sm text-slate-500 mt-1 line-clamp-2">{post.summary}</p>}
      </div>
    </CardShell>
  );
}

export function GalleryCard({ album }) {
  return (
    <CardShell href={`/gallery/${album.slug}`}>
      <CardImage src={album.coverImageUrl} alt={album.title} />
      <div className="p-4">
        <h3 className="font-medium text-slate-900 group-hover:text-orange-800 transition-colors">{album.title}</h3>
        {album.location && <p className="text-sm text-slate-500 mt-1">{album.location}</p>}
      </div>
    </CardShell>
  );
}

export function PersonCard({ person }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="h-full border border-slate-200 rounded-xl overflow-hidden bg-white text-center hover:shadow-lg hover:shadow-slate-900/[0.06] hover:border-slate-300 transition-shadow"
    >
      {person.photoUrl ? (
        <FitImage src={person.photoUrl} alt={person.name} className="w-full h-56" />
      ) : (
        <div className="w-full h-56 bg-gradient-to-br from-slate-800 to-orange-950 flex items-center justify-center text-white font-serif text-3xl" style={{ fontFamily: "var(--font-source-serif)" }}>
          {person.name?.split(" ").map((n) => n[0]).slice(0, 2).join("")}
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-slate-900">{person.name}</h3>
        {person.designation && <p className="text-sm text-orange-700 mt-0.5">{person.designation}</p>}
      </div>
    </motion.div>
  );
}

