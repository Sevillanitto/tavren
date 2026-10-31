"use client";

import { useState } from "react";
import type { Lang } from "@/lib/i18n";
import type { Category } from "@/data/books";
import type { Dictionary } from "@/dictionaries";
import BookCard, { type CardBook } from "./BookCard";

type CatalogBook = CardBook & {
  category: Category;
  /** "own": existe en este idioma; "other": solo en el otro idioma. */
  group: "own" | "other";
};
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
  const [selected, setSelected] = useState<Filter>("all");
  const [showOther, setShowOther] = useState(false);

  const hasOther = books.some((b) => b.group === "other");
  // Conjunto activo: libros de este idioma, o los que solo existen en el otro.
  const pool = books.filter((b) => b.group === (showOther ? "other" : "own"));

  // Solo las categorías con al menos un libro en el conjunto activo.
  const available = ORDER.filter((c) => pool.some((b) => b.category === c));
  const pills: Filter[] = ["all", ...available];
  const filter: Filter = pills.includes(selected) ? selected : "all";
  const visible =
    filter === "all" ? pool : pool.filter((b) => b.category === filter);

  const pillBase =
    "border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-150";
  const pillClass = (active: boolean) =>
    `${pillBase} ${
      active
        ? "border-ink text-ink"
        : "border-pill text-ink/75 hover:border-ink/50"
    }`;

  return (
    <section id="books" className="bg-white px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-serif text-3xl font-semibold md:text-4xl">
          {dict.catalog.title}
        </h2>

        <div
          role="group"
          aria-label={dict.catalog.filterLabel}
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          {pills.map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={p === filter}
              onClick={() => setSelected(p)}
              className={`rounded-sm ${pillClass(p === filter)}`}
            >
              {dict.catalog.categories[p]}
            </button>
          ))}
          {hasOther && (
            <>
              <span
                aria-hidden="true"
                className="mx-2 hidden h-5 w-px bg-pill sm:block"
              />
              <button
                type="button"
                aria-pressed={showOther}
                onClick={() => setShowOther((v) => !v)}
                className={`rounded-sm ${pillClass(showOther)}`}
              >
                {dict.catalog.otherLang}
              </button>
            </>
          )}
        </div>

        {visible.length === 0 ? (
          <p className="mt-12 text-center text-ink/75">{dict.catalog.empty}</p>
        ) : (
          <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {visible.map((b) => (
              <li key={b.slug}>
                <BookCard
                  book={b}
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
