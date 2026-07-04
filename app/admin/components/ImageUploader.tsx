"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  onImageSelect: (base64: string) => void;
}

export default function ImageUploader({ onImageSelect }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isPasting, setIsPasting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pasteZoneRef = useRef<HTMLDivElement>(null);

  const readFileAsBase64 = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      onImageSelect(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    readFileAsBase64(file);
  };

  const handlePaste = (event: React.ClipboardEvent) => {
    const items = event.clipboardData.items;
    let imageFound = false;

    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const blob = item.getAsFile();
        if (blob) {
          imageFound = true;
          setIsPasting(true);
          readFileAsBase64(blob);
          setTimeout(() => setIsPasting(false), 300);
        }
        break;
      }
    }

    if (!imageFound) {
      return;
    }

    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      readFileAsBase64(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <div className="space-y-3">
      <label className="block">
        <span className="mb-1.5 block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-on-surface-variant">
          Select Image
        </span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full cursor-pointer rounded border border-outline-variant bg-paper-white px-3 py-2.5 text-sm text-on-surface file:mr-4 file:rounded file:border-0 file:bg-heritage-orange file:px-3 file:py-1.5 file:text-xs file:font-bold file:uppercase file:text-paper-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange"
        />
      </label>

      <div
        ref={pasteZoneRef}
        onPaste={handlePaste}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        tabIndex={0}
        aria-label="Paste image here"
        className={`flex min-h-[120px] flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-5 text-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange ${
          isPasting
            ? "border-heritage-orange bg-heritage-orange/10"
            : "border-outline-variant bg-surface-container-low hover:border-heritage-orange/50 hover:bg-surface-container"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mb-2 text-heritage-orange"
          aria-hidden="true"
        >
          <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <path d="M12 11v8" />
          <path d="M9 14h6" />
        </svg>
        <p className="text-sm font-medium text-on-surface">
          Paste image here
        </p>
        <p className="mt-1 text-xs text-on-surface-variant">
          Use Ctrl+V or drag & drop an image
        </p>
      </div>

      {preview && (
        <div className="relative h-40 overflow-hidden rounded border border-outline-variant/40">
          <Image
            src={preview}
            alt="Selected preview"
            fill
            unoptimized
            className="object-contain"
          />
        </div>
      )}
    </div>
  );
}
