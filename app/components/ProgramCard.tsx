import Link from "next/link";

export interface ProgramCardProps {
  title: string;
  description: string;
  duration: string;
  eligibility: string;
  audience?: string;
  format?: string;
  href?: string;
}

export default function ProgramCard({
  title,
  description,
  duration,
  eligibility,
  audience,
  format,
  href,
}: ProgramCardProps) {
  return (
    <article className="flex flex-col rounded-lg border border-outline-variant/40 bg-paper-white p-6 transition-all duration-200 hover:border-outline/60 hover:shadow-[0_12px_24px_-10px_rgba(75,54,33,0.08)]">
      <h3 className="font-serif text-[20px] font-semibold leading-7 text-on-surface md:text-[24px] md:leading-8">
        {title}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-5 text-on-surface-variant md:text-base md:leading-6">
        {description}
      </p>

      <dl className="mt-6 space-y-3">
        <div>
          <dt className="font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
            Duration
          </dt>
          <dd className="mt-0.5 text-sm text-on-surface">{duration}</dd>
        </div>
        <div>
          <dt className="font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
            Eligibility
          </dt>
          <dd className="mt-0.5 text-sm text-on-surface">{eligibility}</dd>
        </div>
        {audience && (
          <div>
            <dt className="font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
              Audience
            </dt>
            <dd className="mt-0.5 text-sm text-on-surface">{audience}</dd>
          </div>
        )}
        {format && (
          <div>
            <dt className="font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
              Format
            </dt>
            <dd className="mt-0.5 text-sm text-on-surface">{format}</dd>
          </div>
        )}
      </dl>

      {href && (
        <div className="mt-6 pt-4 border-t border-outline-variant/30">
          <Link
            href={href}
            className="inline-flex h-11 items-center justify-center rounded bg-heritage-orange px-5 font-hanken text-xs font-bold uppercase tracking-[0.05em] text-paper-white transition-colors duration-200 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange focus-visible:ring-offset-2 focus-visible:ring-offset-paper-white"
          >
            Apply Now
          </Link>
        </div>
      )}
    </article>
  );
}
