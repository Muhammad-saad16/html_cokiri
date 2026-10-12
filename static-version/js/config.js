/* =========================================================
   KANGAN — Site settings & products
   Edit this file only to change email, WhatsApp, or products.
   ========================================================= */

const SITE = {
  // Orders are emailed here (via FormSubmit.co — free, no backend needed).
  // IMPORTANT: The very first order sends an "Activate form" email to this
  // address. Open it and click Activate once — after that every order arrives.
  orderEmail: "your-email@example.com",

  // WhatsApp number in international format, digits only (no +, no spaces).
  // Example Pakistan: 923001234567  |  Bahrain: 97333123456
  whatsapp: "923000000000",

  phone: "+92 300 0000000",
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  tiktok: "https://tiktok.com/",
};

/* image: an Unsplash photo id (placeholder) OR your own file, e.g. "images/necklace-1.jpg"
   price: leave "" to hide, or write e.g. "Rs 4,500 / BD 6"                               */
const PRODUCTS = [
  // ---------- Jewellery ----------
  { id: "KJ-101", cat: "jewellery", name: "Royal Kundan Necklace Set", tag: "Kundan",
    image: "1601121141461-9d6647bca1ed", price: "",
    desc: "A statement kundan necklace with matching earrings, finished in rich 18K gold plating — made for weddings and festive evenings." },
  { id: "KJ-102", cat: "jewellery", name: "Zircon Drop Earrings", tag: "Zircon",
    image: "1535632066927-ab7c9ab60908", price: "",
    desc: "Elegant drop earrings set with sparkling zircon stones and a deep blue centre stone for a sophisticated look." },
  { id: "KJ-103", cat: "jewellery", name: "American Diamond Solitaire Ring", tag: "American Diamond",
    image: "1605100804763-247f67b3557e", price: "",
    desc: "A classic solitaire ring with an American Diamond halo — timeless elegance for everyday wear or special occasions." },
  { id: "KJ-104", cat: "jewellery", name: "Rose Gold Crystal Bracelet", tag: "Bracelet",
    image: "1611591437281-460bfbe1220a", price: "",
    desc: "A delicate rose-gold plated bracelet lined with crystal stones that catch the light beautifully." },
  { id: "KJ-105", cat: "jewellery", name: "18K Gold-Plated Chain Bracelet", tag: "18K Gold Plated",
    image: "1602173574767-37ac01994b2a", price: "",
    desc: "A bold link bracelet with an 18K gold-plated finish — a modern piece that elevates any outfit." },
  { id: "KJ-106", cat: "jewellery", name: "Layered Crescent Pendant", tag: "Pendant",
    image: "1599643478518-a784e5dc4c8f", price: "",
    desc: "Two delicate layered chains with a gemstone drop and crescent charm for an effortless, elegant layered look." },

  // ---------- Handbags ----------
  { id: "KH-201", cat: "handbags", name: "Blush Chain Shoulder Bag", tag: "Shoulder Bag",
    image: "1566150905458-1bf1fc113f0d", price: "",
    desc: "A soft blush shoulder bag with a slim chain strap — compact, chic and perfect for evenings out." },
  { id: "KH-202", cat: "handbags", name: "Scarlet Top-Handle Bag", tag: "Top Handle",
    image: "1584917865442-de89df76afd3", price: "",
    desc: "A structured top-handle bag in a glossy scarlet finish with a statement clasp — made to be noticed." },
  { id: "KH-203", cat: "handbags", name: "Tan Woven Handbag", tag: "Trending",
    image: "1590874103328-eac38a683ce7", price: "",
    desc: "A trending woven handbag with a smooth leather-look flap — the perfect everyday companion." },
  { id: "KH-204", cat: "handbags", name: "Floral Print Tote", tag: "Tote",
    image: "1591561954557-26941169b49e", price: "",
    desc: "A roomy tote in a soft floral print, combining a premium look with everyday functionality." },

  // ---------- Perfumes ----------
  { id: "KP-301", cat: "perfumes", name: "Amber Nights Eau de Parfum", tag: "Evening",
    image: "1588405748880-12d1d2a59f75", price: "",
    desc: "A warm, sophisticated fragrance with amber and soft woody notes for evening occasions." },
  { id: "KP-302", cat: "perfumes", name: "Blossom Duo Gift Set", tag: "Gift Set",
    image: "1557170334-a9632e77c6e4", price: "",
    desc: "Two feminine fragrances in one gift set — one fresh and floral, one soft and sweet." },
  { id: "KP-303", cat: "perfumes", name: "Signature Collection", tag: "Collection",
    image: "1615634260167-c8cdede054de", price: "",
    desc: "Discover our signature range of fragrances — ask us for the full list of scents available." },
  { id: "KP-304", cat: "perfumes", name: "Fresh Bloom Perfume Oil", tag: "Everyday",
    image: "1617897903246-719242758050", price: "",
    desc: "A light, long-lasting perfume oil with a fresh everyday character — your personal signature." },

  // ---------- Watches ----------
  { id: "KW-401", cat: "watches", name: "Rose Gold Chronograph", tag: "Rose Gold",
    image: "1522312346375-d1a52e2b99b3", price: "",
    desc: "A rose-gold chronograph with a leather strap — elegant enough for occasions, stylish for every day." },
  { id: "KW-402", cat: "watches", name: "Minimal Classic Watch", tag: "Minimal",
    image: "1524592094714-0f0654e20314", price: "",
    desc: "A clean white dial with a soft leather strap — understated elegance for the modern woman." },
  { id: "KW-403", cat: "watches", name: "Midnight Blue Watch", tag: "Classic",
    image: "1619134778706-7015533a6150", price: "",
    desc: "A deep blue sunray dial framed in polished steel with a navy strap — refined and contemporary." },
  { id: "KW-404", cat: "watches", name: "Heritage Leather Watch", tag: "Leather",
    image: "1508057198894-247b23fe5ade", price: "",
    desc: "A slim dark-dial watch with a gold-tone case and woven strap for an effortless everyday look." },
];
