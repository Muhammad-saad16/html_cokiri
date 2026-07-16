import Link from "next/link";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import { getTestimonials, getHomepage } from "../../sanity/lib/queries";
import { urlFor } from "../../sanity/lib/image";
import { getAvatarColor } from "../../sanity/lib/avatar";

export default async function TestimonialsSection() {
  const [rawTestimonials, homepage] = await Promise.all([
    getTestimonials(),
    getHomepage(),
  ]);
  const testimonials = rawTestimonials.map((t) => ({
    name: t.name,
    role: t.designation ?? "",
    quote: t.message,
    avatarColor: getAvatarColor(t.name),
    photoUrl: t.photo ? urlFor(t.photo).width(96).height(96).url() : undefined,
  }));
  const sectionTitle = homepage?.testimonialSectionTitle || "Words of Honor";

  return (
    <section className="pb-16 md:pb-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-20">
        {/* Header */}
        <div className="mb-10 text-center md:mb-12">
          <span className="mb-4 inline-block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
            Testimonials
          </span>
          <h2 className="font-serif text-[28px] font-semibold leading-9 text-on-surface md:text-[40px] md:leading-[48px]">
            {sectionTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-6 text-on-surface-variant md:text-lg md:leading-7">
            Hear from students, families, and scholars whose lives have been
            shaped by their time at City of Knowledge.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <TestimonialsCarousel testimonials={testimonials} />

        {/* Explore More */}
        <div className="mt-10 flex justify-center md:mt-12">
          <Link
            href="/testimonials"
            className="inline-flex h-12 items-center justify-center rounded bg-heritage-orange px-6 font-hanken text-xs font-bold uppercase tracking-[0.05em] text-paper-white transition-colors duration-200 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange focus-visible:ring-offset-2 focus-visible:ring-offset-paper-white"
          >
            Explore More
          </Link>
        </div>
      </div>
    </section>
  );
}
