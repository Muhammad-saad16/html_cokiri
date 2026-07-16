import Image from "next/image";
import { getPersonalityVisits } from "../../sanity/lib/queries";
import { urlFor } from "../../sanity/lib/image";

export default async function InteractionsWithPersonalitiesPage() {
  const personalityVisits = await getPersonalityVisits();

  return (
    <main className="flex flex-col bg-paper-white">
      {/* Header */}
      <section className="pt-4 pb-4 md:pt-6 md:pb-6">
        <div className="mx-auto max-w-[1280px] px-5 text-center md:px-20">
          <span className="mb-4 inline-block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
            Our Visits
          </span>
          <h1 className="font-serif text-[28px] font-semibold leading-9 text-on-surface md:text-[48px] md:font-bold md:leading-[56px]">
            Interactions with Personalities
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-6 text-on-surface-variant md:text-lg md:leading-7">
            Moments from visits and meetings with scholars, leaders, and
            personalities who have graced City of Knowledge.
          </p>
        </div>
      </section>

      {/* Visits Grid */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {personalityVisits.map((visit) => (
              <div
                key={visit._id}
                className="relative aspect-[3/4] overflow-hidden rounded-lg border border-outline-variant/40"
              >
                <Image
                  src={urlFor(visit.image).width(600).height(800).url()}
                  alt={visit.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
