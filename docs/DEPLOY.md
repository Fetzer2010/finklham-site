# Deployment: finklham.at auf GitHub Pages

Die Seite wird bei jedem Push auf `main` per GitHub Actions gebaut und veröffentlicht.

## 1. Einmalig bei GitHub (macht Claude per `gh`, nach deiner Freigabe)

- Öffentliches Repo `Fetzer2010/portfolio` anlegen und `main` pushen.
- Pages-Quelle auf „GitHub Actions“ stellen.
- Eigene Domain im Repo eintragen: Einstellungen → Pages → Custom domain → `www.finklham.at`
  (bei Deployment per Workflow wird die `CNAME`-Datei ignoriert, die Domain muss in den Einstellungen stehen).
- „Enforce HTTPS“ aktivieren, sobald GitHub das Zertifikat ausgestellt hat (kann bis zu einer Stunde dauern).

## 2. DNS beim Domain-Anbieter (machst du)

Beim Domain-Anbieter von `finklham.at` legst du diese Einträge an:

| Name | Typ | Wert |
|---|---|---|
| `www` | CNAME | `fetzer2010.github.io` |
| `@` (leer / finklham.at) | A | `185.199.108.153` |
| `@` | A | `185.199.109.153` |
| `@` | A | `185.199.110.153` |
| `@` | A | `185.199.111.153` |
| `@` | AAAA | `2606:50c0:8000::153` |
| `@` | AAAA | `2606:50c0:8001::153` |
| `@` | AAAA | `2606:50c0:8002::153` |
| `@` | AAAA | `2606:50c0:8003::153` |

Die A/AAAA-Einträge sind für die Weiterleitung von `finklham.at` auf `www.finklham.at`. GitHub leitet automatisch um, sobald beide Domains eingerichtet sind.

**Achtung:** Der bestehende Eintrag `playpages` (CNAME auf GitHub Pages der PlayPages-Seite) und alle anderen Subdomains (z. B. `snaprdp`) bleiben unverändert. Lösche nichts, was du nicht kennst. Wenn auf `finklham.at` bzw. `www` schon andere Einträge liegen (A, CNAME, Weiterleitung), müssen diese vorher weg.

## 3. Prüfen

```bash
dig www.finklham.at +short        # → fetzer2010.github.io. und GitHub-IPs
curl -I https://www.finklham.at/  # → 200
curl -I https://finklham.at/      # → 301 auf https://www.finklham.at/
```

## 4. Später ergänzen

- LinkedIn/Linktree: in `src/data/contact.ts` `href` eintragen und `enabled: true` setzen.
- TenBook-Link: in `src/data/projects.ts` bei `tenbook` `href` ergänzen.
- Impressum: `street` (Hausnummer) in `src/data/legal.ts` setzen; solange sie leer ist, warnt der Build. Eine UID brauchst du nur, wenn du eine hast (`uid`).
- Neue Screenshots: Quellpfade in `scripts/prepare-images.mjs` anpassen und `npm run images` ausführen.
