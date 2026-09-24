import Image from "next/image";
import Link from "next/link";
import { SITE, waLink } from "@/lib/site";

const BENEFITS = [
  ["Door-to-Door Delivery", "Across Pakistan & Bahrain"],
  ["No Online Payment", "We confirm every order by phone"],
  ["Easy Exchange", "Talk to us on WhatsApp"],
  ["Since 2012", "Trusted by our customers"],
];

export default function Footer() {
  const support = waLink("Hi Kangan! I have a question.");
  return (
    <>
      <section className="benefits">
        <div className="container benefits__inner">
          {BENEFITS.map(([t, d]) => (
            <div key={t}>
              <strong>{t}</strong>
              <span>{d}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="container footer__grid">
          <div className="footer__brand">
            <Image src="/media/logo-full.png" alt="Kangan" width={170} height={154} />
            <p>Love. Fashion. Beauty. Passion. — It&apos;s All About Kangan.</p>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>
              <li><Link href="/shop">Shop All</Link></li>
              <li><Link href="/collections/jewellery">Jewellery</Link></li>
              <li><Link href="/collections/handbags">Handbags</Link></li>
              <li><Link href="/collections/perfumes">Perfumes</Link></li>
              <li><Link href="/collections/watches">Watches</Link></li>
            </ul>
          </div>
          <div>
            <h4>Customer Care</h4>
            <ul>
              <li><Link href="/about">About Kangan</Link></li>
              <li><Link href="/contact#faq">How to Order</Link></li>
              <li><Link href="/contact#faq">Delivery Information</Link></li>
              <li><Link href="/contact#faq">Returns &amp; Exchange</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4>Get in Touch</h4>
            <ul>
              <li><a href={support} target="_blank" rel="noopener">WhatsApp: {SITE.phone}</a></li>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            </ul>
            <div className="socials">
              <a href={SITE.instagram} target="_blank" rel="noopener">Instagram</a>
              <a href={SITE.facebook} target="_blank" rel="noopener">Facebook</a>
              <a href={SITE.tiktok} target="_blank" rel="noopener">TikTok</a>
            </div>
          </div>
        </div>
        <div className="container footer__bottom">
          <p>© {new Date().getFullYear()} Kangan. All Rights Reserved.</p>
          <p>Bahrain &amp; Pakistan · Since 2012</p>
        </div>
      </footer>
    </>
  );
}
