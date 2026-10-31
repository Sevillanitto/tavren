"use client";

import { useState } from "react";
import type { Lang } from "@/lib/i18n";
import type { Category } from "@/data/books";
import type { Dictionary } from "@/dictionaries";
import BookCard, { type CardBook } from "./BookCard";

type CatalogBook = CardBook & { category: Category };
type Filter = "all" | Category;

const ORDER: Category[] = ["novel", "cooking", "kids", "notebooks"];

export default function Catalog({
  books,
  lang,
  dict,
}: {
  books: CatalogBook[];
  lang: Lang;
  dict: Dictionary;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  // Solo las categorías con al menos un libro en este idioma.
  const available = ORDER.filter((c) => books.some((b) => b.category === c));
  const pills: Filter[] = ["all", ...available];
  const visible =
    filter === "all" ? books : books.filter((b) => b.category === filter);

  return (
    <section id="books" className="bg-white px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-serif text-3xl font-semibold md:text-4xl">
          {dict.catalog.title}
        </h2>

        <div
          role="group"
          aria-label={dict.catalog.filterLabel}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {pills.map((p) => {
            const active = p === filter;
            return (
              <button
                key={p}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(p)}
                className={`rounded-full border-2 border-sky px-5 py-2 text-base font-medium transition-colors ${
                  active ? "bg-sky" : "bg-white hover:bg-mist"
                }`}
              >
                {dict.catalog.categories[p]}
              </button>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <p className="mt-12 text-center text-ink/75">{dict.catalog.empty}</p>
        ) : (
          <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((b) => (
              <li key={b.slug}>
                <BookCard
                  book={b}
                  lang={lang}
                  newLabel={dict.catalog.new}
                  coverOf={dict.book.coverOf}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
