/* =========================================================
   KANGAN — Shared types & helpers for the website.
   The content itself (products, categories, offers…) is in lib/content.ts
   ========================================================= */

export type Category = {
  slug: string;
  title: string;
  kicker: string;
  intro: string;
  image: string;
  /** Sub-categories shown as filters on the collection page */
  subs: string[];
};

export type Product = {
  /** Product code (SKU), also used in the URL: /products/kj-101 */
  id: string;
  /** Category slug */
  cat: string;
  sub: string;
  name: string;
  tag: string;
  /** Image URLs — first one is the main photo */
  images: string[];
  video?: string;
  /** Formatted price, "" when hidden */
  price: string;
  /** Formatted old price when a sale price is set */
  oldPrice?: string;
  /** Unit price in PKR used for the order total */
  amount?: number;
  desc: string;
  details?: string[];
  best?: boolean;
  isNew?: boolean;
  soldOut: boolean;
  /** Units left when stock is tracked and low (1–5), otherwise undefined */
  lowStock?: number;
};

export type Slide = {
  id: string;
  image: string;
  alt: string;
  badge: string;
  showLogo: boolean;
  title?: string;
  subtitle?: string;
  text: string;
  buttonLabel: string;
  link: string;
};

export type Offer = {
  id: string;
  badge: string;
  title: string;
  text: string;
  image: string;
  buttonLabel: string;
  link: string;
};

export type Testimonial = {
  id: string;
  name: string;
  place: string;
  quote: string;
  rating: number;
  photo?: string;
  product?: { name: string; href: string };
};

export type StatItem = { value: number; suffix: string; label: string; icon: string };
export type StatsBlock = { show: boolean; heading: string; items: StatItem[] };

export type SiteSettings = {
  announcement: string;
  whatsapp: string;
  phone: string;
  email: string;
  instagram: string;
  facebook: string;
  tiktok: string;
};

export const productHref = (p: Pick<Product, "id">) => `/products/${p.id.toLowerCase()}`;

export const formatPKR = (n?: number | null) => (n == null ? "" : `PKR ${n.toLocaleString("en-US")}`);

export const waLink = (whatsapp: string, text?: string) =>
  `https://wa.me/${whatsapp.replace(/\D/g, "")}${text ? "?text=" + encodeURIComponent(text) : ""}`;
