import Link from "next/link";
import Image from "next/image";

interface PublicationsSectionProps {
  compactTop?: boolean;
}

export default function PublicationsSection({
  compactTop = false,
}: PublicationsSectionProps) {
  return (
    <section
      className={`pb-16 md:pb-24 ${
        compactTop ? "pt-0" : "pt-16 md:pt-24"
      }`}
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-20">
        {/* Header */}
        <div className="mb-10 text-center md:mb-12">
          <span className="mb-4 inline-block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
            Our Books
          </span>
          <h2 className="font-serif text-[28px] font-semibold leading-9 text-on-surface md:text-[40px] md:leading-[48px]">
            Publications
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-6 text-on-surface-variant md:text-lg md:leading-7">
            Scholarly works and research publications authored by our faculty,
            exploring Islamic thought for contemporary readers.
          </p>
        </div>

        {/* Publications Stack */}
        <div className="flex w-full flex-col gap-6">
          <div className="relative aspect-[1380/503] w-full overflow-hidden rounded-lg border border-outline-variant/40 shadow-[0_12px_24px_-10px_rgba(75,54,33,0.08)]">
            <Image
              src="/pub1.webp"
              alt="Featured publication"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[1376/768] w-full overflow-hidden rounded-lg border border-outline-variant/40 shadow-[0_12px_24px_-10px_rgba(75,54,33,0.08)]">
            <Image
              src="/pub2.webp"
              alt="Featured publication"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Explore More */}
        <div className="mt-10 flex justify-center md:mt-12">
          <Link
            href="/books"
            className="inline-flex h-12 items-center justify-center rounded bg-heritage-orange px-6 font-hanken text-xs font-bold uppercase tracking-[0.05em] text-paper-white transition-colors duration-200 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange focus-visible:ring-offset-2 focus-visible:ring-offset-paper-white"
          >
            Explore Books
          </Link>
        </div>
      </div>
    </section>
  );
}
