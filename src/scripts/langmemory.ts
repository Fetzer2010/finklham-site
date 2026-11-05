import type { Lang } from "../lib/lang";
export function rememberLanguage(lang: Lang): void {
  try { localStorage.setItem("lang", lang); } catch { /* storage blocked: fine */ }
}
export function readStoredLanguage(): string | null {
  try { return localStorage.getItem("lang"); } catch { return null; }
}
