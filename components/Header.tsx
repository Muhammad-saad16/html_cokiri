"use client";

import { useEffect, useState } from "react";
import FilterLink from "./FilterLink";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`header${scrolled ? " is-scrolled" : ""}`} id="top">
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
        <a href="#top" className="logo">
          KANGAN<small>Luxury · Elegance · Lifestyle</small>
        </a>
        <nav className={`nav${open ? " is-open" : ""}`} aria-label="Main">
          <a href="#top" onClick={close}>Home</a>
          <a href="#about" onClick={close}>About</a>
          <FilterLink filter="jewellery" onClick={close}>Jewellery</FilterLink>
          <FilterLink filter="handbags" onClick={close}>Handbags</FilterLink>
          <FilterLink filter="perfumes" onClick={close}>Perfumes</FilterLink>
          <FilterLink filter="watches" onClick={close}>Watches</FilterLink>
          <a href="#contact" onClick={close}>Contact</a>
        </nav>
        <FilterLink filter="all" className="header__cta">Shop</FilterLink>
      </div>
    </header>
  );
}
