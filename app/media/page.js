import Link from "next/link";
import { getFacets, getPage } from "@/lib/cms";
import { categoryLabel } from "@/lib/format";
import { VideoCard } from "@/components/Cards";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import Pagination from "@/components/Pagination";
import { PageHeader } from "@/components/Ornaments";

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
    `shrink-0 border-2 px-4 py-2 text-xs font-bold tracking-[0.12em] whitespace-nowrap uppercase transition ${
      active ? "border-gold bg-gold text-black" : "border-line text-ivory hover:border-gold"
    }`;

  return (
    <>
      <PageHeader
        arabic="مُحَاضَرَات"
        title="Media"
        intro="Lectures, Dars-e-Shama'il, Dars-e-Quran, Q&A sessions and panel discussions by Dr. Umair Mahmood Siddiqui."
      />
      <section className="bg-coal py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {categories.length > 0 && (
            <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:flex-wrap">
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
          <p className="label mt-6 text-muted">{totalDocs} videos</p>

          <StaggerGroup key={`${category}-${page}`} className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => (
              <StaggerItem key={v.id} className="h-full">
                <VideoCard video={v} />
              </StaggerItem>
            ))}
          </StaggerGroup>

          {videos.length === 0 && <p className="mt-8 text-center text-muted">No media published yet.</p>}

          <Pagination basePath="/media" page={page} totalPages={totalPages} params={{ category }} />
        </div>
      </section>
    </>
  );
}
