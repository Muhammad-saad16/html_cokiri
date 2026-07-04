"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/programs" },
  { label: "Events", href: "/events" },
  { label: "Videos & Lectures", href: "/videos-lectures" },
  { label: "Gallery", href: "/gallery" },
  { label: "About us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-paper-white border-b border-outline-variant/30">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-5 md:px-20">
        {/* Logo */}
        <Link href="/" className="flex items-center" onClick={closeMenu}>
          <Image
            src="/logo.png"
            alt="City of Knowledge logo"
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
                className="font-hanken text-xs font-bold uppercase tracking-[0.05em] text-on-surface transition-colors duration-200 hover:text-heritage-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange focus-visible:ring-offset-2"
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
          className="inline-flex h-11 w-11 items-center justify-center rounded text-on-surface transition-colors duration-200 hover:bg-manuscript-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange lg:hidden"
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
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="border-t border-outline-variant/30 bg-manuscript-tint px-5 py-4 text-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={closeMenu}
                className="block py-3 font-hanken text-xs font-bold uppercase tracking-[0.05em] text-on-surface transition-colors duration-200 hover:text-heritage-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange focus-visible:ring-offset-2"
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
