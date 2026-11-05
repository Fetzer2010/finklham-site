export type ProjectId = "tenbook" | "snaprdp" | "playpages" | "trabo" | "babbo" | "schoolnotes";
export type Shape = "phone" | "tablet" | "window";
export interface Project {
  id: ProjectId;
  status: "live" | "ready" | "dev" | "paused" | "client";
  stack: string[];
  href?: string;
  shape: Shape;
  images: { de: string; en: string }[]; // keys into src/assets/img (without .webp)
  with?: "tubist" | "riders" | "classmate" | "client";
  year?: never; // keine erfundenen Jahreszahlen
}
const same = (k: string) => ({ de: k, en: k });
export const projects: Project[] = [
  { id: "tenbook", status: "ready", stack: ["SvelteKit", "TypeScript", "Drizzle", "Playwright", "Docker"], href: "https://tenbooklandingpage.finklham.at/", shape: "phone",
    images: ["tenbook-tagesansicht", "tenbook-buchen", "tenbook-woche"].map(same) },
  { id: "snaprdp", status: "live", stack: ["Swift", "FreeRDP", "Stripe", "Node.js", "SQLite", "Docker"], href: "https://snaprdp.finklham.at/", shape: "window",
    images: [{ de: "snaprdp-de", en: "snaprdp-en" }] },
  { id: "playpages", status: "dev", stack: ["Swift", "SwiftUI"], href: "https://playpages.finklham.at", shape: "tablet", with: "tubist",
    images: [same("playpages-notenansicht")] },
  { id: "trabo", status: "dev", stack: ["Flutter", "Riverpod", "Drift", "Supabase"], shape: "phone", with: "riders", images: [] },
  { id: "babbo", status: "client", stack: [], href: "https://www.babbo-esport.at", shape: "window", with: "client", images: [same("babbo")] },
  { id: "schoolnotes", status: "paused", stack: ["React", "Vite", "Node.js", "Prisma", "Docker"], shape: "window", with: "classmate", images: [] },
];
