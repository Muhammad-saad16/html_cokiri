import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { getSettings } from "@/lib/cms";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const sourceSerif = Source_Serif_4({ variable: "--font-source-serif", subsets: ["latin"] });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3002";

const DEFAULT_TITLE = "City of Knowledge";
const DEFAULT_DESCRIPTION =
  "City of Knowledge Islamic Research Institute — research, education, publications and knowledge resources.";

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
      className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
