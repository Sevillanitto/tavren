import Link from "next/link";
import type { BookFormat, Category } from "@/data/books";

// Estilo de la pastilla por categoría; los colores salen de tailwind.config.
const CATEGORY_STYLE: Record<Category, string> = {
  noir: "bg-category-noir text-white",
  cooking: "border border-pill text-ink",
  kids: "border border-pill text-ink",
  notebooks: "border border-pill text-ink",
};

export interface CardBook {
  slug: string;
  title: string;
  author: string;
  category: Category;
  formats: BookFormat[];
  cover: string;
  isNew: boolean;
  href: string;
  /** Solo para libros del otro idioma: "EN" / "ES". */
  langTag?: string;
}

export default function BookCard({
  book,
  newLabel,
  coverOf,
  categoryLabel,
  formatsText,
}: {
  book: CardBook;
  newLabel: string;
  coverOf: string;
  categoryLabel: string;
  formatsText: string;
}) {
  return (
    <Link
      href={book.href}
      hrefLang={book.langTag?.toLowerCase()}
      className="group relative flex h-full flex-col items-center border border-line bg-mist p-8 pt-12 transition-colors duration-150 hover:border-ink/40"
    >
      <span
        className={`absolute left-5 top-5 rounded-sm px-2 py-1 text-[11px] font-medium uppercase leading-none tracking-[0.15em] ${CATEGORY_STYLE[book.category]}`}
      >
        {categoryLabel}
      </span>
      {book.isNew && (
        <span className="absolute right-12 top-[18px] border border-sky-strong px-2 py-1 text-[11px] font-medium uppercase leading-none tracking-[0.15em] text-ink/80">
          {newLabel}
        </span>
      )}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="absolute right-5 top-5 h-5 w-5 text-ink/60"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={book.cover}
        alt={`${coverOf} ${book.title}`}
        width={300}
        height={450}
        loading="lazy"
        className="mt-4 aspect-[2/3] w-44 object-cover shadow-cover sm:w-48"
      />
      <div className="mt-8 text-center">
        <h3 className="font-serif text-xl font-semibold leading-snug">
          {book.title}
        </h3>
        <p className="mt-1 text-sm text-ink/70">
          {book.author}
          {book.langTag && (
            <span className="ml-2 text-[10px] uppercase tracking-[0.15em] text-ink/60">
              · {book.langTag}
            </span>
          )}
        </p>
        <p className="mt-3 text-[11px] uppercase tracking-[0.15em] text-ink/70">
          {formatsText}
        </p>
      </div>
    </Link>
  );
}
