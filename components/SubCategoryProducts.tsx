"use client";

import { useState } from "react";
import { ProductGrid } from "@/components/ProductCard";
import type { Product } from "@/lib/site";

/** Sub-category chips (e.g. Bangles, Necklaces…) that filter the product grid below them. */
export default function SubCategoryProducts({ products, subs }: { products: Product[]; subs: string[] }) {
  const [active, setActive] = useState<string | null>(null);
  const available = subs.filter((s) => products.some((p) => p.sub === s));
  const shown = active ? products.filter((p) => p.sub === active) : products;

  return (
    <>
      {available.length > 1 && (
        <div className="subcats" role="group" aria-label="Filter by type">
          <button className={`subcat${active === null ? " is-active" : ""}`} onClick={() => setActive(null)} aria-pressed={active === null}>
            All <small>{products.length}</small>
          </button>
          {available.map((s) => (
            <button key={s} className={`subcat${active === s ? " is-active" : ""}`} onClick={() => setActive(s)} aria-pressed={active === s}>
              {s} <small>{products.filter((p) => p.sub === s).length}</small>
            </button>
          ))}
        </div>
      )}
      <p className="count">
        Showing {shown.length} {shown.length === 1 ? "piece" : "pieces"}
        {active && <> in <em>{active}</em></>}
      </p>
      <ProductGrid key={active ?? "all"} products={shown} />
    </>
  );
}
