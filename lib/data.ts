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
  imageUrl,
  type ProductEntry,
} from "@/lib/content";
import type { Category, Offer, Product, SiteSettings, Slide, StatsBlock, Testimonial } from "@/lib/site";
import { productHref } from "@/lib/site";

/** Reads the website content from lib/content.ts in the shape the pages expect. */

const toProduct = (p: ProductEntry): Product => ({
  id: p.id,
  cat: p.cat,
  sub: p.sub,
  name: p.name,
  tag: p.tag,
  images: p.images.map(imageUrl),
  video: p.video,
  price: p.price,
  oldPrice: p.oldPrice,
  desc: p.desc,
  details: p.details,
  best: p.best,
  isNew: p.isNew,
  soldOut: Boolean(p.soldOut),
});

export const getCategories = async (): Promise<Category[]> =>
  CATEGORIES.map((slug) => ({
    slug,
    title: CATEGORY_INFO[slug].title,
    kicker: CATEGORY_INFO[slug].kicker,
    intro: CATEGORY_INFO[slug].intro,
    image: imageUrl(CATEGORY_INFO[slug].image),
    subs: SUBCATEGORIES[slug],
  }));

export const getProducts = async (categorySlug?: string): Promise<Product[]> =>
  PRODUCTS.filter((p) => !categorySlug || p.cat === categorySlug).map(toProduct);

export const getProduct = async (code: string): Promise<Product | null> => {
  const p = PRODUCTS.find((x) => x.id.toLowerCase() === code.toLowerCase());
  return p ? toProduct(p) : null;
};

export const getSlides = async (): Promise<Slide[]> =>
  HERO_SLIDES.map((s, i) => ({
    id: String(i),
    image: imageUrl(s.image),
    alt: s.title ?? s.badge,
    badge: s.badge,
    showLogo: Boolean(s.showLogo),
    title: s.title,
    subtitle: s.subtitle,
    text: s.text,
    buttonLabel: s.buttonLabel,
    link: s.link,
  }));

export const getOffers = async (): Promise<Offer[]> =>
  OFFERS.map((o, i) => ({
    id: String(i),
    badge: o.badge,
    title: o.title,
    text: o.text,
    image: imageUrl(o.image),
    buttonLabel: o.cta,
    link: o.href,
  }));

export const getTestimonials = async (): Promise<Testimonial[]> =>
  TESTIMONIALS.map((t, i) => {
    const product = PRODUCTS.find((p) => p.id === t.product);
    return {
      id: String(i),
      name: t.name,
      place: [t.city, t.country].filter(Boolean).join(", "),
      quote: t.quote,
      rating: Math.min(5, Math.max(1, t.rating)),
      product: product ? { name: product.name, href: productHref(product) } : undefined,
    };
  });

export const getStats = async (): Promise<StatsBlock> => STATS;

export const getSettings = async (): Promise<SiteSettings> => SITE;
