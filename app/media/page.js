import { getFacets, getPage } from "@/lib/cms";
import { categoryLabel } from "@/lib/format";
import { VideoCard } from "@/components/Cards";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import Pagination from "@/components/Pagination";

export const metadata = { title: "Media — Lectures, Podcasts & Videos" };

const PER_PAGE = 24;

export default async function MediaPage({ searchParams }) {
  const { category, page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const [{ items: videos, totalPages }, categories] = await Promise.all([
    getPage("videos", { page, limit: PER_PAGE, category }),
    getFacets("videos", "category"),
  ]);

  const chip = (active) =>
    `text-xs font-medium rounded-full px-3 py-1 border transition-colors ${active ? "bg-slate-900 text-white border-slate-900" : "border-slate-300 text-slate-600 hover:border-slate-400"}`;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <Reveal>
        <h1 className="text-3xl font-serif text-slate-900" style={{ fontFamily: "var(--font-source-serif)" }}>Media</h1>
      </Reveal>

      {categories.length > 0 && (
        <Reveal delay={0.1} className="flex flex-wrap gap-2 mt-6">
          <a href="/media" className={chip(!category)}>All</a>
          {categories.map((c) => (
            <a key={c.value} href={`/media?category=${c.value}`} className={chip(category === c.value)}>
              {categoryLabel(c.value)} <span className="opacity-60">{c.count}</span>
            </a>
          ))}
        </Reveal>
      )}

      <StaggerGroup key={`${category}-${page}`} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {videos.map((v) => <StaggerItem key={v.id}><VideoCard video={v} /></StaggerItem>)}
      </StaggerGroup>

      {videos.length === 0 && <p className="mt-8 text-slate-500">No media published yet.</p>}

      <Pagination basePath="/media" page={page} totalPages={totalPages} params={{ category }} />
    </div>
  );
}
