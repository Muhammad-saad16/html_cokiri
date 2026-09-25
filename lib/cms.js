const CMS_URL = process.env.CMS_URL || "http://localhost:3003";
const SITE_CODE = process.env.SITE_CODE || "COK";

// Uploaded media is stored as a relative "/uploads/..." path, which only
// resolves on the CMS's own origin. This site runs on a different origin,
// so any such path needs the CMS's absolute URL prefixed before it reaches
// an <img>/<iframe> src — otherwise it 404s (relative to *this* origin).
function resolveMediaValue(value) {
  if (typeof value === "string" && value.startsWith("/uploads/")) {
    return `${CMS_URL}${value}`;
  }
  return value;
}

function resolveMedia(item) {
  if (Array.isArray(item)) return item.map(resolveMedia);
  if (!item || typeof item !== "object") return item;
  const resolved = {};
  for (const [key, value] of Object.entries(item)) {
    resolved[key] = typeof value === "object" ? resolveMedia(value) : resolveMediaValue(value);
  }
  return resolved;
}

async function cmsFetch(path) {
  const res = await fetch(`${CMS_URL}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  return res.json();
}

export async function getList(resource, { limit } = {}) {
  const params = new URLSearchParams({ site: SITE_CODE });
  if (limit) params.set("limit", String(limit));
  const json = await cmsFetch(`/api/public/${resource}?${params.toString()}`);
  return resolveMedia(json?.items || []);
}

// One page of a list plus paging info, with optional filters (category, series, q).
export async function getPage(resource, { page = 1, limit = 24, site = SITE_CODE, ...filters } = {}) {
  const params = new URLSearchParams({ site, page: String(page), limit: String(limit) });
  for (const [key, value] of Object.entries(filters)) if (value) params.set(key, String(value));
  const json = await cmsFetch(`/api/public/${resource}?${params.toString()}`);
  return {
    items: resolveMedia(json?.items || []),
    page: json?.page || 1,
    totalPages: json?.totalPages || 1,
    totalDocs: json?.totalDocs || 0,
  };
}

// Distinct values of a field (e.g. video "series") with how many items use each.
export async function getFacets(resource, field, { site = SITE_CODE } = {}) {
  const json = await cmsFetch(`/api/public/${resource}?${new URLSearchParams({ site, facet: field })}`);
  return json?.items || [];
}

export async function getItem(resource, slug) {
  const json = await cmsFetch(`/api/public/${resource}/${slug}`);
  return resolveMedia(json?.item || null);
}

export async function getSettings() {
  const json = await cmsFetch(`/api/public/settings/${SITE_CODE}`);
  return json?.item || null;
}

export { SITE_CODE, resolveMediaValue as mediaUrl };
