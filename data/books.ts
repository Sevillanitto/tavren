import type { Lang } from "@/lib/i18n";

/*
 * Qué va en cada categoría:
 * - noir: novela negra
 * - cooking: libros de cocina
 * - kids: libros infantiles y cuadernos de actividades infantiles
 * - notebooks: notebooks y sketchbooks
 */
export type Category = "noir" | "cooking" | "kids" | "notebooks";

/** Idioma en el que está escrito el libro ("both": ambos). */
export type BookLanguage = Lang | "both";

export interface BookTranslation {
  title: string;
  subtitle: string;
  description: string;
  /** Opcional; si falta se usan las dos primeras frases de description. */
  shortDescription?: string;
  amazonUrl: string;
}

export interface BookDetails {
  publisher?: string; // por defecto "Tavren"
  publicationDate?: string; // ISO: AAAA-MM-DD
  format?: string;
  pages?: number;
  isbn?: string;
  asin?: string;
  /** Medidas en cm (ancho × alto); se formatean según el idioma. */
  dimensions?: { width: number; height: number };
}

/** Contenido de un idioma; lo que falte se toma del idioma original (ver getBookContent). */
export type BookContent = Partial<BookTranslation>;

export type CoverStyle = "mockup" | "flat";
export type BookFormat = "ebook" | "paperback" | "hardcover";

export interface Book {
  slug: string;
  /** Idioma en el que está escrito el libro (no el de la ficha). */
  language: BookLanguage;
  category: Category;
  author: string; // nombre mostrado en las tarjetas
  authorId: string; // id en data/authors.ts
  series?: string; // p. ej. "Fractura"
  seriesNumber?: number; // posición en la serie
  formats: BookFormat[]; // formatos disponibles
  /** Imágenes de la ficha (4). Si falta alguna en /public se usa un placeholder. */
  gallery: string[];
  /** Enlace de Amazon por formato; si falta, se usa amazonUrl del idioma. */
  amazonUrls?: Partial<Record<BookFormat, string>>;
  collection: string; // texto libre
  cover: string; // ruta bajo /public, p. ej. "/covers/mi-libro.jpg"
  /** "mockup": imagen 3D con fondo blanco que flota (multiply); "flat": portada plana con sombra. Por defecto "mockup". */
  coverStyle?: CoverStyle;
  isNew: boolean;
  /**
   * Contenido por idioma. Todos los libros tienen ficha en es y en: si falta
   * un campo en un idioma se usa el del idioma original del libro.
   * El título no se traduce: si falta, se usa el original.
   */
  translations: Partial<Record<Lang, BookContent>>;
  details: BookDetails;
}

/*
 * CATÁLOGO — todos los libros de la web.
 * Los 4 libros de abajo son datos FICTICIOS de EJEMPLO. Sustitúyelos por los reales.
 */
