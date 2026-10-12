import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";
import { getSettings } from "@/lib/cms";
import { LINKS } from "@/lib/nav";

function parseSocial(settings) {
  try {
    return settings?.socialLinks ? JSON.parse(settings.socialLinks) : {};
  } catch {
    return {};
  }
}

export default async function SiteFooter() {
  const settings = await getSettings();
  const social = parseSocial(settings);
  const phone = settings?.contactPhone;

  return (
    <footer className="kufic relative overflow-hidden bg-ink pb-20 text-white/70 md:pb-0">
      <div className="h-1.5 bg-gradient-to-r from-crimson via-crimson to-gold" />

      {/* Verse + CTA */}
      <div className="mx-auto grid max-w-7xl gap-10 border-b border-white/10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:px-8">
        <div>
          <p className="font-arabic text-3xl leading-relaxed text-gold sm:text-4xl" lang="ar" dir="rtl">
            وَقُل رَّبِّ زِدْنِي عِلْمًا
          </p>
          <p className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">“And say: My Lord, increase me in knowledge.”</p>
          <p className="label mt-2 text-white/50">Surah Ta-Ha · 20:114</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          {phone && (
            <a href={`https://wa.me/${phone.replace(/[^\d]/g, "")}`} target="_blank" rel="noopener noreferrer" className="btn-red">
              <MessageCircle size={16} /> WhatsApp us
            </a>
          )}
          <Link href="/contact" className="btn-line-light">
            Plan a visit <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 text-sm sm:px-6 md:grid-cols-[1.2fr_1fr_1.2fr] lg:px-8">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="City of Knowledge Islamic Research Institute" className="h-20 w-auto" />
          <p className="mt-5 max-w-xs leading-relaxed">
            A project of ITQAN Educational &amp; Research Foundation, under the supervision of{" "}
            <a href="https://drumairsiddiqui.com" className="font-semibold text-white underline decoration-gold underline-offset-4 hover:text-gold">
              Dr. Umair Mahmood Siddiqui
            </a>
            .
          </p>
        </div>

        <div>
          <p className="label text-gold">Explore</p>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <p className="label mb-5 text-gold">Contact</p>
          {phone && (
            <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-3 hover:text-white">
              <Phone size={16} className="text-crimson" /> {phone}
            </a>
          )}
          {settings?.contactEmail && (
            <a href={`mailto:${settings.contactEmail}`} className="flex items-center gap-3 hover:text-white">
              <Mail size={16} className="text-crimson" /> {settings.contactEmail}
            </a>
          )}
          {settings?.address && (
            <p className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-crimson" /> {settings.address}
            </p>
          )}
          {Object.keys(social).length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {Object.entries(social).map(([platform, url]) => (
                <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="border border-white/20 px-3 py-1.5 text-xs transition-colors hover:border-white hover:text-white">
                  {platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="pointer-events-none mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8" aria-hidden>
        <p className="text-outline font-display text-[11.5vw] leading-[0.9] font-extrabold tracking-tighter whitespace-nowrap xl:text-[9.4rem]">
          City of Knowledge
        </p>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/45 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} City of Knowledge Islamic Research Institute. All rights reserved.</p>
          <p>cokiri.net · Gulshan-e-Iqbal, Karachi</p>
        </div>
      </div>
    </footer>
  );
}
