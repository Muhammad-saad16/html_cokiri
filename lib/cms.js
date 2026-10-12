// Content source for the site. It used to read a Payload CMS over HTTP; it now reads the local
// modules in lib/content/, keeping the same function signatures so pages didn't need to change.
import * as content from "@/lib/content";

const SITE_CODE = "COK";

const collections = {
  events: content.events,
  videos: content.videos,
  publications: content.publications,
  people: content.people,
  programs: content.programs,
  news: content.news,
  "gallery-albums": content.galleryAlbums,
};

// Newest first for dated collections; people by their display order.
const sortKey = {
  events: (x) => x.startDate,
  videos: (x) => x.publishedAt,
  news: (x) => x.publishedAt,
  "gallery-albums": (x) => x.date,
};

function all(resource) {
  const items = [...(collections[resource] || [])];
  if (resource === "people") return items.sort((a, b) => a.order - b.order);
  const key = sortKey[resource];
  if (key) items.sort((a, b) => String(key(b) || "").localeCompare(String(key(a) || "")));
  return items;
}

export async function getList(resource, { limit } = {}) {
  const items = all(resource);
  return limit ? items.slice(0, limit) : items;
}

// One page of a list plus paging info, with optional filters (category, series, q).
export async function getPage(resource, { page = 1, limit = 24, site, q, ...filters } = {}) {
  let items = all(resource);
  for (const [key, value] of Object.entries(filters)) if (value) items = items.filter((x) => x[key] === value);
  if (q) items = items.filter((x) => x.title?.toLowerCase().includes(String(q).toLowerCase()));
  const totalDocs = items.length;
  const totalPages = Math.max(1, Math.ceil(totalDocs / limit));
  const start = (page - 1) * limit;
  return { items: items.slice(start, start + limit), page, totalPages, totalDocs };
}

// Distinct values of a field (e.g. video "category") with how many items use each.
export async function getFacets(resource, field) {
  const counts = new Map();
  for (const x of all(resource)) if (x[field]) counts.set(x[field], (counts.get(x[field]) || 0) + 1);
  return [...counts].map(([value, count]) => ({ value, count })).sort((a, b) => b.count - a.count);
}

export async function getItem(resource, slug) {
  return all(resource).find((x) => x.slug === slug) || null;
}

export async function getSettings() {
  return content.settings;
}

export const mediaUrl = (value) => value;

export { SITE_CODE };
