"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Elements that fade/slide in as they scroll into view.
const TARGETS = [
  ".section__head",
  ".page-head .container",
  ".strip__inner > div",
  ".cat",
  ".card",
  ".banner",
  ".split__media",
  ".split__text",
  ".look__media",
  ".look__item",
  ".why article",
  ".steps li",
  ".timeline li",
  ".mv__col",
  ".faq details",
  ".contact-card",
  ".cta__inner",
  ".film",
  ".link-more",
  ".filters",
].join(",");

/** Adds scroll-in animations to page content. Content stays visible without JS or with reduced motion. */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.classList.add("is-visible");
          io.unobserve(el);
          // Hand transitions back to the element's own hover styles once it has settled.
          setTimeout(() => el.classList.remove("reveal", "is-visible"), 1400);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const fold = window.innerHeight;
    document.querySelectorAll<HTMLElement>(TARGETS).forEach((el) => {
      if (el.classList.contains("reveal")) return;
      // Leave anything already on screen alone so it doesn't flicker.
      if (el.getBoundingClientRect().top < fold) return;
      const index = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
      el.style.setProperty("--reveal-delay", `${(index % 4) * 90}ms`);
      el.classList.add("reveal");
      io.observe(el);
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
