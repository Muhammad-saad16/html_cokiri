/**
 * Fills an empty CMS database with the starter Kangan content.
 *   npm run seed          → only runs when there are no products yet
 *   npm run seed -- --force → wipes products, categories, slides & offers first
 */
import path from "path";
import { getPayload } from "payload";
import config from "../payload.config";
import {
  CATEGORIES,
  CATEGORY_INFO,
  HERO_SLIDES,
  OFFERS,
  PRODUCTS,
  SITE,
  STATS,
  SUBCATEGORIES,
  TESTIMONIALS,
  seedImageUrl,
} from "../cms/seed-data";

const STARTER_STOCK = 10;
const force = process.argv.includes("--force");

const payload = await getPayload({ config });
const publicDir = path.resolve(process.cwd(), "public");
const mediaCache = new Map<string, number>();

/** Uploads a local /media file or a remote image once and returns its Media id. */
async function media(src: string, alt: string): Promise<number | null> {
  const url = seedImageUrl(src);
  const cached = mediaCache.get(url);
  if (cached) return cached;
  try {
    let doc;
    if (url.startsWith("/")) {
      doc = await payload.create({ collection: "media", data: { alt }, filePath: path.join(publicDir, url) });
    } else {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = Buffer.from(await res.arrayBuffer());
      const name = `${src.replace(/[^\w-]/g, "")}.jpg`;
      doc = await payload.create({
        collection: "media",
        data: { alt },
        file: { data, mimetype: "image/jpeg", name, size: data.length },
      });
    }
    mediaCache.set(url, doc.id);
    return doc.id;
  } catch (err) {
    console.warn(`  ! skipped image ${src}: ${(err as Error).message}`);
    return null;
  }
}

/** Sample testimonials & stats — added only when those sections are still empty. */
async function seedExtras() {
  if ((await payload.count({ collection: "testimonials" })).totalDocs === 0) {
    console.log("Testimonials (samples)…");
    for (const [order, t] of TESTIMONIALS.entries()) {
      const product = await payload.find({ collection: "products", where: { code: { equals: t.product } }, limit: 1 });
      await payload.create({
        collection: "testimonials",
        data: {
          name: t.name,
          city: t.city,
          country: t.country as "Pakistan" | "Bahrain",
          rating: t.rating,
          quote: t.quote,
          product: product.docs[0]?.id,
          order,
          active: true,
        },
      });
    }
  }
  const stats = await payload.findGlobal({ slug: "stats" });
  if (!stats.items?.length) {
    console.log("Numbers & stats (samples)…");
    await payload.updateGlobal({
      slug: "stats",
      data: {
        show: true,
        heading: STATS.heading,
        items: STATS.items.map((s) => ({ ...s, icon: s.icon as "heart" | "bag" | "pin" | "star" | "clock" })),
      },
    });
  }
}

const existing = await payload.count({ collection: "products" });
if (existing.totalDocs > 0 && !force) {
  await seedExtras();
  console.log(`Catalogue already has ${existing.totalDocs} products — kept as is. Use "npm run seed -- --force" to start over.`);
  process.exit(0);
}

if (force) {
  for (const collection of ["orders", "testimonials", "products", "categories", "slides", "offers", "media"] as const) {
    await payload.delete({ collection, where: { id: { exists: true } } });
  }
  console.log("Cleared existing content.");
}

console.log("Categories…");
const categoryIds: Record<string, number> = {};
for (const [order, slug] of CATEGORIES.entries()) {
  const info = CATEGORY_INFO[slug];
  const doc = await payload.create({
    collection: "categories",
    data: {
      title: info.title,
      slug,
      kicker: info.kicker,
      intro: info.intro,
      image: (await media(info.image, info.title)) ?? undefined,
      subcategories: SUBCATEGORIES[slug].map((name) => ({ name })),
      order,
    },
  });
  categoryIds[slug] = doc.id;
}

console.log("Products…");
for (const p of PRODUCTS) {
  const images = (await Promise.all(p.images.map((src) => media(src, p.name)))).filter((x) => x != null);
  if (images.length === 0) {
    console.warn(`  ! ${p.id} has no images, skipped`);
    continue;
  }
  await payload.create({
    collection: "products",
    data: {
      name: p.name,
      code: p.id,
      category: categoryIds[p.cat],
      subCategory: p.sub,
      tag: p.tag,
      images,
      video: p.video ? ((await media(p.video, `${p.name} video`)) ?? undefined) : undefined,
      description: p.desc,
      details: (p.details ?? []).map((text) => ({ text })),
      status: "published",
      trackInventory: true,
      stock: STARTER_STOCK,
      featured: Boolean(p.best),
      isNew: Boolean(p.isNew),
    },
  });
  console.log(`  ✓ ${p.id} ${p.name}`);
}

console.log("Hero slides…");
for (const [order, s] of HERO_SLIDES.entries()) {
  const image = await media(s.image, s.title ?? s.badge);
  if (!image) continue;
  await payload.create({ collection: "slides", data: { ...s, image, order, active: true } });
}

console.log("Offers…");
for (const [order, o] of OFFERS.entries()) {
  const image = await media(o.image, o.title);
  if (!image) continue;
  await payload.create({
    collection: "offers",
    data: { badge: o.badge, title: o.title, text: o.text, image, link: o.href, buttonLabel: o.cta, order, active: true },
  });
}

await payload.updateGlobal({
  slug: "settings",
  data: {
    announcement: "Door-to-door delivery across Pakistan & Bahrain",
    whatsapp: SITE.whatsapp,
    phone: SITE.phone,
    email: SITE.email,
    instagram: SITE.instagram,
    facebook: SITE.facebook,
    tiktok: SITE.tiktok,
  },
});

await seedExtras();

console.log(`Done. Every product starts with stock = ${STARTER_STOCK} — update real quantities in /admin.`);
process.exit(0);
