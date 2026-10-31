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
  amazonUrl: string;
}

export interface BookDetails {
  publisher?: string; // por defecto "Tavren"
  publicationDate: string; // ISO: AAAA-MM-DD
  format: string;
  pages: number;
  isbn: string;
}

export interface Book {
  slug: string;
  category: Category;
  collection: string; // texto libre
  cover: string; // ruta bajo /public, p. ej. "/covers/mi-libro.jpg"
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
    // EJEMPLO — novela solo en español
    slug: "ejemplo-la-casa-del-faro",
    category: "noir",
    collection: "Narrativa Tavren",
    cover: "/covers/ejemplo-la-casa-del-faro.jpg",
    isNew: true,
    translations: {
      es: {
        title: "EJEMPLO: La casa del faro",
        subtitle: "Una novela de ejemplo",
        description:
          "EJEMPLO. Texto ficticio de relleno: una historia de secretos familiares en un pueblo costero donde el invierno nunca termina de irse.",
        amazonUrl: "#",
      },
    },
    details: {
      publicationDate: "2025-01-15",
      format: "Tapa blanda",
      pages: 312,
      isbn: "000-0-00-000000-0",
    },
  },
  {
    // EJEMPLO — libro de cocina solo en inglés
    slug: "example-sunday-table",
    category: "cooking",
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
    category: "kids",
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
    category: "notebooks",
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
