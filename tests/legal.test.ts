import { describe, it, expect } from "vitest";
import { legal, missingLegalFields, type Legal } from "../src/data/legal";

const complete: Legal = { ...legal, street: "Finklham 1" };

describe("missingLegalFields", () => {
  it("returns [] for complete data", () => expect(missingLegalFields(complete)).toEqual([]));
  it("reports a missing street", () => expect(missingLegalFields({ ...complete, street: null })).toEqual(["street (Hausnummer)"]));
  it("does not require a UID", () => expect(missingLegalFields({ ...complete, uid: null })).toEqual([]));
  it("reports every other empty mandatory field", () => {
    expect(missingLegalFields({ ...complete, name: "", email: " ", zip: "", city: "", phone: "" }).sort())
      .toEqual(["city", "email", "name", "phone", "zip"]);
  });
});
