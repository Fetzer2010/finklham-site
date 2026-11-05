import { de } from "./de";
import { en } from "./en";
import type { Lang } from "../lib/lang";
import type { Dictionary } from "./types";
export type { Dictionary };
export const t = (lang: Lang): Dictionary => (lang === "de" ? de : en);
