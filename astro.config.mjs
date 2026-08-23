// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Production defaults for this GitHub Pages project site. Environment overrides
// remain available for local or alternate builds when needed.
const site = process.env.SITE_URL ?? 'https://iphiginea.github.io';
const base = process.env.BASE_PATH ?? '/kiahharpool';

export default defineConfig({
  site,
  base,
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: false,
      wrap: true,
    },
  },
});
