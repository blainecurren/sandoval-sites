# sandoval-sites

Marketing site for **Sandoval Fencing & Welding** (North Texas) — Astro + Tailwind, static,
deployed to GitHub Pages. Three design directions were built for the client to compare;
**Industrial** was chosen on 2026-09-08 and promoted to the site root.

## Quick start
```bash
npm install
npm run dev      # http://localhost:4321/sandoval-sites/
```
- `/` — the site (Industrial design)

## Editing content
All business facts, services, and contact details live in **`src/data/content.ts`**. Edit them
there, never inline in the page.

## Build & deploy
```bash
npm run build    # → dist/  (static, hostable on any static host)
```
Hosted on **GitHub Pages** at `https://blainecurren.github.io/sandoval-sites/`.
A custom domain has not been set up — `astro.config.mjs` still carries `base: '/sandoval-sites'`.

## Before launch
- Replace the diagonal-hatch photo placeholders with Adam's real job-site photos.
- Wire the estimate CTA to a real form handler (currently `tel:`/`mailto:` only).
- Confirm contact details: **940-632-9186**, **Adam.Sandy@icloud.com**.

## Notes
- `_mockups/` holds the original hand-written HTML mockups (reference only), including
  `rustic.html` and `modern.html` for the two designs that were not chosen.
- `open-source/` holds vendored dependency source for local reference — gitignored, not pushed.
