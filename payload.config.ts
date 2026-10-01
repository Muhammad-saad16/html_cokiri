import path from "path";
import { fileURLToPath } from "url";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Categories } from "./cms/collections/Categories";
import { Media } from "./cms/collections/Media";
import { Offers } from "./cms/collections/Offers";
import { Orders } from "./cms/collections/Orders";
import { Products } from "./cms/collections/Products";
import { Slides } from "./cms/collections/Slides";
import { Testimonials } from "./cms/collections/Testimonials";
import { Users } from "./cms/collections/Users";
import { Settings } from "./cms/globals/Settings";
import { Stats } from "./cms/globals/Stats";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: dirname },
    meta: { titleSuffix: " — Kangan Admin" },
  },
  collections: [Products, Categories, Orders, Slides, Offers, Testimonials, Media, Users],
  globals: [Stats, Settings],
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URI || "file:./kangan.db" },
  }),
  sharp,
});
