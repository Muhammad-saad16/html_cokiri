import "server-only";
import config from "@payload-config";
import { connection } from "next/server";
import { getPayload, type Where } from "payload";
import { cache } from "react";
import type { Category, Offer, Product, SiteSettings, Slide, StatsBlock, Testimonial } from "@/lib/site";
import { formatPKR, productHref } from "@/lib/site";

/**
 * Server-only data access for the website, using Payload's Local API.
 * Every page waits for a request (connection()) so changes in /admin show up immediately.
 */
export const getCms = async () => {
  await connection();
  return getPayload({ config });
};

type MediaDoc = { url?: string | null; alt?: string | null } | number | null | undefined;

const mediaUrl = (m: MediaDoc) => (m && typeof m === "object" ? m.url ?? "" : "");
const mediaAlt = (m: MediaDoc) => (m && typeof m === "object" ? m.alt ?? "" : "");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Doc = Record<string, any>;

const toCategory = (d: Doc): Category => ({
  slug: d.slug,
  title: d.title,
  kicker: d.kicker ?? "",
  intro: d.intro ?? "",
  image: mediaUrl(d.image),
  subs: (d.subcategories ?? []).map((s: Doc) => s.name),
});

const toProduct = (d: Doc): Product => {
  const onSale = d.salePrice != null && d.price != null && d.salePrice < d.price;
  const amount = onSale ? d.salePrice : d.price ?? undefined;
  const tracked = Boolean(d.trackInventory);
  const stock = Number(d.stock ?? 0);
  return {
    id: d.code,
    cat: typeof d.category === "object" && d.category ? d.category.slug : "",
    sub: d.subCategory ?? "",
    name: d.name,
    tag: d.tag ?? "",
    images: (d.images ?? []).map(mediaUrl).filter(Boolean),
    video: mediaUrl(d.video) || undefined,
    price: formatPKR(amount),
    oldPrice: onSale ? formatPKR(d.price) : undefined,
    amount,
    desc: d.description ?? "",
    details: (d.details ?? []).map((x: Doc) => x.text),
    best: Boolean(d.featured),
    isNew: Boolean(d.isNew),
    soldOut: tracked && stock <= 0,
    lowStock: tracked && stock > 0 && stock <= 5 ? stock : undefined,
  };
};

export const getCategories = cache(async (): Promise<Category[]> => {
  const payload = await getCms();
  const res = await payload.find({ collection: "categories", sort: "order", depth: 1, limit: 100 });
  return res.docs.map(toCategory);
});

export const getProducts = cache(async (categorySlug?: string): Promise<Product[]> => {
  const payload = await getCms();
  const where: Where = { status: { equals: "published" } };
  if (categorySlug) where["category.slug"] = { equals: categorySlug };
  const res = await payload.find({ collection: "products", where, sort: "code", depth: 1, limit: 500 });
  return res.docs.map(toProduct).filter((p) => p.images.length > 0);
});

export const getProduct = cache(async (code: string): Promise<Product | null> => {
  const payload = await getCms();
  const res = await payload.find({
    collection: "products",
    where: { code: { equals: code.toUpperCase() }, status: { equals: "published" } },
    depth: 1,
    limit: 1,
  });
  return res.docs[0] ? toProduct(res.docs[0]) : null;
});

export const getSlides = cache(async (): Promise<Slide[]> => {
  const payload = await getCms();
  const res = await payload.find({ collection: "slides", where: { active: { equals: true } }, sort: "order", depth: 1, limit: 20 });
  return res.docs.map((d: Doc) => ({
    id: String(d.id),
    image: mediaUrl(d.image),
    video: mediaUrl(d.video) || undefined,
    alt: mediaAlt(d.image) || d.title || d.badge,
    badge: d.badge,
    showLogo: Boolean(d.showLogo),
    title: d.title ?? undefined,
    subtitle: d.subtitle ?? undefined,
    text: d.text ?? "",
    buttonLabel: d.buttonLabel ?? "Shop Now",
    link: d.link ?? "/shop",
  }));
});

export const getOffers = cache(async (): Promise<Offer[]> => {
  const payload = await getCms();
  const res = await payload.find({
    collection: "offers",
    where: {
      active: { equals: true },
      or: [{ endsAt: { exists: false } }, { endsAt: { greater_than: new Date().toISOString() } }],
    },
    sort: "order",
    depth: 1,
    limit: 20,
  });
  return res.docs.map((d: Doc) => ({
    id: String(d.id),
    badge: d.badge,
    title: d.title,
    text: d.text ?? "",
    image: mediaUrl(d.image),
    buttonLabel: d.buttonLabel ?? "Shop Now",
    link: d.link ?? "/shop",
  }));
});

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  const payload = await getCms();
  const res = await payload.find({ collection: "testimonials", where: { active: { equals: true } }, sort: "order", depth: 1, limit: 30 });
  return res.docs.map((d: Doc) => ({
    id: String(d.id),
    name: d.name,
    place: [d.city, d.country].filter(Boolean).join(", "),
    quote: d.quote,
    rating: Math.min(5, Math.max(1, Number(d.rating) || 5)),
    photo: mediaUrl(d.photo) || undefined,
    product:
      d.product && typeof d.product === "object" && d.product.status === "published"
        ? { name: d.product.name, href: productHref({ id: d.product.code }) }
        : undefined,
  }));
});

export const getStats = cache(async (): Promise<StatsBlock> => {
  const payload = await getCms();
  const s: Doc = await payload.findGlobal({ slug: "stats" });
  return {
    show: s.show !== false,
    heading: s.heading ?? "",
    items: (s.items ?? []).map((i: Doc) => ({
      value: Number(i.value) || 0,
      suffix: i.suffix ?? "",
      label: i.label,
      icon: i.icon ?? "heart",
    })),
  };
});

export const getSettings = cache(async (): Promise<SiteSettings> => {
  const payload = await getCms();
  const s: Doc = await payload.findGlobal({ slug: "settings" });
  return {
    announcement: s.announcement || "Door-to-door delivery across Pakistan & Bahrain",
    whatsapp: s.whatsapp || "923000000000",
    phone: s.phone || "",
    email: s.email || "",
    instagram: s.instagram || "",
    facebook: s.facebook || "",
    tiktok: s.tiktok || "",
  };
});
