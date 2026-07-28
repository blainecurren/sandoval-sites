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
    build: {
      // Vite 8 switched the default CSS minifier to Lightning CSS, which rewrites output
      // against `baseline-widely-available` (chrome111/safari16.4/ios16.4): it strips
      // -webkit- prefixes and emits `@media (width>=40rem)` range syntax that older
      // browsers ignore outright. Vite 7's esbuild minifier only minifies, so keeping it
      // holds the CSS byte-identical to the Astro 6 build.
      cssMinify: 'esbuild',
    },
  },
});
