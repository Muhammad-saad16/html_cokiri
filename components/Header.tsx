"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavLink = { href: string; label: string };

export default function Header({ categories }: { categories: NavLink[] }) {
  const NAV: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    ...categories,
    { href: "/shop", label: "Shop" },
    { href: "/contact", label: "Contact" },
  ];
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the page changes.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={`header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container header__inner">
        <button
          className="menu-btn"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
        <Link href="/" className="logo" aria-label="Kangan home">
          <Image src="/brand/logo-green.png" alt="Kangan — since 2012" width={575} height={228} priority />
        </Link>
        <nav className={`nav${open ? " is-open" : ""}`} aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={isActive(n.href) ? "is-active" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
        <Link href="/shop" className="header__cta" aria-label="Shop all products">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M5 8h14l-1.2 12H6.2L5 8Z" />
            <path d="M9 8V6a3 3 0 0 1 6 0v2" />
          </svg>
          <span>Shop</span>
        </Link>
      </div>
    </header>
  );
}
