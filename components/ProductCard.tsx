import Image from "@/components/Img";
import Link from "next/link";
import { productHref, type Product } from "@/lib/site";

export default function ProductCard({ p }: { p: Product }) {
  const label = p.soldOut ? "Sold Out" : p.oldPrice ? "Sale" : p.isNew ? "New" : p.tag;
  return (
    <Link href={productHref(p)} className={`card${p.soldOut ? " is-soldout" : ""}`}>
      <span className="card__media">
        <Image src={p.images[0]} alt={p.name} fill sizes="(max-width: 560px) 50vw, (max-width: 1024px) 33vw, 300px" />
        {p.images[1] && (
          <Image
            src={p.images[1]}
            alt=""
            fill
            className="card__alt"
            sizes="(max-width: 560px) 50vw, (max-width: 1024px) 33vw, 300px"
          />
        )}
        {label && <span className={`card__tag${p.soldOut ? " card__tag--soldout" : ""}`}>{label}</span>}
        {p.video && <span className="card__video" aria-label="Has video">▶</span>}
        <span className="card__quick">{p.soldOut ? "View Details" : "Order Now"}</span>
      </span>
      <span className="card__body">
        {p.sub && <span className="card__cat">{p.sub}</span>}
        <span className="card__name">{p.name}</span>
        {p.price && (
          <span className="card__price">
            {p.price}
            {p.oldPrice && <s>{p.oldPrice}</s>}
          </span>
        )}
        {p.lowStock && <span className="card__stock">Only {p.lowStock} left</span>}
        <span className="card__link">{p.soldOut ? "Sold out" : "Order Now →"}</span>
      </span>
    </Link>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid">
      {products.map((p) => (
        <ProductCard key={p.id} p={p} />
      ))}
    </div>
  );
}
