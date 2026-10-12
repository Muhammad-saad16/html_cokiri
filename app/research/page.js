import { getList } from "@/lib/cms";
import { PublicationCard } from "@/components/Cards";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { PageHeader } from "@/components/Ornaments";

export const metadata = { title: "Research & Publications" };

export default async function ResearchPage() {
  const publications = await getList("publications");

  return (
    <>
      <PageHeader
        arabic="مُؤَلَّفَات"
        title="Research & Publications"
        intro="Books by Dr. Umair Mahmood Siddiqui on theology, comparative religion, Islamic jurisprudence and history."
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerGroup className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {publications.map((p) => (
              <StaggerItem key={p.id} className="h-full">
                <PublicationCard publication={p} />
              </StaggerItem>
            ))}
          </StaggerGroup>
          {publications.length === 0 && <p className="text-center text-muted">No publications yet.</p>}
        </div>
      </section>
    </>
  );
}
