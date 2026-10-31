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
  bilingualSlugs,
}: {
  lang: Lang;
  dict: Dictionary;
  bilingualSlugs: string[];
}) {
  const pathname = usePathname() ?? `/${lang}`;
  const [, , section, slug] = pathname.split("/");

  function hrefFor(target: Lang) {
    // Ficha de libro: solo se mantiene si existe en el otro idioma.
    if (section === "books" && slug && !bilingualSlugs.includes(slug)) {
      return `/${target}`;
    }
    const rest = pathname.split("/").slice(2).join("/");
    return rest ? `/${target}/${rest}` : `/${target}`;
  }

  return (
    <div
      role="group"
      aria-label={dict.langSwitch.label}
      className="inline-flex rounded-full border-2 border-sky bg-white p-1 text-base font-semibold"
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
              className={`rounded-full px-4 py-1.5 uppercase tracking-wide transition-colors ${
                active ? "bg-sky text-ink" : "text-ink/70 hover:bg-mist"
              }`}
            >
              {code}
            </Link>
          );
        })}
    </div>
  );
}
