import Link from "next/link";
import { getFacets, getPage } from "@/lib/cms";
import { categoryLabel } from "@/lib/format";
import { VideoCard } from "@/components/Cards";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import Pagination from "@/components/Pagination";
import { PageHero } from "@/components/Ornaments";

export const metadata = { title: "Media — Lectures, Dars & Videos" };

const PER_PAGE = 24;

export default async function MediaPage({ searchParams }) {
  const { category, page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const [{ items: videos, totalPages, totalDocs }, categories] = await Promise.all([
    getPage("videos", { page, limit: PER_PAGE, category }),
    getFacets("videos", "category"),
  ]);

  const chip = (active) =>
    `shrink-0 rounded-md border px-4 py-2 text-xs font-semibold tracking-[0.12em] whitespace-nowrap uppercase transition ${
      active ? "border-gold bg-gold text-navy-deep" : "border-gold/50 text-gold-light hover:bg-gold/10"
    }`;

  return (
    <>
      <PageHero
        arabic="مُحَاضَرَات"
        title="Media"
        subtitle="Lectures, Dars-e-Shama'il, Dars-e-Quran, Q&A sessions and panel discussions by Dr. Umair Mahmood Siddiqui."
      />
      <section className="pattern-navy py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {categories.length > 0 && (
            <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:flex-wrap sm:justify-center">
              <Link href="/media" className={chip(!category)}>
                All
              </Link>
              {categories.map((c) => (
                <Link key={c.value} href={`/media?category=${c.value}`} className={chip(category === c.value)}>
                  {categoryLabel(c.value)} <span className="opacity-60">{c.count}</span>
                </Link>
              ))}
            </div>
          )}
          <p className="mt-6 text-center text-sm text-ivory/60">{totalDocs} videos</p>

          <StaggerGroup key={`${category}-${page}`} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => (
              <StaggerItem key={v.id} className="h-full">
                <VideoCard video={v} dark />
              </StaggerItem>
            ))}
          </StaggerGroup>

          {videos.length === 0 && <p className="mt-8 text-center text-ivory/60">No media published yet.</p>}

          <Pagination basePath="/media" page={page} totalPages={totalPages} params={{ category }} />
        </div>
      </section>
    </>
  );
}
