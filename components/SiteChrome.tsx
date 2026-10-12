import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { getCategories, getSettings } from "@/lib/data";

/** Announcement bar, header, footer and WhatsApp button around every public page. */
export default async function SiteChrome({ children }: { children: React.ReactNode }) {
  const [settings, categories] = await Promise.all([getSettings(), getCategories()]);
  const nav = categories.map((c) => ({ href: `/collections/${c.slug}`, label: c.title }));

  return (
    <>
      <div className="announce">
        <div className="container announce__inner">
          <p>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M2 7h11v9H2zM13 10h4l3 3v3h-7" />
              <circle cx="6" cy="17.5" r="1.6" />
              <circle cx="16.5" cy="17.5" r="1.6" />
            </svg>
            {settings.announcement}
          </p>
          <p className="announce__tag">Love · Fashion · Beauty · Passion</p>
        </div>
      </div>
      <Header categories={nav} />
      <main>{children}</main>
      <Footer settings={settings} categories={nav} />
      <WhatsAppFloat whatsapp={settings.whatsapp} />
      <ScrollReveal />
    </>
  );
}
