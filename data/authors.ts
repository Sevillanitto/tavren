import type { Lang } from "@/lib/i18n";

export interface Author {
  id: string;
  name: string;
  bio: Record<Lang, string>;
}

export const authors: Author[] = [
  {
    id: "andre-olvera",
    name: "André Olvera",
    bio: {
      es: "EJEMPLO. Biografía de relleno: aquí irá una breve presentación del autor, su trayectoria y lo que le inspira a escribir.",
      en: "EXAMPLE. Placeholder bio: a short introduction to the author, their background and what inspires their writing will go here.",
    },
  },
];

export function getAuthor(id: string): Author | undefined {
  return authors.find((a) => a.id === id);
}
