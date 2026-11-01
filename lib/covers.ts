import fs from "node:fs";
import path from "node:path";

export const PLACEHOLDER_COVER = "/covers/placeholder.svg";

/** Devuelve la portada si existe en /public; si no, el placeholder. */
export function resolveCover(cover: string): string {
  const file = path.join(process.cwd(), "public", cover);
  return fs.existsSync(file) ? encodeURI(cover) : PLACEHOLDER_COVER;
}
