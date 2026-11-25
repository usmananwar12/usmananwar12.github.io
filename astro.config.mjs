// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://usmananwar.me',
  integrations: [sitemap()],
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'auto' },
  markdown: {
    shikiConfig: { theme: 'github-dark-dimmed' },
  },
});
