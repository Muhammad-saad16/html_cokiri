import Image from "next/image";
import TestimonialAvatar from "./TestimonialAvatar";

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatarColor: string;
  photoUrl?: string;
}

function QuoteIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="text-heritage-orange/30"
    >
      <path
        d="M9.333 17.333c-1.84 0-3.333-1.492-3.333-3.333 0-4.418 3.582-8 8-8v2.667c-2.946 0-5.333 2.388-5.333 5.333h.666c1.841 0 3.334 1.493 3.334 3.333 0 1.841-1.493 3.334-3.334 3.334-1.84 0-3.333-1.493-3.333-3.334zm14.667 0c-1.84 0-3.333-1.492-3.333-3.333 0-4.418 3.582-8 8-8v2.667c-2.946 0-5.334 2.388-5.334 5.333h.667c1.84 0 3.333 1.493 3.333 3.333 0 1.841-1.492 3.334-3.333 3.334-1.841 0-3.334-1.493-3.334-3.334z"
        fill="currentColor"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.5l2.9 6.6 7.1.7-5.4 4.8 1.6 7-6.2-3.7-6.2 3.7 1.6-7-5.4-4.8 7.1-.7z" />
    </svg>
  );
}

export default function TestimonialCard({ name, role, quote, avatarColor, photoUrl }: Testimonial) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-outline-variant/40 bg-paper-white p-6 transition-all duration-200 hover:border-outline/60 hover:shadow-[0_12px_24px_-10px_rgba(75,54,33,0.08)] md:p-8">
      <QuoteIcon />

      <div className="mt-4 flex items-center gap-0.5 text-heritage-orange">
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon key={index} />
        ))}
      </div>

      <p className="mt-4 flex-1 text-base leading-6 text-on-surface-variant">
        {quote}
      </p>

      <div className="mt-6 flex items-center gap-3 border-t border-outline-variant/40 pt-6">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={name}
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-full object-cover"
          />
        ) : (
          <TestimonialAvatar color={avatarColor} />
        )}
        <div>
          <p className="font-serif text-base font-semibold text-on-surface">
            {name}
          </p>
          <p className="text-sm text-on-surface-variant">{role}</p>
        </div>
      </div>
    </article>
  );
}
