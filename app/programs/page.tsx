import ProgramCard from "../components/ProgramCard";
import { getPrograms } from "../../sanity/lib/queries";

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <main className="flex flex-col bg-paper-white">
      {/* Header */}
      <section className="pt-4 pb-4 md:pt-6 md:pb-6">
        <div className="mx-auto max-w-[1280px] px-5 text-center md:px-20">
          <span className="mb-4 inline-block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
            Our Programs
          </span>
          <h1 className="font-serif text-[28px] font-semibold leading-9 text-on-surface md:text-[48px] md:font-bold md:leading-[56px]">
            Structured Learning for Every Seeker
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-6 text-on-surface-variant md:text-lg md:leading-7">
            Explore a range of programs designed to cultivate knowledge,
            critical thinking, and spiritual growth — on campus and online.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <ProgramCard
                key={program._id}
                title={program.title}
                description={program.shortDescription}
                duration={program.duration}
                eligibility={program.eligibility}
                audience={program.audience}
                format={program.format}
                href={program.applyLink}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
