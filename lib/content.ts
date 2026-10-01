/* =========================================================
   KANGAN — All website content lives in this file.
   Edit it to change products, prices, categories, offers,
   the home slider, testimonials, numbers and contact details.
   ========================================================= */

export const SITE = {
  announcement: "Door-to-door delivery across Pakistan & Bahrain",
  // WhatsApp number in international format, digits only (no +, no spaces).
  // Example Pakistan: 923001234567  |  Bahrain: 97333123456
  whatsapp: "923000000000",
  phone: "+92 300 0000000",
  email: "info@kangan.com",
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  tiktok: "https://tiktok.com/",
};

export const CATEGORIES = ["jewellery", "handbags", "watches", "perfumes"] as const;
export type CategorySlug = (typeof CATEGORIES)[number];

export const CATEGORY_INFO: Record<
  CategorySlug,
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

/** Sub-categories per collection, in the order they appear as filters. */
export const SUBCATEGORIES: Record<CategorySlug, string[]> = {
  jewellery: ["Bangles & Bracelets", "Necklaces", "Earrings", "Rings", "Anklets"],
  handbags: ["Totes", "Top Handle"],
  perfumes: ["Eau de Parfum", "Gift Sets", "Perfume Oils"],
  watches: ["Chronograph", "Minimal", "Classic"],
};

/**
 * Current offers — shown on the home page (hero + offers slider).
 * PLACEHOLDERS: replace with the real running offers, or delete an entry to hide it.
 */
export const OFFERS = [
  {
    badge: "Bridal Season",
    title: "Bridal & Festive Jewellery",
    text: "Kundan, zircon and gold-plated sets for weddings and Eid — ask us about bundle prices.",
    image: "/media/necklace-3.jpg",
    href: "/collections/jewellery",
    cta: "Shop Jewellery",
  },
  {
    badge: "Signature Scent",
    title: "Kangan 12 AM Eau de Parfum",
    text: "Our midnight fragrance in the black-and-gold bottle — the perfect gift.",
    image: "/media/perfume-2.jpg",
    href: "/products/kp-301",
    cta: "Order 12 AM",
  },
  {
    badge: "New Arrivals",
    title: "The Emerald Handbag Edit",
    text: "Structured totes and top-handle bags to complete every outfit.",
    image: "/media/bag-green.jpg",
    href: "/collections/handbags",
    cta: "Shop Bags",
  },
];

export type ProductEntry = {
  /** Product code, also used in the URL: /products/kj-101 */
  id: string;
  cat: CategorySlug;
  /** Sub-category shown as a filter on the collection page — must be one of SUBCATEGORIES[cat] */
  sub: string;
  name: string;
  tag: string;
  /** First image is the main one. Unsplash photo id (placeholder) OR your own file, e.g. "/media/necklace.jpg" */
  images: string[];
  /** Optional product video shown in the gallery, e.g. "/media/reel-bangle.mp4" */
  video?: string;
  /** Leave "" to hide, or write e.g. "PKR 4,500" */
  price: string;
  /** Optional old price shown crossed out, e.g. "PKR 5,500" */
  oldPrice?: string;
  /** Set to true to show "Sold Out" and hide the order form */
  soldOut?: boolean;
  desc: string;
  details?: string[];
  /** Shows in the "Hot Products" tab on the home page */
  best?: boolean;
  /** Shows in the "New Arrivals" tab and gets a New label */
  isNew?: boolean;
};

