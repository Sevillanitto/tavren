import fs from "node:fs";
import path from "node:path";

export const GALLERY_PLACEHOLDER = "/books/placeholder.svg";

/** Sustituye por un placeholder las imágenes que no existan en /public. */
export function resolveGallery(images: string[]): { src: string; missing: boolean }[] {
  return images.map((src) => {
    const exists = fs.existsSync(path.join(process.cwd(), "public", src));
    return exists
      ? { src: encodeURI(src), missing: false }
      : { src: GALLERY_PLACEHOLDER, missing: true };
  });
}
