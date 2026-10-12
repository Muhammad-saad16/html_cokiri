# Kangan Website

Static website (HTML/CSS/JS), no backend needed. Open `index.html` in a browser.

## How ordering works
Customer clicks a product → fills name, phone, city, address → **Confirm Order** →
the order is emailed to you (via FormSubmit.co) with an order number (e.g. `KNG-260923-4821`).
You contact the customer to confirm price, payment and delivery. No online payment.

## Setup (one time)
1. Open `js/config.js` and set:
   - `orderEmail`: the email that should receive orders
   - `whatsapp`, `phone`, and social links
2. Upload the site and place **one test order**. FormSubmit sends an
   **"Activate Form"** email to `orderEmail`. Click the link once. After that every order arrives in the inbox.
   (Also check the Spam folder the first time.)

## Products
All products are in `js/config.js` → `PRODUCTS`. For each product:
- `image`: put your photo in an `images/` folder and write `"images/your-photo.jpg"`
  (current images are Unsplash placeholders)
- `price`: leave `""` to hide it, or write e.g. `"Rs 4,500"`
- `cat`: one of `jewellery`, `handbags`, `perfumes`, `watches`

## Hosting
Upload the whole folder to any static host (Netlify, Vercel, GitHub Pages, cPanel hosting).
The order email only works on a live site, not when opened as a local file.
