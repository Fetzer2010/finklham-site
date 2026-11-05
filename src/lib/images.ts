import type { ImageMetadata } from "astro";
const all = import.meta.glob<{ default: ImageMetadata }>("../assets/img/*.webp", { eager: true });
export function img(name: string): ImageMetadata {
  const hit = all[`../assets/img/${name}.webp`];
  if (!hit) throw new Error(`Image not found: ${name}.webp (run npm run images)`);
  return hit.default;
}
