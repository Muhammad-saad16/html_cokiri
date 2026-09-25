import { getList } from "@/lib/cms";
import { NewsCard } from "@/components/Cards";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export const metadata = { title: "News & Announcements" };

export default async function NewsPage() {
  const posts = await getList("news");

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <Reveal>
        <h1 className="text-3xl font-serif text-slate-900" style={{ fontFamily: "var(--font-source-serif)" }}>News & Announcements</h1>
      </Reveal>

      <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {posts.map((p) => <StaggerItem key={p.id}><NewsCard post={p} /></StaggerItem>)}
      </StaggerGroup>

      {posts.length === 0 && <p className="mt-8 text-slate-500">No posts yet.</p>}
    </div>
  );
}
