import Link from "next/link";
import { ProductGrid } from "@/components/ProductCard";
import { CATEGORIES, CATEGORY_INFO, type Category, type Product } from "@/lib/site";

export default function CollectionView({
  active,
  title,
  kicker,
  intro,
  products,
}: {
  active: Category | "all";
  title: string;
  kicker: string;
  intro: string;
  products: Product[];
}) {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / {active === "all" ? "Shop" : <Link href="/shop">Shop</Link>}
            {active !== "all" && <> / {title}</>}
          </nav>
          <p className="eyebrow">{kicker}</p>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="filters">
            <Link href="/shop" className={`filter${active === "all" ? " is-active" : ""}`}>All</Link>
            {CATEGORIES.map((c) => (
              <Link key={c} href={`/collections/${c}`} className={`filter${active === c ? " is-active" : ""}`}>
                {CATEGORY_INFO[c].title}
              </Link>
            ))}
          </div>
          <p className="count">{products.length} products</p>
          <ProductGrid products={products} />
        </div>
      </section>
    </>
  );
}
