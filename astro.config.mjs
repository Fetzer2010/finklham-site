import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.finklham.at",
  output: "static",
  trailingSlash: "always",
  integrations: [sitemap({ i18n: { defaultLocale: "de", locales: { de: "de-AT", en: "en" } } })],
});
