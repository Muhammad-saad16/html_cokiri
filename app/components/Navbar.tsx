"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Videos & Lectures", href: "/videos-lectures" },
  { label: "Gallery", href: "/gallery" },
  { label: "About us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

interface NavbarProps {
  siteName: string;
  logoUrl?: string;
}

export default function Navbar({ siteName, logoUrl }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      className={
        isHome
          ? "fixed inset-x-0 top-0 z-50 bg-[#c1d9fc]/80"
          : "sticky top-0 z-50 bg-[linear-gradient(135deg,#3d2a56_0%,#3f3f80_25%,#4a5aa0_50%,#3f5c96_75%,#2c6f9e_100%)] border-b border-white/15"
      }
    >
      {isHome && (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-transparent"
          aria-hidden="true"
        />
      )}
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-5 md:px-20">
        {/* Logo */}
        <Link href="/" className="flex items-center" onClick={closeMenu}>
          <Image
            src={logoUrl || "/logo.png"}
            alt={`${siteName} logo`}
            width={56}
            height={56}
            priority
            className="h-12 w-auto md:h-14"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  isHome
                    ? "font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange focus-visible:ring-offset-2"
                    : "font-hanken text-xs font-bold uppercase tracking-[0.05em] text-paper-white transition-colors duration-200 hover:text-heritage-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#4a5aa0]"
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          className={`inline-flex h-11 w-11 items-center justify-center rounded transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange lg:hidden ${
            isHome ? "text-heritage-orange" : "text-paper-white"
          }`}
        >
          <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Panel */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
          isHome ? "relative bg-[linear-gradient(135deg,#3d2a56_0%,#3f3f80_25%,#4a5aa0_50%,#3f5c96_75%,#2c6f9e_100%)]" : ""
        } ${isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <ul className="border-t border-white/15 px-5 py-4 text-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={closeMenu}
                className={
                  isHome
                    ? "block py-3 font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange focus-visible:ring-offset-2"
                    : "block py-3 font-hanken text-xs font-bold uppercase tracking-[0.05em] text-paper-white transition-colors duration-200 hover:text-heritage-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#4a5aa0]"
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
