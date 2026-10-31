import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "../globals.css";
import { getDictionary } from "@/dictionaries";
import { books } from "@/data/books";
import { LANGS, SITE_URL, isLang } from "@/lib/i18n";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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

  // Slugs disponibles en ambos idiomas (para que el selector de idioma
  // en una ficha no lleve a un 404).
  const bilingualSlugs = books
    .filter((b) => b.translations.en && b.translations.es)
    .map((b) => b.slug);

  return (
    <html lang={lang} className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          {dict.skipToContent}
        </a>
        <Header lang={lang} dict={dict} bilingualSlugs={bilingualSlugs} />
        <main id="main">{children}</main>
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}
