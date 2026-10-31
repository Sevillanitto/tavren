import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries";
import LangSwitch from "./LangSwitch";

export default function Header({
  lang,
  dict,
  bilingualSlugs,
}: {
  lang: Lang;
  dict: Dictionary;
  bilingualSlugs: string[];
}) {
  const links = [
    { href: `/${lang}#books`, label: dict.nav.books },
    { href: `/${lang}#about`, label: dict.nav.about },
    { href: `/${lang}#contact`, label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 px-5 py-3 md:grid-cols-[1fr_auto_1fr] md:px-8">
        <Link
          href={`/${lang}`}
          className="font-serif text-2xl font-semibold tracking-tight md:text-3xl"
        >
          Tavren
        </Link>

        <nav
          aria-label={dict.nav.label}
          className="col-span-2 row-start-2 flex justify-center gap-6 text-sm font-medium md:col-span-1 md:col-start-2 md:row-start-1 md:text-base"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded py-1 hover:underline hover:decoration-sky hover:decoration-2 hover:underline-offset-4"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="justify-self-end md:col-start-3 md:row-start-1">
          <LangSwitch lang={lang} dict={dict} bilingualSlugs={bilingualSlugs} />
        </div>
      </div>
    </header>
  );
}
