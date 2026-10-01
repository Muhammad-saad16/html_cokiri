import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "@/lib/cms";
import { waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & FAQ",
  description: "Contact Kangan on WhatsApp, phone or email. Answers to common questions about ordering, delivery and exchanges.",
};

const FAQ = [
  ["How do I place an order?", "Open any product, fill in your name, phone number and delivery address, then press Confirm Order. Our team receives your order instantly and will contact you to confirm it."],
  ["Do I need to pay online?", "No. There is no online payment on our website. After you place your order, we will call or WhatsApp you to confirm the price, payment method and delivery details."],
  ["Where do you deliver?", "We offer door-to-door delivery across Pakistan and Bahrain."],
  ["How can I track my order?", "Every order gets an order number. Message us on WhatsApp with your order number and we will update you on its status."],
  ["Returns & exchange", "If you have any issue with your order, please contact our support team on WhatsApp and we will be happy to help."],
];

export default async function ContactPage() {
  const site = await getSettings();
  return (
    <>
      <section className="page-head">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / Contact
          </nav>
          <p className="eyebrow">Customer Care</p>
          <h1>We&apos;re Here to Help</h1>
          <p>Questions about a product, an order or delivery? Reach us any way you like.</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-cards">
          <a href={waLink(site.whatsapp, "Hi Kangan! I have a question.")} target="_blank" rel="noopener" className="contact-card">
            <span>WhatsApp</span>
            <strong>{site.phone}</strong>
            <span>Fastest reply — chat with us →</span>
          </a>
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="contact-card">
            <span>Call Us</span>
            <strong>{site.phone}</strong>
            <span>Pakistan &amp; Bahrain</span>
          </a>
          <a href={`mailto:${site.email}`} className="contact-card">
            <span>Email</span>
            <strong>{site.email}</strong>
            <span>We reply within a day</span>
          </a>
        </div>
      </section>

      <section className="section section--tint" id="faq">
        <div className="container split split--top">
          <div className="split__text">
            <p className="eyebrow">Customer Promise</p>
            <h2>Your Satisfaction Matters</h2>
            <p>
              We believe great products should come with great service. From discovering your favourite product to
              receiving it at your doorstep, we aim to make every interaction with Kangan simple, elegant, and reliable.
            </p>
            <p className="quote quote--dark">Your trust inspires us. Your style inspires us. Your satisfaction is our priority.</p>
          </div>
          <div className="faq">
            {FAQ.map(([q, a], i) => (
              <details key={q} open={i === 0}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
