"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, PlayCircle } from "lucide-react";
import { LINKS, isActive } from "@/lib/nav";

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-gold/25 bg-navy-deep/95 backdrop-blur transition-shadow ${scrolled ? "shadow-lg shadow-black/20" : ""}`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center" aria-label="City of Knowledge — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="City of Knowledge Islamic Research Institute" className="h-12 w-auto sm:h-14" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Main">
          {LINKS.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative py-2 text-[13px] font-medium tracking-[0.14em] whitespace-nowrap uppercase transition-colors ${
                  active ? "text-gold-light" : "text-ivory/80 hover:text-gold-light"
                }`}
              >
                {l.label}
                <span className={`absolute inset-x-0 -bottom-0.5 h-px bg-gold transition-transform ${active ? "scale-x-100" : "scale-x-0"}`} />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/programs/weekly-dars-e-quran" className="btn-gold hidden !px-4 !py-2.5 !text-xs xl:inline-flex">
            <PlayCircle size={16} /> Weekly Dars
          </Link>
          <button
            className="rounded-md p-2 text-ivory lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu size={26} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="pattern-navy absolute inset-y-0 right-0 flex w-80 max-w-[85%] flex-col p-6 shadow-2xl"
              aria-label="Mobile"
            >
              <div className="flex items-center justify-between">
                <span className="font-arabic text-3xl text-gold-light" lang="ar">مَدِينَةُ العِلْم</span>
                <button onClick={() => setOpen(false)} className="p-2 text-ivory" aria-label="Close menu">
                  <X size={26} />
                </button>
              </div>
              <div className="mt-8 flex flex-col">
                {[{ href: "/", label: "Home" }, ...LINKS].map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`border-b border-gold/20 py-3.5 font-serif text-xl ${isActive(pathname, l.href) ? "text-gold-light" : "text-ivory"}`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
              <Link href="/programs/weekly-dars-e-quran" onClick={() => setOpen(false)} className="btn-gold mt-auto justify-center">
                <PlayCircle size={16} /> Weekly Dars-e-Quran
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
