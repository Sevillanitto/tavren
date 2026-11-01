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
 * Añade aquí cada libro nuevo (ver README).
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
      ebook: "https://www.amazon.es/dp/B0HPHQMXTY",
      paperback: "https://www.amazon.es/dp/B0HPKLSSKY",
      hardcover: "https://www.amazon.es/dp/B0HPZLHW5H",
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
        amazonUrl: "https://www.amazon.es/dp/B0HPKLSSKY",
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
    slug: "space-adventures-notebook",
    language: "en",
    authorId: "pawsome-studio",
    gallery: [
      "/books/space-adventures-notebook/1.png",
      "/books/space-adventures-notebook/2.png",
      "/books/space-adventures-notebook/3.png",
      "/books/space-adventures-notebook/4.png",
    ],
    amazonUrls: {
      paperback: "https://www.amazon.com/dp/B0D77Q6MR4",
    },
    category: "notebooks",
    author: "Pawsome Studio",
    formats: ["paperback"],
    collection: "Tavren Notebooks",
    cover: "/books/space-adventures-notebook/space-adventures-notebook.png",
    coverStyle: "flat",
    isNew: false,
    translations: {
      en: {
        title: "Space Adventure Composition Notebook",
        subtitle: "Vibrant cover with illustrations of space and planets",
        shortDescription:
          "A vibrant composition notebook with space illustrations, 100 blank pages and premium paper. Perfect for school and home.",
        description: "Embark on an exciting space adventure with the Space Adventure Composition Notebook. Designed for children and teenagers, this vibrant notebook is perfect for young explorers who love nature and fascinating space creatures.\nA colorful cover with original illustrations of space that will capture any child's imagination. An ideal size of 7.5 x 9.25 inches, perfect for school backpacks and desks. 100 blank pages, ideal for drawing, writing and unleashing creativity, on high-quality paper that offers a smooth, smudge-free writing experience. Each page includes drawings of space, stimulating creativity and learning.\nPerfect for children aged 3 to 8, for school use, personal diaries, sketches and more, and a great gift for birthdays, parties and any special occasion.\nThe space drawings inspire children to create their own stories and artworks, while the blank pages are a perfect space for practicing writing and developing narrative skills. The attractive, colorful design makes learning a fun and exciting experience.\nMore than just a notebook, it is a gateway to imagination and creativity. Whether it's for drawing space, writing exciting stories or simply taking notes, it is the perfect companion for any child or teenager.",
        amazonUrl: "https://www.amazon.com/dp/B0D77Q6MR4",
      },
      es: {
        subtitle: "Portada vibrante con ilustraciones del espacio y los planetas",
        shortDescription:
          "Un cuaderno de composición con portada vibrante de ilustraciones espaciales, 100 páginas en blanco y papel de calidad. Perfecto para el colegio y para casa.",
        description: "Embárcate en una emocionante aventura espacial con el Space Adventure Composition Notebook. Pensado para niños y adolescentes, este cuaderno lleno de color es perfecto para pequeños exploradores que aman la naturaleza y las criaturas fascinantes del espacio.\nUna portada colorida con ilustraciones originales del espacio que capturarán la imaginación de cualquier niño. Un tamaño ideal de 7,5 x 9,25 pulgadas, perfecto para mochilas y escritorios escolares. 100 páginas en blanco, ideales para dibujar, escribir y dar rienda suelta a la creatividad, sobre papel de calidad que ofrece una escritura suave y sin manchas. Cada página incluye dibujos del espacio, que estimulan la creatividad y el aprendizaje.\nPerfecto para niños de 3 a 8 años, para uso escolar, diarios personales, bocetos y mucho más, y un regalo estupendo para cumpleaños, fiestas y cualquier ocasión especial.\nLos dibujos del espacio inspiran a los niños a crear sus propias historias y obras, y las páginas en blanco son el espacio perfecto para practicar la escritura y desarrollar la narración. El diseño atractivo y colorido hace que aprender sea una experiencia divertida y emocionante.\nMás que un simple cuaderno, es una puerta a la imaginación y la creatividad. Ya sea para dibujar el espacio, escribir historias emocionantes o simplemente tomar notas, es el compañero perfecto para cualquier niño o adolescente.",
      },
    },
    details: {
      publisher: "Tavren",
      publicationDate: "2024-06-15",
      pages: 100,
      asin: "B0D77Q6MR4",
      dimensions: { width: 19.05, height: 23.5 }, // cm
    },
  },
  {
    slug: "dino-fun-notebook",
    language: "en",
    authorId: "pawsome-studio",
    gallery: [
      "/books/dino-fun-notebook/1 (1).png",
      "/books/dino-fun-notebook/2.png",
      "/books/dino-fun-notebook/3.png",
      "/books/dino-fun-notebook/4.png",
    ],
    amazonUrls: {
      paperback: "https://www.amazon.com/dp/B0D77GN4WT",
    },
    category: "notebooks",
    author: "Pawsome Studio",
    formats: ["paperback"],
    collection: "Tavren Notebooks",
    cover: "/books/dino-fun-notebook/dino-fun-notebook.png",
    coverStyle: "flat",
    isNew: false,
    translations: {
      en: {
        title: "Dino Fun Composition Notebook",
        subtitle: "Notebook with original dino art",
        shortDescription:
          "A vibrant dinosaur-themed composition notebook with original art, 100 pages and premium paper. Great for kids and teens.",
        description: "The perfect journal for kids and teens. The Dino Fun Composition Notebook is designed to inspire creativity and make writing and drawing a joy, with vibrant dinosaur-themed illustrations and premium-quality paper.\nA lively, original dinosaur cover that will captivate young dinosaur enthusiasts. Premium paper for a smooth writing experience, whether for schoolwork, doodling or journaling. At 7.5 x 9.25 inches, it is large enough to provide ample writing space yet compact enough to carry anywhere. Inside, charming dinosaur drawings spark imagination, and the sturdy cover and strong binding are built to last through the school year and beyond.\nIdeal for school and homework, with wide-ruled pages; for creative writing and journaling; for drawing and doodling; and as a thoughtful gift for birthdays, holidays or back-to-school.\nMore than a notebook, it is a companion for their learning journey, packed with delightful dinosaur illustrations that make writing tasks enjoyable and engaging.",
        amazonUrl: "https://www.amazon.com/dp/B0D77GN4WT",
      },
      es: {
        subtitle: "Cuaderno con ilustraciones originales de dinosaurios",
        shortDescription:
          "Un cuaderno de composición con portada vibrante de dinosaurios, ilustraciones originales, 100 páginas y papel de calidad. Genial para niños y adolescentes.",
        description: "El cuaderno perfecto para niños y adolescentes. El Dino Fun Composition Notebook está pensado para inspirar la creatividad y hacer que escribir y dibujar sea un placer, con vibrantes ilustraciones de dinosaurios y papel de calidad.\nUna portada original y llena de vida que cautivará a los pequeños aficionados a los dinosaurios. Papel de calidad para una escritura suave, ya sea para los deberes, para garabatear o para escribir un diario. Con 7,5 x 9,25 pulgadas, es lo bastante grande para escribir con holgura y lo bastante compacto para llevarlo a cualquier parte. Dentro, encantadores dibujos de dinosaurios despiertan la imaginación, y la cubierta resistente y la encuadernación sólida aguantan todo el curso y más allá.\nIdeal para el colegio y los deberes, con páginas de rayas anchas; para la escritura creativa y los diarios; para dibujar y garabatear; y como regalo para cumpleaños, fiestas o la vuelta al cole.\nMás que un cuaderno, es un compañero en su camino de aprendizaje, lleno de deliciosas ilustraciones de dinosaurios que hacen que escribir sea entretenido y divertido.",
      },
    },
    details: {
      publisher: "Tavren",
      publicationDate: "2024-06-15",
      pages: 100,
      asin: "B0D77GN4WT",
      dimensions: { width: 19.05, height: 23.5 }, // cm
    },
  },
  {
    slug: "unicorn-dreams-notebook",
    language: "en",
    authorId: "pawsome-studio",
    gallery: [
      "/books/unicorn-dreams-notebook/1.png",
      "/books/unicorn-dreams-notebook/2.png",
      "/books/unicorn-dreams-notebook/3.png",
      "/books/unicorn-dreams-notebook/4.png",
    ],
    amazonUrls: {
      paperback: "https://www.amazon.com/dp/B0D77R1YQZ",
    },
    category: "notebooks",
    author: "Pawsome Studio",
    formats: ["paperback"],
    collection: "Tavren Notebooks",
    cover: "/books/unicorn-dreams-notebook/unicorn-dreams-notebook.png",
    coverStyle: "flat",
    isNew: false,
    translations: {
      en: {
        title: "Unicorn Dreams Composition Notebook",
        subtitle: "Notebook for girls with unicorn illustrations",
        shortDescription:
          "A unicorn-themed composition notebook with a soft matte cover, unicorn drawings on every page and premium paper. Perfect for writing, doodling and school.",
        description: "Unleash your daughter's imagination and creativity. This unicorn-themed notebook is designed for girls and teenagers who love to express their creativity, with a vibrant cover featuring original unicorn illustrations and pages filled with charming unicorn drawings, perfect for drawing, writing and taking notes.\nComposition size (7.5 x 9.25 inches), easy to carry in a backpack or bag. Premium paper, ideal for colored pencils, crayons, watercolor paints and fine-tip markers. A soft matte cover that is pleasant to the touch and easy to grip, and unicorn-themed doodles on every page to color and inspire creativity every day.\nPerfect as a daily journal, for drawing and doodling, for taking notes, and as a gift for birthdays, Christmas, Easter, gift baskets or stocking stuffers. For girls aged 3 to 10 who enjoy writing, coloring and drawing in a fun, mess-free way.\nWhether for daily activities, school projects or leisure time, it will be their ideal companion for endless hours of creativity and entertainment.",
        amazonUrl: "https://www.amazon.com/dp/B0D77R1YQZ",
      },
      es: {
        subtitle: "Cuaderno para niñas con ilustraciones de unicornios",
        shortDescription:
          "Un cuaderno de composición con unicornios, cubierta mate suave, dibujos en cada página y papel de calidad. Perfecto para escribir, garabatear y el colegio.",
        description: "Despierta la imaginación y la creatividad de tu hija. Este cuaderno de unicornios está pensado para niñas y adolescentes a las que les encanta expresar su creatividad, con una portada vibrante de ilustraciones originales de unicornios y páginas llenas de encantadores dibujos de unicornios, perfecto para dibujar, escribir y tomar notas.\nTamaño composición (7,5 x 9,25 pulgadas), fácil de llevar en la mochila o el bolso. Papel de calidad, ideal para lápices de colores, ceras, acuarelas y rotuladores de punta fina. Una cubierta mate suave al tacto y fácil de agarrar, y garabatos de unicornios en cada página para colorear y despertar la creatividad cada día.\nPerfecto como diario, para dibujar y garabatear, para tomar notas y como regalo para cumpleaños, Navidad, Pascua, cestas de regalo o detalles navideños. Para niñas de 3 a 10 años a las que les gusta escribir, colorear y dibujar de forma divertida y sin ensuciar.\nYa sea para las actividades diarias, los proyectos del cole o el tiempo libre, será su compañero ideal para horas y horas de creatividad y diversión.",
      },
    },
    details: {
      publisher: "Tavren",
      publicationDate: "2024-06-15",
      pages: 100,
      asin: "B0D77R1YQZ",
      dimensions: { width: 19.05, height: 23.5 }, // cm
    },
  },
  {
    slug: "teddys-adventure-notebook",
    language: "en",
    authorId: "pawsome-studio",
    gallery: [
      "/books/Teddys-Adventure-notebook/1.png",
      "/books/Teddys-Adventure-notebook/2.png",
      "/books/Teddys-Adventure-notebook/3.png",
      "/books/Teddys-Adventure-notebook/4.png",
    ],
    amazonUrls: {
      paperback: "https://www.amazon.com/dp/B0D76PMMDN",
    },
    category: "notebooks",
    author: "Pawsome Studio",
    formats: ["paperback"],
    collection: "Tavren Notebooks",
    cover: "/books/Teddys-Adventure-notebook/Teddys-Adventure-notebook.png",
    coverStyle: "flat",
    isNew: false,
    translations: {
      en: {
        title: "Teddy's Adventure Notebook",
        subtitle: "Journal and notebook for kids",
        shortDescription:
          "A composition-size journal with a soft matte teddy bear cover, lined and blank pages and teddy doodles on every page.",
        description: "Every little girl needs a special place to capture her dreams, drawings and daily adventures. The Teddy's Adventure Notebook is designed to be that perfect companion, encouraging creativity and self-expression.\nComposition size (7.5 x 9.25 inches), easy to carry or slip into a bag or backpack. A soft matte cover featuring cute teddy bears, designed to inspire and delight. High-quality paper, ideal for crayons, colored pencils, watercolor paints and fine-tip markers, with lined and blank pages. Cute teddy bear doodles on every page to inspire creativity.\nWhether she is journaling, drawing, doodling or taking notes, it is perfect as a daily journal, for sketching, doodling, writing stories and school notes, and as a gift for birthdays and holidays.\nMore than just a notebook, it is a place where imagination comes to life. Perfect for girls aged 3 to 10 who love teddy bears and enjoy expressing themselves creatively.",
        amazonUrl: "https://www.amazon.com/dp/B0D76PMMDN",
      },
      es: {
        subtitle: "Diario y cuaderno para niños",
        shortDescription:
          "Un diario de tamaño composición con cubierta mate suave de ositos, páginas con y sin rayas y dibujos de ositos en cada página.",
        description: "Toda niña necesita un lugar especial donde guardar sus sueños, dibujos y aventuras de cada día. El Teddy's Adventure Notebook está pensado para ser ese compañero perfecto, que fomenta la creatividad y la expresión personal.\nTamaño composición (7,5 x 9,25 pulgadas), fácil de llevar o de meter en un bolso o una mochila. Una cubierta mate suave con adorables ositos, pensada para inspirar y encantar. Papel de calidad, ideal para ceras, lápices de colores, acuarelas y rotuladores de punta fina, con páginas con y sin rayas. Garabatos de ositos en cada página para despertar la creatividad.\nYa sea para escribir un diario, dibujar, garabatear o tomar notas, es perfecto como diario, para bocetos, garabatos, escribir historias y apuntes del cole, y como regalo para cumpleaños y fiestas.\nMás que un simple cuaderno, es un lugar donde la imaginación cobra vida. Perfecto para niñas de 3 a 10 años a las que les encantan los ositos y disfrutan expresándose de forma creativa.",
      },
    },
    details: {
      publisher: "Tavren",
      publicationDate: "2024-06-14",
      pages: 100,
      asin: "B0D76PMMDN",
      dimensions: { width: 19.05, height: 23.5 }, // cm
    },
  },
  {
    slug: "mermaid-dreams-notebook",
    language: "en",
    authorId: "pawsome-studio",
    gallery: [
      "/books/mermaid-dreams-notebook/1.png",
      "/books/mermaid-dreams-notebook/2.png",
      "/books/mermaid-dreams-notebook/3.png",
      "/books/mermaid-dreams-notebook/4.png",
    ],
    amazonUrls: {
      paperback: "https://www.amazon.com/dp/B0D77RGWTY",
    },
    category: "notebooks",
    author: "Pawsome Studio",
    formats: ["paperback"],
    collection: "Tavren Notebooks",
    cover: "/books/mermaid-dreams-notebook/mermaid-dreams-notebook.png",
    coverStyle: "flat",
    isNew: false,
    translations: {
      en: {
        title: "Mermaid Dreams Composition Notebook",
        subtitle: "Journal and sketchbook for girls",
        shortDescription:
          "A composition notebook with a mermaid cover, 100 lined and illustrated pages and mermaid doodles on every page.",
        description: "Dive into a world of imagination. The Mermaid Dreams Composition Notebook is designed to inspire young minds, with a vibrant cover adorned with original illustrations of beautiful mermaids. Inside, high-quality pages perfect for journaling, note-taking, sketching and doodling.\nSpecially crafted for girls and young teens, it is more than just a place to write: it is a gateway to a world of creativity and wonder.\n100 premium pages, a blend of lined and illustrated pages for any activity. A size of 7.5 x 9.25 inches, easy to carry and perfect for backpacks and bags. A durable, soft matte cover with a stunning mermaid design that is pleasant to the touch and easy to grip. High-quality paper suitable for crayons, colored pencils, watercolor paints and fine-tip markers, and mermaid-themed doodles on every page to color and spark creativity and fun.\nIdeal for daily journaling, drawing, doodling, sketching, taking notes and more, and a great gift for birthdays, Christmas, Easter, gift baskets or stocking stuffers.\nWhether for a toddler, preschooler, kindergartner or school-aged child, it will inspire her creativity and imagination while providing hours of entertainment. A fun, mess-free way to nurture creativity for girls aged 3 and up.",
        amazonUrl: "https://www.amazon.com/dp/B0D77RGWTY",
      },
      es: {
        subtitle: "Diario y cuaderno de dibujo para niñas",
        shortDescription:
          "Un cuaderno de composición con portada de sirenas, 100 páginas con y sin ilustraciones y garabatos de sirenas en cada página.",
        description: "Sumérgete en un mundo de imaginación. El Mermaid Dreams Composition Notebook está pensado para inspirar a las mentes jóvenes, con una portada vibrante adornada con ilustraciones originales de hermosas sirenas. Dentro, páginas de calidad perfectas para escribir un diario, tomar notas, dibujar y garabatear.\nCreado especialmente para niñas y jóvenes adolescentes, es más que un lugar donde escribir: es una puerta a un mundo de creatividad y asombro.\n100 páginas de calidad, una combinación de páginas con rayas y páginas ilustradas para cualquier actividad. Un tamaño de 7,5 x 9,25 pulgadas, fácil de llevar y perfecto para mochilas y bolsos. Una cubierta mate suave y resistente, con un precioso diseño de sirenas, agradable al tacto y fácil de agarrar. Papel de calidad apto para ceras, lápices de colores, acuarelas y rotuladores de punta fina, y garabatos de sirenas en cada página para colorear y despertar la creatividad y la diversión.\nIdeal para escribir un diario, dibujar, garabatear, hacer bocetos, tomar notas y mucho más, y un gran regalo para cumpleaños, Navidad, Pascua, cestas de regalo o detalles navideños.\nYa sea para un niño pequeño, de preescolar, de infantil o en edad escolar, inspirará su creatividad e imaginación y le dará horas de entretenimiento. Una forma divertida y sin ensuciar de fomentar la creatividad en niñas de 3 años en adelante.",
      },
    },
    details: {
      publisher: "Tavren",
      publicationDate: "2024-06-16",
      pages: 100,
      asin: "B0D77RGWTY",
      dimensions: { width: 19.05, height: 23.5 }, // cm
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
