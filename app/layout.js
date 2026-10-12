import { Amiri, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import MobileTabBar from "@/components/MobileTabBar";
import { getSettings } from "@/lib/cms";

const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["400", "500", "600", "700"], style: ["normal", "italic"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const amiri = Amiri({ variable: "--font-amiri", subsets: ["arabic"], weight: ["400", "700"] });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3002";

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
      className={`${cormorant.variable} ${inter.variable} ${amiri.variable} h-full antialiased`}
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
