// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import { remarkReadingTime } from './remark-reading-time.mjs';

// Production defaults for this GitHub Pages project site. Preview workflows can
// override these values to publish a branch under its own subdirectory.
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
