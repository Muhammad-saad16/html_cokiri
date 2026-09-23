import { SITE, waLink } from "@/lib/site";
import FilterLink from "./FilterLink";

export default function Footer() {
  const support = waLink("Hi Kangan! I have a question.");
  return (
    <footer className="footer" id="contact">
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
            <li><a href="#top">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><FilterLink filter="jewellery">Jewellery</FilterLink></li>
            <li><FilterLink filter="handbags">Handbags</FilterLink></li>
            <li><FilterLink filter="perfumes">Perfumes</FilterLink></li>
            <li><FilterLink filter="watches">Watches</FilterLink></li>
          </ul>
        </div>
        <div>
          <h4>Customer Support</h4>
          <ul>
            <li><a href="#faq">Delivery Information</a></li>
            <li><a href="#faq">Order Tracking</a></li>
            <li><a href="#faq">Returns &amp; Exchange</a></li>
            <li><a href="#faq">FAQs</a></li>
            <li><a href={support} target="_blank" rel="noopener">Contact Support</a></li>
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
