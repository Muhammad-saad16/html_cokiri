import Link from "next/link";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import Reveal from "./motion/Reveal";
import { Honorific } from "./Ornaments";

/** Detail-page header: sand band with breadcrumb, kicker, big title and meta line. */
export function DetailHeader({ back, kicker, title, meta }) {
  return (
    <section className="kufic-light border-b border-line bg-sand">
      <div className="mx-auto max-w-5xl px-4 pt-10 pb-12 sm:px-6 sm:pt-14 sm:pb-16">
        <Reveal>
          <nav className="label flex flex-wrap items-center gap-2 text-ink/50" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-crimson">Home</Link>
            {back && (
              <>
                <span>/</span>
                <Link href={back.href} className="hover:text-crimson">{back.label}</Link>
              </>
            )}
          </nav>
          {kicker && <p className="label mt-8 w-fit bg-crimson px-2.5 py-1 text-white">{kicker}</p>}
          <h1 className="mt-4 font-display text-4xl leading-[1.05] font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            <Honorific text={title} />
          </h1>
          {meta && <p className="mt-4 text-sm font-semibold text-muted">{meta}</p>}
        </Reveal>
      </div>
      <div className="h-1.5 bg-gradient-to-r from-crimson via-crimson to-gold" />
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
              <a
                key={j}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold break-all text-crimson underline decoration-2 underline-offset-4 hover:text-crimson-dark"
              >
                {part.includes("youtube.com") ? "Watch on YouTube ↗" : part}
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
    <div className="mt-12 flex flex-col justify-between gap-5 bg-crimson p-7 text-white sm:flex-row sm:items-center">
      <div>
        <p className="font-display text-2xl font-bold">{title}</p>
        <p className="text-sm text-white/80">{text}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <a href="https://wa.me/923362342386" target="_blank" rel="noopener noreferrer" className="btn-ink">
          <MessageCircle size={16} /> WhatsApp
        </a>
        <Link href="/contact" className="btn-line-light">
          Contact <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
}
