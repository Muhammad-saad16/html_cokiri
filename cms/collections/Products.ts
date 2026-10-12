import type { CollectionConfig } from "payload";
import { isAdmin } from "../access";

export const Products: CollectionConfig = {
  slug: "products",
  access: { read: isAdmin, create: isAdmin, update: isAdmin, delete: isAdmin },
  defaultSort: "code",
  admin: {
    useAsTitle: "name",
    group: "Shop",
    defaultColumns: ["name", "code", "category", "price", "stock", "status"],
    listSearchableFields: ["name", "code", "subCategory", "tag"],
    description: "Your inventory. Stock goes down automatically when a customer places an order.",
  },
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true },
        {
          name: "code",
          type: "text",
          label: "Product code (SKU)",
          required: true,
          unique: true,
          index: true,
          admin: { description: "e.g. KJ-109 — also used in the URL." },
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "category", type: "relationship", relationTo: "categories", required: true },
        {
          name: "subCategory",
          type: "text",
          label: "Sub-category",
          admin: { description: "Must match one of the category's sub-categories, e.g. Earrings." },
        },
        { name: "tag", type: "text", label: "Card label", admin: { description: "Small label on the photo, e.g. Kundan" } },
      ],
    },
    {
      name: "images",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      required: true,
      admin: { description: "First image is the main photo. The second one shows when the card is hovered." },
    },
    { name: "video", type: "upload", relationTo: "media", label: "Product video (optional)" },
    { name: "description", type: "textarea", required: true },
    {
      name: "details",
      type: "array",
      label: "Detail bullet points",
      fields: [{ name: "text", type: "text", required: true }],
    },

    // ---- Sidebar: price, inventory, visibility ----
    {
      name: "status",
      type: "select",
      defaultValue: "published",
      options: [
        { label: "Published", value: "published" },
        { label: "Hidden (draft)", value: "draft" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "price",
      type: "number",
      label: "Price (PKR)",
      min: 0,
      admin: { position: "sidebar", description: "Leave empty to hide the price on the website." },
    },
    {
      name: "salePrice",
      type: "number",
      label: "Sale price (PKR)",
      min: 0,
      admin: { position: "sidebar", description: "Optional — shows the old price crossed out." },
    },
    {
      name: "trackInventory",
      type: "checkbox",
      label: "Track stock",
      defaultValue: true,
      admin: { position: "sidebar" },
    },
    {
      name: "stock",
      type: "number",
      label: "Stock quantity",
      defaultValue: 0,
      min: 0,
      admin: {
        position: "sidebar",
        condition: (data) => Boolean(data?.trackInventory),
        description: "At 0 the product shows as Sold Out and cannot be ordered.",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      label: "🔥 Hot product",
      admin: { position: "sidebar", description: "Shows in the Hot Products tab on the home page." },
    },
    {
      name: "isNew",
      type: "checkbox",
      label: "✨ New arrival",
      admin: { position: "sidebar", description: "Shows in the New Arrivals tab and gets a New label." },
    },
  ],
};
