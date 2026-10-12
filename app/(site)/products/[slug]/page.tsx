import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import OrderForm from "@/components/OrderForm";
import { ProductGrid } from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import { getCategories, getProduct, getProducts, getSettings } from "@/lib/data";
import { waLink } from "@/lib/site";
import { getDeliverySettings, getPaymentSettings } from "@/lib/store";

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const p = await getProduct((await params).slug);
  if (!p) return {};
  return { title: p.name, description: p.desc, openGraph: { images: p.images.slice(0, 1) } };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const p = await getProduct((await params).slug);
  if (!p) notFound();
  const [categories, sameCategory, settings, payments, delivery] = await Promise.all([
    getCategories(),
    getProducts(p.cat),
    getSettings(),
    getPaymentSettings(),
    getDeliverySettings(),
  ]);
  const cat = categories.find((c) => c.slug === p.cat);
  const catTitle = cat?.title ?? "Shop";
  const catHref = cat ? `/collections/${cat.slug}` : "/shop";
  const related = sameCategory.filter((x) => x.id !== p.id).slice(0, 4);

  return (
    <>
      <section className="section">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / <Link href={catHref}>{catTitle}</Link> / {p.name}
          </nav>

          <div className="pdp">
            <ProductGallery images={p.images} video={p.video} name={p.name} />

            <div className="pdp__info">
              <p className="eyebrow">{catTitle}{p.sub && ` · ${p.sub}`}</p>
              <h1>{p.name}</h1>
              <p className="pdp__code">Product code: {p.id}</p>
              {p.price && (
                <p className="pdp__price">
                  {p.price}
                  {p.oldPrice && <s>{p.oldPrice}</s>}
                </p>
              )}
              {p.soldOut ? (
                <p className="pdp__stock pdp__stock--out">Sold out — message us on WhatsApp to be notified when it is back.</p>
              ) : p.lowStock ? (
                <p className="pdp__stock">Hurry — only {p.lowStock} left in stock</p>
              ) : null}
              <p className="pdp__desc">{p.desc}</p>
              {p.details && p.details.length > 0 && (
                <ul className="pdp__details">
                  {p.details.map((d) => <li key={d}>{d}</li>)}
                </ul>
              )}

              {!p.soldOut && (
                <div className="pdp__order">
                  <h2>Place Your Order</h2>
                  <OrderForm product={p} whatsapp={settings.whatsapp} payments={payments} delivery={delivery} />
                </div>
              )}

              <a
                href={waLink(settings.whatsapp, `Hi Kangan! I'm interested in ${p.name} (${p.id}).`)}
                className="pdp__wa"
                target="_blank"
                rel="noopener"
              >
                Have a question? Ask us on WhatsApp →
              </a>

              <ul className="pdp__trust">
                <li>Premium Quality</li>
                <li>COD · Easypaisa · JazzCash</li>
                <li>Pakistan &amp; Bahrain Delivery</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--tint">
          <div className="container">
            <div className="section__head">
              <p className="eyebrow">You May Also Like</p>
              <h2>More {catTitle}</h2>
            </div>
            <ProductGrid products={related} />
            <div className="link-more">
              <Link href={catHref} className="btn btn--ghost-dark">View All {catTitle}</Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
