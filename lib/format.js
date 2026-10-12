// Plain (non-client) module so both server pages and client components can use it.
// Accepts full dates, or "YYYY-MM" when only the month is known.
export function fmtDate(d) {
  if (!d) return "";
  if (/^\d{4}-\d{2}$/.test(d)) {
    return new Date(`${d}-15`).toLocaleDateString("en-US", { year: "numeric", month: "long", timeZone: "Asia/Karachi" });
  }
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "Asia/Karachi" });
}

export const VIDEO_CATEGORY_LABELS = {
  LECTURE: "Lecture",
  DARS_E_QURAN: "Dars-e-Quran",
  SHAMAIL: "Dars-e-Shama'il",
  SERMON: "Khutbah",
  QA: "Q&A",
  INTERVIEW: "Interview / TV",
  CONFERENCE: "Conference / Seminar",
  LIVE: "Live",
  SHORT: "Short clip",
  VLOG: "Vlog",
  PODCAST: "Podcast",
  OTHER: "Other",
};

export const categoryLabel = (c) => VIDEO_CATEGORY_LABELS[c] || c || "";
