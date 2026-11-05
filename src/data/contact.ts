export interface ContactEntry { id: "mail" | "github" | "linkedin" | "linktree"; href: string; label: string; enabled: boolean }
// LinkedIn und Linktree: Profil anlegen, href eintragen, enabled auf true setzen.
export const contacts: ContactEntry[] = [
  { id: "mail", href: "mailto:sebastian@finklham.at", label: "sebastian@finklham.at", enabled: true },
  { id: "github", href: "https://github.com/Fetzer2010", label: "github.com/Fetzer2010", enabled: true },
  { id: "linkedin", href: "", label: "LinkedIn", enabled: false },
  { id: "linktree", href: "", label: "Linktree", enabled: false },
];
