import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
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
    <footer className="pattern-navy mt-0 pb-20 text-ivory/75 md:pb-0">
      {/* Qur'anic verse band */}
      <div className="border-y border-gold/25 bg-navy-deep/60">
        <div className="mx-auto max-w-5xl px-4 py-10 text-center sm:px-6">
          <p className="font-arabic text-2xl leading-loose text-gold-light sm:text-3xl" lang="ar" dir="rtl">
            وَقُل رَّبِّ زِدْنِي عِلْمًا
          </p>
          <p className="mt-2 font-serif text-xl text-ivory/90 italic">&ldquo;And say: My Lord, increase me in knowledge.&rdquo;</p>
          <p className="mt-1 text-xs tracking-[0.25em] text-gold uppercase">— Surah Ta-Ha 20:114</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 text-sm sm:px-6 md:grid-cols-[1.3fr_1fr_1.3fr] lg:px-8">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="City of Knowledge Islamic Research Institute" className="h-20 w-auto" />
          <p className="mt-5 max-w-xs leading-relaxed">
            A project of ITQAN Educational &amp; Research Foundation, under the supervision of{" "}
            <a href="https://drumairsiddiqui.com" className="text-gold-light hover:underline">
              Dr. Umair Mahmood Siddiqui
            </a>
            .
          </p>
        </div>

        <div>
          <h3 className="font-serif text-lg tracking-[0.15em] text-gold-light uppercase">Explore</h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-gold-light">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="mb-4 font-serif text-lg tracking-[0.15em] text-gold-light uppercase">Contact</h3>
          {phone && (
            <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-3 hover:text-gold-light">
              <Phone size={16} className="text-gold" /> {phone}
            </a>
          )}
          {phone && (
            <a href={`https://wa.me/${phone.replace(/[^\d]/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-gold-light">
              <MessageCircle size={16} className="text-gold" /> WhatsApp
            </a>
          )}
          {settings?.contactEmail && (
            <a href={`mailto:${settings.contactEmail}`} className="flex items-center gap-3 hover:text-gold-light">
              <Mail size={16} className="text-gold" /> {settings.contactEmail}
            </a>
          )}
          {settings?.address && (
            <p className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold" /> {settings.address}
            </p>
          )}
          {Object.keys(social).length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {Object.entries(social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-gold/40 px-3 py-1 text-xs transition-colors hover:border-gold hover:bg-gold hover:text-navy-deep"
                >
                  {platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gold/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-ivory/55 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} City of Knowledge Islamic Research Institute. All rights reserved.</p>
          <p className="font-arabic text-base text-gold-light/80" lang="ar">مَدِينَةُ العِلْم</p>
        </div>
      </div>
    </footer>
  );
}
