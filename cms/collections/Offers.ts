import type { CollectionConfig } from "payload";
import { isAdmin } from "../access";

/** Small offers slider under the categories on the home page. */
export const Offers: CollectionConfig = {
  slug: "offers",
  access: { read: isAdmin, create: isAdmin, update: isAdmin, delete: isAdmin },
  defaultSort: "order",
  admin: {
    useAsTitle: "title",
    group: "Home Page",
    defaultColumns: ["title", "badge", "active", "endsAt", "order"],
  },
  fields: [
    { name: "badge", type: "text", required: true, admin: { description: "e.g. 15% OFF, Bridal Season" } },
    { name: "title", type: "text", required: true },
    { name: "text", type: "textarea" },
    { name: "image", type: "upload", relationTo: "media", required: true },
    {
      type: "row",
      fields: [
        { name: "buttonLabel", type: "text", defaultValue: "Shop Now", required: true },
        { name: "link", type: "text", defaultValue: "/shop", required: true },
      ],
    },
    { name: "active", type: "checkbox", defaultValue: true, admin: { position: "sidebar" } },
    {
      name: "endsAt",
      type: "date",
      label: "Ends on",
      admin: { position: "sidebar", description: "Optional — the offer hides itself after this date." },
    },
    { name: "order", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};
