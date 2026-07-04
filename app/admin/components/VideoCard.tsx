"use client";

import Image from "next/image";
import { AdminVideo } from "../types";
import { getYoutubeEmbedUrl, getYoutubeThumbnail } from "../lib/youtube";

interface VideoCardProps {
  video: AdminVideo;
  onDelete: (id: string) => void;
}

export default function VideoCard({ video, onDelete }: VideoCardProps) {
  const embedUrl = getYoutubeEmbedUrl(video.url);
  const thumbnail = getYoutubeThumbnail(video.url);

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-outline-variant/40 bg-paper-white shadow-sm">
      <div className="relative aspect-video w-full overflow-hidden bg-research-grey">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={video.title || video.url}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        ) : thumbnail ? (
          <Image
            src={thumbnail}
            alt={video.title || "YouTube video thumbnail"}
            fill
            unoptimized
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-paper-white/70">
            Invalid YouTube URL
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        {video.title && (
          <h3 className="font-serif text-base font-semibold text-on-surface">
            {video.title}
          </h3>
        )}
        <p className="mt-1 break-all text-xs text-on-surface-variant">
          {video.url}
        </p>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => onDelete(video.id)}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded px-3 font-hanken text-xs font-bold uppercase tracking-[0.05em] text-error transition-colors duration-200 hover:bg-error/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
