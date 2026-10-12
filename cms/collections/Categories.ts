import type { CollectionConfig } from "payload";
import { isAdmin } from "../access";

export const Categories: CollectionConfig = {
  slug: "categories",
  access: { read: isAdmin, create: isAdmin, update: isAdmin, delete: isAdmin },
  defaultSort: "order",
  admin: {
    useAsTitle: "title",
    group: "Shop",
    defaultColumns: ["title", "slug", "order"],
    description: "Main collections (Jewellery, Handbags…) and their sub-categories.",
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { description: "Used in the URL: /collections/<slug> — lowercase, no spaces." },
    },
    { name: "kicker", type: "text", label: "Tagline", admin: { description: "e.g. Elegance That Shines" } },
    { name: "intro", type: "textarea", label: "Intro text" },
    { name: "image", type: "upload", relationTo: "media", label: "Category image" },
    {
      name: "subcategories",
      type: "array",
      label: "Sub-categories",
      admin: { description: "Shown as filters on the collection page, e.g. Bangles, Necklaces, Earrings." },
      fields: [{ name: "name", type: "text", required: true }],
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar", description: "Lower numbers appear first." },
    },
  ],
};
