import { describe, it, expect, beforeAll } from "vitest";
import { execSync } from "node:child_process";
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const dist = join(__dirname, "..", "dist");
const read = (p: string) => readFileSync(join(dist, p), "utf8");
const htmlFiles = (d = dist): string[] =>
  readdirSync(d).flatMap((n) => {
    const f = join(d, n);
    return statSync(f).isDirectory() ? htmlFiles(f) : f.endsWith(".html") ? [f] : [];
  });

beforeAll(() => { execSync("npm run build", { cwd: join(__dirname, ".."), stdio: "pipe" }); });

describe("built site", () => {
  it("de and en pages declare their language", () => {
    expect(read("de/index.html")).toMatch(/<html lang="de"/);
    expect(read("en/index.html")).toMatch(/<html lang="en"/);
  });
  it("both pages carry hreflang de, en and x-default", () => {
    for (const p of ["de/index.html", "en/index.html"]) {
      const h = read(p);
      expect(h).toContain('hreflang="de"');
      expect(h).toContain('hreflang="en"');
      expect(h).toContain('hreflang="x-default"');
    }
  });
  it("root works without JS: plain links to /de/ and /en/", () => {
    const h = read("index.html");
    expect(h).toContain('href="/de/"');
    expect(h).toContain('href="/en/"');
  });
  it("no third-party hosts are referenced except allowed outbound links", () => {
    const allowed = /^(www\.finklham\.at|finklham\.at|snaprdp\.finklham\.at|playpages\.finklham\.at|www\.babbo-esport\.at|github\.com|www\.dsb\.gv\.at|dsb\.gv\.at|www\.w3\.org)$/;
    for (const f of htmlFiles()) {
      const h = readFileSync(f, "utf8");
      for (const m of h.matchAll(/https?:\/\/([a-z0-9.-]+)/gi)) expect(m[1], `${f}: ${m[0]}`).toMatch(allowed);
    }
  });
  it("never mentions excluded projects", () => {
    for (const f of htmlFiles()) expect(readFileSync(f, "utf8")).not.toMatch(/BEdit|StatsBar|Passs/);
  });
  it("every img has a non-empty alt", () => {
    for (const f of htmlFiles()) for (const m of readFileSync(f, "utf8").matchAll(/<img\b[^>]*>/g)) expect(m[0], f).toMatch(/alt="[^"]+"/);
  });
  it("sitemap, robots, CNAME, og images exist", () => {
    for (const p of ["sitemap-index.xml", "robots.txt", "CNAME", "og-de.png", "og-en.png", "404.html"]) expect(existsSync(join(dist, p)), p).toBe(true);
    expect(read("CNAME").trim()).toBe("www.finklham.at");
  });
  it("legal pages exist in both languages", () => {
    for (const p of ["de/impressum/index.html", "de/datenschutz/index.html", "en/imprint/index.html", "en/privacy/index.html"]) expect(existsSync(join(dist, p)), p).toBe(true);
  });
  it("TenBook has no link yet, SnapRDP links to its product page", () => {
    const h = read("de/index.html");
    expect(h).toContain("https://snaprdp.finklham.at/");
    expect(h).toContain("Landing Page folgt");
    expect(h).toContain("fertig entwickelt");
  });
});
