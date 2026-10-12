import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Reveal from "./motion/Reveal";
import { ArchEdge, Honorific } from "./Ornaments";

/** Navy header for detail pages, with a back link to the section. */
export function DetailHeader({ back, eyebrow, title, meta }) {
  return (
    <section className="pattern-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/50 to-transparent" />
      <div className="relative mx-auto max-w-4xl px-4 pt-10 pb-20 sm:px-6 sm:pt-14 sm:pb-24">
        <Reveal>
          {back && (
            <Link href={back.href} className="inline-flex items-center gap-1 text-xs font-semibold tracking-[0.2em] text-gold-light/80 uppercase hover:text-gold-light">
              <ChevronLeft size={14} /> {back.label}
            </Link>
          )}
          {eyebrow && <p className="mt-6 text-xs font-semibold tracking-[0.3em] text-gold-light uppercase">{eyebrow}</p>}
          <h1 className="mt-3 font-serif text-3xl leading-tight font-semibold text-ivory sm:text-5xl">
            <Honorific text={title} />
          </h1>
          {meta && <p className="mt-4 text-sm text-ivory/70">{meta}</p>}
        </Reveal>
      </div>
      <ArchEdge className="absolute inset-x-0 -bottom-px" />
    </section>
  );
}

const URL_RE = /(https?:\/\/[^\s]+)/g;

/** Plain text with paragraphs and clickable links. */
export function Prose({ text, className = "" }) {
  if (!text) return null;
  return (
    <div className={`space-y-4 text-[17px] leading-relaxed text-ink/85 ${className}`}>
      {text.split("\n\n").map((para, i) => (
        <p key={i} className="whitespace-pre-line">
          {para.split(URL_RE).map((part, j) =>
            part.startsWith("http") ? (
              <a key={j} href={part} target="_blank" rel="noopener noreferrer" className="break-all text-maroon underline decoration-gold/60 underline-offset-2 hover:text-gold-dark">
                {part.includes("youtube.com") ? "Watch on YouTube" : part}
              </a>
            ) : (
              <Honorific key={j} text={part} />
            ),
          )}
        </p>
      ))}
    </div>
  );
}

/** "Admissions & enquiries" call-to-action box. */
export function EnquiryBox({ title = "Admissions & enquiries", text = "Call or WhatsApp us for timings and details." }) {
  return (
    <div className="pattern-navy mt-12 flex flex-col justify-between gap-5 rounded-2xl border border-gold/40 p-6 sm:flex-row sm:items-center">
      <div>
        <p className="font-serif text-2xl font-semibold text-gold-light">{title}</p>
        <p className="text-sm text-ivory/70">{text}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <a href="https://wa.me/923362342386" target="_blank" rel="noopener noreferrer" className="btn-gold !px-5 !py-2.5">
          WhatsApp
        </a>
        <Link href="/contact" className="btn-outline-light !px-5 !py-2.5">
          Contact
        </Link>
      </div>
    </div>
  );
}
