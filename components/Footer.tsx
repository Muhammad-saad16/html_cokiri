import Image from "next/image";
import Link from "next/link";
import { SITE, waLink } from "@/lib/site";

const SOCIAL = [
  {
    label: "Instagram",
    href: SITE.instagram,
    icon: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r=".8" fill="currentColor" />
      </>
    ),
  },
  {
    label: "Facebook",
    href: SITE.facebook,
    icon: <path d="M14 8h2.5V4.5H14A4 4 0 0 0 10 8.5V11H7.5v3.5H10V21h3.5v-6.5H16l.5-3.5h-3V9a1 1 0 0 1 .5-1Z" />,
  },
  {
    label: "TikTok",
    href: SITE.tiktok,
    icon: <path d="M14 3.5v11.2a3.3 3.3 0 1 1-3.3-3.3M14 3.5c.4 2.6 2.2 4.4 5 4.6" />,
  },
];

export default function Footer() {
  const support = waLink("Hi Kangan! I have a question.");
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Image src="/brand/logo-cream.png" alt="Kangan — since 2012" width={575} height={228} className="footer__logo" />
          <p>Love · Fashion · Beauty · Passion — it&apos;s all about Kangan.</p>
          <p className="muted">
            Jewellery | Bags | Perfumes | Watches
            <br />
            Since 2012 | Bahrain &amp; Pakistan
          </p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/shop">Shop</Link></li>
            <li><Link href="/collections/jewellery">Jewellery</Link></li>
            <li><Link href="/collections/handbags">Bags</Link></li>
            <li><Link href="/collections/perfumes">Perfume</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4>Customer Care</h4>
          <ul>
            <li><Link href="/contact#faq">Delivery Information</Link></li>
            <li><Link href="/contact#faq">Order Tracking</Link></li>
            <li><Link href="/contact#faq">Returns &amp; Exchange</Link></li>
            <li><Link href="/contact#faq">FAQs</Link></li>
            <li><a href={support} target="_blank" rel="noopener">WhatsApp Support</a></li>
          </ul>
        </div>
        <div>
          <h4>Follow Us</h4>
          <div className="social">
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
          <p className="muted">
            {SITE.phone}
            <br />
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </div>
      </div>
      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} Kangan. All rights reserved.</p>
        <p className="footer__tag">Love · Fashion · Beauty · Passion</p>
      </div>
    </footer>
  );
}
