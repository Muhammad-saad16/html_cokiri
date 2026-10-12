import { getList } from "@/lib/cms";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3002";

export default async function sitemap() {
  const [events, videos, publications, albums, news, programs] = await Promise.all([
    getList("events"),
    getList("videos"),
    getList("publications"),
    getList("gallery-albums"),
    getList("news"),
    getList("programs"),
  ]);

  const staticRoutes = ["", "/about", "/programs", "/research", "/media", "/events", "/gallery", "/news", "/contact"].map(
    (path) => ({ url: `${SITE_URL}${path}`, lastModified: new Date() })
  );

  const dynamicRoutes = [
    ...events.map((e) => ({ url: `${SITE_URL}/events/${e.slug}`, lastModified: e.updatedAt })),
    ...videos.map((v) => ({ url: `${SITE_URL}/media/${v.slug}`, lastModified: v.updatedAt })),
    ...publications.map((p) => ({ url: `${SITE_URL}/research/${p.slug}`, lastModified: p.updatedAt })),
    ...albums.map((a) => ({ url: `${SITE_URL}/gallery/${a.slug}`, lastModified: a.updatedAt })),
    ...news.map((n) => ({ url: `${SITE_URL}/news/${n.slug}`, lastModified: n.updatedAt })),
    ...programs.map((p) => ({ url: `${SITE_URL}/programs/${p.slug}`, lastModified: p.updatedAt })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
