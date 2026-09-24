/* =========================================================
   KANGAN — Site settings, categories & products
   Edit this file to change WhatsApp, social links, or products.
   Order email settings live in .env.local (see .env.example).
   ========================================================= */

export const SITE = {
  // WhatsApp number in international format, digits only (no +, no spaces).
  // Example Pakistan: 923001234567  |  Bahrain: 97333123456
  whatsapp: "923000000000",
  phone: "+92 300 0000000",
  email: "info@kangan.com",
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  tiktok: "https://tiktok.com/",
};

export const CATEGORIES = ["jewellery", "handbags", "perfumes", "watches"] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_INFO: Record<
  Category,
  { title: string; kicker: string; intro: string; image: string }
> = {
  jewellery: {
    title: "Jewellery",
    kicker: "Elegance That Shines",
    intro: "Kundan, zircon, American Diamond and 18K gold-plated pieces — made for weddings, festive evenings and everyday elegance.",
    image: "/media/necklace-2.jpg",
  },
  handbags: {
    title: "Handbags",
    kicker: "Carry Your Style",
    intro: "Structured totes and top-handle bags that complete your outfit — from office days to evenings out.",
    image: "/media/bag-green.jpg",
  },
  perfumes: {
    title: "Perfumes",
    kicker: "Elegance in Every Drop",
    intro: "Signature fragrances that stay with you — find the scent that becomes part of who you are.",
    image: "/media/perfume.jpg",
  },
  watches: {
    title: "Watches",
    kicker: "Time, Styled Beautifully",
    intro: "Elegant watches for the modern woman — refined enough for occasions, easy enough for every day.",
    image: "1522312346375-d1a52e2b99b3",
  },
};

export type Product = {
  /** Product code, also used in the URL: /products/kj-101 */
  id: string;
  cat: Category;
  name: string;
  tag: string;
  /** First image is the main one. Unsplash photo id (placeholder) OR your own file, e.g. "/media/necklace.jpg" */
  images: string[];
  /** Optional product video shown in the gallery, e.g. "/media/reel-bangle.mp4" */
  video?: string;
  /** Leave "" to hide, or write e.g. "Rs 4,500 / BD 6" */
  price: string;
  desc: string;
  details?: string[];
  best?: boolean;
  isNew?: boolean;
};

