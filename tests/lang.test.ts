import { describe, it, expect } from "vitest";
import { pickLanguage, altLang, localePath } from "../src/lib/lang";

describe("pickLanguage", () => {
  it("chooses de for German variants first in list", () => expect(pickLanguage(["de-AT", "en"], null)).toBe("de"));
  it("chooses en for English", () => expect(pickLanguage(["en-US"], null)).toBe("en"));
  it("falls back to en for other languages", () => expect(pickLanguage(["fr"], null)).toBe("en"));
  it("falls back to en for empty list", () => expect(pickLanguage([], null)).toBe("en"));
  it("falls back to en for undefined", () => expect(pickLanguage(undefined, null)).toBe("en"));
  it("stored de beats browser en", () => expect(pickLanguage(["en-US"], "de")).toBe("de"));
  it("stored en beats browser de", () => expect(pickLanguage(["de-AT"], "en")).toBe("en"));
  it("ignores garbage stored value", () => expect(pickLanguage(["de-AT"], "xx")).toBe("de"));
});

describe("paths", () => {
  it("altLang flips", () => { expect(altLang("de")).toBe("en"); expect(altLang("en")).toBe("de"); });
  it("localePath", () => {
    expect(localePath("de", "home")).toBe("/de/");
    expect(localePath("de", "legal")).toBe("/de/impressum/");
    expect(localePath("de", "privacy")).toBe("/de/datenschutz/");
    expect(localePath("en", "home")).toBe("/en/");
    expect(localePath("en", "legal")).toBe("/en/imprint/");
    expect(localePath("en", "privacy")).toBe("/en/privacy/");
  });
});
