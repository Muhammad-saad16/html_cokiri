# Kangan — Next.js Website

Premium fashion & lifestyle store (jewellery, handbags, watches, perfumes).
No payment gateway: customers place an order, the order is **emailed to you**, and you contact them to confirm.

## Run locally
```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3000
```

## Editing content — `lib/content.ts`
Everything on the site lives in this one file:

| What | Where in `lib/content.ts` |
|---|---|
| WhatsApp, phone, email, social links, top bar message | `SITE` |
| Categories, their tagline / intro / image | `CATEGORIES`, `CATEGORY_INFO` |
| Sub-category filters (Bangles, Earrings…) | `SUBCATEGORIES` |
| Products | `PRODUCTS` |
| Home hero slider | `HERO_SLIDES` |
| Small offers slider | `OFFERS` |
| Customer reviews | `TESTIMONIALS` — **samples, replace with real reviews** |
| Animated numbers band | `STATS` — **sample numbers, replace with real figures** |

Product fields:
- `images`: photos, e.g. `["/media/bangle.jpg", "/media/bangle-model.jpg"]` (put files in `public/media/`). Unsplash ids are placeholders.
- `video`: optional product video, e.g. `"/media/reel-bangle.mp4"`
- `price`: `""` hides the price, or write e.g. `"PKR 4,500"`; `oldPrice` shows a crossed-out price
- `sub`: sub-category, must be one of that category's `SUBCATEGORIES`
- `best: true` → Hot Products tab · `isNew: true` → New Arrivals tab · `soldOut: true` → Sold Out, order form hidden

## Order email setup (.env.local)
| Variable | Meaning |
|---|---|
| `ORDER_EMAIL` | Inbox that receives new orders |
| `SMTP_HOST` / `SMTP_PORT` | e.g. `smtp.gmail.com` / `465` |
| `SMTP_USER` | The Gmail (or other) account that sends the email |
| `SMTP_PASS` | **Gmail App Password**, not your normal password |

Gmail App Password: turn on 2-Step Verification → https://myaccount.google.com/apppasswords → create one → paste in `SMTP_PASS`.
If email is not set up (or fails), the customer is offered a WhatsApp link so the order is not lost.

## Code map
- Pages: `app/page.tsx` (Home), `app/shop`, `app/collections/[category]`, `app/products/[slug]`, `app/about`, `app/contact`
- Order endpoint: `app/api/order/route.ts`
- Styles: `app/globals.css`
- Brand logo files: `public/brand/`

## Deploy (Vercel, recommended)
Push to GitHub → import in Vercel → add the same env variables in
*Project → Settings → Environment Variables* → Deploy. No database is needed.

`static-version/` is the earlier plain-HTML version, kept for reference.