export const PRODUCTS: Product[] = [
  // ---------- Jewellery ----------
  { id: "KJ-101", cat: "jewellery", name: "Royal Crystal Bangle Pair", tag: "Bangles",
    images: ["/media/bangle.jpg", "/media/bangle-model.jpg"], video: "/media/reel-bangle.mp4", price: "", best: true,
    desc: "A pair of gold-toned bangles lined with halo-set crystal stones that catch the light from every angle — made for weddings and festive evenings.",
    details: ["18K gold-plated finish", "Halo-set crystal stones", "Sold as a pair"] },
  { id: "KJ-102", cat: "jewellery", name: "Rose Gold Tennis Bracelet", tag: "Rose Gold",
    images: ["/media/rosegold.jpg", "/media/rosegold-model.jpg"], video: "/media/reel-rosegold.mp4", price: "", best: true,
    desc: "A sleek rose-gold link bracelet with a line of sparkling stones — delicate enough for every day, elegant enough for occasions.",
    details: ["Rose-gold plated", "Zircon stone line", "Secure box clasp"] },
  { id: "KJ-103", cat: "jewellery", name: "Heart Charm Bracelet", tag: "New",
    images: ["/media/heart.jpg", "/media/heart-model.jpg"], video: "/media/reel-heart.mp4", price: "", isNew: true,
    desc: "A playful gold bracelet with a pink crystal heart, emerald-green stones, pearls and a dangling heart charm.",
    details: ["Gold-plated", "Pink & green crystal stones", "Pearl accents with heart charm"] },
  { id: "KJ-104", cat: "jewellery", name: "Kundan Pearl Payal", tag: "Anklets",
    images: ["/media/anklet.jpg", "/media/anklet-2.jpg"], video: "/media/hero.mp4", price: "", best: true,
    desc: "Traditional layered anklets with kundan work and pearl drops — the perfect finishing touch for bridal and festive looks.",
    details: ["Kundan work", "Pearl drops", "Sold as a pair"] },
  { id: "KJ-105", cat: "jewellery", name: "Emerald Kundan Chandbali", tag: "Kundan",
    images: ["/media/earrings.jpg"], video: "/media/hero.mp4", price: "", isNew: true,
    desc: "Statement chandbali earrings in kundan with emerald-green drops — a timeless piece for weddings and celebrations.",
    details: ["Kundan setting", "Emerald-green bead drops", "Lightweight for all-day wear"] },
  { id: "KJ-106", cat: "jewellery", name: "Solitaire Cocktail Rings", tag: "American Diamond",
    images: ["/media/rings.jpg"], video: "/media/hero.mp4", price: "",
    desc: "A set of gold rings with American Diamond solitaire and emerald-cut stones — stack them or wear one on its own.",
    details: ["American Diamond stones", "Gold-plated bands", "Stackable set"] },
  { id: "KJ-107", cat: "jewellery", name: "Heritage Gold Necklace", tag: "18K Gold Plated",
    images: ["/media/necklace-2.jpg", "/media/necklace-3.jpg"], video: "/media/hero.mp4", price: "", best: true,
    desc: "A long gold-plated necklace with a detailed pendant — classic, elegant and easy to pair with formal and festive outfits.",
    details: ["18K gold-plated", "Detailed pendant", "Adjustable length"] },
  { id: "KJ-108", cat: "jewellery", name: "Layered Statement Necklace", tag: "Statement",
    images: ["/media/layered-necklace.jpg", "/media/runway.jpg"], video: "/media/reel-runway.mp4", price: "", isNew: true,
    desc: "A bold gold statement necklace with stone detailing, styled with stacked bracelets and rings straight from our runway look.",
    details: ["Gold-plated", "Stone detailing", "Statement size"] },

  // ---------- Handbags ----------
  { id: "KH-201", cat: "handbags", name: "Emerald Structured Tote", tag: "Tote",
    images: ["/media/bag-green.jpg", "/media/runway.jpg"], video: "/media/reel-runway.mp4", price: "", best: true,
    desc: "A structured tote in deep emerald green with top handles and a detachable strap — polished enough for office, stylish enough for evenings.",
    details: ["Structured shape", "Top handles + shoulder strap", "Roomy interior"] },
  { id: "KH-202", cat: "handbags", name: "Midnight Top-Handle Bag", tag: "Top Handle",
    images: ["/media/bag-black.jpg"], video: "/media/reel-runway.mp4", price: "", isNew: true,
    desc: "A classic black top-handle bag with gold-tone hardware — the everyday bag that goes with everything.",
    details: ["Gold-tone hardware", "Top handles", "Secure closure"] },
  { id: "KH-203", cat: "handbags", name: "Kangan Signature Tote", tag: "Signature",
    images: ["/media/bag-tan.jpg"], video: "/media/reel-runway.mp4", price: "", best: true,
    desc: "Our signature tan tote with the Kangan emblem — spacious, structured and made to be carried every day.",
    details: ["Kangan emblem", "Structured tote", "Everyday size"] },
  { id: "KH-204", cat: "handbags", name: "Floral Print Tote", tag: "Tote",
    images: ["1591561954557-26941169b49e"], price: "",
    desc: "A roomy tote in a soft floral print, combining a premium look with everyday functionality." },

  // ---------- Perfumes ----------
  { id: "KP-301", cat: "perfumes", name: "Kangan 12 AM Eau de Parfum", tag: "Signature",
    images: ["/media/perfume.jpg", "/media/perfume-2.jpg", "/media/perfume-model.jpg"], video: "/media/reel-perfume.mp4", price: "", best: true, isNew: true,
    desc: "Our signature midnight fragrance — a warm, sophisticated scent in a black-and-gold bottle, made for evenings that you want to remember.",
    details: ["Eau de Parfum", "Long-lasting evening scent", "Signature Kangan bottle"] },
  { id: "KP-302", cat: "perfumes", name: "Amber Nights", tag: "Evening",
    images: ["1588405748880-12d1d2a59f75"], price: "",
    desc: "A warm, sophisticated fragrance with amber and soft woody notes for evening occasions." },
  { id: "KP-303", cat: "perfumes", name: "Blossom Duo Gift Set", tag: "Gift Set",
    images: ["1557170334-a9632e77c6e4"], price: "",
    desc: "Two feminine fragrances in one gift set — one fresh and floral, one soft and sweet." },
  { id: "KP-304", cat: "perfumes", name: "Fresh Bloom Perfume Oil", tag: "Everyday",
    images: ["1617897903246-719242758050"], price: "",
    desc: "A light, long-lasting perfume oil with a fresh everyday character — your personal signature." },

  // ---------- Watches ----------
  { id: "KW-401", cat: "watches", name: "Rose Gold Chronograph", tag: "Rose Gold",
    images: ["1522312346375-d1a52e2b99b3"], price: "", best: true,
    desc: "A rose-gold chronograph with a leather strap — elegant enough for occasions, stylish for every day." },
  { id: "KW-402", cat: "watches", name: "Minimal Classic Watch", tag: "Minimal",
    images: ["1524592094714-0f0654e20314"], price: "",
    desc: "A clean white dial with a soft leather strap — understated elegance for the modern woman." },
  { id: "KW-403", cat: "watches", name: "Midnight Blue Watch", tag: "Classic",
    images: ["1619134778706-7015533a6150"], price: "",
    desc: "A deep blue sunray dial framed in polished steel with a navy strap — refined and contemporary." },
  { id: "KW-404", cat: "watches", name: "Heritage Leather Watch", tag: "Leather",
    images: ["1508057198894-247b23fe5ade"], price: "",
    desc: "A slim dark-dial watch with a gold-tone case and woven strap for an effortless everyday look." },
];

