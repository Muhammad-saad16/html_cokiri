# Kangan — Next.js Website + Payload CMS

Premium fashion & lifestyle store (jewellery, handbags, watches, perfumes).
Everything — products, prices, stock, slider (photos & videos), offers, reviews, orders and payment settings —
is managed in the **Payload CMS admin at `/admin`**.

Customers pay by **Cash on Delivery, Easypaisa, JazzCash or PayPro** and can follow their order at `/track`.

## Run locally
```bash
npm install
cp .env.example .env.local   # set PAYLOAD_SECRET (any long random text)
npm run seed                 # first time only: fills the database with the starter catalogue
npm run dev                  # http://localhost:3000  ·  admin: http://localhost:3000/admin
```
On the first visit to `/admin` you create the admin account.

## Admin panel — `/admin`
| Section | What you do there |
|---|---|
| Shop → **Orders** | New orders with total, payment method and TID. Set *Payment status* and move the order New → Confirmed → Shipped → Delivered. Cancelling puts the stock back. |
| Shop → **Products** | Price, sale price, stock, Hot / New ticks, photos, video, hide (draft) |
| Shop → **Categories** | Collections and their sub-category filters |
| Home Page → **Hero Slider** | Slides with a photo and an optional **video** (MP4) — video slides play full-width |
| Home Page → Offers / Testimonials / Numbers & Stats | The other home page sections |
| Settings → **Payments & Delivery** | Turn COD / Easypaisa / JazzCash / PayPro on or off, your account numbers, delivery charges, free-delivery limit, COD charge |
| Settings → **Site Settings** | WhatsApp, phone, email, social links, top bar message |

### How payments work (no merchant account needed)
- **COD** — rider collects cash; mark *Paid* when the courier pays you.
- **Easypaisa / JazzCash** — checkout shows your number and the total. The customer sends the money and enters the
  Transaction ID (TID); the order arrives as *Check TID*. Find the TID in your app, check the amount, set *Paid*.
- **PayPro** — create the payment in the PayPro merchant portal, paste the PayPro ID into the order and WhatsApp it to the customer.

Automatic in-site payments need merchant accounts (JazzCash, Easypay, PayPro) and can be connected later.

## Deploy on Vercel
Vercel can't store files or a local database, so the live site uses **Turso** (database) and **Vercel Blob** (photos/videos).

1. **Database** — create a Turso database (turso.tech, or in Vercel: *Storage → Marketplace → Turso*). Copy its URL (`libsql://…`) and token.
2. **Blob** — in the Vercel project: *Storage → Create → Blob* and connect it to the project (adds `BLOB_READ_WRITE_TOKEN`).
3. **Environment variables** (Vercel → Project → Settings → Environment Variables):
   `PAYLOAD_SECRET`, `DATABASE_URI`, `DATABASE_AUTH_TOKEN`, `BLOB_READ_WRITE_TOKEN` (+ optional `ORDER_EMAIL`, `SMTP_*`).
4. **Fill the live database once** from your computer — put the same four values in `.env.local`, then:
   ```bash
   npm run migrate   # creates the tables in Turso
   npm run seed      # uploads the starter products, slides & videos (to Blob)
   ```
   Then set `.env.local` back to `DATABASE_URI=file:./kangan.db` for local work.
5. **Deploy** — push to GitHub and import the repo in Vercel (or `vercel --prod`). The build runs the migrations automatically.
6. Open `https://your-site/admin` **straight away** and create the admin account (the first account created becomes the admin).

When you change the CMS fields (`cms/…`), run `npm run migrate:create` and commit the new file in `migrations/`.

## Optional: order email
Orders are always in the admin panel. To also get an email for each order set `ORDER_EMAIL`, `SMTP_HOST`, `SMTP_PORT`,
`SMTP_USER`, `SMTP_PASS` (Gmail: create an App Password at https://myaccount.google.com/apppasswords).

## Code map
- Website pages: `app/(site)/…` · styles: `app/(site)/globals.css`
- Payload admin & API: `app/(payload)/…` · CMS config: `payload.config.ts`, `cms/collections`, `cms/globals`
- Order endpoint: `app/api/order/route.ts` · Payment methods: `lib/payments.ts`
- Data access: `lib/data.ts` (content), `lib/store.ts` (payments & order lookup)
- Starter content for `npm run seed`: `lib/content.ts`
- Brand logo files: `public/brand/`

`static-version/` is the earlier plain-HTML version, kept for reference.
