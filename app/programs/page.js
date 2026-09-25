import { getList } from "@/lib/cms";
import { ProgramCard } from "@/components/Cards";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export const metadata = { title: "Programs" };

export default async function ProgramsPage() {
  const programs = await getList("programs");

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <Reveal>
        <h1 className="text-4xl font-extrabold uppercase tracking-tight text-orange-600">Academic Activities</h1>
        <p className="mt-3 text-slate-600 max-w-2xl">
          Specializations, diplomas, language courses, children's and women's programs, weekly Dars-e-Quran and
          scholarly events offered by City of Knowledge.
        </p>
      </Reveal>

      <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {programs.map((p) => <StaggerItem key={p.id}><ProgramCard program={p} /></StaggerItem>)}
      </StaggerGroup>

      {programs.length === 0 && <p className="mt-8 text-slate-500">No programs published yet.</p>}
    </div>
  );
}
