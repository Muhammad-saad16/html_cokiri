import { Amiri, Manrope, Outfit, Reem_Kufi } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import MobileTabBar from "@/components/MobileTabBar";
import { getSettings } from "@/lib/cms";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const kufi = Reem_Kufi({ variable: "--font-kufi", subsets: ["arabic"], weight: ["400", "600", "700"] });
// Amiri carries the ﷺ ligature, which Reem Kufi lacks.
const amiri = Amiri({ variable: "--font-amiri", subsets: ["arabic"], weight: ["400"] });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cokiri.net";

const DEFAULT_TITLE = "City of Knowledge";
const DEFAULT_DESCRIPTION =
  "City of Knowledge Islamic Research Institute, Karachi — weekly Dars-e-Quran, programs, research and publications under the supervision of Dr. Umair Mahmood Siddiqui.";

export async function generateMetadata() {
  const settings = await getSettings();
  const title = settings?.seoTitle || DEFAULT_TITLE;
  const description = settings?.seoDescription || DEFAULT_DESCRIPTION;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s — ${DEFAULT_TITLE}` },
    description,
    openGraph: { type: "website", siteName: DEFAULT_TITLE, title, description },
    twitter: { card: "summary_large_image" },
  };
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${manrope.variable} ${kufi.variable} ${amiri.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <MobileTabBar />
      </body>
    </html>
  );
}
