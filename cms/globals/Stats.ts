import type { GlobalConfig } from "payload";
import { isAdmin } from "../access";

/** The animated numbers band on the home page (followers, orders delivered…). */
export const Stats: GlobalConfig = {
  slug: "stats",
  label: "Numbers & Stats",
  access: { read: isAdmin, update: isAdmin },
  admin: { group: "Home Page" },
  fields: [
    { name: "show", type: "checkbox", label: "Show on home page", defaultValue: true },
    { name: "heading", type: "text", defaultValue: "Trusted by Women Across Pakistan & Bahrain" },
    {
      name: "items",
      type: "array",
      label: "Numbers",
      maxRows: 6,
      admin: { description: "Use your real figures — they count up when the visitor scrolls to them." },
      fields: [
        {
          type: "row",
          fields: [
            { name: "value", type: "number", required: true, min: 0 },
            { name: "suffix", type: "text", defaultValue: "+", admin: { description: "e.g. +, K+, %" } },
            { name: "label", type: "text", required: true, admin: { description: "e.g. Orders delivered in Pakistan" } },
            {
              name: "icon",
              type: "select",
              defaultValue: "heart",
              options: [
                { label: "Heart (followers)", value: "heart" },
                { label: "Bag (orders)", value: "bag" },
                { label: "Pin (country)", value: "pin" },
                { label: "Star (reviews)", value: "star" },
                { label: "Clock (years)", value: "clock" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
