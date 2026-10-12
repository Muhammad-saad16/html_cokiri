# City of Knowledge — Islamic Research Institute (cokiri.net)

Public website for City of Knowledge IRI, built with Next.js 16 (App Router), Tailwind CSS 4 and Motion.

All content — events, programs, publications, videos, gallery albums, people, news and site settings —
lives in `lib/content/` (images under `public/content/`). `lib/cms.js` reads it with the same
functions the pages always used, so no CMS or database is needed.

## Run locally

```bash
npm install
npm run dev                  # http://localhost:3002
```

## Environment variables

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL of this site, used for the sitemap and Open Graph tags |

## Adding content

Edit the arrays in `lib/content/index.js` (videos in `lib/content/videos.js`) and put images in
`public/content/`. Dates are `YYYY-MM-DD`, or `YYYY-MM` when only the month is known.

## Deploy (Vercel)

Import the repo in Vercel (framework: Next.js), set `NEXT_PUBLIC_SITE_URL`, and deploy.

## Structure

```
app/          Pages: home, about, programs, research, media, events, gallery, news, contact
components/   Cards, hero, navigation, footer, motion helpers
lib/content/  All site content (edit here)
lib/cms.js    Reads lib/content (getList / getPage / getItem / getSettings)
public/       Logo, fixed photos and public/content/ images
```
