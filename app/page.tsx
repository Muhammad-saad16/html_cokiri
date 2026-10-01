import Image from "@/components/Img";
import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import OffersSlider from "@/components/OffersSlider";
import { ProductGrid } from "@/components/ProductCard";
import { CATEGORY_INFO, PRODUCTS, imgSrc, type Category } from "@/lib/site";

/** Home page order: Jewellery, Handbags, Watches, Perfumes */
const HOME_CATEGORIES: { cat: Category; image: string; alt: string }[] = [
  { cat: "jewellery", image: "/media/bangle.jpg", alt: "Kangan crystal bangles" },
  { cat: "handbags", image: "/media/bag-green.jpg", alt: "Kangan emerald tote" },
  { cat: "watches", image: CATEGORY_INFO.watches.image, alt: "Rose gold watch" },
  { cat: "perfumes", image: "/media/perfume.jpg", alt: "Kangan 12 AM perfume" },
];

export default function Home() {
  return (
    <>
      <HeroSlider />

      {/* Categories */}
      <section className="section section--tight">
        <div className="container">
          <div className="section__head section__head--rule">
            <p className="eyebrow">Our Collections</p>
            <h2>Shop by Category</h2>
          </div>
          <div className="cats">
            {HOME_CATEGORIES.map(({ cat, image, alt }) => (
              <Link key={cat} href={`/collections/${cat}`} className="cat">
                <span className="cat__media">
                  <Image src={imgSrc(image)} alt={alt} fill sizes="(max-width: 1024px) 50vw, 300px" />
                </span>
                <span className="cat__body">
                  <h3>{CATEGORY_INFO[cat].title}</h3>
                  <em>{CATEGORY_INFO[cat].kicker}</em>
                  <span>Shop Now →</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <OffersSlider />

      {/* One short row of products per category */}
      {HOME_CATEGORIES.map(({ cat }, n) => {
        const info = CATEGORY_INFO[cat];
        return (
          <section key={cat} className={`section section--tight${n % 2 === 0 ? " section--tint" : ""}`}>
            <div className="container">
              <div className="row-head">
                <div>
                  <p className="eyebrow">{info.kicker}</p>
                  <h2>{info.title}</h2>
                </div>
                <Link href={`/collections/${cat}`} className="row-head__link">View all {info.title} →</Link>
              </div>
              <ProductGrid products={PRODUCTS.filter((p) => p.cat === cat).slice(0, 4)} />
            </div>
          </section>
        );
      })}
    </>
  );
}
