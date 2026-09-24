import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import OrderForm from "@/components/OrderForm";
import { ProductGrid } from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import { CATEGORY_INFO, PRODUCTS, findProduct, imgSrc, waLink } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.id.toLowerCase() }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const p = findProduct((await params).slug);
  if (!p) return {};
  return { title: p.name, description: p.desc, openGraph: { images: [imgSrc(p.images[0])] } };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const p = findProduct((await params).slug);
  if (!p) notFound();
  const cat = CATEGORY_INFO[p.cat];
  const related = PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 4);

  return (
    <>
      <section className="section">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / <Link href={`/collections/${p.cat}`}>{cat.title}</Link> / {p.name}
          </nav>

          <div className="pdp">
            <ProductGallery images={p.images} video={p.video} name={p.name} />

            <div className="pdp__info">
              <p className="eyebrow">{cat.title} · {p.tag}</p>
              <h1>{p.name}</h1>
              <p className="pdp__code">Product code: {p.id}</p>
              {p.price && <p className="pdp__price">{p.price}</p>}
              <p className="pdp__desc">{p.desc}</p>
              {p.details && (
                <ul className="pdp__details">
                  {p.details.map((d) => <li key={d}>{d}</li>)}
                </ul>
              )}

              <div className="pdp__order">
                <h2>Place Your Order</h2>
                <OrderForm product={p} />
              </div>

              <a
                href={waLink(`Hi Kangan! I'm interested in ${p.name} (${p.id}).`)}
                className="pdp__wa"
                target="_blank"
                rel="noopener"
              >
                Have a question? Ask us on WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--tint">
          <div className="container">
            <div className="section__head">
              <p className="eyebrow">You May Also Like</p>
              <h2>More {cat.title}</h2>
            </div>
            <ProductGrid products={related} />
            <div className="link-more">
              <Link href={`/collections/${p.cat}`} className="btn btn--ghost-dark">View All {cat.title}</Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
