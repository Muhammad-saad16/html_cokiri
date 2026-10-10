import type { CollectionConfig } from "payload";
import { anyone, isAdmin } from "../access";

/** Product photos, product videos, category & slider images. Files are stored in /media. */
export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Media", plural: "Media Library" },
  // Files are served at /api/media/file/<name>, so reading must be public.
  access: { read: anyone, create: isAdmin, update: isAdmin, delete: isAdmin },
  admin: { group: "Content" },
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*", "video/mp4", "video/webm"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Alt text",
      admin: { description: "Short description of the image (for SEO and screen readers)." },
    },
  ],
};
