import type { CollectionConfig } from "payload";
import { isAdmin } from "../access";

/** Big slider at the top of the home page. */
export const Slides: CollectionConfig = {
  slug: "slides",
  labels: { singular: "Hero Slide", plural: "Hero Slider" },
  access: { read: isAdmin, create: isAdmin, update: isAdmin, delete: isAdmin },
  defaultSort: "order",
  admin: {
    useAsTitle: "badge",
    group: "Home Page",
    defaultColumns: ["badge", "title", "active", "order"],
  },
  fields: [
    { name: "image", type: "upload", relationTo: "media", required: true },
    { name: "badge", type: "text", required: true, label: "Offer / label", admin: { description: "Small text above the title, e.g. Eid Offer — 20% Off" } },
    {
      name: "showLogo",
      type: "checkbox",
      label: "Show the big Kangan logo instead of a title",
    },
    { name: "title", type: "text", admin: { condition: (d) => !d?.showLogo } },
    { name: "subtitle", type: "text", label: "Gold subtitle", admin: { condition: (d) => !d?.showLogo } },
    { name: "text", type: "textarea", label: "Description", required: true },
    {
      type: "row",
      fields: [
        { name: "buttonLabel", type: "text", defaultValue: "Shop Now", required: true },
        { name: "link", type: "text", defaultValue: "/shop", required: true, admin: { description: "e.g. /collections/jewellery" } },
      ],
    },
    { name: "active", type: "checkbox", defaultValue: true, admin: { position: "sidebar" } },
    { name: "order", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};
