import { getList } from "@/lib/cms";
import { NewsCard } from "@/components/Cards";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { PageHero } from "@/components/Ornaments";

export const metadata = { title: "News & Announcements" };

export default async function NewsPage() {
  const news = await getList("news");

  return (
    <>
      <PageHero arabic="أَخْبَار" title="News & Announcements" subtitle="Updates from City of Knowledge and Dr. Umair Mahmood Siddiqui." />
      <section className="pattern-ivory py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((n) => (
              <StaggerItem key={n.id} className="h-full">
                <NewsCard post={n} />
              </StaggerItem>
            ))}
          </StaggerGroup>
          {news.length === 0 && <p className="text-center text-muted">No posts yet.</p>}
        </div>
      </section>
    </>
  );
}
