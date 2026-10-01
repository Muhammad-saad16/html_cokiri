import Link from "next/link";
import SubCategoryProducts from "@/components/SubCategoryProducts";
import type { Category, Product } from "@/lib/site";

export default function CollectionView({
  active,
  categories,
  title,
  kicker,
  intro,
  products,
}: {
  /** Slug of the open category, or "all" for the shop page */
  active: string;
  categories: Category[];
  title: string;
  kicker: string;
  intro: string;
  products: Product[];
}) {
  const current = categories.find((c) => c.slug === active);

  return (
    <>
      <section className="page-head">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / {active === "all" ? "Shop" : <Link href="/shop">Shop</Link>}
            {active !== "all" && <> / {title}</>}
          </nav>
          {kicker && <p className="eyebrow">{kicker}</p>}
          <h1>{title}</h1>
          {intro && <p>{intro}</p>}
        </div>
      </section>

      <nav className="cat-tabs" aria-label="Collections">
        <div className="container cat-tabs__inner">
          <Link href="/shop" className={active === "all" ? "is-active" : undefined}>All</Link>
          {categories.map((c) => (
            <Link key={c.slug} href={`/collections/${c.slug}`} className={active === c.slug ? "is-active" : undefined}>
              {c.title}
            </Link>
          ))}
        </div>
      </nav>

      <section className="section section--tight">
        <div className="container">
          <SubCategoryProducts products={products} subs={current?.subs ?? []} />
        </div>
      </section>
    </>
  );
}
