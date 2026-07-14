import Image from "next/image";
import { Book } from "../data/books";

export default function BookCard({ title, author, image }: Book) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-outline-variant/40 bg-paper-white transition-all duration-200 hover:border-outline/60 hover:shadow-[0_12px_24px_-10px_rgba(75,54,33,0.08)]">
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-manuscript-tint">
        <Image
          src={image}
          alt={`${title} cover`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-4 text-center">
        <h3 className="font-serif text-base font-semibold leading-6 text-on-surface md:text-lg">
          {title}
        </h3>
        <p className="mt-2 font-hanken text-[11px] font-bold uppercase tracking-[0.05em] text-heritage-orange">
          {author}
        </p>
      </div>
    </article>
  );
}
