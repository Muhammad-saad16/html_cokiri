import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Admin User", plural: "Admin Users" },
  auth: true,
  admin: { useAsTitle: "email", group: "Settings" },
  fields: [{ name: "name", type: "text" }],
};
