export interface Legal {
  name: string; locality: string; street: string | null; zip: string; city: string; country: string;
  email: string; phone: string; uid: string | null;
}
export const legal: Legal = {
  name: "Sebastian Stadlbauer",
  locality: "Finklham",
  street: null, // Hausnummer bewusst nicht angegeben (Entscheidung von Sebastian, offen rechtlich zu prüfen)
  zip: "4612", city: "Scharten", country: "Österreich",
  email: "sebastian@finklham.at", phone: "+43 681 10741023",
  uid: null, // keine UID vorhanden
};
export function missingLegalFields(l: Legal = legal): string[] {
  const out: string[] = [];
  if (!l.street) out.push("street (Hausnummer)");
  for (const k of ["name", "zip", "city", "email", "phone"] as const) if (!l[k].trim()) out.push(k);
  return out;
}
