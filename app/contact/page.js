import { Mail, Phone, MapPin, MessageCircle, Link2 } from "lucide-react";
import { getSettings } from "@/lib/cms";
import Reveal from "@/components/motion/Reveal";
import FitImage from "@/components/FitImage";
import { PageHeader } from "@/components/Ornaments";

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

  const cards = [
    { Icon: Phone, label: "Call", value: phone, href: `tel:+${phoneDigits}` },
    { Icon: MessageCircle, label: "WhatsApp", value: phone, href: `https://wa.me/${phoneDigits}` },
    settings?.contactEmail && { Icon: Mail, label: "Email", value: settings.contactEmail, href: `mailto:${settings.contactEmail}` },
    settings?.address && { Icon: MapPin, label: "Visit", value: settings.address },
  ].filter(Boolean);

  return (
    <>
      <PageHeader
        arabic="تَوَاصَلُوا مَعَنَا"
        title="Contact Us"
        intro="For admissions, program details, the weekly Dars-e-Quran, research inquiries or general questions — call, WhatsApp, email or visit us."
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal className="space-y-4">
            {cards.map(({ Icon, label, value, href }) => {
              const body = (
                <>
                  <span className="grid h-12 w-12 shrink-0 place-items-center border border-gold bg-ink text-gold">
                    <Icon size={20} />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold tracking-[0.2em] text-crimson uppercase">{label}</span>
                    <span className="block font-medium text-ink">{value}</span>
                  </span>
                </>
              );
              const cls = "flex items-center gap-4  border border-line bg-white/80 p-5 transition hover:border-gold hover:shadow-md";
              return href ? (
                <a key={label} href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  {body}
                </a>
              ) : (
                <div key={label} className={cls}>
                  {body}
                </div>
              );
            })}

            {Object.keys(socialLinks).length > 0 && (
              <div className="kufic bg-ink border border-line p-6 text-center">
                <p className="text-xs font-semibold tracking-[0.25em] text-gold uppercase">Follow</p>
                <div className="mt-4 flex flex-wrap justify-center gap-3">
                  {Object.entries(socialLinks).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border border-line px-4 py-2 text-sm text-white transition-colors hover:bg-gold hover:text-ink"
                    >
                      <Link2 size={14} /> {platform}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </Reveal>

          <Reveal delay={0.1} className="space-y-4">
            <FitImage src="/images/building-front.jpg" alt="City of Knowledge building" className="h-64 w-full" />
            <iframe
              title="City of Knowledge on Google Maps"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`}
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
