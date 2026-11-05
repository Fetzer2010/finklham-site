// Copies + optimises source screenshots/avatar into src/assets/img. Fails loudly on a missing source.
import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "src/assets/img");
const CODE = "/Users/sebastian/Documents/Code";
const TB = `${CODE}/tenbook_landing_page/static/screenshots`;
const PP = `${CODE}/PlayPages_LandingPage/assets/screenshots`;

export const SOURCES = {
  "avatar": ["/Users/sebastian/Pictures/tech_avatar.png", 1200],
  "tenbook-tagesansicht": [`${TB}/tagesansicht.webp`, 1100],
  "tenbook-woche": [`${TB}/woche.webp`, 1100],
  "tenbook-buchen": [`${TB}/buchen.webp`, 1100],
  "tenbook-platzliste": [`${TB}/platzliste.webp`, 1100],
  "tenbook-rollen": [`${TB}/rollen.webp`, 1100],
  "tenbook-admin-menue": [`${TB}/admin-menue.webp`, 1100],
  "playpages-notenansicht": [`${PP}/notenansicht.png`, 1400],
  "playpages-player-tempo": [`${PP}/player-tempo.png`, 1400],
  "playpages-metronom": [`${PP}/metronom.png`, 1400],
  "playpages-stimmgeraet": [`${PP}/stimmgeraet.png`, 1400],
  "playpages-bibliothek": [`${PP}/bibliothek.png`, 1400],
  "snaprdp-de": [`${CODE}/MacRDP/website/img/screenshot-de.png`, 1600],
  "snaprdp-en": [`${CODE}/MacRDP/website/img/screenshot-en.png`, 1600],
  "babbo": [join(root, "scripts/sources/babbo.png"), 1600],
};

const missing = Object.entries(SOURCES).filter(([, [p]]) => !existsSync(p));
if (missing.length) {
  for (const [k, [p]] of missing) console.error(`MISSING source for ${k}: ${p}`);
  process.exit(1);
}
mkdirSync(out, { recursive: true });
for (const [name, [src, width]] of Object.entries(SOURCES)) {
  const info = await sharp(src).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(join(out, `${name}.webp`));
  console.log(`${name}.webp ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)}kB`);
}
