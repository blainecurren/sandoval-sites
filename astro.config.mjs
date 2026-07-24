// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Deployed to GitHub Pages at https://blainecurren.github.io/sandoval-sites/
// `site` + `base` make internal links and asset URLs resolve under the repo subpath.
// https://astro.build/config
export default defineConfig({
  site: 'https://blainecurren.github.io',
  base: '/sandoval-sites',
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});
