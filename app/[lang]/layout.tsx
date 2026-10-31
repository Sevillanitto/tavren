import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { LANGS, SITE_URL, isLang } from "@/lib/i18n";
import { notFound } from "next/navigation";
import LangSync from "@/components/LangSync";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const dict = getDictionary(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: dict.meta.title, template: "%s | Tavren" },
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", es: "/es", "x-default": "/en" },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      siteName: "Tavren",
      locale: lang === "es" ? "es_ES" : "en_US",
      type: "website",
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <LangSync lang={lang} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        {dict.skipToContent}
      </a>
      <Header lang={lang} dict={dict} />
      <main id="main">{children}</main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
