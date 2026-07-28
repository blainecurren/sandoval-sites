# CLAUDE.md — sandoval-sites

> AI session context. Read at the start of every Claude Code session.
> Kept current by /ship. Last updated: 2026-07-28

## What This Project Does
Marketing site for **Sandoval Fencing & Welding** (North Texas). Ships **three homepage
design directions** — Industrial, Rustic, Modern — from a single Astro codebase so the
client can compare and pick one. After the client decides, the winning variant is promoted
to the site root and the others are dropped.

## Tech Stack
- **Astro 7** (static output) + **Tailwind CSS v4** (via `@tailwindcss/vite`, CSS-first `@theme`)
- Node ≥ 22.12 · no JavaScript shipped to the browser · no external font/asset requests
- Deploys to **GitHub Pages** at `https://blainecurren.github.io/sandoval-sites/`

## Project Structure
```
src/
  data/content.ts        # SINGLE SOURCE OF TRUTH — business facts, services, promises, testimonial, variants
  layouts/Base.astro     # shared <html> shell, meta, favicon, global.css import
  styles/global.css      # Tailwind import + all 3 palettes as @theme tokens (ind-*, rus-*, mod-*)
  pages/
    index.astro          # landing / compare page (links the 3 variants)
    industrial/index.astro
    rustic/index.astro
    modern/index.astro
public/favicon.svg
_mockups/                # original hand-written HTML mockups (reference only)
open-source/             # vendored dependency source (gitignored — see Vendored Source)
```

## Key Files
| File | Purpose |
|---|---|
| `src/data/content.ts` | Edit business facts / services / contact ONCE here — all variants read it |
| `src/styles/global.css` | Tailwind v4 theme tokens for the 3 palettes |
| `astro.config.mjs` | `site` + `base: '/sandoval-sites'` for GitHub Pages subpath |
| `docs/PROJECT_OVERVIEW.md` | Human-readable current state |

## Dev Commands
```bash
npm install
npm run dev        # local dev at http://localhost:4321/sandoval-sites/
npm run build      # static output to dist/
npm run preview    # preview the production build
```

## Architecture Notes
- The three variants are **not** recolors — each has a distinct layout (industrial: trust bar +
  gallery; rustic: editorial service rows + testimonial; modern: stat strip + 3-step process).
  What they share is **content** (from `content.ts`) and the **Base shell**. Each page composes
  its own sections.
- Internal links must respect the Pages subpath: use `import.meta.env.BASE_URL` (trim the
  trailing slash when concatenating, e.g. `` `${base}/industrial` ``).
- Palette tokens are namespaced by variant (`ind-`, `rus-`, `mod-`) so one page can't bleed
  into another. Rustic headings use `font-serif`.
- Photo tiles are diagonal-hatch **placeholders** — real job-site photos from Adam replace them
  before launch. The estimate CTA is currently a `tel:`/`mailto:` link (no form handler yet).

## Vendored Source (source-code-context pattern)
`open-source/repos/withastro/astro/` and `.../tailwindlabs/tailwindcss/` hold the pinned
dependency source for local reference — grep the real implementation instead of guessing APIs.
**Gitignored**: lives beside the code, never pushed, never seen by CI. Refresh with `/vendor-deps`.

## Deploy
GitHub Pages (public repo `blainecurren/sandoval-sites`). Static build via GitHub Actions on
`push: main`. Not a PHI or Azure project — no compliance gate, no Azure deploy doctrine.

## Gotchas
- **CSS minifier is pinned to esbuild** via `vite.build.cssMinify: 'esbuild'` in
  `astro.config.mjs`. Vite 8 changed the default to Lightning CSS, which *rewrites* CSS against
  `baseline-widely-available` (chrome111/edge111/firefox114/safari16.4/ios16.4): it strips
  `-webkit-background-clip` and `-webkit-backdrop-filter` (breaking gradient text and the Modern
  variant's blurred sticky header on older Safari) and emits `@media (width>=40rem)` range
  syntax that browsers below that floor ignore outright — silently dropping *all* responsive
  styling. esbuild only minifies, so the CSS stays byte-identical to the Astro 6 output. Remove
  the setting only if a raised browser floor is an accepted trade.
- **The old `overrides.vite: 7.3.5` pin is gone** (was ADR-001). It existed because Vite 8's oxc
  resolver broke `@tailwindcss/vite` with `Missing field tsconfigPaths`; that is fixed upstream —
  Tailwind 4.3.1 builds clean on Vite 8.1.5. Still commit `package-lock.json` (CI runs `npm ci`).
- **Tailwind is held at 4.3.1 deliberately.** 4.3.3 changes the default `--font-sans` stack from
  `ui-sans-serif, system-ui` to `-apple-system, BlinkMacSystemFont, …` — a site-wide typography
  shift. Bump it only alongside a visual review.

## Coding Conventions
- Content lives in `content.ts`, never hardcoded in pages.
- Tailwind utilities in markup; arbitrary values (`clamp()`, gradients) where a token doesn't fit.
- Conventional commits, no AI attribution.

## Workflow Commands
- /standup      — morning brief: sprint health, what shipped, where to pick up
- /ship         — commit + update docs + sync to Obsidian
- /sprint-start — kick off a new sprint
- /sprint-close — close sprint, build changelog from journal
- /breakdown    — deep-map this project into Obsidian
- /changelog    — view or update CHANGELOG.md
- /vault-audit  — clean up stale/orphaned Obsidian files
