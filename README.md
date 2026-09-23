# Kangan — Next.js Website

Premium fashion & lifestyle store (jewellery, handbags, perfumes, watches).
No payment gateway: customers place an order and the order is **emailed to you**; you contact them to confirm.

## Run locally
```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3000
```

## Order email setup (.env.local)
| Variable | Meaning |
|---|---|
| `ORDER_EMAIL` | Inbox that receives new orders |
| `SMTP_HOST` / `SMTP_PORT` | e.g. `smtp.gmail.com` / `465` |
| `SMTP_USER` | The Gmail (or other) account that sends the email |
| `SMTP_PASS` | **Gmail App Password**, not your normal password |

Gmail App Password: turn on 2-Step Verification → https://myaccount.google.com/apppasswords → create one → paste in `SMTP_PASS`.

## How ordering works
1. Customer clicks a product card → popup with the order form
2. **Confirm Order** → `POST /api/order` (`app/api/order/route.ts`) validates the data and emails the order (with an order number like `KNG-260923-4821`)
3. Customer sees a thank-you screen, with an option to also send the order on WhatsApp
4. If the email fails, the customer is offered a WhatsApp link so the order is not lost

## Editing content
- **Products, WhatsApp number, social links:** `lib/site.ts`
  - `image`: put photos in `public/images/` and write `"/images/your-photo.jpg"` (current images are Unsplash placeholders)
  - `price`: `""` hides the price, or write e.g. `"Rs 4,500"`
- **Page text:** `app/page.tsx`
- **Styles:** `app/globals.css`

## Deploy (Vercel, recommended)
Push to GitHub → import in Vercel → add the same env variables in
*Project → Settings → Environment Variables* → Deploy.

`static-version/` is the earlier plain-HTML version, kept for reference. It is not used by Next.js.
