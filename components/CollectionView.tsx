import Link from "next/link";
import SubCategoryProducts from "@/components/SubCategoryProducts";
import { CATEGORIES, CATEGORY_INFO, SUBCATEGORIES, type Category, type Product } from "@/lib/site";

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

      <nav className="cat-tabs" aria-label="Collections">
        <div className="container cat-tabs__inner">
          <Link href="/shop" className={active === "all" ? "is-active" : undefined}>All</Link>
          {CATEGORIES.map((c) => (
            <Link key={c} href={`/collections/${c}`} className={active === c ? "is-active" : undefined}>
              {CATEGORY_INFO[c].title}
            </Link>
          ))}
        </div>
      </nav>

      <section className="section section--tight">
        <div className="container">
          <SubCategoryProducts products={products} subs={active === "all" ? [] : SUBCATEGORIES[active]} />
        </div>
      </section>
    </>
  );
}
