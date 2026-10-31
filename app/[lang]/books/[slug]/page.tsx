import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/dictionaries";
import { books, getBook } from "@/data/books";
import { resolveCover } from "@/lib/covers";
import { LANGS, isLang } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.flatMap((lang) =>
    books
      .filter((b) => b.translations[lang])
      .map((b) => ({ lang, slug: b.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) return {};
  const book = getBook(lang, slug);
  if (!book) return {};
  const source = books.find((b) => b.slug === slug)!;
  const languages = Object.fromEntries(
    LANGS.filter((l) => source.translations[l]).map((l) => [
      l,
      `/${l}/books/${slug}`,
    ]),
  );
  return {
    title: book.title,
    description: book.subtitle,
    alternates: { canonical: `/${lang}/books/${slug}`, languages },
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();
  const book = getBook(lang, slug);
  if (!book) notFound();
  const dict = getDictionary(lang);

  return (
    <article className="mx-auto max-w-3xl px-5 py-12 text-center md:px-8 md:py-20">
      <Link
        href={`/${lang}#books`}
        className="text-sm font-medium underline decoration-sky decoration-2 underline-offset-4"
      >
        {dict.book.back}
      </Link>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={resolveCover(book.cover)}
        alt={`${dict.book.coverOf} ${book.title}`}
        width={300}
        height={450}
        className="mx-auto mt-10 aspect-[2/3] w-56 object-cover shadow-cover"
      />
      <h1 className="mt-10 font-serif text-4xl font-semibold leading-tight md:text-5xl">
        {book.title}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink/85">
        {book.description}
      </p>
      <a
        href={book.amazonUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-block rounded-sm bg-ink px-10 py-4 text-lg font-semibold text-white transition-opacity hover:opacity-90"
      >
        {dict.book.buy}
      </a>
    </article>
  );
}
