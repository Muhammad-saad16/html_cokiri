import Image from "@/components/Img";
import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import OffersSlider from "@/components/OffersSlider";
import { ProductGrid } from "@/components/ProductCard";
import ProductTabs from "@/components/ProductTabs";
import StatsBand from "@/components/StatsBand";
import Testimonials from "@/components/Testimonials";
import { getCategories, getOffers, getProducts, getSlides, getStats, getTestimonials } from "@/lib/cms";

export default async function Home() {
  const [slides, categories, offers, products, stats, testimonials] = await Promise.all([
    getSlides(),
    getCategories(),
    getOffers(),
    getProducts(),
    getStats(),
    getTestimonials(),
  ]);
  const hot = products.filter((p) => p.best && !p.soldOut);
  const fresh = products.filter((p) => p.isNew && !p.soldOut);

  return (
    <>
      <HeroSlider slides={slides} />

      {/* Categories */}
      <section className="section section--tight">
        <div className="container">
          <div className="section__head section__head--rule">
            <p className="eyebrow">Our Collections</p>
            <h2>Shop by Category</h2>
          </div>
          <div className="cats">
            {categories.map((c) => (
              <Link key={c.slug} href={`/collections/${c.slug}`} className="cat">
                <span className="cat__media">
                  {c.image && <Image src={c.image} alt={c.title} fill sizes="(max-width: 1024px) 50vw, 300px" />}
                </span>
                <span className="cat__body">
                  <h3>{c.title}</h3>
                  {c.kicker && <em>{c.kicker}</em>}
                  <span>Shop Now →</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <OffersSlider offers={offers} />

      <ProductTabs hot={hot} fresh={fresh} />

      <StatsBand stats={stats} />

      {/* One short row of products per category */}
      {categories.map((c, n) => {
        const items = products.filter((p) => p.cat === c.slug).slice(0, 4);
        if (items.length === 0) return null;
        return (
          <section key={c.slug} className={`section section--tight${n % 2 === 0 ? " section--tint" : ""}`}>
            <div className="container">
              <div className="row-head">
                <div>
                  {c.kicker && <p className="eyebrow">{c.kicker}</p>}
                  <h2>{c.title}</h2>
                </div>
                <Link href={`/collections/${c.slug}`} className="row-head__link">View all {c.title} →</Link>
              </div>
              <ProductGrid products={items} />
            </div>
          </section>
        );
      })}

      <Testimonials items={testimonials} />
    </>
  );
}
