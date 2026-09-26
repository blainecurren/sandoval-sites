# CLAUDE.md — sandoval-sites

> AI session context. Read at the start of every Claude Code session.
> Kept current by /ship. Last updated: 2026-09-08

## What This Project Does
Marketing site for **Sandoval Fencing & Welding** (North Texas), built in Astro and deployed
static to GitHub Pages. Three design directions (Industrial, Rustic, Modern) were built for
the client to compare; **he chose Industrial on 2026-09-08**, and it was promoted to the site
root. Rustic, Modern, and the compare page are gone — recoverable from git history if needed.

## Tech Stack
- **Astro 6** (static output) + **Tailwind CSS v4** (via `@tailwindcss/vite`, CSS-first `@theme`)
- Node ≥ 22.12 · no JavaScript bundles or `<script>` tags — the only JS is a one-line inline
  `onclick` on each mobile menu link that closes the menu on tap · no external font/asset requests
- Deploys to **GitHub Pages** at `https://blainecurren.github.io/sandoval-sites/`

## Project Structure
```
src/
  data/content.ts        # SINGLE SOURCE OF TRUTH — business facts, services, promises
  layouts/Base.astro     # shared <html> shell, meta, favicon, global.css import
  styles/global.css      # Tailwind import + the industrial palette as @theme tokens (ind-*)
  pages/
    index.astro          # the site — Industrial design
public/favicon.svg
_mockups/                # original hand-written HTML mockups (reference only)
open-source/             # vendored dependency source (gitignored — see Vendored Source)
```

## Key Files
| File | Purpose |
|---|---|
| `src/data/content.ts` | Edit business facts / services / contact here, never inline in the page |
| `src/styles/global.css` | Tailwind v4 theme tokens for the industrial palette (`ind-*`) |
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
- The site is a single page (industrial layout: trust bar + gallery) composing its own
  sections over the **Base shell**, with all copy coming from `content.ts`.
- Internal links and asset URLs must respect the Pages subpath: use `import.meta.env.BASE_URL`
  and trim the trailing slash when concatenating (`Base.astro` does this for the favicon).
- Palette tokens stay namespaced `ind-*` — the `rus-*` / `mod-*` sets were dropped with their
  variants. Any *new* token should follow the same prefix convention.
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
- **Vite is pinned to `7.3.5` via `overrides`.** Astro 6.4.7's range floats Vite to 8.x
  (rolldown), whose oxc resolver breaks `@tailwindcss/vite` with
  `Missing field tsconfigPaths`. The `overrides.vite` pin keeps the build working. Commit
  `package-lock.json` — the pin only reproduces with the lockfile committed. (Same constraint
  applies to `business-landing`.)

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
