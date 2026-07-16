"use client";

import { useMemo, useState } from "react";
import BookCard, { type Book } from "./BookCard";

interface BooksExplorerProps {
  books: Book[];
}

export default function BooksExplorer({ books }: BooksExplorerProps) {
  const [query, setQuery] = useState("");

  const filteredBooks = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return books;
    return books.filter((book) =>
      book.title.toLowerCase().includes(normalized)
    );
  }, [books, query]);

  return (
    <div>
      {/* Search */}
      <div className="mx-auto mb-12 max-w-xl">
        <label htmlFor="book-search" className="sr-only">
          Search books by name
        </label>
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            id="book-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search books by name..."
            className="h-14 w-full rounded-full border border-outline-variant bg-paper-white pl-12 pr-5 text-base text-on-surface placeholder:text-on-surface-variant/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange"
          />
        </div>
      </div>

      {/* Results */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {filteredBooks.map((book, index) => (
            <BookCard key={`${book.title}-${index}`} {...book} />
          ))}
        </div>
      ) : (
        <p className="mx-auto max-w-md text-center text-base leading-6 text-on-surface-variant">
          No books found matching &ldquo;{query}&rdquo;.
        </p>
      )}
    </div>
  );
}
