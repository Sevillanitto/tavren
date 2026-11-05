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

/** Edición de un libro en un idioma: lo que falte se toma del libro. */
export interface BookEdition {
  cover?: string;
  gallery?: string[];
  amazonUrls?: Partial<Record<BookFormat, string>>;
  amazonUrl?: string;
  details?: BookDetails;
}

export interface Contributor {
  name: string;
  role: "author" | "illustrator" | "editor";
}

export interface Book {
  slug: string;
  /** Idioma en el que está escrito el libro (no el de la ficha). */
  language: BookLanguage;
  category: Category;
  author: string; // nombre mostrado en las tarjetas
  authorId: string; // id en data/authors.ts
  /** Colaboradores sin ficha de autor (autoría adicional, ilustración). */
  contributors?: Contributor[];
  series?: string; // p. ej. "Fractura"
  seriesNumber?: number; // posición en la serie
  formats: BookFormat[]; // formatos disponibles
  /** Imágenes de la ficha (4). Si falta alguna en /public se usa un placeholder. */
  gallery?: string[];
  /** Enlace de Amazon por formato; si falta, se usa amazonUrl del idioma. */
  amazonUrls?: Partial<Record<BookFormat, string>>;
  collection: string; // texto libre
  cover?: string; // ruta bajo /public, p. ej. "/covers/mi-libro.jpg"
  /**
   * Ediciones por idioma (opcional). Cada una puede definir cover, gallery,
   * amazonUrls, amazonUrl y details; lo que falte se toma del libro. Con
   * edición en es y en el libro se trata como language "both".
   */
  editions?: Partial<Record<Lang, BookEdition>>;
  /** "mockup": imagen 3D con fondo blanco que flota (multiply); "flat": portada plana con sombra. Por defecto "mockup". */
  coverStyle?: CoverStyle;
  isNew: boolean;
  /**
   * Contenido por idioma. Todos los libros tienen ficha en es y en: si falta
   * un campo en un idioma se usa el del idioma original del libro.
   * El título no se traduce: si falta, se usa el original.
   */
  translations: Partial<Record<Lang, BookContent>>;
  details?: BookDetails;
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
  {
    slug: "teddy-bear-sketchbook",
    language: "en",
    authorId: "pawsome-studio",
    gallery: [
      "/books/Teddy Bear Sketchbook/1.png",
      "/books/Teddy Bear Sketchbook/2.png",
    ],
    amazonUrls: {
      paperback: "https://www.amazon.com/dp/B0D7PD1T1B",
    },
    category: "notebooks",
    author: "Pawsome Studio",
    formats: ["paperback"],
    collection: "Tavren Notebooks",
    cover: "/books/Teddy Bear Sketchbook/Teddy Bear Sketchbook.png",
    coverStyle: "flat",
    isNew: false,
    translations: {
      en: {
        title: "Teddy Bear Adventures Sketchbook",
        subtitle: "Sketchbook for kids",
        shortDescription:
          "A teddy bear-themed sketchbook with premium blank pages for drawing, coloring and sketching. Ideal for ages 3 and up.",
        description: "Let your child's creativity flourish. This delightful sketchbook is designed for young artists who love teddy bears and enjoy expressing their creativity through drawing and coloring, with premium blank pages perfect for sketching, doodling and creating beautiful artwork.\nPlenty of space for all kinds of artistic activities. An ideal size of 8.5 x 11 inches, perfect for home, school or on the go. High-quality paper suitable for colored pencils, crayons, very light fine-tip markers and watercolor paints. A charming teddy bear-themed cover that inspires imaginative adventures and makes art time fun.\nWhether your child is an aspiring artist or simply loves teddy bears, it is the perfect companion for hours of creative fun. The durable cover and high-quality paper are made to withstand all their artistic endeavors, making it a great gift for birthdays, holidays or any special occasion.\nPerfect for daily drawing and doodling, art classes and projects, birthday and holiday gifts, and creativity on the go. A fun, mess-free way to inspire artistic expression and imagination, ideal for ages 3 and up.",
        amazonUrl: "https://www.amazon.com/dp/B0D7PD1T1B",
      },
      es: {
        subtitle: "Cuaderno de dibujo para niños",
        shortDescription:
          "Un cuaderno de dibujo con portada de ositos y páginas en blanco de calidad para dibujar, colorear y hacer bocetos. Ideal a partir de 3 años.",
        description: "Deja que florezca la creatividad de tu hijo. Este delicioso cuaderno de dibujo está pensado para jóvenes artistas que aman los ositos y disfrutan expresándose dibujando y coloreando, con páginas en blanco de calidad perfectas para hacer bocetos, garabatear y crear obras preciosas.\nEspacio de sobra para todo tipo de actividades artísticas. Un tamaño ideal de 8,5 x 11 pulgadas, perfecto para casa, el colegio o para llevar a cualquier parte. Papel de calidad apto para lápices de colores, ceras, rotuladores de punta fina muy suaves y acuarelas. Una portada encantadora con ositos que inspira aventuras imaginativas y hace que el rato de arte sea divertido.\nTanto si tu hijo es un artista en ciernes como si simplemente le encantan los ositos, es el compañero perfecto para horas de diversión creativa. La cubierta resistente y el papel de calidad están hechos para aguantar todas sus aventuras artísticas, y lo convierten en un gran regalo para cumpleaños, fiestas o cualquier ocasión especial.\nPerfecto para dibujar y garabatear a diario, clases y proyectos de arte, regalos de cumpleaños y fiestas, y para crear sobre la marcha. Una forma divertida y sin ensuciar de inspirar la expresión artística y la imaginación, ideal a partir de 3 años.",
      },
    },
    details: {
      publisher: "Tavren",
      publicationDate: "2024-06-18",
      pages: 118,
      asin: "B0D7PD1T1B",
      dimensions: { width: 21.59, height: 27.94 }, // cm
    },
  },
  {
    slug: "jungle-animals-sketchbook",
    language: "en",
    authorId: "pawsome-studio",
    gallery: [
      "/books/Jungle Animals Sketchbook/1.png",
      "/books/Jungle Animals Sketchbook/2.png",
    ],
    amazonUrls: {
      paperback: "https://www.amazon.com/dp/B0D78Q28RJ",
    },
    category: "notebooks",
    author: "Pawsome Studio",
    formats: ["paperback"],
    collection: "Tavren Notebooks",
    cover: "/books/Jungle Animals Sketchbook/jungle animals sketchbook.png",
    coverStyle: "flat",
    isNew: false,
    translations: {
      en: {
        title: "Jungle Animals Sketchbook",
        subtitle: "Jungle adventure sketchbook for boys and girls",
        shortDescription:
          "A vibrant jungle-themed sketchbook with premium blank pages for drawing, coloring and sketching. For kids aged 3 and up.",
        description: "Embark on an artistic adventure. This vibrant jungle-themed sketchbook is perfect for young artists. The original, colorful cover will captivate children's imaginations and inspire them to fill its premium blank pages with their amazing ideas.\nWhether drawing, painting or sketching, it is designed to let creativity soar. Ideal for colored pencils, crayons, light fine-tip markers and even watercolor paint, it provides a fantastic canvas for every budding artist. An original, eye-catching cover of jungle animals, high-quality paper suitable for various art supplies, and a size of 8.5 x 11 inches.\nThe durable cover is made to withstand all their artistic adventures, and the premium paper guarantees a smooth drawing experience every time. Perfect for school projects, home crafts or just doodling fun, for daily drawing, birthday and holiday gifts, art classes, and personal journals and keepsakes.\nMore than just a sketchbook, it is a gateway to a world of artistic possibilities, for kids aged 3 and up.",
        amazonUrl: "https://www.amazon.com/dp/B0D78Q28RJ",
      },
      es: {
        subtitle: "Cuaderno de dibujo de aventuras en la selva para niños y niñas",
        shortDescription:
          "Un cuaderno de dibujo con portada vibrante de animales de la selva y páginas en blanco de calidad para dibujar, colorear y hacer bocetos. Para niños a partir de 3 años.",
        description: "Embárcate en una aventura artística. Este vibrante cuaderno de dibujo con temática de selva es perfecto para jóvenes artistas. La portada original y colorida cautivará la imaginación de los niños y los animará a llenar sus páginas en blanco de calidad con sus ideas más geniales.\nYa sea para dibujar, pintar o hacer bocetos, está pensado para que la creatividad vuele. Ideal para lápices de colores, ceras, rotuladores de punta fina suaves e incluso acuarelas, ofrece un lienzo fantástico para cada artista en ciernes. Una portada original y llamativa con animales de la selva, papel de calidad apto para distintos materiales de arte y un tamaño de 8,5 x 11 pulgadas.\nLa cubierta resistente está hecha para aguantar todas sus aventuras artísticas, y el papel de calidad garantiza una experiencia de dibujo suave cada vez. Perfecto para proyectos del cole, manualidades en casa o simplemente para garabatear, para dibujar a diario, regalos de cumpleaños y fiestas, clases de arte, y diarios personales y recuerdos.\nMás que un simple cuaderno de dibujo, es una puerta a un mundo de posibilidades artísticas, para niños a partir de 3 años.",
      },
    },
    details: {
      publisher: "Tavren",
      publicationDate: "2024-06-16",
      pages: 118,
      asin: "B0D78Q28RJ",
      dimensions: { width: 21.59, height: 27.94 }, // cm
    },
  },
  {
    slug: "dinosaur-adventure-sketchbook",
    language: "en",
    authorId: "pawsome-studio",
    gallery: [
      "/books/Dinosaur Adventure Sketchbook/1.png",
      "/books/Dinosaur Adventure Sketchbook/2.png",
    ],
    amazonUrls: {
      paperback: "https://www.amazon.com/dp/B0D7NYFQZJ",
    },
    category: "notebooks",
    author: "Pawsome Studio",
    formats: ["paperback"],
    collection: "Tavren Notebooks",
    cover: "/books/Dinosaur Adventure Sketchbook/Dinosaur Adventure Sketchbook.png",
    coverStyle: "flat",
    isNew: false,
    translations: {
      en: {
        title: "Dinosaur Adventure Sketchbook",
        subtitle: "Sketchbook with a vibrant dinosaur cover",
        shortDescription:
          "A dinosaur-themed sketchbook with premium blank pages for drawing, coloring and sketching. Ideal for ages 3 and up.",
        description: "Embark on a dino adventure. Designed especially for young artists and dinosaur enthusiasts, this sketchbook offers premium blank pages perfect for drawing, coloring and sketching. The vibrant dinosaur-themed cover captures the imagination and invites children to explore their artistic side.\nIdeal for a variety of artistic activities, from sketching to painting, and for encouraging creativity and artistic expression. An ideal size of 8.5 x 11 inches, perfect for use at home or on the go. High-quality paper suitable for colored pencils, crayons, very light fine-tip markers and watercolor paints. A vibrant dinosaur-themed cover that inspires imaginative adventures and makes art time fun.\nWhether your child is a budding artist or just loves dinosaurs, it is the perfect companion for hours of creative fun. The durable cover and high-quality paper are made to withstand all their artistic endeavors, making it a great gift for birthdays, holidays or any special occasion.\nPerfect for daily drawing and doodling, art classes and projects, birthday and holiday gifts, and creativity on the go. A fun, mess-free way to inspire artistic expression and imagination.",
        amazonUrl: "https://www.amazon.com/dp/B0D7NYFQZJ",
      },
      es: {
        subtitle: "Cuaderno de dibujo con portada vibrante de dinosaurios",
        shortDescription:
          "Un cuaderno de dibujo con portada de dinosaurios y páginas en blanco de calidad para dibujar, colorear y hacer bocetos. Ideal a partir de 3 años.",
        description: "Embárcate en una aventura de dinosaurios. Pensado especialmente para jóvenes artistas y aficionados a los dinosaurios, este cuaderno de dibujo ofrece páginas en blanco de calidad, perfectas para dibujar, colorear y hacer bocetos. La vibrante portada de dinosaurios despierta la imaginación e invita a los niños a explorar su lado artístico.\nIdeal para todo tipo de actividades artísticas, del boceto a la pintura, y para fomentar la creatividad y la expresión artística. Un tamaño ideal de 8,5 x 11 pulgadas, perfecto para usar en casa o llevar a cualquier parte. Papel de calidad apto para lápices de colores, ceras, rotuladores de punta fina muy suaves y acuarelas. Una portada vibrante de dinosaurios que inspira aventuras imaginativas y hace que el rato de arte sea divertido.\nTanto si tu hijo es un artista en ciernes como si simplemente le encantan los dinosaurios, es el compañero perfecto para horas de diversión creativa. La cubierta resistente y el papel de calidad están hechos para aguantar todas sus aventuras artísticas, y lo convierten en un gran regalo para cumpleaños, fiestas o cualquier ocasión especial.\nPerfecto para dibujar y garabatear a diario, clases y proyectos de arte, regalos de cumpleaños y fiestas, y para crear sobre la marcha. Una forma divertida y sin ensuciar de inspirar la expresión artística y la imaginación.",
      },
    },
    details: {
      publisher: "Tavren",
      publicationDate: "2024-06-17",
      pages: 118,
      asin: "B0D7NYFQZJ",
      dimensions: { width: 21.59, height: 27.94 }, // cm
    },
  },
  {
    slug: "unicorn-dreams-sketchbook",
    language: "en",
    authorId: "pawsome-studio",
    gallery: [
      "/books/Unicorn Dreams sketchbook/1.png",
      "/books/Unicorn Dreams sketchbook/2.png",
    ],
    amazonUrls: {
      paperback: "https://www.amazon.com/dp/B0D7P5JJ51",
    },
    category: "notebooks",
    author: "Pawsome Studio",
    formats: ["paperback"],
    collection: "Tavren Notebooks",
    cover: "/books/Unicorn Dreams sketchbook/Unicorn Dreams sketchbook.png",
    coverStyle: "flat",
    isNew: false,
    translations: {
      en: {
        title: "Unicorn Dreams: Enchanted Sketchbook",
        subtitle: "Enchanted sketchbook for kids",
        shortDescription:
          "A unicorn-themed sketchbook with premium blank pages for drawing, coloring and sketching. Ideal for ages 3 and up.",
        description: "Let your child's imagination soar. Specially designed for young artists and unicorn lovers, this sketchbook offers premium blank pages perfect for drawing, coloring and sketching. The vibrant unicorn-themed cover captures the wonder and enchantment, inviting children to explore their creativity.\nIdeal for a variety of artistic activities, from sketching to painting, and for encouraging creativity and artistic expression. An ideal size of 8.5 x 11 inches, perfect for use at home or on the go. High-quality paper suitable for colored pencils, crayons, very light fine-tip markers and watercolor paints. An enchanting unicorn-themed cover that inspires imaginative adventures and makes art time magical.\nWhether your child is a budding artist or simply loves unicorns, it is the perfect companion for hours of creative fun. The durable cover and high-quality paper are made to withstand all their artistic endeavors, making it a great gift for birthdays, holidays or any special occasion.\nPerfect for daily drawing and doodling, art classes and projects, birthday and holiday gifts, and creativity on the go. A fun, mess-free way to inspire artistic expression and imagination.",
        amazonUrl: "https://www.amazon.com/dp/B0D7P5JJ51",
      },
      es: {
        subtitle: "Cuaderno de dibujo encantado para niños",
        shortDescription:
          "Un cuaderno de dibujo con portada de unicornios y páginas en blanco de calidad para dibujar, colorear y hacer bocetos. Ideal a partir de 3 años.",
        description: "Deja volar la imaginación de tu hijo. Pensado especialmente para jóvenes artistas y amantes de los unicornios, este cuaderno de dibujo ofrece páginas en blanco de calidad, perfectas para dibujar, colorear y hacer bocetos. La vibrante portada de unicornios captura la magia y el encanto, e invita a los niños a explorar su creatividad.\nIdeal para todo tipo de actividades artísticas, del boceto a la pintura, y para fomentar la creatividad y la expresión artística. Un tamaño ideal de 8,5 x 11 pulgadas, perfecto para usar en casa o llevar a cualquier parte. Papel de calidad apto para lápices de colores, ceras, rotuladores de punta fina muy suaves y acuarelas. Una portada encantadora de unicornios que inspira aventuras imaginativas y hace que el rato de arte sea mágico.\nTanto si tu hijo es un artista en ciernes como si simplemente le encantan los unicornios, es el compañero perfecto para horas de diversión creativa. La cubierta resistente y el papel de calidad están hechos para aguantar todas sus aventuras artísticas, y lo convierten en un gran regalo para cumpleaños, fiestas o cualquier ocasión especial.\nPerfecto para dibujar y garabatear a diario, clases y proyectos de arte, regalos de cumpleaños y fiestas, y para crear sobre la marcha. Una forma divertida y sin ensuciar de inspirar la expresión artística y la imaginación.",
      },
    },
    details: {
      publisher: "Tavren",
      publicationDate: "2024-06-17",
      pages: 118,
      asin: "B0D7P5JJ51",
      dimensions: { width: 21.59, height: 27.94 }, // cm
    },
  },
  {
    slug: "space-explorers-sketchbook",
    language: "en",
    authorId: "pawsome-studio",
    gallery: [
      "/books/Space Explorers Adventures/1.png",
      "/books/Space Explorers Adventures/2.png",
    ],
    amazonUrls: {
      paperback: "https://www.amazon.com/dp/B0D78R8FCM",
    },
    category: "notebooks",
    author: "Pawsome Studio",
    formats: ["paperback"],
    collection: "Tavren Notebooks",
    cover: "/books/Space Explorers Adventures/Space Explorers Adventures.png",
    coverStyle: "flat",
    isNew: false,
    translations: {
      en: {
        title: "Space Explorers: Astronaut Adventures",
        subtitle: "Sketchbook for kids",
        shortDescription:
          "A space-themed sketchbook with a soft matte cover and premium blank pages for drawing, coloring and sketching. For ages 3 and up.",
        description: "Blast off into creativity. This vibrant and inspiring sketchbook is designed to ignite the imaginations of young space enthusiasts. The cover features original, colorful illustrations of astronauts and space scenes that will captivate any child's interest. Inside, premium blank pages are perfect for drawing, coloring and sketching, whether your child is practicing their art skills or just doodling for fun.\nA size of 8.5 x 11 inches, easy to carry and perfect for backpacks and bags. Premium pages ideal for colored pencils, crayons, very light fine-tip markers or watercolor paints. A durable, soft matte cover with an inspiring space-themed design that is pleasant to the touch and easy to grip. Ideal for daily journaling, drawing, doodling, sketching, taking notes and more.\nIt encourages your child to explore the wonders of space while developing their artistic skills. Perfect for children aged 3 and up who love astronauts, space and expressing their creativity, and an excellent gift for birthdays, holidays or any special occasion.",
        amazonUrl: "https://www.amazon.com/dp/B0D78R8FCM",
      },
      es: {
        subtitle: "Cuaderno de dibujo para niños",
        shortDescription:
          "Un cuaderno de dibujo con portada mate suave de astronautas y páginas en blanco de calidad para dibujar, colorear y hacer bocetos. A partir de 3 años.",
        description: "Despega hacia la creatividad. Este vibrante e inspirador cuaderno de dibujo está pensado para encender la imaginación de los pequeños aficionados al espacio. La portada tiene ilustraciones originales y coloridas de astronautas y escenas espaciales que captarán el interés de cualquier niño. Dentro, páginas en blanco de calidad, perfectas para dibujar, colorear y hacer bocetos, tanto si tu hijo practica sus habilidades artísticas como si solo garabatea por diversión.\nUn tamaño de 8,5 x 11 pulgadas, fácil de llevar y perfecto para mochilas y bolsos. Páginas de calidad ideales para lápices de colores, ceras, rotuladores de punta fina muy suaves o acuarelas. Una cubierta mate suave y resistente, con un diseño espacial inspirador, agradable al tacto y fácil de agarrar. Ideal para escribir un diario, dibujar, garabatear, hacer bocetos, tomar notas y mucho más.\nAnima a tu hijo a explorar las maravillas del espacio mientras desarrolla sus habilidades artísticas. Perfecto para niños a partir de 3 años a los que les encantan los astronautas, el espacio y expresar su creatividad, y un regalo excelente para cumpleaños, fiestas o cualquier ocasión especial.",
      },
    },
    details: {
      publisher: "Tavren",
      publicationDate: "2024-06-16",
      pages: 118,
      asin: "B0D78R8FCM",
      dimensions: { width: 21.59, height: 27.94 }, // cm
    },
  },
  {
    slug: "mermaid-magic-sketchbook",
    language: "en",
    authorId: "pawsome-studio",
    gallery: [
      "/books/Mermaid Magic Sketchbook/1.png",
      "/books/Mermaid Magic Sketchbook/2.png",
    ],
    amazonUrls: {
      paperback: "https://www.amazon.com/dp/B0D7P3BSVS",
    },
    category: "notebooks",
    author: "Pawsome Studio",
    formats: ["paperback"],
    collection: "Tavren Notebooks",
    cover: "/books/Mermaid Magic Sketchbook/Mermaid Magic Sketchbook.png",
    coverStyle: "flat",
    isNew: false,
    translations: {
      en: {
        title: "Mermaid Magic: Enchanting Sketchbook",
        subtitle: "Enchanting sketchbook for kids",
        shortDescription:
          "A mermaid-themed sketchbook with premium blank pages for drawing, coloring and sketching. Ideal for ages 3 and up.",
        description: "Dive into an underwater adventure. Designed especially for young artists and mermaid enthusiasts, this sketchbook offers premium blank pages perfect for drawing, coloring and sketching. The vibrant mermaid-themed cover captures the imagination and invites children to explore their artistic side.\nIdeal for a variety of artistic activities, from sketching to painting, and for encouraging creativity and artistic expression. An ideal size of 8.5 x 11 inches, perfect for use at home or on the go. High-quality paper suitable for colored pencils, crayons, very light fine-tip markers and watercolor paints. A vibrant mermaid-themed cover that inspires imaginative adventures and makes art time fun.\nWhether your child is a budding artist or just loves mermaids, it is the perfect companion for hours of creative fun. The durable cover and high-quality paper are made to withstand all their artistic endeavors, making it a great gift for birthdays, holidays or any special occasion.\nPerfect for daily drawing and doodling, art classes and projects, birthday and holiday gifts, and creativity on the go. A fun, mess-free way to inspire artistic expression and imagination.",
        amazonUrl: "https://www.amazon.com/dp/B0D7P3BSVS",
      },
      es: {
        subtitle: "Cuaderno de dibujo encantador para niños",
        shortDescription:
          "Un cuaderno de dibujo con portada de sirenas y páginas en blanco de calidad para dibujar, colorear y hacer bocetos. Ideal a partir de 3 años.",
        description: "Sumérgete en una aventura submarina. Pensado especialmente para jóvenes artistas y aficionados a las sirenas, este cuaderno de dibujo ofrece páginas en blanco de calidad, perfectas para dibujar, colorear y hacer bocetos. La vibrante portada de sirenas despierta la imaginación e invita a los niños a explorar su lado artístico.\nIdeal para todo tipo de actividades artísticas, del boceto a la pintura, y para fomentar la creatividad y la expresión artística. Un tamaño ideal de 8,5 x 11 pulgadas, perfecto para usar en casa o llevar a cualquier parte. Papel de calidad apto para lápices de colores, ceras, rotuladores de punta fina muy suaves y acuarelas. Una portada vibrante de sirenas que inspira aventuras imaginativas y hace que el rato de arte sea divertido.\nTanto si tu hijo es un artista en ciernes como si simplemente le encantan las sirenas, es el compañero perfecto para horas de diversión creativa. La cubierta resistente y el papel de calidad están hechos para aguantar todas sus aventuras artísticas, y lo convierten en un gran regalo para cumpleaños, fiestas o cualquier ocasión especial.\nPerfecto para dibujar y garabatear a diario, clases y proyectos de arte, regalos de cumpleaños y fiestas, y para crear sobre la marcha. Una forma divertida y sin ensuciar de inspirar la expresión artística y la imaginación.",
      },
    },
    details: {
      publisher: "Tavren",
      publicationDate: "2024-06-17",
      pages: 118,
      asin: "B0D7P3BSVS",
      dimensions: { width: 21.59, height: 27.94 }, // cm
    },
  },
  {
    slug: "activity-book",
    language: "en",
    authorId: "pawsome-studio",
    gallery: [
      "/books/activity-book/1.png",
      "/books/activity-book/2.png",
      "/books/activity-book/3.png",
      "/books/activity-book/4.png",
    ],
    amazonUrls: {
      paperback: "https://www.amazon.com/dp/B0D8ZNST7G",
    },
    category: "kids",
    author: "Pawsome Studio",
    formats: ["paperback"],
    collection: "Tavren Kids",
    cover: "/books/activity-book/activity-book.png",
    coverStyle: "flat",
    isNew: false,
    translations: {
      en: {
        title: "Activity Journal for Kids",
        shortDescription:
          "An activity journal with 110 full-color pages of coloring, games, puzzles and learning. Designed for children ages 3 to 8.",
        description: "Welcome to the Activity Journal for Kids, with 110 full-color pages. Specially designed for children ages 3 to 8, it is an endless source of fun and learning.\nInside you will find pages to jot down thoughts, memories and important things; fun, educational questions that stimulate reflection and self-awareness; adorable images to color; games and puzzles that develop cognitive skills; and exercises that combine play with education.\nIt also includes activities that foster a love for the environment, interesting facts about animals around the world, a space adventure to learn about planets, stars and the universe, games to learn the alphabet and colors, activities that promote the value of friendship and family, ideas to enjoy and learn outdoors, and fun projects to do together as a family.\nHigh-quality pages and vibrant colors, in a 6 x 9 inch size that is ideal to carry everywhere. It promotes creativity, critical thinking and emotional connection.\nThe perfect companion for any occasion, whether at home, in the park or on the go. Each page is a new adventure waiting to be discovered.",
        amazonUrl: "https://www.amazon.com/dp/B0D8ZNST7G",
      },
      es: {
        shortDescription:
          "Un diario de actividades con 110 páginas a todo color de colorear, juegos, puzzles y aprendizaje. Pensado para niños de 3 a 8 años.",
        description: "Te damos la bienvenida al Activity Journal for Kids, con 110 páginas a todo color. Pensado especialmente para niños de 3 a 8 años, es una fuente inagotable de diversión y aprendizaje.\nDentro encontrarás páginas para apuntar pensamientos, recuerdos y cosas importantes; preguntas divertidas y educativas que estimulan la reflexión y el autoconocimiento; adorables dibujos para colorear; juegos y puzzles que desarrollan las habilidades cognitivas; y ejercicios que combinan juego y educación.\nTambién incluye actividades que fomentan el amor por el medio ambiente, datos interesantes sobre animales de todo el mundo, una aventura espacial para aprender sobre planetas, estrellas y el universo, juegos para aprender el abecedario y los colores, actividades que promueven el valor de la amistad y la familia, ideas para disfrutar y aprender al aire libre y proyectos divertidos para hacer en familia.\nPáginas de calidad y colores vibrantes, en un tamaño de 6 x 9 pulgadas ideal para llevar a todas partes. Fomenta la creatividad, el pensamiento crítico y la conexión emocional.\nEl compañero perfecto para cualquier ocasión, en casa, en el parque o de viaje. Cada página es una nueva aventura por descubrir.",
      },
    },
    details: {
      publisher: "Tavren",
      publicationDate: "2024-07-05",
      pages: 110,
      isbn: "979-8332320514",
      asin: "B0D8ZNST7G",
      dimensions: { width: 15.24, height: 22.86 }, // cm
    },
  },
  {
    // TODO: el título es el mismo que el de activity-book; conviene ponerle uno distinto.
    slug: "activity-book-2",
    language: "en",
    authorId: "pawsome-studio",
    gallery: [
      "/books/activity-book-2/1.png",
      "/books/activity-book-2/2.png",
      "/books/activity-book-2/3.png",
      "/books/activity-book-2/4.png",
    ],
    amazonUrls: {
      paperback: "https://www.amazon.com/dp/B0DB1D79RM",
    },
    category: "kids",
    author: "Pawsome Studio",
    formats: ["paperback"],
    collection: "Tavren Kids",
    cover: "/books/activity-book-2/activity-book-2.png",
    coverStyle: "flat",
    isNew: false,
    translations: {
      en: {
        title: "Activity Journal for Kids",
        shortDescription:
          "An activity journal with 110 full-color pages of coloring, games, puzzles and learning. Designed for children ages 3 to 8.",
        description: "Welcome to the Activity Journal for Kids, with 110 full-color pages. Specially designed for children ages 3 to 8, it is an endless source of fun and learning.\nInside you will find pages to jot down thoughts, memories and important things; fun, educational questions that stimulate reflection and self-awareness; adorable images to color; games and puzzles that develop cognitive skills; and exercises that combine play with education.\nIt also includes activities that foster a love for the environment, interesting facts about animals around the world, a space adventure to learn about planets, stars and the universe, games to learn the alphabet and colors, activities that promote the value of friendship and family, ideas to enjoy and learn outdoors, and fun projects to do together as a family.\nHigh-quality pages and vibrant colors, in a 6 x 9 inch size that is ideal to carry everywhere. It promotes creativity, critical thinking and emotional connection.\nThe perfect companion for any occasion, whether at home, in the park or on the go. Each page is a new adventure waiting to be discovered.",
        amazonUrl: "https://www.amazon.com/dp/B0DB1D79RM",
      },
      es: {
        shortDescription:
          "Un diario de actividades con 110 páginas a todo color de colorear, juegos, puzzles y aprendizaje. Pensado para niños de 3 a 8 años.",
        description: "Te damos la bienvenida al Activity Journal for Kids, con 110 páginas a todo color. Pensado especialmente para niños de 3 a 8 años, es una fuente inagotable de diversión y aprendizaje.\nDentro encontrarás páginas para apuntar pensamientos, recuerdos y cosas importantes; preguntas divertidas y educativas que estimulan la reflexión y el autoconocimiento; adorables dibujos para colorear; juegos y puzzles que desarrollan las habilidades cognitivas; y ejercicios que combinan juego y educación.\nTambién incluye actividades que fomentan el amor por el medio ambiente, datos interesantes sobre animales de todo el mundo, una aventura espacial para aprender sobre planetas, estrellas y el universo, juegos para aprender el abecedario y los colores, actividades que promueven el valor de la amistad y la familia, ideas para disfrutar y aprender al aire libre y proyectos divertidos para hacer en familia.\nPáginas de calidad y colores vibrantes, en un tamaño de 6 x 9 pulgadas ideal para llevar a todas partes. Fomenta la creatividad, el pensamiento crítico y la conexión emocional.\nEl compañero perfecto para cualquier ocasión, en casa, en el parque o de viaje. Cada página es una nueva aventura por descubrir.",
      },
    },
    details: {
      publisher: "Tavren",
      publicationDate: "2024-07-22",
      pages: 110,
      isbn: "979-8333834041",
      asin: "B0DB1D79RM",
      dimensions: { width: 15.24, height: 22.86 }, // cm
    },
  },
  {
    slug: "el-jardin-magico",
    language: "both",
    authorId: "tavren-ediciones",
    contributors: [
      { name: "Andrew T. Moore", role: "author" },
      { name: "Becca Harris", role: "illustrator" },
    ],
    category: "kids",
    author: "Tavren Ediciones",
    formats: ["paperback"],
    collection: "Tavren Kids",
    coverStyle: "flat",
    isNew: false,
    translations: {
      es: {
        title: "El Jardín Mágico",
        subtitle: "Una aventura por la naturaleza con actividades, experimentos y dibujos para colorear",
        shortDescription:
          "Mia, Emily y Jack descubren un portal en un jardín y viajan por mundos mágicos donde aprenden a cuidar la naturaleza. Con actividades, experimentos y dibujos para colorear.",
        description: "¿Podemos ser una parte vital del cuidado de la naturaleza?\nCuando Mia, Emily y Jack descubren un portal en un jardín, se embarcan en una serie de increíbles aventuras a través de mundos mágicos y diversos. Desde un planeta vibrante y arcoíris lleno de flores cantantes y árboles luminosos, hasta un misterioso reino submarino con algas fluorescentes y peces coloridos, cada lugar les enseña valiosas lecciones sobre la naturaleza y la importancia de protegerla.\nA lo largo de sus viajes, los niños se enfrentan a desafíos que ponen a prueba su ingenio y trabajo en equipo. ¿Podrán reparar placas tectónicas en terrenos volcánicos para evitar terremotos? ¿Qué aprenderán de las extraordinarias criaturas de las montañas heladas? ¿Y cómo les ayudarán sus nuevas habilidades y conocimientos cuando regresen a casa?\nCon la ayuda de Spark, su fiel amigo animal, los niños descubren que cada pequeño esfuerzo cuenta para mantener la belleza y la armonía de nuestro mundo. «El Jardín Mágico» es una historia cautivadora que combina aventura y aprendizaje, e inspira a los jóvenes lectores a valorar y cuidar nuestro planeta.\nAdemás de la historia, el libro incluye:\n- Actividades relacionadas con la naturaleza\n- Experimentos sorprendentes\n- Páginas para colorear y dibujos\n- Actividades al aire libre para disfrutar en familia\nInterior a todo color.\nÚnete a Mia, Emily, Jack y Spark en este emocionante viaje y descubre cómo todos podemos ser guardianes de la naturaleza.",
      },
      en: {
        title: "The Magic Garden",
        subtitle: "A nature adventure with activities, experiments and coloring pages",
        shortDescription:
          "Mia, Emily and Jack discover a portal in a garden and travel through magical worlds where they learn to take care of nature. With activities, experiments and coloring pages.",
        description: "Can we be a vital part of taking care of nature?\nWhen Mia, Emily and Jack discover a portal in a garden, they set off on a series of incredible adventures through magical and diverse worlds. From a vibrant, rainbow-colored planet full of singing flowers and glowing trees to a mysterious underwater kingdom with fluorescent seaweed and colorful fish, every place teaches them valuable lessons about nature and the importance of protecting it.\nAlong the way, the children face challenges that test their ingenuity and teamwork. Will they be able to repair tectonic plates on volcanic terrain to prevent earthquakes? What will they learn from the extraordinary creatures of the icy mountains? And how will their new skills and knowledge help them when they return home?\nWith the help of Spark, their loyal animal friend, the children discover that every small effort counts to preserve the beauty and harmony of our world. \"The Magic Garden\" is a captivating story that combines adventure and learning, inspiring young readers to value and care for our planet.\nBesides the story, the book includes:\n- Nature-related activities\n- Surprising experiments\n- Coloring pages and drawings\n- Outdoor activities to enjoy with family\nFull-color interior.\nJoin Mia, Emily, Jack and Spark on this exciting journey and discover how we can all become guardians of nature.",
      },
    },
    details: { publisher: "Tavren" },
    editions: {
      es: {
        cover: "/books/jardin magico/jardin magico.png",
        gallery: [
          "/books/jardin magico/1.png",
          "/books/jardin magico/2.png",
          "/books/jardin magico/3.png",
          "/books/jardin magico/4.png",
          "/books/jardin magico/5.png",
        ],
        amazonUrls: { paperback: "https://www.amazon.es/dp/B0HQ99BN3W" },
        amazonUrl: "https://www.amazon.es/dp/B0HQ99BN3W",
        details: {
          publicationDate: "2026-11-03",
          pages: 130,
          isbn: "979-8167627840",
          asin: "B0HQ99BN3W",
          dimensions: { width: 15.24, height: 22.86 }, // cm
        },
      },
      en: {
        cover: "/books/magic garden/magic garden.png",
        gallery: [
          "/books/magic garden/1.png",
          "/books/magic garden/2.png",
          "/books/magic garden/3.png",
          "/books/magic garden/4.png",
        ],
        amazonUrls: { paperback: "https://www.amazon.com/dp/B0HQDLLNNH" },
        amazonUrl: "https://www.amazon.com/dp/B0HQDLLNNH",
        details: {
          publicationDate: "2026-11-03",
          pages: 130,
          isbn: "979-8167649460",
          asin: "B0HQDLLNNH",
          dimensions: { width: 15.24, height: 22.86 }, // cm
        },
      },
    },
  },
  {
    slug: "thailand-cuisine",
    language: "en",
    authorId: "cinnamon-press",
    contributors: [
      { name: "John A. Dillon", role: "author" },
      { name: "Ross Allen", role: "editor" },
    ],
    series: "World Cuisine",
    seriesNumber: 3,
    gallery: [
      "/books/thailand-cuisine/1.png",
      "/books/thailand-cuisine/2.png",
      "/books/thailand-cuisine/3.png",
      "/books/thailand-cuisine/4.png",
      "/books/thailand-cuisine/5.png",
      "/books/thailand-cuisine/6.png",
      "/books/thailand-cuisine/7.png",
    ],
    amazonUrls: {
      paperback: "https://www.amazon.com/dp/B0FQJF32GD",
    },
    category: "cooking",
    author: "Cinnamon Press",
    formats: ["paperback"],
    collection: "Tavren Cooking",
    cover: "/books/thailand-cuisine/thailand-cuisine.png",
    coverStyle: "flat",
    isNew: false,
    translations: {
      en: {
        title: "Thailand & Cuisine Cookbook",
        subtitle: "The Essence of Thai Gastronomy: History, Ingredients and Recipes",
        shortDescription:
          "A Thai cookbook with 101 classic recipes, from Bangkok street food to Southern Thai cuisine, with full-color photography.",
        description: "Welcome the bold, complex flavors of Thailand into your kitchen. This guide to Thai cooking offers 101 classic recipes for home cooks, taking you from Bangkok street food to the heart of Southern Thai cuisine, and showing you how to recreate the genuine flavors of the food Thai people eat.\nInside you will find:\n- 101 Thai dishes: a curated collection of classic, regional and lesser-known recipes\n- Quick and easy recipes: detailed instructions for dishes you can make in 45 minutes or less\n- Plant-based options: vegetarian and plant-based takes on popular dishes\n- Authentic techniques: secrets for perfecting homemade curry pastes with intense, bold flavors\n- A visual guide: full-color photography and easy-to-follow instructions for every technique\nFire up your wok and get ready to cook authentic Thai food at home.",
        amazonUrl: "https://www.amazon.com/dp/B0FQJF32GD",
      },
      es: {
        subtitle: "La esencia de la gastronomía tailandesa: historia, ingredientes y recetas",
        shortDescription:
          "Un libro de cocina tailandesa con 101 recetas clásicas, de la comida callejera de Bangkok a la cocina del sur de Tailandia, con fotografías a todo color.",
        description: "Trae a tu cocina los sabores intensos y complejos de Tailandia. Esta guía de cocina tailandesa ofrece 101 recetas clásicas para cocinar en casa, y te lleva de la comida callejera de Bangkok al corazón de la cocina del sur de Tailandia, para que recrees los sabores genuinos de lo que se come de verdad en Tailandia.\nDentro encontrarás:\n- 101 platos tailandeses: una colección cuidada de recetas clásicas, regionales y poco conocidas\n- Recetas rápidas y fáciles: instrucciones detalladas para platos que puedes preparar en 45 minutos o menos\n- Opciones vegetales: versiones vegetarianas y veganas de platos populares\n- Técnicas auténticas: los secretos para perfeccionar pastas de curry caseras, de sabor intenso\n- Una guía visual: fotografías a todo color e instrucciones fáciles de seguir para cada técnica\nEnciende el wok y prepárate para cocinar auténtica comida tailandesa en casa.",
      },
    },
    details: {
      publisher: "Tavren",
      publicationDate: "2025-09-08",
      pages: 201,
      isbn: "979-8264415906",
      asin: "B0FQJF32GD",
      dimensions: { width: 15.24, height: 22.86 }, // cm
    },
  },
  {
    slug: "nordic-cuisine",
    language: "en",
    authorId: "cinnamon-press",
    contributors: [
      { name: "John A. Dillon", role: "author" },
      { name: "Ross Allen", role: "editor" },
    ],
    series: "World Cuisine",
    seriesNumber: 2,
    gallery: [
      "/books/nordic-cuisine/1.png",
      "/books/nordic-cuisine/2.png",
      "/books/nordic-cuisine/3.png",
      "/books/nordic-cuisine/4.png",
      "/books/nordic-cuisine/5.png",
      "/books/nordic-cuisine/6.png",
      "/books/nordic-cuisine/7.png",
      "/books/nordic-cuisine/8.png",
      "/books/nordic-cuisine/9.png",
    ],
    amazonUrls: {
      paperback: "https://www.amazon.com/dp/B0FQ3TTHLT",
    },
    category: "cooking",
    author: "Cinnamon Press",
    formats: ["paperback"],
    collection: "Tavren Cooking",
    cover: "/books/nordic-cuisine/nordic-cuisine.png",
    coverStyle: "flat",
    isNew: false,
    translations: {
      en: {
        title: "Nordic & Cuisine Cookbook",
        subtitle: "The Essence of Nordic Gastronomy: History, Ingredients and Recipes",
        shortDescription:
          "A Nordic cookbook with traditional recipes from five Nordic countries, combining rich tradition with modern health principles.",
        description: "Discover authentic recipes from Denmark, Sweden, Norway and beyond. This guide to Nordic cuisine combines rich tradition with modern health principles, and gives you everything you need whether you are new to the region or a seasoned cook.\nInside you will find:\n- Authentic recipes: traditional Nordic dishes from five Nordic countries\n- Nordic baking: recipes for beginners, from classic breads to cinnamon buns with cardamom\n- Full cuisine coverage: fish, meat, vegetables and desserts, such as gravlax and rose-hip soup\n- Essential techniques: home preserving, fermentation and smoking\nBring the cozy, healthy and rich flavors of Scandinavia home.",
        amazonUrl: "https://www.amazon.com/dp/B0FQ3TTHLT",
      },
      es: {
        subtitle: "La esencia de la gastronomía nórdica: historia, ingredientes y recetas",
        shortDescription:
          "Un libro de cocina nórdica con recetas tradicionales de cinco países nórdicos, que combina una rica tradición con principios modernos de salud.",
        description: "Descubre recetas auténticas de Dinamarca, Suecia, Noruega y más allá. Esta guía de la cocina nórdica combina una rica tradición con principios modernos de salud, y te da todo lo que necesitas tanto si empiezas a conocer la región como si ya cocinas con experiencia.\nDentro encontrarás:\n- Recetas auténticas: platos tradicionales nórdicos de cinco países nórdicos\n- Repostería nórdica: recetas para principiantes, de los panes clásicos a los bollos de canela con cardamomo\n- Cocina completa: pescado, carne, verduras y postres, como el gravlax y la sopa de escaramujo\n- Técnicas esenciales: conservas caseras, fermentación y ahumado\nLleva a casa los sabores acogedores, saludables y ricos de Escandinavia.",
      },
    },
    details: {
      publisher: "Tavren",
      publicationDate: "2025-09-05",
      pages: 201,
      isbn: "979-8264032394",
      asin: "B0FQ3TTHLT",
      dimensions: { width: 15.24, height: 22.86 }, // cm
    },
  },
  {
    slug: "spain-cuisine",
    language: "en",
    authorId: "cinnamon-press",
    contributors: [
      { name: "John A. Dillon", role: "author" },
      { name: "Ross Allen", role: "editor" },
    ],
    series: "World Cuisine",
    seriesNumber: 1,
    gallery: [
      "/books/spain-cuisine/1.png",
      "/books/spain-cuisine/2.png",
      "/books/spain-cuisine/3.png",
      "/books/spain-cuisine/4.png",
      "/books/spain-cuisine/5.png",
      "/books/spain-cuisine/6.png",
      "/books/spain-cuisine/7.png",
    ],
    amazonUrls: {
      paperback: "https://www.amazon.com/dp/B0FQ3VTWRL",
    },
    category: "cooking",
    author: "Cinnamon Press",
    formats: ["paperback"],
    collection: "Tavren Cooking",
    cover: "/books/spain-cuisine/spain-cuisine.png",
    coverStyle: "flat",
    isNew: false,
    translations: {
      en: {
        title: "Spain & Cuisine Cookbook",
        subtitle: "The Essence of Spanish Gastronomy: History, Ingredients and Recipes",
        shortDescription:
          "A Spanish cookbook with more than 100 traditional recipes and a Mediterranean diet guide, inspired by the cuisines of Southern Spain.",
        description: "Experience authentic Spanish flavors and the Mediterranean diet. This guide goes beyond simple tapas, bringing you more than 100 traditional Spanish recipes and an essential guide to the Mediterranean diet. Inspired by the sun-drenched cuisines of Southern Spain, it offers practical, weeknight-easy recipes for every home cook.\nInside you will find:\n- Regional specialties: the food traditions of Andalucía, the modern kitchens of Madrid and the rich heritage of the Basque Country\n- A healthy eating focus: every recipe is part of the Mediterranean diet, with plant-based options for building a healthier plate\n- Practical and quick: easy recipes you can make in 45 minutes or less, plus guides for meal planning and pantry-building\n- The experience: over 200 pages of tested recipes and beautiful photography",
        amazonUrl: "https://www.amazon.com/dp/B0FQ3VTWRL",
      },
      es: {
        subtitle: "La esencia de la gastronomía española: historia, ingredientes y recetas",
        shortDescription:
          "Un libro de cocina española con más de 100 recetas tradicionales y una guía de la dieta mediterránea, inspirado en las cocinas del sur de España.",
        description: "Descubre los sabores auténticos de España y la dieta mediterránea. Esta guía va más allá de las simples tapas y te ofrece más de 100 recetas tradicionales españolas y una guía esencial de la dieta mediterránea. Inspirada en las cocinas soleadas del sur de España, ofrece recetas prácticas y fáciles para el día a día, para cualquier persona que cocine en casa.\nDentro encontrarás:\n- Especialidades regionales: las tradiciones culinarias de Andalucía, las cocinas modernas de Madrid y la rica herencia del País Vasco\n- Una alimentación saludable: todas las recetas forman parte de la dieta mediterránea, con opciones vegetales para construir un plato más sano\n- Práctico y rápido: recetas fáciles que puedes preparar en 45 minutos o menos, además de guías para planificar las comidas y organizar la despensa\n- La experiencia: más de 200 páginas de recetas probadas y fotografías preciosas",
      },
    },
    details: {
      publisher: "Tavren",
      publicationDate: "2025-09-05",
      pages: 201,
      isbn: "979-8264034893",
      asin: "B0FQ3VTWRL",
      dimensions: { width: 15.24, height: 22.86 }, // cm
    },
  },
  {
    slug: "korea-cuisine",
    language: "en",
    authorId: "cinnamon-press",
    contributors: [
      { name: "John A. Dillon", role: "author" },
      { name: "Ross Allen", role: "editor" },
    ],
    series: "World Cuisine",
    seriesNumber: 4,
    gallery: [
      "/books/korea-cuisine/1.png",
      "/books/korea-cuisine/2.png",
      "/books/korea-cuisine/3.png",
      "/books/korea-cuisine/4.png",
      "/books/korea-cuisine/5.png",
      "/books/korea-cuisine/6.png",
      "/books/korea-cuisine/7.png",
      "/books/korea-cuisine/8.png",
    ],
    amazonUrls: {
      paperback: "https://www.amazon.com/dp/B0FSDS96NH",
    },
    category: "cooking",
    author: "Cinnamon Press",
    formats: ["paperback"],
    collection: "Tavren Cooking",
    cover: "/books/korea-cuisine/korea-cuisine.png",
    coverStyle: "flat",
    isNew: false,
    translations: {
      en: {
        title: "Korea & Cuisine Cookbook",
        subtitle: "The Essence of Korean Gastronomy: History, Ingredients and Recipes",
        shortDescription:
          "A Korean cookbook with more than 100 traditional recipes for home cooks, from Korean BBQ and street food to banchan, stews and sauces.",
        description: "Welcome to the wide world of Korean flavors, made simple. This guide to Korean cuisine features more than 100 traditional recipes, designed for the home cook looking for quick and easy dishes without sacrificing bold flavor. Explore the foods of Koreatowns across America, from Seoul's vibrant scene to simple dishes you can make tonight.\nInside you will find:\n- The classics: approachable recipes for Korean BBQ favorites like bulgogi and kalbi, plus beloved street food like tteokbokki\n- Plant-based focus: creative plant-based dishes and tips for making traditional ingredients like kimchi and stews fully vegan\n- Simplified techniques: quick and easy recipes for beginners, with flavor shortcuts to boost taste and reduce prep time\n- Complete coverage: banchan, flavorful stews, noodles, soups and essential Korean sauces\n- The experience: over 200 pages of delicious meals, beautiful photography and stories of Korean food's global evolution\nBring restaurant-quality Korean meals to your table tonight.",
        amazonUrl: "https://www.amazon.com/dp/B0FSDS96NH",
      },
      es: {
        subtitle: "La esencia de la gastronomía coreana: historia, ingredientes y recetas",
        shortDescription:
          "Un libro de cocina coreana con más de 100 recetas tradicionales para cocinar en casa, del barbacoa coreana y la comida callejera a los banchan, los guisos y las salsas.",
        description: "Te damos la bienvenida al amplio mundo de los sabores coreanos, hecho fácil. Esta guía de la cocina coreana reúne más de 100 recetas tradicionales, pensadas para quien cocina en casa y busca platos rápidos y sencillos sin renunciar a un sabor intenso. Explora la comida de los barrios coreanos de Estados Unidos, desde el ambiente vibrante de Seúl hasta platos sencillos que puedes preparar esta noche.\nDentro encontrarás:\n- Los clásicos: recetas accesibles de los favoritos de la barbacoa coreana, como el bulgogi y el kalbi, y de la comida callejera más querida, como el tteokbokki\n- Enfoque vegetal: platos vegetales creativos y consejos para preparar de forma totalmente vegana ingredientes tradicionales como el kimchi y los guisos\n- Técnicas simplificadas: recetas rápidas y fáciles para principiantes, con atajos de sabor para potenciar el gusto y reducir el tiempo de preparación\n- Cobertura completa: banchan, guisos sabrosos, fideos, sopas y las salsas coreanas esenciales\n- La experiencia: más de 200 páginas de platos deliciosos, fotografías preciosas e historias sobre la evolución global de la comida coreana\nLleva a tu mesa platos coreanos de calidad de restaurante esta noche.",
      },
    },
    details: {
      publisher: "Tavren",
      publicationDate: "2025-09-21",
      pages: 201,
      isbn: "979-8266527416",
      asin: "B0FSDS96NH",
      dimensions: { width: 15.24, height: 22.86 }, // cm
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
  contributors?: Contributor[];
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
  /** Idioma de la edición mostrada; solo si el libro tiene ediciones. */
  editionLang?: Lang;
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

/** Edición del idioma pedido (o undefined si el libro no la tiene). */
export function getBookEdition(book: Book, lang: Lang): BookEdition | undefined {
  return book.editions?.[lang];
}

function localize(book: Book, lang: Lang): LocalizedBook {
  const c = getBookContent(book, lang);
  const ed = getBookEdition(book, lang);
  const bothEditions = !!(book.editions?.es && book.editions?.en);
  return {
    ...c,
    amazonUrl: ed?.amazonUrl ?? c.amazonUrl,
    editionLang: book.editions ? lang : undefined,
    slug: book.slug,
    language: bothEditions ? "both" : book.language,
    category: book.category,
    author: book.author,
    authorId: book.authorId,
    contributors: book.contributors,
    series: book.series,
    seriesNumber: book.seriesNumber,
    formats: book.formats,
    gallery: ed?.gallery ?? book.gallery ?? [],
    amazonUrls: ed?.amazonUrls ?? book.amazonUrls,
    coverStyle: book.coverStyle ?? "mockup",
    collection: book.collection,
    cover: ed?.cover ?? book.cover ?? "",
    isNew: book.isNew,
    details: {
      ...book.details,
      ...ed?.details,
      publisher: ed?.details?.publisher ?? book.details?.publisher ?? "Tavren",
    },
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
