import Link from "next/link";
import { SITE, waLink } from "@/lib/site";

export default function Footer() {
  const support = waLink("Hi Kangan! I have a question.");
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <p className="logo logo--light">KANGAN</p>
          <p>Love. Fashion. Beauty. Passion. — It&apos;s All About Kangan.</p>
          <p className="muted">
            Jewellery | Handbags | Perfumes | Watches
            <br />
            Since 2012 | Bahrain &amp; Pakistan
          </p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/shop">Shop All</Link></li>
            <li><Link href="/collections/jewellery">Jewellery</Link></li>
            <li><Link href="/collections/handbags">Handbags</Link></li>
            <li><Link href="/collections/perfumes">Perfumes</Link></li>
            <li><Link href="/collections/watches">Watches</Link></li>
          </ul>
        </div>
        <div>
          <h4>Customer Support</h4>
          <ul>
            <li><Link href="/contact#faq">Delivery Information</Link></li>
            <li><Link href="/contact#faq">Order Tracking</Link></li>
            <li><Link href="/contact#faq">Returns &amp; Exchange</Link></li>
            <li><Link href="/contact#faq">FAQs</Link></li>
            <li><Link href="/contact">Contact Support</Link></li>
          </ul>
        </div>
        <div>
          <h4>Follow Kangan</h4>
          <ul>
            <li><a href={SITE.instagram} target="_blank" rel="noopener">Instagram</a></li>
            <li><a href={SITE.facebook} target="_blank" rel="noopener">Facebook</a></li>
            <li><a href={SITE.tiktok} target="_blank" rel="noopener">TikTok</a></li>
            <li><a href={support} target="_blank" rel="noopener">WhatsApp</a></li>
          </ul>
          <p className="muted">{SITE.phone}</p>
        </div>
      </div>
      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} Kangan. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
