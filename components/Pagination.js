import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Server-rendered pager that keeps the page's other query params (filters).
export default function Pagination({ basePath, page, totalPages, params = {} }) {
  if (totalPages <= 1) return null;
  const href = (p) => {
    const q = new URLSearchParams(Object.entries(params).filter(([, v]) => v));
    if (p > 1) q.set("page", String(p));
    const qs = q.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };
  const pages = [...new Set([1, page - 1, page, page + 1, totalPages])]
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b);
  const base = "min-w-9 h-9 px-3 inline-flex items-center justify-center rounded-full text-sm border transition-colors";
  const idle = "border-slate-300 text-slate-600 hover:border-slate-400";

  return (
    <nav aria-label="Pagination" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {page > 1 && (
        <Link href={href(page - 1)} className={`${base} ${idle}`} aria-label="Previous page">
          <ChevronLeft size={16} />
        </Link>
      )}
      {pages.map((p, i) => (
        <span key={p} className="contents">
          {i > 0 && p - pages[i - 1] > 1 && <span className="text-slate-400 px-1">…</span>}
          <Link
            href={href(p)}
            aria-current={p === page ? "page" : undefined}
            className={`${base} ${p === page ? "bg-slate-900 text-white border-slate-900" : idle}`}
          >
            {p}
          </Link>
        </span>
      ))}
      {page < totalPages && (
        <Link href={href(page + 1)} className={`${base} ${idle}`} aria-label="Next page">
          <ChevronRight size={16} />
        </Link>
      )}
    </nav>
  );
}
