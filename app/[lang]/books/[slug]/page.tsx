import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/dictionaries";
import { books, getBook, type LocalizedBook } from "@/data/books";
import { getAuthor } from "@/data/authors";
import { resolveCover } from "@/lib/covers";
import { resolveGallery } from "@/lib/gallery";
import { LANGS, isLang } from "@/lib/i18n";
import Gallery from "@/components/Gallery";
import BuyBox from "@/components/BuyBox";
import Accordion from "@/components/Accordion";

/** getBookContent ya rellena shortDescription (o la deriva de la descripción). */
function shortDescription(book: LocalizedBook): string {
  return book.shortDescription ?? "";
}

/** Párrafos por línea; las líneas que empiezan por "- " forman una lista. */
function descriptionBlocks(text: string) {
  const blocks: (
    | { type: "p"; text: string }
    | { type: "list"; items: string[] }
  )[] = [];
  for (const line of text.split("\n").filter(Boolean)) {
    const last = blocks[blocks.length - 1];
    if (line.startsWith("- ")) {
      if (last?.type === "list") last.items.push(line.slice(2));
      else blocks.push({ type: "list", items: [line.slice(2)] });
    } else {
      blocks.push({ type: "p", text: line });
    }
  }
  return blocks;
}

export const dynamicParams = false;

