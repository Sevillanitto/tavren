import { notFound } from "next/navigation";
import { getDictionary } from "@/dictionaries";
import { getBooks, type LocalizedBook } from "@/data/books";
import { resolveCover } from "@/lib/covers";
import { isLang, otherLang, type Lang } from "@/lib/i18n";
import Hero from "@/components/Hero";
import Catalog from "@/components/Catalog";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const dict = getDictionary(lang);

  const other = otherLang(lang);
  const toCard = (b: LocalizedBook, bookLang: Lang, group: "own" | "other") => ({
    slug: b.slug,
    title: b.title,
    author: b.author,
    formats: b.formats,
    category: b.category,
    isNew: b.isNew,
    cover: resolveCover(b.cover),
    href: `/${bookLang}/books/${b.slug}`,
    langTag: group === "other" ? bookLang.toUpperCase() : undefined,
    group,
  });
  const ownBooks = getBooks(lang);
  const ownSlugs = new Set(ownBooks.map((b) => b.slug));
  const books = [
    ...ownBooks.map((b) => toCard(b, lang, "own")),
    // Libros que solo existen en el otro idioma.
    ...getBooks(other)
      .filter((b) => !ownSlugs.has(b.slug))
      .map((b) => toCard(b, other, "other")),
  ];

  return (
    <>
      <Hero quotes={dict.hero.quotes} tagline={dict.hero.tagline} />
      <Catalog books={books} lang={lang} dict={dict} />

      <section id="about" className="bg-mist px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">
            {dict.about.title}
          </h2>
          {dict.about.body.map((p) => (
            <p key={p} className="mt-6 text-lg leading-relaxed text-ink/85">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section id="contact" className="bg-white px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">
            {dict.contact.title}
          </h2>
          <p className="mt-6 text-lg text-ink/85">{dict.contact.body}</p>
          <a
            href={`mailto:${dict.contact.email}`}
            className="mt-4 inline-block font-serif text-2xl underline decoration-sky decoration-4 underline-offset-8 hover:decoration-sky-strong"
          >
            {dict.contact.email}
          </a>
        </div>
      </section>
    </>
  );
}
