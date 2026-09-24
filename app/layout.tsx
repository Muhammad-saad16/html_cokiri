import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
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
  icons: { icon: "/media/logo-mark.png" },
};

export const viewport: Viewport = { themeColor: "#15100b" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <div className="announce">
          <p>Door-to-door delivery across Pakistan &amp; Bahrain &nbsp;·&nbsp; Order online, pay on confirmation</p>
        </div>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
