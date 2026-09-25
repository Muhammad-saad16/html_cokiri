import { getList } from "@/lib/cms";
import { PublicationCard } from "@/components/Cards";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export const metadata = { title: "Research & Publications" };

export default async function ResearchPage() {
  const publications = await getList("publications");

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <Reveal>
        <h1 className="text-3xl font-serif text-slate-900" style={{ fontFamily: "var(--font-source-serif)" }}>Research & Publications</h1>
        <p className="mt-3 text-slate-600 max-w-2xl">Books, research papers and institutional knowledge resources.</p>
      </Reveal>

      <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {publications.map((p) => <StaggerItem key={p.id}><PublicationCard publication={p} /></StaggerItem>)}
      </StaggerGroup>

      {publications.length === 0 && <p className="mt-8 text-slate-500">No publications yet.</p>}
    </div>
  );
}
