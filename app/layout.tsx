import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});
const sans = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-sans" });

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <div className="announce">
          <div className="container announce__inner">
            <p>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M2 7h11v9H2zM13 10h4l3 3v3h-7" />
                <circle cx="6" cy="17.5" r="1.6" />
                <circle cx="16.5" cy="17.5" r="1.6" />
              </svg>
              Door-to-door delivery across Pakistan &amp; Bahrain
            </p>
            <p className="announce__tag">Love · Fashion · Beauty · Passion</p>
          </div>
        </div>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <ScrollReveal />
      </body>
    </html>
  );
}
