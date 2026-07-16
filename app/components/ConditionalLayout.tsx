"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ConditionalLayout({
  children,
  siteName,
  logoUrl,
}: {
  children: React.ReactNode;
  siteName: string;
  logoUrl?: string;
}) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio") || false;

  return (
    <>
      {!isStudio && <Navbar siteName={siteName} logoUrl={logoUrl} />}
      {children}
      {!isStudio && <Footer siteName={siteName} />}
    </>
  );
}
