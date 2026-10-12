import type { Metadata, Viewport } from "next";
import { Jost, Poppins } from "next/font/google";
import SiteChrome from "@/components/SiteChrome";
import "./globals.css";

// Headings: Jost — clean, geometric, set in capitals with open spacing (like IWC / Bagzollo).
// Text: Poppins — clear and easy to read at small sizes.
const display = Jost({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-display" });
const sans = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Kangan — Luxury. Elegance. Lifestyle.",
    template: "%s | Kangan",
  },
  description:
    "Kangan is a premium online fashion and lifestyle brand for women — jewellery, handbags, perfumes and watches with door-to-door delivery in Pakistan and Bahrain since 2012.",
  icons: { icon: "/brand/mark-green.png" },
};

export const viewport: Viewport = { themeColor: "#0b3d32" };

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
