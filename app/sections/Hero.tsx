import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      aria-label="Hero"
      className="bg-research-grey py-16 md:py-24"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-10 px-5 md:flex-row md:items-center md:justify-between md:gap-12 md:px-20">
        {/* Text Content */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <span className="mb-4 font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
            City of Knowledge
          </span>
          <h1 className="max-w-2xl font-serif text-[28px] font-semibold leading-9 text-paper-white md:text-[48px] md:font-bold md:leading-[56px]">
            Authentic, scholarly Islamic education and research
          </h1>
          <p className="mt-6 max-w-xl text-base leading-6 text-paper-white/80 md:text-lg md:leading-7">
            Rooted in tradition yet engaged with contemporary issues — led by
            credible academics and accessible to both on-site and online
            learners.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/programs"
              className="inline-flex h-12 items-center justify-center rounded bg-heritage-orange px-6 font-hanken text-xs font-bold uppercase tracking-[0.05em] text-paper-white transition-colors duration-200 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange focus-visible:ring-offset-2 focus-visible:ring-offset-research-grey"
            >
              Explore Programs
            </Link>
            <Link
              href="/about"
              className="inline-flex h-12 items-center justify-center rounded border border-paper-white/30 bg-transparent px-6 font-hanken text-xs font-bold uppercase tracking-[0.05em] text-paper-white transition-colors duration-200 hover:border-paper-white hover:bg-paper-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper-white focus-visible:ring-offset-2 focus-visible:ring-offset-research-grey"
            >
              About Us
            </Link>
          </div>
        </div>

        {/* Founder Image */}
        <div className="flex w-full max-w-md flex-col items-center md:max-w-lg md:items-end">
          <div className="relative w-full overflow-hidden rounded-lg border border-paper-white/10 shadow-[0_12px_24px_-8px_rgba(0,0,0,0.3)]">
            <Image
              src="/founder.png"
              alt="Dr. Umair Mahmood Siddiqui, Founder and Professor of Comparative Study of Religions"
              width={640}
              height={426}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
          <div className="mt-4 text-center md:text-right">
            <p className="font-serif text-lg font-semibold text-paper-white">
              Dr. Umair Mahmood Siddiqui
            </p>
            <p className="mt-1 text-sm leading-5 text-paper-white/70">
              Founder and Professor of Comparative Study of Religions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
