import { Mail, Phone, MapPin, Link2, MessageCircle, Globe } from "lucide-react";
import { getSettings, mediaUrl } from "@/lib/cms";
import Reveal from "@/components/motion/Reveal";
import FitImage from "@/components/FitImage";

export const metadata = {
  title: "Contact",
  description: "Visit, call or WhatsApp City of Knowledge Islamic Research Institute, Gulshan-e-Iqbal, Karachi.",
};

const MAP_QUERY = "City of Knowledge Islamic Research Institute, Gulshan-e-Iqbal, Karachi";

export default async function ContactPage() {
  const settings = await getSettings();
  let socialLinks = {};
  try {
    socialLinks = settings?.socialLinks ? JSON.parse(settings.socialLinks) : {};
  } catch {
    socialLinks = {};
  }
  const phone = settings?.contactPhone || "+92-336-2342386";
  const phoneDigits = phone.replace(/[^\d]/g, "");

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <Reveal>
          <h1 className="text-4xl font-extrabold uppercase tracking-tight text-orange-600">Contact Us</h1>
          <p className="mt-4 text-slate-600">
            For admissions, program details, the weekly Dars-e-Quran, research inquiries or general questions — call,
            WhatsApp, email or visit us.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 space-y-4 text-slate-700">
          <a href={`tel:+${phoneDigits}`} className="flex items-center gap-3 hover:text-orange-800 transition-colors">
            <Phone size={18} className="text-orange-600" /> {phone}
          </a>
          <a href={`https://wa.me/${phoneDigits}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-orange-800 transition-colors">
            <MessageCircle size={18} className="text-orange-600" /> WhatsApp {phone}
          </a>
          {settings?.contactEmail && (
            <a href={`mailto:${settings.contactEmail}`} className="flex items-center gap-3 hover:text-orange-800 transition-colors">
              <Mail size={18} className="text-orange-600" /> {settings.contactEmail}
            </a>
          )}
          {settings?.contactEmail !== "iricn786@gmail.com" && (
            <a href="mailto:iricn786@gmail.com" className="flex items-center gap-3 hover:text-orange-800 transition-colors">
              <Mail size={18} className="text-orange-600" /> iricn786@gmail.com
            </a>
          )}
          <div className="flex items-center gap-3">
            <Globe size={18} className="text-orange-600" /> cokiri.net · @cityofknowledgeiri
          </div>
          {settings?.address && (
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-orange-600 mt-0.5 shrink-0" /> {settings.address}
            </div>
          )}
        </Reveal>

        {Object.keys(socialLinks).length > 0 && (
          <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
            {Object.entries(socialLinks).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600 hover:bg-orange-600 hover:text-white transition-colors capitalize"
              >
                <Link2 size={14} /> {platform}
              </a>
            ))}
          </Reveal>
        )}
      </div>

      <Reveal delay={0.1} className="space-y-4">
        <FitImage src="/images/building-front.jpg" alt="City of Knowledge building" className="w-full h-60 rounded-2xl" />
        <iframe
          title="City of Knowledge on Google Maps"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`}
          className="w-full h-64 rounded-2xl border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Reveal>
    </div>
  );
}
