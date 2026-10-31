"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary } from "@/dictionaries";
import { isLang } from "@/lib/i18n";

export default function NotFound() {
  const seg = (usePathname() ?? "").split("/")[1] ?? "";
  const lang = isLang(seg) ? seg : "en";
  const dict = getDictionary(lang);
  return (
    <section className="px-5 py-24 text-center">
      <h1 className="font-serif text-4xl font-semibold">{dict.notFound.title}</h1>
      <p className="mt-4 text-lg">{dict.notFound.body}</p>
      <Link
        href={`/${lang}`}
        className="mt-8 inline-block rounded-sm bg-ink px-8 py-3 font-semibold text-white"
      >
        {dict.notFound.home}
      </Link>
    </section>
  );
}
