"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop All" },
  { href: "/collections/jewellery", label: "Jewellery" },
  { href: "/collections/handbags", label: "Handbags" },
  { href: "/collections/perfumes", label: "Perfumes" },
  { href: "/collections/watches", label: "Watches" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
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

  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={`header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container header__inner">
        <button
          className={`menu-btn${open ? " is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <Link href="/" className="logo" aria-label="Kangan home">
          <Image src="/media/logo-mark.png" alt="" width={54} height={40} priority />
          <span>
            KANGAN<small>Jewellery · Perfumes · Handbags · Watches</small>
          </span>
        </Link>

        <nav className={`nav${open ? " is-open" : ""}`} aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={isActive(n.href) ? "is-active" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>

        <Link href="/shop" className="header__cta">
          Order Now
        </Link>
      </div>
    </header>
  );
}
