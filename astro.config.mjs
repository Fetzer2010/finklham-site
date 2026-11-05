import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const site = "https://www.finklham.at";

export default defineConfig({
  site,
  output: "static",
  trailingSlash: "always",
  integrations: [
    sitemap({
      // "/" is only a noindex language picker, so it stays out of the sitemap.
      filter: (page) => page !== `${site}/`,
      i18n: { defaultLocale: "de", locales: { de: "de", en: "en" } },
    }),
  ],
});
