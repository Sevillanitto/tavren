import { notFound } from "next/navigation";
import { getDictionary } from "@/dictionaries";
import { getBooks, sortBooks, type LocalizedBook } from "@/data/books";
import { PLACEHOLDER_COVER, resolveCover } from "@/lib/covers";
import { isLang } from "@/lib/i18n";
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

  // Vista por defecto: libros escritos en el idioma de la página o en ambos.
  // "other": escritos solo en el otro idioma (pastilla de idioma). Todas las
  // tarjetas enlazan a la ficha en el idioma de la página actual.
  const toCard = (b: LocalizedBook) => {
    const group: "own" | "other" =
      b.language === "both" || b.language === lang ? "own" : "other";
    return {
    slug: b.slug,
    title: b.title,
    author: b.author,
    formats: b.formats,
    category: b.category,
    isNew: b.isNew,
    cover: resolveCover(b.cover),
    // El placeholder es una imagen plana: no se funde con multiply.
    coverStyle:
      resolveCover(b.cover) === PLACEHOLDER_COVER ? "flat" : b.coverStyle,
    href: `/${lang}/books/${b.slug}`,
    // Idioma del libro, solo si no coincide con el de la página.
    langTag: group === "other" ? b.language.toUpperCase() : undefined,
    group,
    };
  };
  // Orden por categoría (CATEGORY_ORDER); el filtrado del catálogo lo conserva.
  const books = sortBooks(getBooks(lang)).map(toCard);

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
