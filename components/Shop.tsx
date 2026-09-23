"use client";

import Image from "@/components/Img";
import { useEffect, useState } from "react";
import { CATEGORIES, PRODUCTS, imgSrc, type Product } from "@/lib/site";
import { FILTER_EVENT } from "./FilterLink";
import OrderModal from "./OrderModal";

const FILTERS = ["all", ...CATEGORIES];

export default function Shop() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Product | null>(null);

  useEffect(() => {
    const onFilter = (e: Event) => setFilter((e as CustomEvent<string>).detail);
    window.addEventListener(FILTER_EVENT, onFilter);
    return () => window.removeEventListener(FILTER_EVENT, onFilter);
  }, []);

  const visible = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === filter);

  return (
    <>
      <div className="filters" role="tablist" aria-label="Filter products">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter${filter === f ? " is-active" : ""}`}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "All" : f}
          </button>
        ))}
      </div>

      <div className="grid">
        {visible.map((p) => (
          <button key={p.id} className="card" onClick={() => setSelected(p)}>
            <span className="card__media">
              <Image
                src={imgSrc(p.image)}
                alt={p.name}
                fill
                sizes="(max-width: 560px) 50vw, (max-width: 1024px) 33vw, 300px"
              />
              <span className="card__tag">{p.tag}</span>
              <span className="card__quick">Order Now</span>
            </span>
            <span className="card__body">
              <span className="card__cat">{p.cat}</span>
              <span className="card__name">{p.name}</span>
              {p.price && <span className="card__price">{p.price}</span>}
              <span className="card__link">Order Now →</span>
            </span>
          </button>
        ))}
      </div>

      <OrderModal product={selected} onClose={() => setSelected(null)} />
    </>
  );
}
