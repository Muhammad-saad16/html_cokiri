// Site content lives in /content/*.json and is edited through Decap CMS at /admin.
// This module fills in derived fields (ids, YouTube links, fallbacks) so editors only
// enter what matters, and lib/cms.js keeps serving the same shapes as before.
import settingsJson from "@/content/settings.json";
import videosJson from "@/content/videos.json";
import programsJson from "@/content/programs.json";
import eventsJson from "@/content/events.json";
import publicationsJson from "@/content/publications.json";
import peopleJson from "@/content/people.json";
import galleryJson from "@/content/gallery.json";
import newsJson from "@/content/news.json";

const withId = (items) => items.map((x) => ({ ...x, id: x.slug }));

export const settings = {
  ...settingsJson,
  // Footer and contact page read this as a JSON object of label → URL.
  socialLinks: JSON.stringify(Object.fromEntries((settingsJson.socialLinks || []).map((s) => [s.label, s.url]))),
};

export const videos = videosJson.items.map((v) => ({
  ...v,
  id: v.youtubeId,
  slug: v.youtubeId,
  youtubeUrl: `https://www.youtube.com/watch?v=${v.youtubeId}`,
  thumbnailUrl: v.thumbnailUrl || `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`,
}));

export const programs = withId(programsJson.items);
export const events = withId(eventsJson.items);
export const publications = withId(publicationsJson.items);
export const news = withId(newsJson.items);
export const people = withId(peopleJson.items).map((p, i) => ({ ...p, order: p.order ?? i + 1 }));

export const galleryAlbums = withId(galleryJson.items).map((a) => ({
  ...a,
  coverImageUrl: a.coverImageUrl || a.images?.[0]?.url,
  images: (a.images || []).map((img, i) => ({ ...img, id: `${a.slug}-${i + 1}` })),
}));
