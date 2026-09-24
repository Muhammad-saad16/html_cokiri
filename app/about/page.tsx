import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "Kangan is an online fashion and lifestyle company established in 2012, serving customers in Bahrain and Pakistan.",
};

const FOCUS = [
  ["Quality", "Delivering products with a premium look and feel."],
  ["Style", "Bringing modern and trending designs to our customers."],
  ["Choice", "Jewellery, handbags, perfumes, and watches in one destination."],
  ["Convenience", "Making shopping simple through our online platform."],
  ["Trust", "Building lasting relationships through reliable service."],
];

const WHY = [
  ["Premium Quality", "We focus on products that deliver a sophisticated and premium experience."],
  ["Elegant Style", "Collections selected for women who appreciate timeless elegance and modern fashion."],
  ["Trending Collections", "We continuously introduce contemporary styles inspired by today's fashion trends."],
  ["Women's Lifestyle", "Jewellery, handbags, perfumes, and watches — everything you need to complete your look."],
  ["Online Convenience", "Shop from anywhere, anytime, without leaving your home."],
  ["Door-to-Door Delivery", "Convenient delivery service across Pakistan and Bahrain."],
];

const JOURNEY = [
  ["2012", "Kangan Begins", "Kangan starts its journey in the fashion and lifestyle industry."],
  ["Growing", "Bahrain & Pakistan", "Expanding our presence and serving customers across two markets."],
  ["Today", "Online Fashion & Lifestyle", "Jewellery, handbags, perfumes, and watches through a convenient online shopping experience."],
  ["Tomorrow", "Beyond Borders", "Our vision continues to grow toward new markets and new opportunities."],
];

export default function AboutPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / About
          </nav>
          <p className="eyebrow">About Kangan</p>
          <h1>Love. Fashion. Beauty. Passion.</h1>
          <p>It&apos;s all about Kangan — serving women in Bahrain and Pakistan since 2012.</p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split__media">
            <div className="frame">
              <Image src="/media/bangle-model.jpg" alt="Woman wearing Kangan crystal bangles" fill sizes="(max-width: 860px) 100vw, 560px" />
            </div>
            <div className="badge-year"><strong>2012</strong><span>Est.</span></div>
          </div>
          <div className="split__text">
            <p className="eyebrow">Our Story</p>
            <h2>Where Elegance Meets Lifestyle</h2>
            <p>Kangan is an online fashion and lifestyle company established in 2012, serving customers in Bahrain and Pakistan.</p>
            <p>
              We believe every woman deserves to express her personality through fashion, beauty, and elegance.
              That&apos;s why we bring together carefully selected products designed for the modern woman who values
              quality, style, sophistication, and individuality.
            </p>
            <p>
              From sparkling jewellery and trending handbags to signature perfumes and elegant watches, Kangan offers a
              complete lifestyle collection — all from one destination.
            </p>
            <ul className="pills">
              <li>American Diamond</li>
              <li>Zircon Stones</li>
              <li>Kundan Designs</li>
              <li>18K Gold-Plated</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Our Film</p>
            <h2>A Passion for Elegance</h2>
          </div>
          <video className="film" src="/media/film.mp4" poster="/media/film-poster.jpg" controls playsInline preload="none" />
        </div>
      </section>

      <section className="section section--dark">
        <div className="container mv">
          <div className="mv__col">
            <p className="eyebrow">Our Mission</p>
            <h2>Making Everyday Elegance Accessible</h2>
            <p>
              Our mission is to make premium fashion and lifestyle products accessible to women through a convenient
              and reliable online shopping experience.
            </p>
            <dl className="focus">
              {FOCUS.map(([t, d]) => (
                <div key={t}><dt>{t}</dt><dd>{d}</dd></div>
              ))}
            </dl>
          </div>
          <div className="mv__col">
            <p className="eyebrow">Our Vision</p>
            <h2>A Lifestyle Brand for the Modern Woman</h2>
            <p>
              Our vision is to build Kangan into a trusted and recognized online fashion and lifestyle brand for women,
              known for elegance, quality, innovation, and customer satisfaction.
            </p>
            <p>
              We aim to continue expanding across Pakistan, Bahrain, and international markets, bringing new trends and
              premium lifestyle products to women everywhere.
            </p>
            <p className="quote">Kangan — Your Style. Your Passion. Your Lifestyle.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Why Kangan?</p>
            <h2>Where fashion meets elegance</h2>
          </div>
          <div className="why">
            {WHY.map(([t, d], i) => (
              <article key={t}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container split split--reverse">
          <div className="split__media">
            <div className="frame">
              <Image src="/media/heart-model.jpg" alt="Woman wearing the Kangan heart charm bracelet" fill sizes="(max-width: 860px) 100vw, 560px" />
            </div>
          </div>
          <div className="split__text">
            <p className="eyebrow">The Kangan Experience</p>
            <h2>More Than Fashion — It&apos;s Your Lifestyle</h2>
            <p>At Kangan, we want every product to become part of your personal style.</p>
            <ul className="lines">
              <li>A necklace that completes your look.</li>
              <li>A handbag that defines your outfit.</li>
              <li>A perfume that becomes your signature.</li>
              <li>A watch that adds elegance to your wrist.</li>
            </ul>
            <p>Kangan is created for every woman who wants to look beautiful, feel confident, and express her unique style.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Our Journey</p>
            <h2>From 2012 to beyond borders</h2>
          </div>
          <ol className="timeline">
            {JOURNEY.map(([when, t, d]) => (
              <li key={when}>
                <span>{when}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <p className="eyebrow">Ready to Elevate Your Lifestyle?</p>
          <h2>It&apos;s time to discover Kangan.</h2>
          <p>Discover jewellery that shines. Carry handbags that express your style. Find a fragrance that becomes your signature.</p>
          <Link href="/shop" className="btn btn--gold">Shop the Collection</Link>
        </div>
      </section>
    </>
  );
}
