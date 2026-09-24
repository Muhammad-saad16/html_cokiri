import Image from "@/components/Img";
import Link from "next/link";
import InViewVideo from "@/components/InViewVideo";
import { ProductGrid } from "@/components/ProductCard";
import { CATEGORIES, CATEGORY_INFO, PRODUCTS, REELS, findProduct, imgSrc, productHref } from "@/lib/site";

const STEPS = [
  ["Discover", "Browse our collections"],
  ["Select", "Open your favourite piece"],
  ["Order", "Fill in your details & confirm"],
  ["Enjoy", "We call you & deliver to your door"],
];

export default function Home() {
  const best = PRODUCTS.filter((p) => p.best).slice(0, 8);
  const fresh = PRODUCTS.filter((p) => p.isNew).slice(0, 4);
  const perfume = findProduct("kp-301")!;

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <video
          className="hero__video"
          src="/media/hero.mp4"
          poster="/media/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="container hero__content">
          <p className="eyebrow">Since 2012 &nbsp;·&nbsp; Bahrain &amp; Pakistan</p>
          <h1>
            Timeless Beauty,
            <br />
            <em>Crafted for You.</em>
          </h1>
          <p className="hero__text">
            Kundan, zircon and gold-plated jewellery, signature perfumes, trending handbags and elegant watches —
            delivered to your door.
          </p>
          <div className="hero__actions">
            <Link href="/shop" className="btn btn--gold">Shop Now</Link>
            <Link href="/collections/jewellery" className="btn btn--ghost">Explore Jewellery</Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Shop by Category</p>
            <h2>Everything to complete your look</h2>
          </div>
          <div className="cats">
            {CATEGORIES.map((c) => {
              const info = CATEGORY_INFO[c];
              return (
                <Link key={c} href={`/collections/${c}`} className="cat">
                  <Image src={imgSrc(info.image)} alt={info.title} fill sizes="(max-width: 1024px) 50vw, 300px" />
                  <div className="cat__body">
                    <p className="cat__kicker">{info.kicker}</p>
                    <h3>{info.title}</h3>
                    <span>Shop Now →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Best sellers */}
      <section className="section section--tint">
        <div className="container">
          <div className="section__head section__head--row">
            <div>
              <p className="eyebrow">Most Loved</p>
              <h2>Best Sellers</h2>
            </div>
            <Link href="/shop" className="link-arrow">View All →</Link>
          </div>
          <ProductGrid products={best} />
        </div>
      </section>

      {/* Signature perfume */}
      <section className="spotlight">
        <div className="container spotlight__inner">
          <div className="spotlight__media">
            <InViewVideo src="/media/reel-perfume.mp4" poster="/media/perfume.jpg" />
          </div>
          <div className="spotlight__text">
            <p className="eyebrow">The Signature Scent</p>
            <h2>
              Kangan <em>12 AM</em>
            </h2>
            <p>{perfume.desc}</p>
            <ul className="ticks">
              {perfume.details?.map((d) => <li key={d}>{d}</li>)}
            </ul>
            <Link href={productHref(perfume)} className="btn btn--gold">Order 12 AM</Link>
          </div>
        </div>
      </section>

      {/* Reels */}
      <section className="section">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Watch &amp; Shop</p>
            <h2>See it. Love it. Wear it.</h2>
          </div>
        </div>
        <div className="reels">
          {REELS.map((r) => {
            const p = findProduct(r.product)!;
            return (
              <Link key={r.video} href={productHref(p)} className="reel">
                <InViewVideo src={r.video} poster={r.poster} />
                <span className="reel__info">
                  <strong>{r.title}</strong>
                  <span>Shop Now →</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* New arrivals */}
      <section className="section section--tint">
        <div className="container">
          <div className="section__head section__head--row">
            <div>
              <p className="eyebrow">Just In</p>
              <h2>New Arrivals</h2>
            </div>
            <Link href="/shop" className="link-arrow">View All →</Link>
          </div>
          <ProductGrid products={fresh} />
        </div>
      </section>

      {/* Brand film */}
      <section className="section">
        <div className="container split">
          <div className="split__media">
            <video
              className="film"
              src="/media/film.mp4"
              poster="/media/film-poster.jpg"
              controls
              playsInline
              preload="none"
            />
          </div>
          <div className="split__text">
            <p className="eyebrow">The Kangan Story</p>
            <h2>Where Elegance Meets Lifestyle</h2>
            <p>
              Kangan is an online fashion and lifestyle company established in 2012, serving customers in Bahrain and
              Pakistan. We believe every woman deserves to express her personality through fashion, beauty, and
              elegance.
            </p>
            <p>
              From sparkling jewellery and trending handbags to signature perfumes and elegant watches — a complete
              lifestyle collection, all from one destination.
            </p>
            <Link href="/about" className="btn btn--outline">Read Our Story</Link>
          </div>
        </div>
      </section>

      {/* How to order */}
      <section className="section section--dark">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Shop From Home</p>
            <h2>Ordering is simple</h2>
            <p className="section__lead">
              No online payment needed. Place your order and our team will call you to confirm the price, payment and
              delivery.
            </p>
          </div>
          <ol className="steps">
            {STEPS.map(([t, d], i) => (
              <li key={t}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <strong>{t}</strong>
                {d}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
