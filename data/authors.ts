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
  {
    id: "pawsome-studio",
    name: "Pawsome Studio",
    bio: {
      es: "Pawsome Studio es el lugar donde la imaginación se une con la educación para niños de 2 a 12 años. Fundado en 2024, crea productos coloridos y enriquecedores, entre ellos cuadernos, libros de dibujo, diarios, cuentos ilustrados y materiales educativos. Su misión es combinar el aprendizaje responsable con la diversión, para que las mentes jóvenes exploren, creen y aprendan de forma divertida.",
      en: "Pawsome Studio is where imagination meets education for children aged 2 to 12. Founded in 2024, it creates colorful, enriching products, including notebooks, drawing books, diaries, illustrated storybooks and educational materials. Its mission is to blend responsible learning with fun, empowering young minds to explore, create and learn in delightful ways.",
    },
  },
  {
    id: "tavren-ediciones",
    name: "Tavren Ediciones",
    bio: {
      es: "Tavren Ediciones es el sello con el que se publica este libro.",
      en: "Tavren Ediciones is the imprint under which this book is published.",
    },
  },
  {
    id: "cinnamon-press",
    name: "Cinnamon Press",
    bio: {
      es: "Cinnamon Press es el nombre con el que se publica este libro.",
      en: "Cinnamon Press is the name under which this book is published.",
    },
  },
];

export function getAuthor(id: string): Author | undefined {
  return authors.find((a) => a.id === id);
}
