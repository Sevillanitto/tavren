import type { Lang } from "@/lib/i18n";
import { en, type Dictionary } from "./en";
import { es } from "./es";

const dictionaries: Record<Lang, Dictionary> = { en, es };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}

export type { Dictionary };
