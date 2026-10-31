import Link from "next/link";

export interface CardBook {
  slug: string;
  title: string;
  collection: string;
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
}: {
  book: CardBook;
  newLabel: string;
  coverOf: string;
}) {
  return (
    <Link
      href={book.href}
      hrefLang={book.langTag?.toLowerCase()}
      className="group relative flex h-full flex-col items-center border border-line bg-mist p-8 pt-12 transition-colors duration-150 hover:border-ink/40"
    >
      {book.isNew && (
        <span className="absolute left-5 top-5 border border-sky-strong px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.15em] text-ink/70">
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
        <p className="mt-1 text-xs text-ink/70">
          {book.collection}
          {book.langTag && (
            <span className="ml-2 text-[10px] uppercase tracking-[0.15em] text-ink/50">
              · {book.langTag}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}
