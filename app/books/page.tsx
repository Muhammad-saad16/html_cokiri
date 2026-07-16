import { Metadata } from "next";
import BooksExplorer from "../components/BooksExplorer";
import { getBooks } from "../../sanity/lib/queries";
import { urlFor } from "../../sanity/lib/image";

export const metadata: Metadata = {
  title: "Books | City of Knowledge",
  description:
    "Explore scholarly publications and books authored by Dr. Umair Mahmood Siddiqui and the faculty of City of Knowledge Islamic Research Institute.",
};

export default async function BooksPage() {
  const books = (await getBooks()).map((b) => ({
    title: b.title,
    author: b.author ?? "",
    image: urlFor(b.cover).width(400).height(600).url(),
  }));

  return (
    <main className="flex flex-col bg-paper-white">
      {/* Page Header */}
      <section className="pt-10 pb-8 md:pt-14 md:pb-10">
        <div className="mx-auto max-w-[1280px] px-5 text-center md:px-20">
          <span className="mb-4 inline-block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
            Publications
          </span>
          <h1 className="font-serif text-[28px] font-semibold leading-9 text-on-surface md:text-[48px] md:font-bold md:leading-[56px]">
            Our Books
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-6 text-on-surface-variant md:text-lg md:leading-7">
            Browse scholarly works and research publications authored by our
            faculty.
          </p>
        </div>
      </section>

      {/* Books Grid */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-20">
          <BooksExplorer books={books} />
        </div>
      </section>
    </main>
  );
}
