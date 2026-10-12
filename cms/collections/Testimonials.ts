import type { CollectionConfig } from "payload";
import { isAdmin } from "../access";

/** Customer reviews shown on the home page. */
export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: { singular: "Testimonial", plural: "Testimonials" },
  access: { read: isAdmin, create: isAdmin, update: isAdmin, delete: isAdmin },
  defaultSort: "order",
  admin: {
    useAsTitle: "name",
    group: "Home Page",
    defaultColumns: ["name", "city", "country", "rating", "active"],
    description: "Real customer reviews (e.g. from WhatsApp or Instagram). Only active ones show on the website.",
  },
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true, label: "Customer name" },
        { name: "city", type: "text" },
        {
          name: "country",
          type: "select",
          defaultValue: "Pakistan",
          options: ["Pakistan", "Bahrain"],
        },
      ],
    },
    { name: "quote", type: "textarea", required: true, label: "Review" },
    {
      type: "row",
      fields: [
        { name: "rating", type: "number", min: 1, max: 5, defaultValue: 5, required: true, label: "Stars (1–5)" },
        { name: "product", type: "relationship", relationTo: "products", label: "Product bought (optional)" },
      ],
    },
    { name: "photo", type: "upload", relationTo: "media", label: "Customer photo (optional)" },
    { name: "active", type: "checkbox", defaultValue: true, admin: { position: "sidebar" } },
    { name: "order", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};
