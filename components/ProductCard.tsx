import Image from "@/components/Img";
import Link from "next/link";
import { imgSrc, productHref, type Product } from "@/lib/site";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={productHref(p)} className="card">
      <span className="card__media">
        <Image
          src={imgSrc(p.images[0])}
          alt={p.name}
          fill
          sizes="(max-width: 560px) 50vw, (max-width: 1024px) 33vw, 300px"
        />
        {p.images[1] && (
          <Image
            src={imgSrc(p.images[1])}
            alt=""
            fill
            className="card__alt"
            sizes="(max-width: 560px) 50vw, (max-width: 1024px) 33vw, 300px"
          />
        )}
        <span className="card__tag">{p.isNew ? "New" : p.tag}</span>
        {p.video && <span className="card__video" aria-label="Has video">▶</span>}
        <span className="card__quick">Order Now</span>
      </span>
      <span className="card__body">
        <span className="card__cat">{p.sub}</span>
        <span className="card__name">{p.name}</span>
        {p.price && <span className="card__price">{p.price}</span>}
        <span className="card__link">Order Now →</span>
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