export const books: Book[] = [
  {
    // Libro real (escrito en español, con ficha también en inglés).
    slug: "lo-que-enterramos-antes-de-tiempo",
    language: "es",
    authorId: "andre-olvera",
    gallery: [
      "/books/lo-que-enterramos-antes-de-tiempo/1.png",
      "/books/lo-que-enterramos-antes-de-tiempo/2.png",
      "/books/lo-que-enterramos-antes-de-tiempo/3.png",
      "/books/lo-que-enterramos-antes-de-tiempo/4.png",
    ],
    amazonUrls: {
      ebook: "#",
      paperback: "https://www.amazon.es/dp/B0HPKLSSKY",
      hardcover: "#",
    },
    category: "noir",
    author: "André Olvera",
    series: "Fractura",
    seriesNumber: 1,
    formats: ["ebook", "paperback", "hardcover"],
    collection: "Narrativa Tavren",
    cover: "/covers/lo-que-enterramos-antes-de-tiempo.png",
    isNew: false,
    translations: {
      es: {
        title: "Lo que enterramos antes de tiempo",
        subtitle: "Un thriller",
        shortDescription:
          "Una novela coral de misterio con ritmo de thriller, varias líneas de tiempo y un caso que se arma pieza a pieza.",
        description:
          "En Nueva York, miles de personas se cruzan cada día sin saber nada unas de otras. Comparten el mismo metro, el mismo barrio, a veces la misma pared. Cada una con su historia, sus secretos y algo que no le ha contado a nadie.\n" +
          "Un guionista que necesita entender lo ocurrido. Un cocinero que nunca habla de su pasado. Una inspectora que no ha podido cerrar un caso. Un detective que oculta más de lo que dice.\n" +
          "En noviembre de 2018, unas muertes en Queens los ponen en el mismo camino. A veces las historias no se cruzan por casualidad. Ninguno sabe todavía qué los une, y cuando lo descubran, nada de lo que creían saber seguirá en pie.\n" +
          "Una novela coral de misterio con ritmo de thriller, varias líneas de tiempo y un caso que se arma pieza a pieza.",
        amazonUrl: "#",
      },
      en: {
        subtitle: "A thriller",
        shortDescription:
          "An ensemble mystery novel with the pace of a thriller, multiple timelines and a case that comes together piece by piece.",
        description:
          "In New York, thousands of people cross paths every day without knowing anything about each other. They share the same subway, the same neighborhood, sometimes the same wall. Each one with their own story, their own secrets, and something they have never told anyone.\n" +
          "A screenwriter who needs to understand what happened. A chef who never speaks of his past. An inspector who has never managed to close a case. A detective who hides more than he says.\n" +
          "In November 2018, a series of deaths in Queens puts them on the same path. Sometimes stories don't cross by chance. None of them yet knows what connects them, and when they find out, nothing they thought they knew will be left standing.\n" +
          "An ensemble mystery novel with the pace of a thriller, multiple timelines and a case that comes together piece by piece.",
      },
    },
    details: {
      publisher: "Tavren",
      publicationDate: "2026-10-27",
      pages: 368,
      isbn: "979-8165629990",
      asin: "B0HPKLSSKY",
      dimensions: { width: 15.24, height: 22.86 }, // cm
    },
  },
  {
    // EJEMPLO — libro de cocina escrito en inglés
    slug: "example-sunday-table",
    language: "en",
    authorId: "andre-olvera",
    gallery: [
      "/books/example-sunday-table/1.jpg",
      "/books/example-sunday-table/2.jpg",
      "/books/example-sunday-table/3.jpg",
      "/books/example-sunday-table/4.jpg",
    ],
    category: "cooking",
    author: "André Olvera",
    formats: ["paperback"],
    collection: "World Kitchen Notebooks",
    cover: "/covers/example-sunday-table.jpg",
    isNew: false,
    translations: {
      en: {
        title: "EXAMPLE: The Sunday Table",
        subtitle: "A sample cookbook",
        description:
          "EXAMPLE. Placeholder text: slow recipes for long lunches, from simple soups to showstopping roasts.",
        amazonUrl: "#",
      },
      es: {
        subtitle: "Un libro de cocina de ejemplo",
        description:
          "EJEMPLO. Texto ficticio de relleno: recetas pausadas para comidas largas, desde sopas sencillas hasta asados de lucimiento.",
      },
    },
    details: {
      publicationDate: "2024-09-02",
      format: "Paperback",
      pages: 180,
      isbn: "000-0-00-000000-1",
    },
  },
  {
    // EJEMPLO — infantil en ambos idiomas
    slug: "ejemplo-el-zorro-y-la-luna",
    language: "both",
    authorId: "andre-olvera",
    gallery: [
      "/books/ejemplo-el-zorro-y-la-luna/1.jpg",
      "/books/ejemplo-el-zorro-y-la-luna/2.jpg",
      "/books/ejemplo-el-zorro-y-la-luna/3.jpg",
      "/books/ejemplo-el-zorro-y-la-luna/4.jpg",
    ],
    category: "kids",
    author: "André Olvera",
    formats: ["paperback"],
    collection: "Tavren Kids",
    cover: "/covers/ejemplo-el-zorro-y-la-luna.jpg",
    isNew: true,
    translations: {
      en: {
        title: "EXAMPLE: The Fox and the Moon",
        subtitle: "A sample picture book",
        description:
          "EXAMPLE. Placeholder text: a little fox decides to find out where the moon goes when morning comes.",
        amazonUrl: "#",
      },
      es: {
        title: "EJEMPLO: El zorro y la luna",
        subtitle: "Un álbum ilustrado de ejemplo",
        description:
          "EJEMPLO. Texto ficticio de relleno: un zorrito decide averiguar adónde va la luna cuando llega la mañana.",
        amazonUrl: "#",
      },
    },
    details: {
      publicationDate: "2025-03-10",
      format: "Hardcover / Tapa dura",
      pages: 40,
      isbn: "000-0-00-000000-2",
    },
  },
  {
    // EJEMPLO — cuaderno escrito en inglés
    slug: "example-blank-pages",
    language: "en",
    authorId: "andre-olvera",
    gallery: [
      "/books/example-blank-pages/1.jpg",
      "/books/example-blank-pages/2.jpg",
      "/books/example-blank-pages/3.jpg",
      "/books/example-blank-pages/4.jpg",
    ],
    category: "notebooks",
    author: "André Olvera",
    formats: ["paperback"],
    collection: "Tavren Notebooks",
    cover: "/covers/example-blank-pages.jpg",
    isNew: false,
    translations: {
      en: {
        title: "EXAMPLE: Blank Pages",
        subtitle: "A sample notebook",
        description:
          "EXAMPLE. Placeholder text: a dotted-paper notebook for ideas, lists and half-finished sketches.",
        amazonUrl: "#",
      },
      es: {
        subtitle: "Un cuaderno de ejemplo",
        description:
          "EJEMPLO. Texto ficticio de relleno: un cuaderno de papel punteado para ideas, listas y bocetos a medias.",
      },
    },
    details: {
      publicationDate: "2024-11-20",
      format: "Paperback",
      pages: 120,
      isbn: "000-0-00-000000-3",
    },
  },
];

