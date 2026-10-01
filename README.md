# Kangan — Next.js Website + Payload CMS

Premium fashion & lifestyle store (jewellery, handbags, watches, perfumes).
No payment gateway: customers place an order, it is saved in the admin panel (and optionally emailed), and you contact them to confirm.

Everything on the site — products, stock, prices, categories, sub-categories, hero slider, offers, WhatsApp number — is managed in the **admin panel** at `/admin` ([Payload CMS](https://payloadcms.com)).

## Run locally
```bash
npm install
cp .env.example .env.local   # then set PAYLOAD_SECRET (any long random string)
npm run seed                 # first time only: fills the database with the starter products
npm run dev                  # website: http://localhost:3000   admin: http://localhost:3000/admin
```
The first visit to `/admin` asks you to create the admin account.

## Admin panel
| Section | What you can do |
|---|---|
| **Shop → Products** | Add / edit / hide / delete products, photos, video, price, sale price, **stock quantity** |
| **Shop → Categories** | Add categories, their tagline, image and **sub-categories** (Bangles, Earrings…) |
| **Shop → Orders** | Every website order with customer details; change status New → Confirmed → Shipped → Delivered |
| **Home Page → Hero Slider** | The big slider: image, offer label, title, text, button link, order, on/off |
| **Home Page → Offers** | The small offers slider; optional end date hides an offer automatically |
| **Content → Media Library** | All uploaded photos and videos |
| **Settings → Site Settings** | Top bar message, WhatsApp, phone, email, social links |

### How stock works
- Each product has **Track stock** + **Stock quantity**.
- When a customer orders, stock goes down by the ordered quantity. Orders bigger than the stock are refused.
- At 0 the product shows **Sold Out** and the order form is hidden. At 1–5 the site shows "Only N left".
- Setting an order to **Cancelled** puts its quantity back into stock.
- Prices are in PKR. Leave the price empty to hide it; fill **Sale price** to show the old price crossed out.

## Order email (optional)
Orders are always saved under **Shop → Orders**. To also receive them by email, fill these in `.env.local`:

| Variable | Meaning |
|---|---|
| `ORDER_EMAIL` | Inbox that receives new orders |
| `SMTP_HOST` / `SMTP_PORT` | e.g. `smtp.gmail.com` / `465` |
| `SMTP_USER` | The Gmail (or other) account that sends the email |
| `SMTP_PASS` | **Gmail App Password**, not your normal password |

## Code map
- `payload.config.ts`, `cms/` — CMS collections (Products, Categories, Orders, Slides, Offers, Media, Users) and Site Settings
- `cms/seed-data.ts` + `scripts/seed.ts` — starter content used by `npm run seed`
- `lib/cms.ts` — how the website reads data from the CMS
- `app/(frontend)/` — website pages · `app/(payload)/` — admin panel · `app/api/order` — order form endpoint
- `app/(frontend)/globals.css` — styles

## Deploy
The local database is a SQLite file (`kangan.db`) and uploads go to `/media`. Both are ignored by git.
For hosting (e.g. Vercel) use a hosted database (Turso/libSQL URL in `DATABASE_URI`, or switch to the Postgres/MongoDB adapter)
and cloud storage for uploads (e.g. `@payloadcms/storage-vercel-blob`), then add the env variables in the host's settings.

`static-version/` is the earlier plain-HTML version, kept for reference.