// Todos los libros existen en /es y /en.
export function generateStaticParams() {
  return LANGS.flatMap((lang) =>
    books.map((b) => ({ lang, slug: b.slug })),
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
  const languages = Object.fromEntries(
    LANGS.map((l) => [l, `/${l}/books/${slug}`]),
  );
  return {
    title: { absolute: `${book.title} — ${book.author} | Tavren` },
    description: shortDescription(book),
    alternates: {
      canonical: `/${lang}/books/${slug}`,
      languages: { ...languages, "x-default": `/en/books/${slug}` },
    },
    openGraph: {
      title: `${book.title} — ${book.author}`,
      description: shortDescription(book),
      images: [{ url: resolveCover(book.cover) }],
    },
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

  const t = dict.book;
  const author = getAuthor(book.authorId);
  const authorBio = author?.bio[lang] ?? "";
  const formatLabels = dict.catalog.formats;

  // Galería: la existencia de cada imagen se comprueba aquí, en el servidor.
  const total = book.gallery.length;
  const gallery = resolveGallery(book.gallery).map((img, i) => ({
    src: img.src,
    alt: `${book.title} – ${i + 1}/${total}`,
  }));

  const date = book.details.publicationDate
    ? new Intl.DateTimeFormat(lang, {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      }).format(new Date(book.details.publicationDate))
    : "";
  // Serie: "Fractura" en Detalles; "Libro 1 de la serie Fractura" bajo el subtítulo.
  const seriesText = book.series
    ? book.seriesNumber
      ? `${book.series} #${book.seriesNumber}`
      : book.series
    : "";
  const seriesLine =
    book.series && book.seriesNumber
      ? t.seriesLine
          .replace("{n}", String(book.seriesNumber))
          .replace("{series}", book.series)
      : "";
  // Medidas guardadas en cm; coma decimal en ES y punto en EN.
  const numFmt = new Intl.NumberFormat(lang, { maximumFractionDigits: 2 });
  const dims = book.details.dimensions;
  const dimensions = dims
    ? `${numFmt.format(dims.width)} × ${numFmt.format(dims.height)} cm`
    : "";
  // Autor principal + colaboradores con rol author; ilustración aparte.
  const contributors = book.contributors ?? [];
  const authorsText = [
    book.author,
    ...contributors.filter((c) => c.role === "author").map((c) => c.name),
  ].join(", ");
  const illustrators = contributors
    .filter((c) => c.role === "illustrator")
    .map((c) => c.name)
    .join(", ");
  const editors = contributors
    .filter((c) => c.role === "editor")
    .map((c) => c.name)
    .join(", ");
  // Solo se muestran las filas que tengan valor.
  const rows = [
    { label: t.detailLabels.publisher, value: book.details.publisher },
    { label: t.detailLabels.author, value: authorsText },
    { label: t.detailLabels.illustration, value: illustrators },
    { label: t.detailLabels.editor, value: editors },
    { label: t.detailLabels.series, value: seriesText },
    { label: t.detailLabels.publicationDate, value: date },
    {
      label: t.detailLabels.formats,
      value: book.formats.map((f) => formatLabels[f]).join(" · "),
    },
    // Idioma del libro (o de la edición mostrada, si tiene ediciones).
    {
      label: t.detailLabels.language,
      value: t.languageNames[book.editionLang ?? book.language],
    },
    {
      label: t.detailLabels.pages,
      value: book.details.pages ? String(book.details.pages) : "",
    },
    { label: t.detailLabels.dimensions, value: dimensions },
    { label: t.detailLabels.isbn, value: book.details.isbn ?? "" },
  ].filter((r) => r.value);

  return (
    <article className="mx-auto max-w-[1400px] px-5 py-8 md:px-10 md:py-12">
      <Link
        href={`/${lang}#books`}
        className="rounded-sm text-[13px] text-ink/65 hover:text-ink"
      >
        {t.back}
      </Link>

      <div className="mt-8 grid items-start gap-10 lg:grid-cols-[62fr_38fr] lg:gap-16">
        <Gallery
          images={gallery}
          label={t.galleryLabel}
        />

        <div>
          <p className="text-[13px] tracking-[0.08em] text-ink/70">
            {book.author}
          </p>
          <h1 className="mt-2 font-serif text-[clamp(26px,2.6vw,38px)] font-normal uppercase leading-[1.25] tracking-[0.06em] text-ink">
            {book.title}
          </h1>
          {book.subtitle && (
            <p className="mt-2 font-serif text-[15px] uppercase tracking-[0.08em] text-ink/70">
              {book.subtitle}
            </p>
          )}
          {seriesLine && (
            <p className="mt-3 text-[13px] text-ink/65">{seriesLine}</p>
          )}
          <hr className="my-6 border-line" />
          <p className="text-[15px] leading-[1.8] text-ink/85">
            {shortDescription(book)}
          </p>
          <hr className="my-6 border-line" />
          {book.language !== "both" && book.language !== lang && (
            <p className="mb-3 text-xs text-ink/65">
              {t.writtenIn[book.language]}
            </p>
          )}
          <BuyBox
            formats={book.formats}
            labels={formatLabels}
            urls={book.amazonUrls}
            fallbackUrl={book.amazonUrl}
            formatLabel={t.formatLabel}
            buyLabel={t.buy}
            comingSoonLabel={t.comingSoon}
          />
        </div>
      </div>

      <div className="mt-14 border-t border-line">
        <Accordion title={t.sections.description} defaultOpen>
          <div className="max-w-3xl space-y-4 leading-relaxed text-ink/85">
            {descriptionBlocks(book.description).map((b, i) =>
              b.type === "list" ? (
                <ul
                  key={i}
                  className="list-disc space-y-1 pl-5 marker:text-[0.7em] marker:text-ink/50"
                >
                  {b.items.map((it, j) => (
                    <li key={j}>{it}</li>
                  ))}
                </ul>
              ) : (
                <p key={i}>{b.text}</p>
              ),
            )}
          </div>
        </Accordion>
        <Accordion title={t.sections.details}>
          <dl className="max-w-3xl">
            {rows.map((r) => (
              <div
                key={r.label}
                className="grid grid-cols-[1fr_2fr] gap-4 border-b border-line py-3 last:border-b-0"
              >
                <dt className="text-xs uppercase tracking-[0.15em] text-ink/70">
                  {r.label}
                </dt>
                <dd>{r.value}</dd>
              </div>
            ))}
          </dl>
        </Accordion>
        {authorBio && (
          <Accordion title={t.sections.author}>
            <p className="max-w-3xl leading-relaxed text-ink/85">{authorBio}</p>
          </Accordion>
        )}
      </div>
    </article>
  );
}
