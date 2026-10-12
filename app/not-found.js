import Link from "next/link";

export default function NotFound() {
  return (
    <section className="kufic-light bg-sand grid min-h-[60vh] place-items-center px-4 py-24 text-center">
      <div>
        <p className="font-display text-9xl font-extrabold text-crimson">404</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink">Page not found</h1>
        <Link href="/" className="btn-ink mt-8">
          Return home
        </Link>
      </div>
    </section>
  );
}
