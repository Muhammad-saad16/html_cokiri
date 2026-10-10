import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section not-found">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1>This page could not be found</h1>
        <p>The piece you are looking for may have moved. Explore our collection instead.</p>
        <Link href="/shop" className="btn btn--gold">Shop the Collection</Link>
      </div>
    </section>
  );
}