export const PRODUCTS: ProductEntry[] = [
  // ---------- Jewellery ----------
  { id: "KJ-101", cat: "jewellery", sub: "Bangles & Bracelets", name: "Royal Crystal Bangle Pair", tag: "Bangles",
    images: ["/media/bangle.jpg", "/media/bangle-model.jpg"], video: "/media/reel-bangle.mp4", price: "", best: true,
    desc: "A pair of gold-toned bangles lined with halo-set crystal stones that catch the light from every angle — made for weddings and festive evenings.",
    details: ["18K gold-plated finish", "Halo-set crystal stones", "Sold as a pair"] },
  { id: "KJ-102", cat: "jewellery", sub: "Bangles & Bracelets", name: "Rose Gold Tennis Bracelet", tag: "Rose Gold",
    images: ["/media/rosegold.jpg", "/media/rosegold-model.jpg"], video: "/media/reel-rosegold.mp4", price: "", best: true,
    desc: "A sleek rose-gold link bracelet with a line of sparkling stones — delicate enough for every day, elegant enough for occasions.",
    details: ["Rose-gold plated", "Zircon stone line", "Secure box clasp"] },
  { id: "KJ-103", cat: "jewellery", sub: "Bangles & Bracelets", name: "Heart Charm Bracelet", tag: "New",
    images: ["/media/heart.jpg", "/media/heart-model.jpg"], video: "/media/reel-heart.mp4", price: "", isNew: true,
    desc: "A playful gold bracelet with a pink crystal heart, emerald-green stones, pearls and a dangling heart charm.",
    details: ["Gold-plated", "Pink & green crystal stones", "Pearl accents with heart charm"] },
  { id: "KJ-104", cat: "jewellery", sub: "Anklets", name: "Kundan Pearl Payal", tag: "Anklets",
    images: ["/media/anklet.jpg", "/media/anklet-2.jpg"], video: "/media/hero.mp4", price: "", best: true,
    desc: "Traditional layered anklets with kundan work and pearl drops — the perfect finishing touch for bridal and festive looks.",
    details: ["Kundan work", "Pearl drops", "Sold as a pair"] },
  { id: "KJ-105", cat: "jewellery", sub: "Earrings", name: "Emerald Kundan Chandbali", tag: "Kundan",
    images: ["/media/earrings.jpg"], video: "/media/hero.mp4", price: "", isNew: true,
    desc: "Statement chandbali earrings in kundan with emerald-green drops — a timeless piece for weddings and celebrations.",
    details: ["Kundan setting", "Emerald-green bead drops", "Lightweight for all-day wear"] },
  { id: "KJ-106", cat: "jewellery", sub: "Rings", name: "Solitaire Cocktail Rings", tag: "American Diamond",
    images: ["/media/rings.jpg"], video: "/media/hero.mp4", price: "",
    desc: "A set of gold rings with American Diamond solitaire and emerald-cut stones — stack them or wear one on its own.",
    details: ["American Diamond stones", "Gold-plated bands", "Stackable set"] },
  { id: "KJ-107", cat: "jewellery", sub: "Necklaces", name: "Heritage Gold Necklace", tag: "18K Gold Plated",
    images: ["/media/necklace-2.jpg", "/media/necklace-3.jpg"], video: "/media/hero.mp4", price: "", best: true,
    desc: "A long gold-plated necklace with a detailed pendant — classic, elegant and easy to pair with formal and festive outfits.",
    details: ["18K gold-plated", "Detailed pendant", "Adjustable length"] },
  { id: "KJ-108", cat: "jewellery", sub: "Necklaces", name: "Layered Statement Necklace", tag: "Statement",
    images: ["/media/layered-necklace.jpg", "/media/runway.jpg"], video: "/media/reel-runway.mp4", price: "", isNew: true,
    desc: "A bold gold statement necklace with stone detailing, styled with stacked bracelets and rings straight from our runway look.",
    details: ["Gold-plated", "Stone detailing", "Statement size"] },

  // ---------- Handbags ----------
  { id: "KH-201", cat: "handbags", sub: "Totes", name: "Emerald Structured Tote", tag: "Tote",
    images: ["/media/bag-green.jpg", "/media/runway.jpg"], video: "/media/reel-runway.mp4", price: "", best: true,
    desc: "A structured tote in deep emerald green with top handles and a detachable strap — polished enough for office, stylish enough for evenings.",
    details: ["Structured shape", "Top handles + shoulder strap", "Roomy interior"] },
  { id: "KH-202", cat: "handbags", sub: "Top Handle", name: "Midnight Top-Handle Bag", tag: "Top Handle",
    images: ["/media/bag-black.jpg"], video: "/media/reel-runway.mp4", price: "", isNew: true,
    desc: "A classic black top-handle bag with gold-tone hardware — the everyday bag that goes with everything.",
    details: ["Gold-tone hardware", "Top handles", "Secure closure"] },
  { id: "KH-203", cat: "handbags", sub: "Totes", name: "Kangan Signature Tote", tag: "Signature",
    images: ["/media/bag-tan.jpg"], video: "/media/reel-runway.mp4", price: "", best: true,
    desc: "Our signature tan tote with the Kangan emblem — spacious, structured and made to be carried every day.",
    details: ["Kangan emblem", "Structured tote", "Everyday size"] },
  { id: "KH-204", cat: "handbags", sub: "Totes", name: "Floral Print Tote", tag: "Tote",
    images: ["1591561954557-26941169b49e"], price: "",
    desc: "A roomy tote in a soft floral print, combining a premium look with everyday functionality." },

  // ---------- Perfumes ----------
  { id: "KP-301", cat: "perfumes", sub: "Eau de Parfum", name: "Kangan 12 AM Eau de Parfum", tag: "Signature",
    images: ["/media/perfume.jpg", "/media/perfume-2.jpg", "/media/perfume-model.jpg"], video: "/media/reel-perfume.mp4", price: "", best: true, isNew: true,
    desc: "Our signature midnight fragrance — a warm, sophisticated scent in a black-and-gold bottle, made for evenings that you want to remember.",
    details: ["Eau de Parfum", "Long-lasting evening scent", "Signature Kangan bottle"] },
  { id: "KP-302", cat: "perfumes", sub: "Eau de Parfum", name: "Amber Nights", tag: "Evening",
    images: ["1588405748880-12d1d2a59f75"], price: "",
    desc: "A warm, sophisticated fragrance with amber and soft woody notes for evening occasions." },
  { id: "KP-303", cat: "perfumes", sub: "Gift Sets", name: "Blossom Duo Gift Set", tag: "Gift Set",
    images: ["1557170334-a9632e77c6e4"], price: "",
    desc: "Two feminine fragrances in one gift set — one fresh and floral, one soft and sweet." },
  { id: "KP-304", cat: "perfumes", sub: "Perfume Oils", name: "Fresh Bloom Perfume Oil", tag: "Everyday",
    images: ["1617897903246-719242758050"], price: "",
    desc: "A light, long-lasting perfume oil with a fresh everyday character — your personal signature." },

  // ---------- Watches ----------
  { id: "KW-401", cat: "watches", sub: "Chronograph", name: "Rose Gold Chronograph", tag: "Rose Gold",
    images: ["1522312346375-d1a52e2b99b3"], price: "", best: true,
    desc: "A rose-gold chronograph with a leather strap — elegant enough for occasions, stylish for every day." },
  { id: "KW-402", cat: "watches", sub: "Minimal", name: "Minimal Classic Watch", tag: "Minimal",
    images: ["1524592094714-0f0654e20314"], price: "",
    desc: "A clean white dial with a soft leather strap — understated elegance for the modern woman." },
  { id: "KW-403", cat: "watches", sub: "Classic", name: "Midnight Blue Watch", tag: "Classic",
    images: ["1619134778706-7015533a6150"], price: "",
    desc: "A deep blue sunray dial framed in polished steel with a navy strap — refined and contemporary." },
  { id: "KW-404", cat: "watches", sub: "Classic", name: "Heritage Leather Watch", tag: "Leather",
    images: ["1508057198894-247b23fe5ade"], price: "",
    desc: "A slim dark-dial watch with a gold-tone case and woven strap for an effortless everyday look." },
];

