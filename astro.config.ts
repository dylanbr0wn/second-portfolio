// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import svelte from "@astrojs/svelte";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://dylanbrown.space",
  integrations: [svelte(), sitemap()],
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Inter Tight",
      cssVariable: "--font-inter-tight",
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
