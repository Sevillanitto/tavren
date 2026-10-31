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
      es: "André Olvera escribe novela negra. «Lo que enterramos antes de tiempo» es su primera novela y abre la serie Fractura, un thriller coral ambientado en Nueva York en el que varias vidas se cruzan a lo largo de distintas épocas. Le interesan las historias en las que nada es lo que parece, los secretos que se guardan en silencio y los casos que se resuelven pieza a pieza. Actualmente trabaja en la segunda parte de la serie.",
      en: "André Olvera writes noir fiction. “Lo que enterramos antes de tiempo” is his first novel and opens the Fractura series, an ensemble thriller set in New York in which several lives cross over different periods. He is drawn to stories where nothing is what it seems, to secrets kept in silence, and to cases that come together piece by piece. He is currently working on the second book in the series.",
    },
  },
];

export function getAuthor(id: string): Author | undefined {
  return authors.find((a) => a.id === id);
}
