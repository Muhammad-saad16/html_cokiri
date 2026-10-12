/**
 * Runs before `next build`: brings a live (Turso) database up to date with the
 * migrations in /migrations. The local file database is kept in sync
 * automatically during `npm run dev`, so it is skipped here.
 */
import { execSync } from "node:child_process";

const url = process.env.DATABASE_URI || process.env.TURSO_DATABASE_URL || "";
if (!url || url.startsWith("file:")) {
  console.log("[migrate] Local database — skipping migrations.");
} else {
  console.log("[migrate] Running database migrations…");
  execSync("npx payload migrate", { stdio: "inherit" });
}
