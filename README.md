# City of Knowledge — Islamic Research Institute (cokiri.net)

Public website for City of Knowledge IRI, built with Next.js 16 (App Router), Tailwind CSS 4 and Motion.

All content — events, programs & courses, research/publications, videos, gallery albums,
people, news and site settings — comes from the shared **Payload CMS** through its read-only
public API (`/api/public/...`). Nothing is hard-coded except page design and a few fixed photos
in `public/images/`.

## Run locally

```bash
npm install
cp .env.example .env.local   # then set CMS_URL to the running Payload CMS
npm run dev                  # http://localhost:3002
```

## Environment variables

| Name | Purpose |
| --- | --- |
| `CMS_URL` | Base URL of the Payload CMS, e.g. `https://cms.cokiri.net` |
| `SITE_CODE` | Always `COK` for this site (content tagged `COK` or `BOTH` is shown) |
| `NEXT_PUBLIC_SITE_URL` | Public URL of this site, used for the sitemap and Open Graph tags |

## Deploy (Vercel)

Import the repo in Vercel (framework: Next.js), add the variables above, and deploy.
Pages revalidate every 60 seconds, so edits made in the CMS appear without a redeploy.

## Structure

```
app/          Pages: home, about, programs, research, media, events, gallery, news, contact
components/   Cards, hero, navigation, footer, motion helpers
lib/cms.js    CMS client (getList / getPage / getItem / getSettings)
public/       Logo and fixed photos
```