/** Short product videos on the home page. They only load when a visitor taps or hovers them. */
export const REELS = [
  { video: "/media/reel-bangle.mp4", poster: "/media/bangle.jpg", title: "Crystal Bangles", product: "KJ-101" },
  { video: "/media/reel-rosegold.mp4", poster: "/media/rosegold.jpg", title: "Rose Gold Bracelet", product: "KJ-102" },
  { video: "/media/reel-perfume.mp4", poster: "/media/perfume.jpg", title: "12 AM Perfume", product: "KP-301" },
  { video: "/media/reel-heart.mp4", poster: "/media/heart.jpg", title: "Heart Charm Bracelet", product: "KJ-103" },
  { video: "/media/reel-runway.mp4", poster: "/media/runway.jpg", title: "Runway Edit", product: "KH-201" },
];

export const productHref = (p: Product) => `/products/${p.id.toLowerCase()}`;
export const findProduct = (slug: string) => PRODUCTS.find((p) => p.id.toLowerCase() === slug.toLowerCase());
export const isCategory = (v: string): v is Category => (CATEGORIES as readonly string[]).includes(v);

/** Unsplash id → full URL; local "/media/..." or full URLs pass through unchanged. */
export const imgSrc = (image: string) =>
  /^(\/|https?:)/.test(image)
    ? image
    : `https://images.unsplash.com/photo-${image}?auto=format&fit=crop`;

export const waLink = (text?: string) =>
  `https://wa.me/${SITE.whatsapp}${text ? "?text=" + encodeURIComponent(text) : ""}`;
