"use client";

import { useEffect } from "react";
import type { Lang } from "@/lib/i18n";

/**
 * El layout raíz no se vuelve a renderizar en navegaciones del cliente
 * (p. ej. al pulsar ES|EN), así que se sincroniza <html lang> aquí.
 * El render inicial del servidor ya viene correcto, por eso no hay mismatch.
 */
export default function LangSync({ lang }: { lang: Lang }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
