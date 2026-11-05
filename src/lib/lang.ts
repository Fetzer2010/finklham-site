export type Lang = "de" | "en";
export type PageKey = "home" | "legal" | "privacy";

const isLang = (v: unknown): v is Lang => v === "de" || v === "en";

/** Stored choice wins; otherwise the first browser language decides (de* → de, else en). */
export function pickLanguage(navLangs: readonly string[] | undefined, stored: string | null): Lang {
  if (isLang(stored)) return stored;
  const first = navLangs?.[0]?.toLowerCase() ?? "";
  return first === "de" || first.startsWith("de-") ? "de" : "en";
}

export const altLang = (l: Lang): Lang => (l === "de" ? "en" : "de");

const PATHS: Record<Lang, Record<PageKey, string>> = {
  de: { home: "/de/", legal: "/de/impressum/", privacy: "/de/datenschutz/" },
  en: { home: "/en/", legal: "/en/imprint/", privacy: "/en/privacy/" },
};
export const localePath = (l: Lang, p: PageKey): string => PATHS[l][p];
