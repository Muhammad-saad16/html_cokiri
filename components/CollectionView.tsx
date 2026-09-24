import Link from "next/link";
import InViewVideo from "@/components/InViewVideo";
import Image from "@/components/Img";
import { ProductGrid } from "@/components/ProductCard";
import { CATEGORIES, CATEGORY_INFO, imgSrc, type Category, type Product } from "@/lib/site";

export default function CollectionView({
  active,
  title,
  kicker,
  intro,
  image,
  video,
  products,
}: {
  active: Category | "all";
  title: string;
  kicker: string;
  intro: string;
  image: string;
  video?: string;
  products: Product[];
}) {
  return (
    <>
      <section className="page-hero">
        {video ? (
          <InViewVideo className="page-hero__bg" src={video} poster={imgSrc(image)} />
        ) : (
          <Image className="page-hero__bg" src={imgSrc(image)} alt="" fill priority sizes="100vw" />
        )}
        <div className="container page-hero__content">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / {active === "all" ? "Shop" : <Link href="/shop">Shop</Link>}
            {active !== "all" && <> / {title}</>}
          </nav>
          <p className="eyebrow">{kicker}</p>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="toolbar">
            <div className="tabs" role="navigation" aria-label="Categories">
              <Link href="/shop" className={active === "all" ? "is-active" : undefined}>All</Link>
              {CATEGORIES.map((c) => (
                <Link key={c} href={`/collections/${c}`} className={active === c ? "is-active" : undefined}>
                  {CATEGORY_INFO[c].title}
                </Link>
              ))}
            </div>
            <p className="toolbar__count">{products.length} products</p>
          </div>
          <ProductGrid products={products} />
        </div>
      </section>
    </>
  );
}
