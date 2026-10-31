"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LANGS, type Lang } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries";

export function setLangCookie(lang: Lang) {
  document.cookie = `lang=${lang}; path=/; max-age=31536000; samesite=lax`;
}

export default function LangSwitch({
  lang,
  dict,
}: {
  lang: Lang;
  dict: Dictionary;
}) {
  const pathname = usePathname() ?? `/${lang}`;

  // Misma ruta con el prefijo de idioma cambiado (todas las fichas existen en es y en).
  function hrefFor(target: Lang) {
    const rest = pathname.split("/").slice(2).join("/");
    return rest ? `/${target}/${rest}` : `/${target}`;
  }

  return (
    <div
      role="group"
      aria-label={dict.langSwitch.label}
      className="inline-flex rounded-sm border border-ink/40 bg-white p-0.5 text-base font-semibold"
    >
      {LANGS.slice()
        .sort((a, b) => (a === "es" ? -1 : b === "es" ? 1 : 0))
        .map((code) => {
          const active = code === lang;
          return (
            <Link
              key={code}
              href={hrefFor(code)}
              hrefLang={code}
              lang={code}
              aria-current={active ? "true" : undefined}
              aria-label={dict.langSwitch[code]}
              onClick={() => setLangCookie(code)}
              className={`rounded-sm px-4 py-1.5 uppercase tracking-wide transition-colors ${
                active ? "bg-ink text-white" : "text-ink/70 hover:bg-mist"
              }`}
            >
              {code}
            </Link>
          );
        })}
    </div>
  );
}
