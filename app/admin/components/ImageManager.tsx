"use client";

import { useState } from "react";
import { AdminImage } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import CountBadge from "./CountBadge";
import ImageUploader from "./ImageUploader";
import ImageCard from "./ImageCard";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

interface ImageManagerProps {
  title: string;
  storageKey: string;
  seedData: AdminImage[];
  showReorder?: boolean;
}

export default function ImageManager({
  title,
  storageKey,
  seedData,
  showReorder = false,
}: ImageManagerProps) {
  const [images, setImages] = useLocalStorage<AdminImage[]>(storageKey, seedData);
  const [newImage, setNewImage] = useState<string | null>(null);
  const [newAlt, setNewAlt] = useState("");
  const [uploadKey, setUploadKey] = useState(0);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAdd = () => {
    if (!newImage) return;

    const image: AdminImage = {
      id: `${storageKey}-${Date.now()}`,
      src: newImage,
      alt: newAlt.trim() || "Uploaded image",
    };

    setImages((prev) => [...prev, image]);
    setNewImage(null);
    setNewAlt("");
    setUploadKey((prev) => prev + 1);
  };

  const handleDelete = (id: string) => {
    setImages((prev) => prev.filter((image) => image.id !== id));
    setDeleteId(null);
  };

  const handleAltChange = (id: string, alt: string) => {
    setImages((prev) =>
      prev.map((image) => (image.id === id ? { ...image, alt } : image))
    );
  };

  const handleMoveUp = (id: string) => {
    setImages((prev) => {
      const index = prev.findIndex((image) => image.id === id);
      if (index <= 0) return prev;
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  };

  const handleMoveDown = (id: string) => {
    setImages((prev) => {
      const index = prev.findIndex((image) => image.id === id);
      if (index === -1 || index >= prev.length - 1) return prev;
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  };

  const deletingImage = images.find((image) => image.id === deleteId);

  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CountBadge count={images.length} label={images.length === 1 ? "image" : "images"} />
          <p className="text-sm text-on-surface-variant">
            Manage images for the {title.toLowerCase()} section.
          </p>
        </div>
      </div>

      {/* Add new image card */}
      <section className="mb-8 rounded-lg border border-outline-variant/40 bg-paper-white p-5 shadow-sm md:p-6">
        <h2 className="mb-4 font-serif text-lg font-semibold text-on-surface">
          Add New Image
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          <ImageUploader
            key={uploadKey}
            onImageSelect={setNewImage}
          />
          <div className="flex flex-col gap-4">
            <label className="block">
              <span className="mb-1.5 block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-on-surface-variant">
                Alt Text
              </span>
              <input
                type="text"
                value={newAlt}
                onChange={(e) => setNewAlt(e.target.value)}
                placeholder="Describe this image"
                className="w-full rounded border border-outline-variant bg-paper-white px-3 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus-visible:border-heritage-orange focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-heritage-orange"
              />
            </label>
            <div className="mt-auto">
              <button
                type="button"
                onClick={handleAdd}
                disabled={!newImage}
                className="inline-flex h-11 items-center justify-center rounded bg-heritage-orange px-5 font-hanken text-xs font-bold uppercase tracking-[0.05em] text-paper-white transition-colors duration-200 hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange"
              >
                Save Image
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Images grid */}
      {images.length === 0 ? (
        <div className="rounded-lg border border-dashed border-outline-variant bg-paper-white py-16 text-center">
          <p className="text-on-surface-variant">No images yet. Add your first image above.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((image, index) => (
            <ImageCard
              key={image.id}
              image={image}
              onDelete={setDeleteId}
              onAltChange={handleAltChange}
              onMoveUp={showReorder ? handleMoveUp : undefined}
              onMoveDown={showReorder ? handleMoveDown : undefined}
              showReorder={showReorder}
              isFirst={index === 0}
              isLast={index === images.length - 1}
            />
          ))}
        </div>
      )}

      <ConfirmDeleteModal
        isOpen={!!deleteId}
        title="Delete Image"
        message={`Are you sure you want to delete "${deletingImage?.alt || "this image"}"? This cannot be undone.`}
        onConfirm={() => deleteId && handleDelete(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
