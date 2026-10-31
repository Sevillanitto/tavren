import { NextRequest, NextResponse } from "next/server";
import { isLang, type Lang } from "@/lib/i18n";

function fromAcceptLanguage(header: string | null): Lang {
  if (!header) return "en";
  const first = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .filter((p) => p.tag && !Number.isNaN(p.q))
    .sort((a, b) => b.q - a.q)[0];
  return first?.tag.startsWith("es") ? "es" : "en";
}

export function middleware(request: NextRequest) {
  // /en y /es: pasa el idioma de la ruta al layout raíz en la cabecera x-lang.
  const pathLang = request.nextUrl.pathname.split("/")[1];
  if (isLang(pathLang)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-lang", pathLang);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // "/": la cookie "lang" manda sobre el idioma del navegador.
  const cookie = request.cookies.get("lang")?.value;
  const lang: Lang =
    cookie && isLang(cookie)
      ? cookie
      : fromAcceptLanguage(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = `/${lang}`;
  const response = NextResponse.redirect(url, 307);
  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

export const config = { matcher: ["/", "/(en|es)", "/(en|es)/:path*"] };
