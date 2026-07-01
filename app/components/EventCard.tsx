import Image from "next/image";

export interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export default function EventCard({
  title,
  date,
  time,
  location,
  description,
  imageSrc,
  imageAlt,
}: EventCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-outline-variant/40 bg-paper-white transition-all duration-200 hover:border-outline/60 hover:shadow-[0_12px_24px_-10px_rgba(75,54,33,0.08)]">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-[20px] font-semibold leading-7 text-on-surface md:text-[24px] md:leading-8">
          {title}
        </h3>

        <dl className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <dt className="font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
              Date
            </dt>
            <dd className="text-sm text-on-surface">{date}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
              Time
            </dt>
            <dd className="text-sm text-on-surface">{time}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
              Location
            </dt>
            <dd className="text-sm text-on-surface">{location}</dd>
          </div>
        </dl>

        <p className="mt-4 flex-1 text-sm leading-5 text-on-surface-variant">
          {description}
        </p>
      </div>
    </article>
  );
}
