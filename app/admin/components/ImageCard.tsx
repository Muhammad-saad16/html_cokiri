"use client";

import Image from "next/image";
import { AdminImage } from "../types";

interface ImageCardProps {
  image: AdminImage;
  onDelete: (id: string) => void;
  onMoveUp?: (id: string) => void;
  onMoveDown?: (id: string) => void;
  onAltChange?: (id: string, alt: string) => void;
  showReorder?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

export default function ImageCard({
  image,
  onDelete,
  onMoveUp,
  onMoveDown,
  onAltChange,
  showReorder = false,
  isFirst = false,
  isLast = false,
}: ImageCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-outline-variant/40 bg-paper-white shadow-sm">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-research-grey">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          unoptimized
          className="object-contain"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <label className="mb-4 block">
          <span className="mb-1.5 block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-on-surface-variant">
            Alt Text
          </span>
          <input
            type="text"
            value={image.alt}
            onChange={(e) => onAltChange?.(image.id, e.target.value)}
            className="w-full rounded border border-outline-variant bg-paper-white px-3 py-2 text-sm text-on-surface focus-visible:border-heritage-orange focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-heritage-orange"
          />
        </label>

        <div className="mt-auto flex items-center justify-between gap-2">
          {showReorder ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onMoveUp?.(image.id)}
                disabled={isFirst}
                aria-label="Move up"
                className="inline-flex h-9 w-9 items-center justify-center rounded border border-outline-variant bg-paper-white text-on-surface transition-colors duration-200 hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
              </button>
              <button
                type="button"
                onClick={() => onMoveDown?.(image.id)}
                disabled={isLast}
                aria-label="Move down"
                className="inline-flex h-9 w-9 items-center justify-center rounded border border-outline-variant bg-paper-white text-on-surface transition-colors duration-200 hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </button>
            </div>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={() => onDelete(image.id)}
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
