import type { Metadata } from "next";
import { Inter, Source_Serif_4, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "./components/ConditionalLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "City of Knowledge",
  description: "Islamic Research Institute — authentic, scholarly Islamic education and research.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable} ${hankenGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background font-sans text-on-surface">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
