export const en = {
  meta: {
    title: "Tavren — Independent publisher",
    description:
      "Tavren is an independent publisher of novels, cookbooks, children's books and notebooks, available on Amazon.",
  },
  skipToContent: "Skip to content",
  nav: {
    label: "Main navigation",
    books: "Books",
    about: "About",
    contact: "Contact",
  },
  langSwitch: {
    label: "Language",
    en: "English",
    es: "Español",
  },
  hero: {
    tagline:
      "Explore our books, get lost in a good story and discover reads that enrich every day. A catalogue that grows slowly, made with care.",
    quotes: [
      {
        text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
        author: "George R.R. Martin",
      },
      {
        text: "Until I feared I would lose it, I never loved to read. One does not love breathing.",
        author: "Harper Lee",
      },
      {
        text: "A book must be the axe for the frozen sea within us.",
        author: "Franz Kafka",
      },
      {
        text: "I have always imagined that Paradise will be a kind of library.",
        author: "Jorge Luis Borges",
      },
      {
        text: "Reading is to the mind what exercise is to the body.",
        author: "Joseph Addison",
      },
      {
        text: "He who reads much and walks much, sees much and knows much.",
        author: "Miguel de Cervantes",
      },
      {
        text: "To read is to dream, led by another's hand.",
        author: "Fernando Pessoa",
      },
    ],
  },
  catalog: {
    title: "Books",
    filterLabel: "Filter books by category",
    new: "New",
    empty: "No books in this category yet.",
    otherLang: "Books in Spanish",
    formats: {
      ebook: "Ebook",
      paperback: "Paperback",
      hardcover: "Hardcover",
    },
    categories: {
      all: "All",
      noir: "Noir",
      cooking: "Cooking",
      kids: "Kids",
      notebooks: "Notebooks",
    },
  },
  about: {
    title: "About Tavren",
    body: [
      "Tavren is a small publishing house with a simple idea: make books worth keeping, and take the time to do it well.",
      "We publish in English and Spanish, one title at a time. Take a look around and see what catches your eye.",
    ],
  },
  contact: {
    title: "Contact",
    body: "Questions, press or collaborations? Write to us.",
    email: "hola@tavren.example",
  },
  footer: {
    rights: "All rights reserved.",
    otherLang: "Leer en español",
  },
  book: {
    buy: "Buy on Amazon",
    back: "← Books",
    coverOf: "Cover of",
    galleryLabel: "Image gallery",
    formatLabel: "Format",
    sections: {
      description: "Description",
      details: "Details",
      author: "About the author",
    },
    detailLabels: {
      publisher: "Publisher",
      author: "Author",
      illustration: "Illustration",
      editor: "Editor",
      series: "Series",
      dimensions: "Dimensions",
      publicationDate: "Publication date",
      formats: "Available formats",
      language: "Language",
      pages: "Pages",
      isbn: "ISBN",
    },
    seriesLine: "Book {n} of the {series} series",
    languageNames: { en: "English", es: "Spanish", both: "Spanish and English" },
    writtenIn: {
      es: "This book is written in Spanish.",
      en: "This book is written in English.",
    },
  },
  notFound: {
    title: "Page not found",
    body: "We couldn't find what you were looking for.",
    home: "Back to home",
  },
};

export type Dictionary = typeof en;
