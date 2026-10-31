import "./globals.css";

// 404 global (URLs fuera de /en y /es).
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <section className="px-5 py-24 text-center">
          <h1 className="font-serif text-4xl font-semibold">Page not found</h1>
          <p className="mt-4 text-lg">
            <a className="underline" href="/en">English</a> ·{" "}
            <a className="underline" href="/es">Español</a>
          </p>
        </section>
      </body>
    </html>
  );
}
