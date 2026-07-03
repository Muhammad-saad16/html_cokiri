import Image from "next/image";

const researchAreas = [
  "Islamic Jurisprudence",
  "Comparative Theology",
  "Historical Manuscripts",
  "Sociology of Religion",
];

const studentServices = [
  "Academic Advising",
  "Research Grants",
  "E-Library Access",
  "Career Placement",
];

const community = [
  "Public Lectures",
  "Workshops",
  "Conferences",
  "Seminars",
];

function DiamondIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4 0L8 4L4 8L0 4L4 0Z" />
    </svg>
  );
}

interface LinkColumnProps {
  title: string;
  items: string[];
}

function LinkColumn({ title, items }: LinkColumnProps) {
  return (
    <div>
      <h3 className="font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3">
            <span className="text-heritage-orange">
              <DiamondIcon />
            </span>
            <span className="text-base leading-6 text-on-surface">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PreFooter() {
  return (
    <section
      aria-label="Quick links and contact"
      className="bg-surface py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <LinkColumn title="Research Areas" items={researchAreas} />
          <LinkColumn title="Student Services" items={studentServices} />
          <LinkColumn title="Community" items={community} />

          {/* Institute Contact Card */}
          <div className="relative overflow-hidden rounded-lg bg-scholar-brown p-6 md:p-8">
            <div className="relative z-10">
              <h3 className="font-hanken text-xs font-bold uppercase tracking-[0.05em] text-paper-white">
                Institute Contact
              </h3>
              <p className="mt-4 text-base leading-6 text-paper-white/80">
                Questions about our programs or research? Reach out to our
                admissions office.
              </p>
              <a
                href="mailto:admin@cokiri.net"
                className="mt-5 inline-block text-base font-medium text-heritage-orange transition-colors duration-200 hover:text-primary-fixed-dim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange focus-visible:ring-offset-2 focus-visible:ring-offset-scholar-brown"
              >
                admin@cokiri.net
              </a>
              <a
                href="tel:+923362342386"
                className="mt-2 block text-base text-paper-white/70 transition-colors duration-200 hover:text-paper-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper-white focus-visible:ring-offset-2 focus-visible:ring-offset-scholar-brown"
              >
                +92 336 2342386
              </a>
            </div>

            {/* Logo Watermark */}
            <div className="absolute -bottom-4 -right-4 h-32 w-32 opacity-10 md:h-40 md:w-40">
              <Image
                src="/logo.svg"
                alt=""
                fill
                className="object-contain"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
