import type { Dictionary } from "./en";

export const es: Dictionary = {
  meta: {
    title: "Tavren — Editorial independiente",
    description:
      "Tavren es una editorial independiente de novela, cocina, libros infantiles y cuadernos, disponibles en Amazon.",
  },
  skipToContent: "Saltar al contenido",
  nav: {
    label: "Navegación principal",
    books: "Libros",
    about: "Sobre Tavren",
    contact: "Contacto",
  },
  langSwitch: {
    label: "Idioma",
    en: "English",
    es: "Español",
  },
  hero: {
    tagline:
      "Explora nuestros libros, déjate llevar por una buena historia y descubre lecturas que enriquecen cada día. Un catálogo que crece poco a poco, hecho con cuidado.",
    quotes: [
      {
        text: "Un lector vive mil vidas antes de morir. El hombre que nunca lee vive solo una.",
        author: "George R.R. Martin",
      },
      {
        text: "Hasta que temí perderlo, nunca amé leer. Uno no ama respirar.",
        author: "Harper Lee",
      },
      {
        text: "Un libro debe ser el hacha que rompa el mar helado que llevamos dentro.",
        author: "Franz Kafka",
      },
      {
        text: "Siempre imaginé que el Paraíso sería una especie de biblioteca.",
        author: "Jorge Luis Borges",
      },
      {
        text: "Leer es para la mente lo que el ejercicio es para el cuerpo.",
        author: "Joseph Addison",
      },
      {
        text: "Quien lee mucho y anda mucho, ve mucho y sabe mucho.",
        author: "Miguel de Cervantes",
      },
      {
        text: "Leer es soñar de la mano de otro.",
        author: "Fernando Pessoa",
      },
    ],
  },
  catalog: {
    title: "Libros",
    filterLabel: "Filtrar libros por categoría",
    new: "Nuevo",
    empty: "Todavía no hay libros en esta categoría.",
    otherLang: "En inglés",
    formats: {
      ebook: "Ebook",
      paperback: "Tapa blanda",
      hardcover: "Tapa dura",
    },
    categories: {
      all: "Todos",
      noir: "Novela negra",
      cooking: "Cocina",
      kids: "Infantil",
      notebooks: "Cuadernos",
    },
  },
  about: {
    title: "Sobre Tavren",
    body: [
      "Tavren es una pequeña editorial con una idea sencilla: hacer libros que merezca la pena conservar y tomarse el tiempo de hacerlos bien.",
      "Publicamos en español y en inglés, un título cada vez. Echa un vistazo y mira qué te llama la atención.",
    ],
  },
  contact: {
    title: "Contacto",
    body: "¿Dudas, prensa o colaboraciones? Escríbenos.",
    email: "hola@tavren.example",
  },
  footer: {
    rights: "Todos los derechos reservados.",
    otherLang: "Read in English",
  },
  book: {
    buy: "Comprar en Amazon",
    back: "← Libros",
    coverOf: "Portada de",
    galleryLabel: "Galería de imágenes",
    formatLabel: "Formato",
    sections: {
      description: "Descripción",
      details: "Detalles",
      author: "Sobre el autor",
    },
    detailLabels: {
      publisher: "Editorial",
      author: "Autor",
      series: "Serie",
      dimensions: "Dimensiones",
      publicationDate: "Fecha de publicación",
      formats: "Formatos disponibles",
      language: "Idioma",
      pages: "Páginas",
      isbn: "ISBN",
    },
    seriesLine: "Libro {n} de la serie {series}",
    languageNames: { en: "Inglés", es: "Español", both: "Español e inglés" },
    writtenIn: {
      es: "Este libro está escrito en español.",
      en: "Este libro está escrito en inglés.",
    },
  },
  notFound: {
    title: "Página no encontrada",
    body: "No hemos encontrado lo que buscabas.",
    home: "Volver al inicio",
  },
};
