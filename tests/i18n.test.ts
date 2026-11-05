import { describe, it, expect } from "vitest";
import { de } from "../src/i18n/de";
import { en } from "../src/i18n/en";

const keys = (o: unknown, p = ""): string[] =>
  typeof o === "object" && o !== null
    ? Object.entries(o).flatMap(([k, v]) => keys(v, p ? `${p}.${k}` : k))
    : [p];
const values = (o: unknown): string[] =>
  typeof o === "object" && o !== null ? Object.values(o).flatMap(values) : [String(o)];

const BANNED = [/weit fortgeschritten/i, /it is far along/i, /im Alltag/i, /every day/i, /persönlich/i, /personally/i, /löschen?,? sobald|delete them once/i, /fertig ist|actually finished/i];

describe("dictionaries", () => {
  it("contain no claims the owner never made", () => {
    for (const v of [...values(de), ...values(en)]) for (const re of BANNED) expect(v, String(re)).not.toMatch(re);
  });
  it("de and en have identical keys", () => expect(keys(de).sort()).toEqual(keys(en).sort()));
  it("no empty strings", () => {
    for (const v of [...values(de), ...values(en)]) expect(v.trim().length).toBeGreaterThan(0);
  });
});
