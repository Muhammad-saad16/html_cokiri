"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/research", label: "Research" },
  { href: "/media", label: "Media" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

function NavLink({ href, label }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link href={href} className="relative text-sm text-slate-600 hover:text-slate-900 transition-colors py-1 group">
      {label}
      <span
        className={`absolute left-0 -bottom-0.5 h-px bg-orange-700 transition-all duration-300 ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
}

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur transition-all duration-300 ${
        scrolled ? "bg-slate-50/95 border-b border-slate-200 shadow-sm shadow-slate-900/[0.03]" : "bg-slate-50/70 border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="City of Knowledge — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="City of Knowledge Islamic Research Institute" className="h-14 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {LINKS.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        <button className="md:hidden text-slate-700" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden border-t border-slate-200 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-slate-700" onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
