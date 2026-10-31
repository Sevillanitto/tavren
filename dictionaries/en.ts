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
      "Tavren is an independent publisher of novels, cookbooks, children's books and notebooks. Our books are sold on Amazon.",
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
    categories: {
      all: "All",
      novel: "Fiction",
      cooking: "Cooking",
      kids: "Kids",
      notebooks: "Notebooks",
    },
  },
  about: {
    title: "About Tavren",
    body: [
      "Tavren is a small independent publishing house. We make books we would like to find on our own shelves: stories worth getting lost in, recipes worth sharing, picture books for curious kids and notebooks for ideas that deserve a good page.",
      "We publish in English and Spanish, and every title is available exclusively on Amazon.",
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
    back: "← All books",
    coverOf: "Cover of",
  },
  notFound: {
    title: "Page not found",
    body: "We couldn't find what you were looking for.",
    home: "Back to home",
  },
};

export type Dictionary = typeof en;
