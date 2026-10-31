"use client";

import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { setLangCookie } from "./LangSwitch";

/** Enlace a la home del otro idioma que además guarda la cookie "lang". */
export default function LangLink({
  lang,
  className,
  children,
}: {
  lang: Lang;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={`/${lang}`}
      hrefLang={lang}
      lang={lang}
      className={className}
      onClick={() => setLangCookie(lang)}
    >
      {children}
    </Link>
  );
}
