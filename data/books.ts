import type { Lang } from "@/lib/i18n";

/*
 * Qué va en cada categoría:
 * - noir: novela negra
 * - cooking: libros de cocina
 * - kids: libros infantiles y cuadernos de actividades infantiles
 * - notebooks: notebooks y sketchbooks
 */
export type Category = "noir" | "cooking" | "kids" | "notebooks";

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

export type CoverStyle = "mockup" | "flat";
export type BookFormat = "ebook" | "paperback" | "hardcover";

export interface Book {
  slug: string;
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
  /** Un libro solo aparece en los idiomas en los que tiene entrada aquí. */
  translations: Partial<Record<Lang, BookTranslation>>;
  details: BookDetails;
}

/*
 * CATÁLOGO — todos los libros de la web.
 * Los 4 libros de abajo son datos FICTICIOS de EJEMPLO. Sustitúyelos por los reales.
 */
export const books: Book[] = [
  {
    // Libro real (solo en español). Descripción y detalles: pendientes de rellenar.
    slug: "lo-que-enterramos-antes-de-tiempo",
    authorId: "andre-olvera",
    gallery: [
      "/books/lo-que-enterramos-antes-de-tiempo/1.jpg",
      "/books/lo-que-enterramos-antes-de-tiempo/2.jpg",
      "/books/lo-que-enterramos-antes-de-tiempo/3.jpg",
      "/books/lo-que-enterramos-antes-de-tiempo/4.jpg",
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
    // EJEMPLO — libro de cocina solo en inglés
    slug: "example-sunday-table",
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
    // EJEMPLO — cuaderno solo en inglés
    slug: "example-blank-pages",
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

function localize(book: Book, lang: Lang): LocalizedBook | null {
  const t = book.translations[lang];
  if (!t) return null;
  return {
    ...t,
    slug: book.slug,
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

export function getBooks(lang: Lang): LocalizedBook[] {
  return books.flatMap((b) => localize(b, lang) ?? []);
}

export function getBook(lang: Lang, slug: string): LocalizedBook | null {
  const book = books.find((b) => b.slug === slug);
  return book ? localize(book, lang) : null;
}
