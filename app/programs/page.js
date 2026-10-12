import { getList } from "@/lib/cms";
import { ProgramCard } from "@/components/Cards";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { PageHero } from "@/components/Ornaments";
import { EnquiryBox } from "@/components/Detail";

export const metadata = { title: "Programs" };

export default async function ProgramsPage() {
  const programs = await getList("programs");

  return (
    <>
      <PageHero
        arabic="حَلْقَاتُ العِلْم"
        title="Academic Activities"
        subtitle="Weekly Dars-e-Quran, the Friday Dars and Khutbah, the Dars-e-Shama'il series and more — open to men, women and families."
      />
      <section className="pattern-ivory py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerGroup className="grid gap-6 md:grid-cols-3">
            {programs.map((p) => (
              <StaggerItem key={p.id} className="h-full">
                <ProgramCard program={p} />
              </StaggerItem>
            ))}
          </StaggerGroup>
          {programs.length === 0 && <p className="text-center text-muted">No programs published yet.</p>}
          <div className="mx-auto max-w-4xl">
            <EnquiryBox />
          </div>
        </div>
      </section>
    </>
  );
}
