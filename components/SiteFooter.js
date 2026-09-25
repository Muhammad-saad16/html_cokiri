import Link from "next/link";
import { Phone, Mail, MapPin, Globe } from "lucide-react";
import { getSettings } from "@/lib/cms";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/research", label: "Research & Publications" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

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

  return (
    <footer className="mt-20 bg-slate-950 text-slate-400">
      <div className="h-1 bg-orange-600" />
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="City of Knowledge Islamic Research Institute" className="h-20 w-auto" />
          <p className="mt-4 leading-relaxed">
            A project of ITQAN Educational & Research Foundation, under the supervision of Dr. Umair Mahmood Siddiqui.
          </p>
        </div>

        <div>
          <p className="text-white font-semibold mb-4">Explore</p>
          <ul className="space-y-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
              </li>
            ))}
            <li>
              <a href="https://drumairsiddiqui.com" className="hover:text-white transition-colors">Dr. Umair Mahmood Siddiqui</a>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-white font-semibold mb-4">Contact</p>
          {settings?.contactPhone && (
            <a href={`tel:${settings.contactPhone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-2.5 hover:text-white">
              <Phone size={15} className="text-orange-500" /> {settings.contactPhone}
            </a>
          )}
          {settings?.contactEmail && (
            <a href={`mailto:${settings.contactEmail}`} className="flex items-center gap-2.5 hover:text-white">
              <Mail size={15} className="text-orange-500" /> {settings.contactEmail}
            </a>
          )}
          {settings?.address && (
            <p className="flex items-start gap-2.5">
              <MapPin size={15} className="text-orange-500 mt-0.5 shrink-0" /> {settings.address}
            </p>
          )}
          <p className="flex items-center gap-2.5">
            <Globe size={15} className="text-orange-500" /> cokiri.net · @cityofknowledgeiri
          </p>
          {Object.keys(social).length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {Object.entries(social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-slate-700 px-3 py-1 text-xs capitalize hover:border-orange-500 hover:text-white transition-colors"
                >
                  {platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-slate-800">
        <p className="max-w-6xl mx-auto px-6 py-5 text-xs">© {new Date().getFullYear()} City of Knowledge Islamic Research Institute. All rights reserved.</p>
      </div>
    </footer>
  );
}