/** Home page hero slider */
export const HERO_SLIDES = [
  { image: "/media/bangle-model.jpg", badge: "Serving you since 2012", showLogo: true,
    text: "Elegant jewellery, stylish bags, watches and premium fragrances — all in one place.",
    buttonLabel: "Shop Now", link: "/shop" },
  { image: "/media/necklace-3.jpg", badge: "Bridal Season Offer", title: "Wear Your Statement", subtitle: "Bridal & Festive Jewellery",
    text: "Kundan, zircon and 18K gold-plated pieces made for weddings, Eid and every celebration.",
    buttonLabel: "Shop Jewellery", link: "/collections/jewellery" },
  { image: "/media/bag-green.jpg", badge: "New Arrivals", title: "Carry Your Style", subtitle: "The Emerald Handbag Edit",
    text: "Structured totes and top-handle bags — polished for the office, elegant for evenings.",
    buttonLabel: "Shop Handbags", link: "/collections/handbags" },
  { image: "/media/perfume-2.jpg", badge: "Signature Scent", title: "Elegance in Every Drop", subtitle: "Kangan 12 AM",
    text: "Our signature midnight fragrance — warm, sophisticated and unforgettable.",
    buttonLabel: "Discover 12 AM", link: "/products/kp-301" },
];

/**
 * SAMPLE reviews so the section can be previewed — replace them with REAL
 * customer reviews before going live (or delete them all to hide the section).
 */
export const TESTIMONIALS = [
  { name: "Ayesha K.", city: "Lahore", country: "Pakistan", rating: 5, product: "KJ-101",
    quote: "The bangles looked even more beautiful in person. They called me to confirm the order and it was at my door in three days." },
  { name: "Fatima R.", city: "Manama", country: "Bahrain", rating: 5, product: "KP-301",
    quote: "12 AM has become my signature scent — I get compliments every time I wear it. Lovely packaging too." },
  { name: "Hira S.", city: "Karachi", country: "Pakistan", rating: 5, product: "KH-201",
    quote: "My emerald tote is so elegant and roomy. Ordering on WhatsApp was easy and the team was very kind." },
  { name: "Mariam A.", city: "Islamabad", country: "Pakistan", rating: 4, product: "KJ-105",
    quote: "Wore the kundan chandbali to my cousin's mehndi and everyone asked where they were from." },
];

/** SAMPLE figures — replace with REAL numbers before going live (set show: false to hide). */
export const STATS = {
  show: true,
  heading: "Trusted by Women Across Pakistan & Bahrain",
  items: [
    { value: 25, suffix: "K+", label: "Instagram followers", icon: "heart" },
    { value: 5000, suffix: "+", label: "Orders delivered in Pakistan", icon: "bag" },
    { value: 1500, suffix: "+", label: "Orders delivered in Bahrain", icon: "pin" },
    { value: new Date().getFullYear() - 2012, suffix: "", label: "Years of elegance", icon: "clock" },
  ],
};

/** Unsplash id → full URL; local "/media/..." paths pass through unchanged. */
export const imageUrl = (image: string) =>
  /^(\/|https?:)/.test(image) ? image : `https://images.unsplash.com/photo-${image}?auto=format&fit=crop`;
