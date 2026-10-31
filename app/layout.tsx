import { Fraunces, Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { DEFAULT_LANG, isLang } from "@/lib/i18n";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // El middleware añade x-lang a partir de la ruta (/en o /es).
  const header = (await headers()).get("x-lang") ?? "";
  const lang = isLang(header) ? header : DEFAULT_LANG;

  return (
    <html lang={lang} className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
