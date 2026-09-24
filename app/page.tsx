import Image from "@/components/Img";
import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import { ProductGrid } from "@/components/ProductCard";
import { CATEGORY_INFO, PRODUCTS, findProduct, imgSrc, productHref, type Category } from "@/lib/site";

const CATEGORY_TILES = [
  { filter: "jewellery", title: "Jewellery", kicker: "Elegance That Shines", cta: "Explore Jewellery", image: CATEGORY_INFO.jewellery.image, alt: "Kangan gold necklace" },
  { filter: "handbags", title: "Handbags", kicker: "Carry Your Style", cta: "Shop Handbags", image: CATEGORY_INFO.handbags.image, alt: "Kangan emerald tote" },
  { filter: "perfumes", title: "Perfumes", kicker: "Elegance in Every Drop", cta: "Discover Perfumes", image: CATEGORY_INFO.perfumes.image, alt: "Kangan 12 AM perfume" },
  { filter: "watches", title: "Watches", kicker: "Time, Styled Beautifully", cta: "Shop Watches", image: CATEGORY_INFO.watches.image, alt: "Rose gold watch" },
];

const WHY = [
  ["Premium Quality", "We focus on products that deliver a sophisticated and premium experience."],
  ["Elegant Style", "Collections selected for women who appreciate timeless elegance and modern fashion."],
  ["Trending Collections", "We continuously introduce contemporary styles inspired by today's fashion trends."],
  ["Women's Lifestyle", "Jewellery, handbags, perfumes, and watches — everything you need to complete your look."],
  ["Online Convenience", "Shop from anywhere, anytime, without leaving your home."],
  ["Door-to-Door Delivery", "Convenient delivery service across Pakistan and Bahrain."],
];

const BANNERS = [
  { href: "/collections/jewellery", image: "/media/rings.jpg", alt: "Hands wearing Kangan rings", kicker: "Bridal & Festive", title: "Jewellery for Every Celebration", cta: "Shop Jewellery" },
  { href: "/products/kp-301", image: "/media/perfume-2.jpg", alt: "Kangan 12 AM perfume bottle", kicker: "Signature Scent", title: "Kangan 12 AM Perfume", cta: "Order Now" },
];

const LOOK = {
  image: "/media/necklace-3.jpg",
  alt: "Model wearing Kangan necklace and chandbali earrings",
  products: ["KJ-107", "KJ-105", "KJ-104", "KJ-106"],
};

function CategorySection({ cat, tint, limit = 4 }: { cat: Category; tint?: boolean; limit?: number }) {
  const info = CATEGORY_INFO[cat];
  return (
    <section className={`section${tint ? " section--tint" : ""}`}>
      <div className="container">
        <div className="section__head">
          <p className="eyebrow">{info.kicker}</p>
          <h2>{info.title}</h2>
        </div>
        <ProductGrid products={PRODUCTS.filter((p) => p.cat === cat).slice(0, limit)} />
        <div className="link-more">
          <Link href={`/collections/${cat}`} className="btn btn--ghost-dark">View All {info.title}</Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const look = LOOK.products.map((id) => findProduct(id)!);

  return (
    <>
      <HeroSlider />

      {/* Trust strip */}
      <section className="strip">
        <div className="container strip__inner">
          <div><strong>Premium Quality</strong><span>Carefully selected pieces</span></div>
          <div><strong>Door-to-Door</strong><span>Pakistan &amp; Bahrain</span></div>
          <div><strong>Easy Ordering</strong><span>We confirm every order personally</span></div>
          <div><strong>Since 2012</strong><span>Trusted by our customers</span></div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Our Collection</p>
            <h2>Everything to complete your look</h2>
          </div>
          <div className="cats">
            {CATEGORY_TILES.map((c) => (
              <Link key={c.filter} href={`/collections/${c.filter}`} className="cat">
                <Image src={imgSrc(c.image)} alt={c.alt} fill sizes="(max-width: 1024px) 50vw, 300px" />
                <div className="cat__body">
                  <p className="cat__kicker">{c.kicker}</p>
                  <h3>{c.title}</h3>
                  <span>{c.cta} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CategorySection cat="jewellery" tint limit={8} />

      {/* Promo banners */}
      <section className="section section--flush">
        <div className="container banners">
          {BANNERS.map((b) => (
            <Link key={b.href} href={b.href} className="banner">
              <Image src={b.image} alt={b.alt} fill sizes="(max-width: 860px) 100vw, 600px" />
              <div className="banner__body">
                <p className="eyebrow">{b.kicker}</p>
                <h3>{b.title}</h3>
                <span className="btn btn--gold">{b.cta}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CategorySection cat="handbags" />

      {/* Shop the look */}
      <section className="section section--tint">
        <div className="container look">
          <div className="look__media">
            <Image src={LOOK.image} alt={LOOK.alt} fill sizes="(max-width: 860px) 100vw, 620px" />
          </div>
          <div className="look__list">
            <p className="eyebrow">Shop the Look</p>
            <h2>The Emerald Festive Edit</h2>
            <p className="section__lead">Everything she is wearing — order each piece on its own.</p>
            <ul>
              {look.map((p) => (
                <li key={p.id}>
                  <Link href={productHref(p)} className="look__item">
                    <span className="look__thumb">
                      <Image src={imgSrc(p.images[0])} alt="" fill sizes="80px" />
                    </span>
                    <span>
                      <strong>{p.name}</strong>
                      <small>{p.tag}</small>
                    </span>
                    <span className="look__buy">Order →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CategorySection cat="perfumes" />
      <CategorySection cat="watches" tint />

      {/* About */}
      <section className="section">
        <div className="container split">
          <div className="split__media">
            <div className="frame">
              <Image src="/media/bangle-model.jpg" alt="Woman wearing Kangan crystal bangles" fill sizes="(max-width: 860px) 100vw, 560px" />
            </div>
            <div className="badge-year"><strong>2012</strong><span>Est.</span></div>
          </div>
          <div className="split__text">
            <p className="eyebrow">About Kangan</p>
            <h2>Where Elegance Meets Lifestyle</h2>
            <p>Kangan is an online fashion and lifestyle company established in 2012, serving customers in Bahrain and Pakistan.</p>
            <p>
              We believe every woman deserves to express her personality through fashion, beauty, and elegance.
              That&apos;s why we bring together carefully selected products designed for the modern woman who values
              quality, style, sophistication, and individuality.
            </p>
            <ul className="pills">
              <li>American Diamond</li>
              <li>Zircon Stones</li>
              <li>Kundan Designs</li>
              <li>18K Gold-Plated</li>
            </ul>
            <div className="split__cta">
              <Link href="/about" className="btn btn--ghost-dark">Read Our Story</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Kangan */}
      <section className="section section--tint">
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
          <ol className="steps">
            <li><span>01</span><strong>Discover</strong>Browse the collection</li>
            <li><span>02</span><strong>Select</strong>Open your favourite piece</li>
            <li><span>03</span><strong>Order</strong>Fill in your details &amp; confirm</li>
            <li><span>04</span><strong>Enjoy</strong>We call you &amp; deliver to your door</li>
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container cta__inner">
          <p className="eyebrow">Ready to Elevate Your Lifestyle?</p>
          <h2>It&apos;s time to discover Kangan.</h2>
          <p>
            Discover jewellery that shines. Carry handbags that express your style.
            <br />
            Find a fragrance that becomes your signature. Wear a watch that defines your elegance.
          </p>
          <Link href="/shop" className="btn btn--gold">Shop the Collection</Link>
        </div>
      </section>
    </>
  );
}
