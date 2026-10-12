"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone, CalendarClock, ArrowUpRight } from "lucide-react";
import { LINKS, isActive } from "@/lib/nav";

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      {/* Utility bar */}
      <div className="hidden bg-ink text-xs text-white/80 sm:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/programs/weekly-dars-e-quran" className="flex items-center gap-2 hover:text-gold">
            <CalendarClock size={14} className="text-gold" />
            Weekly Dars-e-Quran · every Saturday, 9:00 pm · Gulshan-e-Iqbal
          </Link>
          <a href="tel:+923362342386" className="flex items-center gap-2 hover:text-gold">
            <Phone size={13} className="text-gold" /> +92-336-2342386
          </a>
        </div>
      </div>

      <header className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-all ${scrolled ? "border-line shadow-sm" : "border-transparent"}`}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center" aria-label="City of Knowledge — home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="City of Knowledge Islamic Research Institute" className="h-12 w-auto sm:h-14" />
          </Link>

          <nav className="hidden h-full items-center gap-1 lg:flex" aria-label="Main">
            {LINKS.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative flex h-full items-center px-3 text-sm font-semibold transition-colors xl:px-4 ${
                    active ? "text-crimson" : "text-ink/75 hover:text-ink"
                  }`}
                >
                  {l.label}
                  <span className={`absolute inset-x-3 bottom-0 h-[3px] bg-crimson transition-transform xl:inset-x-4 ${active ? "scale-x-100" : "scale-x-0"}`} />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/contact" className="btn-red hidden !px-5 !py-3 xl:inline-flex">
              Visit Us <ArrowUpRight size={16} />
            </Link>
            <button className="p-2 text-ink lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}>
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="kufic fixed inset-0 z-[60] flex flex-col bg-ink p-6 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-arabic text-3xl text-gold" lang="ar">مدينة العلم</span>
              <button onClick={() => setOpen(false)} className="p-2 text-white" aria-label="Close menu">
                <X size={30} />
              </button>
            </div>
            <nav className="mt-8 flex-1 overflow-y-auto" aria-label="Mobile">
              {[{ href: "/", label: "Home" }, ...LINKS].map((l, i) => (
                <motion.div key={l.href} initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.03 * i }}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-baseline gap-4 border-b border-white/10 py-3 font-display text-3xl font-bold ${
                      isActive(pathname, l.href) ? "text-gold" : "text-white"
                    }`}
                  >
                    <span className="text-sm font-medium text-white/40">{String(i + 1).padStart(2, "0")}</span>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <a href="tel:+923362342386" className="btn-red mt-6 justify-center">
              <Phone size={16} /> +92-336-2342386
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
