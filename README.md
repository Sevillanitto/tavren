# Tavren

Web de la editorial independiente Tavren (Next.js App Router + TypeScript + Tailwind CSS). Bilingüe: `/en` y `/es`.

## Ejecutar en local

```bash
npm install
cp .env.example .env.local   # opcional; NEXT_PUBLIC_SITE_URL por defecto es http://localhost:3000
npm run dev                  # http://localhost:3000
```

Comprobar el build de producción: `npm run build && npm start`.

## Añadir un libro

1. Copia la portada plana a `public/covers/` (por ejemplo `public/covers/mi-libro.jpg`, proporción 2:3). Si el archivo no existe se muestra un placeholder.
2. Copia las 4 imágenes de la galería de la ficha a `public/books/<slug>/1.jpg` … `4.jpg`. Las que falten se sustituyen por un placeholder.
3. Si el autor es nuevo, añádelo en `data/authors.ts` (`id`, `name` y `bio` en `es` y `en`).
4. Edita `data/books.ts` y añade un objeto al array `books`:
   - `slug`, `authorId` (id del autor), `author` (nombre para las tarjetas), `formats`, `gallery` (las 4 rutas de `/books/<slug>/…`), `amazonUrls` (opcional: un enlace por formato; si falta se usa el `amazonUrl` del idioma), `coverStyle` (opcional: `"mockup"` por defecto para imágenes 3D con fondo blanco, o `"flat"`), `category` (`noir` | `cooking` | `kids` | `notebooks`; `kids` incluye libros infantiles y cuadernos de actividades infantiles, `notebooks` es para notebooks y sketchbooks), `collection`, `cover` (`/covers/mi-libro.jpg`) e `isNew`.
   - `translations`: una entrada por idioma (`en` y/o `es`) con `title`, `subtitle`, `description` (párrafos separados por salto de línea), `shortDescription` (opcional) y `amazonUrl`. El libro solo aparece en los idiomas donde tenga entrada.
   - `details`: `publicationDate`, `format`, `pages`, `isbn` (y `publisher`, que por defecto es "Tavren").
5. Borra los libros de EJEMPLO cuando tengas los reales.

Los libros que solo existen en un idioma aparecen en la otra versión bajo la pastilla "En inglés" / "Books in Spanish" y enlazan a su ficha en el idioma original.

Los textos de interfaz y las citas están en `dictionaries/en.ts` y `dictionaries/es.ts`. Los colores de marca, en `tailwind.config.ts`.

## Logo

El logo está en `public/logo-tavren.png`; para cambiarlo basta con sustituir ese archivo (`public/logo-tavren-original.png` es el original sin recortar).

## Desplegar en Vercel

1. Sube el repositorio a GitHub.
2. En [vercel.com](https://vercel.com) → **Add New Project** → importa el repositorio (Vercel detecta Next.js, no hay que cambiar nada).
3. En *Environment Variables* añade `NEXT_PUBLIC_SITE_URL` con la URL final, por ejemplo `https://tavren.vercel.app`.
4. **Deploy**. Cada `git push` a `main` vuelve a desplegar.
