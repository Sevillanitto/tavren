import { otherLang, type Lang } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries";
import LangLink from "./LangLink";

export default function Footer({
  lang,
  dict,
}: {
  lang: Lang;
  dict: Dictionary;
}) {
  const other = otherLang(lang);
  return (
    <footer className="border-t border-sky/60 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm sm:flex-row md:px-8">
        <p>
          © {new Date().getFullYear()} Tavren. {dict.footer.rights}
        </p>
        <LangLink
          lang={other}
          className="font-medium underline decoration-sky decoration-2 underline-offset-4 hover:decoration-sky-strong"
        >
          {dict.footer.otherLang}
        </LangLink>
      </div>
    </footer>
  );
}
