// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import { remarkReadingTime } from './remark-reading-time.mjs';

// These defaults are for the production GitHub Pages site. Preview workflows
// override BASE_PATH so a branch can live under its own subdirectory without
// replacing the production homepage.
const site = process.env.SITE_URL ?? 'https://iphiginea.github.io';
const base = process.env.BASE_PATH ?? '/kiahharpool';

export default defineConfig({
  site,
  base,
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkReadingTime],
    }),
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
