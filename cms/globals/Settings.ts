import type { GlobalConfig } from "payload";
import { isAdmin } from "../access";

export const Settings: GlobalConfig = {
  slug: "settings",
  label: "Site Settings",
  access: { read: isAdmin, update: isAdmin },
  admin: { group: "Settings" },
  fields: [
    {
      name: "announcement",
      type: "text",
      label: "Top bar message",
      defaultValue: "Door-to-door delivery across Pakistan & Bahrain",
    },
    {
      type: "row",
      fields: [
        {
          name: "whatsapp",
          type: "text",
          required: true,
          defaultValue: "923000000000",
          admin: { description: "International format, digits only, e.g. 923001234567" },
        },
        { name: "phone", type: "text", defaultValue: "+92 300 0000000" },
        { name: "email", type: "email", defaultValue: "info@kangan.com" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "instagram", type: "text", defaultValue: "https://instagram.com/" },
        { name: "facebook", type: "text", defaultValue: "https://facebook.com/" },
        { name: "tiktok", type: "text", defaultValue: "https://tiktok.com/" },
      ],
    },
  ],
};
