"use client";

import Link from "next/link";
import { useState } from "react";
import { ProductGrid } from "@/components/ProductCard";
import type { Product } from "@/lib/site";

/** Hot Products / New Arrivals tabs on the home page (flags are set per product in the admin). */
export default function ProductTabs({ hot, fresh }: { hot: Product[]; fresh: Product[] }) {
  const tabs = [
    { key: "hot", label: "Hot Products", kicker: "Most loved right now", items: hot },
    { key: "new", label: "New Arrivals", kicker: "Just landed", items: fresh },
  ].filter((t) => t.items.length > 0);
  const [active, setActive] = useState(0);

  if (tabs.length === 0) return null;
  const tab = tabs[Math.min(active, tabs.length - 1)];

  return (
    <section className="section section--tight">
      <div className="container">
        <div className="tabs-head">
          <p className="eyebrow">{tab.kicker}</p>
          <div className="tabs" role="tablist" aria-label="Featured products">
            {tabs.map((t, n) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={tab.key === t.key}
                className={tab.key === t.key ? "is-active" : undefined}
                onClick={() => setActive(n)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div role="tabpanel">
          <ProductGrid key={tab.key} products={tab.items.slice(0, 8)} />
        </div>
        <div className="link-more">
          <Link href="/shop" className="btn btn--ghost-dark">View the Full Collection</Link>
        </div>
      </div>
    </section>
  );
}