/** Vista de un libro en un idioma concreto (lo que usa la interfaz). */
export interface LocalizedBook extends BookTranslation {
  slug: string;
  language: BookLanguage;
  category: Category;
  author: string;
  authorId: string;
  series?: string;
  seriesNumber?: number;
  formats: BookFormat[];
  gallery: string[];
  amazonUrls?: Partial<Record<BookFormat, string>>;
  coverStyle: CoverStyle;
  collection: string;
  cover: string;
  isNew: boolean;
  details: BookDetails & { publisher: string };
}

/** Idioma original del libro; "both" usa el español como respaldo. */
export function originalLang(book: Book): Lang {
  return book.language === "en" ? "en" : "es";
}

/** Las dos primeras frases de un texto. */
export function firstSentences(text: string, n = 2): string {
  return text
    .split("\n")[0]
    .split(/(?<=[.!?])\s+/)
    .slice(0, n)
    .join(" ");
}

const filled = (v: string | undefined): v is string => !!v && v.trim() !== "";

/**
 * Contenido del libro en el idioma pedido. Si falta algún campo se usa el del
 * idioma original. Nunca devuelve undefined.
 */
export function getBookContent(book: Book, lang: Lang): BookTranslation {
  const own = book.translations[lang] ?? {};
  const orig = book.translations[originalLang(book)] ?? {};
  const description = own.description ?? orig.description ?? "";
  const shortDescription = filled(own.shortDescription)
    ? own.shortDescription
    : filled(own.description)
      ? firstSentences(own.description)
      : filled(orig.shortDescription)
        ? orig.shortDescription
        : firstSentences(description);
  return {
    title: filled(own.title) ? own.title : (orig.title ?? ""),
    subtitle: own.subtitle ?? orig.subtitle ?? "",
    shortDescription,
    description,
    amazonUrl: filled(own.amazonUrl) ? own.amazonUrl : (orig.amazonUrl ?? "#"),
  };
}

function localize(book: Book, lang: Lang): LocalizedBook {
  const c = getBookContent(book, lang);
  return {
    ...c,
    slug: book.slug,
    language: book.language,
    category: book.category,
    author: book.author,
    authorId: book.authorId,
    series: book.series,
    seriesNumber: book.seriesNumber,
    formats: book.formats,
    gallery: book.gallery,
    amazonUrls: book.amazonUrls,
    coverStyle: book.coverStyle ?? "mockup",
    collection: book.collection,
    cover: book.cover,
    isNew: book.isNew,
    details: { ...book.details, publisher: book.details.publisher ?? "Tavren" },
  };
}

/** Todos los libros, con el contenido en el idioma pedido. */
export function getBooks(lang: Lang): LocalizedBook[] {
  return books.map((b) => localize(b, lang));
}

/** null solo si el slug no existe. */
export function getBook(lang: Lang, slug: string): LocalizedBook | null {
  const book = books.find((b) => b.slug === slug);
  return book ? localize(book, lang) : null;
}
