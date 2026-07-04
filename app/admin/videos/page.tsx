"use client";

import { useState } from "react";
import { AdminVideo } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { seedVideos } from "../lib/seedData";
import { getYoutubeEmbedUrl, getYoutubeVideoId } from "../lib/youtube";
import CountBadge from "../components/CountBadge";
import VideoCard from "../components/VideoCard";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

export default function AdminVideosPage() {
  const [videos, setVideos] = useLocalStorage<AdminVideo[]>(
    "cokri-admin-videos",
    seedVideos
  );

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const isValidUrl = !!getYoutubeVideoId(url);
  const previewEmbedUrl = getYoutubeEmbedUrl(url);

  const handleAdd = () => {
    if (!isValidUrl) return;

    const video: AdminVideo = {
      id: `video-${Date.now()}`,
      url: url.trim(),
      title: title.trim() || undefined,
    };

    setVideos((prev) => [...prev, video]);
    setTitle("");
    setUrl("");
  };

  const handleDelete = (id: string) => {
    setVideos((prev) => prev.filter((video) => video.id !== id));
    setDeleteId(null);
  };

  const deletingVideo = videos.find((video) => video.id === deleteId);

  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="mb-6">
        <CountBadge count={videos.length} label={videos.length === 1 ? "video" : "videos"} />
        <p className="text-sm text-on-surface-variant">
          Add YouTube video links to display in the Videos section.
        </p>
      </div>

      {/* Add new video */}
      <section className="mb-8 rounded-lg border border-outline-variant/40 bg-paper-white p-5 shadow-sm md:p-6">
        <h2 className="mb-4 font-serif text-lg font-semibold text-on-surface">
          Add New Video
        </h2>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-on-surface-variant">
                Title <span className="font-normal normal-case text-on-surface-variant/60">(optional)</span>
              </span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Ramadan Lecture Series"
                className="w-full rounded border border-outline-variant bg-paper-white px-3 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus-visible:border-heritage-orange focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-heritage-orange"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-on-surface-variant">
                YouTube URL
              </span>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full rounded border border-outline-variant bg-paper-white px-3 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus-visible:border-heritage-orange focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-heritage-orange"
              />
              {url && !isValidUrl && (
                <p className="mt-1.5 text-xs text-error">
                  Please enter a valid YouTube URL.
                </p>
              )}
            </label>

            <button
              type="button"
              onClick={handleAdd}
              disabled={!isValidUrl}
              className="inline-flex h-11 items-center justify-center rounded bg-heritage-orange px-5 font-hanken text-xs font-bold uppercase tracking-[0.05em] text-paper-white transition-colors duration-200 hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange"
            >
              Save Video
            </button>
          </div>

          {/* Preview */}
          <div className="rounded-lg border border-outline-variant/40 bg-surface-container-low p-3">
            <span className="mb-2 block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-on-surface-variant">
              Preview
            </span>
            {previewEmbedUrl ? (
              <div className="relative aspect-video w-full overflow-hidden rounded bg-research-grey">
                <iframe
                  src={previewEmbedUrl}
                  title="YouTube preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            ) : (
              <div className="flex aspect-video w-full items-center justify-center rounded bg-surface-container text-sm text-on-surface-variant">
                Enter a YouTube URL to see the preview
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Videos grid */}
      {videos.length === 0 ? (
        <div className="rounded-lg border border-dashed border-outline-variant bg-paper-white py-16 text-center">
          <p className="text-on-surface-variant">No videos yet. Add your first YouTube video above.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} onDelete={setDeleteId} />
          ))}
        </div>
      )}

      <ConfirmDeleteModal
        isOpen={!!deleteId}
        title="Delete Video"
        message={`Are you sure you want to delete "${deletingVideo?.title || deletingVideo?.url || "this video"}"? This cannot be undone.`}
        onConfirm={() => deleteId && handleDelete(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
