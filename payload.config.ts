import path from "path";
import { fileURLToPath } from "url";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
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
import { Payments } from "./cms/globals/Payments";
import { Settings } from "./cms/globals/Settings";
import { Stats } from "./cms/globals/Stats";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Database: local file `kangan.db` by default.
 * Live (Vercel): a Turso database — set DATABASE_URI + DATABASE_AUTH_TOKEN
 * (the Vercel Turso integration's TURSO_DATABASE_URL / TURSO_AUTH_TOKEN also work).
 *
 * Media uploads: saved in /media locally. On Vercel the disk is read-only, so
 * uploads go to Vercel Blob as soon as BLOB_READ_WRITE_TOKEN is set.
 */
const dbUrl = process.env.DATABASE_URI || process.env.TURSO_DATABASE_URL || "file:./kangan.db";
const dbToken = process.env.DATABASE_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN;

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: dirname },
    meta: { titleSuffix: " — Kangan Admin" },
  },
  collections: [Orders, Products, Categories, Slides, Offers, Testimonials, Media, Users],
  globals: [Payments, Settings, Stats],
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: sqliteAdapter({
    client: { url: dbUrl, authToken: dbToken },
    migrationDir: path.resolve(dirname, "migrations"),
    // Local development keeps the tables in sync automatically; live databases use `npm run migrate`.
    push: dbUrl.startsWith("file:"),
  }),
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: true,
    }),
  ],
  sharp,
});
