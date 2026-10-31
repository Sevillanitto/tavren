import Link from "next/link";
import type { Lang } from "@/lib/i18n";

export interface CardBook {
  slug: string;
  title: string;
  collection: string;
  cover: string;
  isNew: boolean;
}

export default function BookCard({
  book,
  lang,
  newLabel,
  coverOf,
}: {
  book: CardBook;
  lang: Lang;
  newLabel: string;
  coverOf: string;
}) {
  return (
    <Link
      href={`/${lang}/books/${book.slug}`}
      className="group relative flex h-full flex-col items-center rounded-3xl border border-sky bg-mist p-6 pt-10 shadow-card transition duration-200 hover:-translate-y-1.5 hover:shadow-card-hover motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {book.isNew && (
        <span className="absolute left-5 top-5 rounded-full bg-sky-strong px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink">
          {newLabel}
        </span>
      )}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="absolute right-5 top-5 h-6 w-6 text-ink/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
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
        className="mt-4 aspect-[2/3] w-40 rounded-md object-cover shadow-cover sm:w-44"
      />
      <div className="mt-6 text-center">
        <h3 className="font-serif text-xl font-semibold leading-snug">
          {book.title}
        </h3>
        <p className="mt-1 text-sm text-ink/75">{book.collection}</p>
      </div>
    </Link>
  );
}
