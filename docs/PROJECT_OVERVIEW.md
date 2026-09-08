# Project Overview — sandoval-sites

> Human-readable current state. Updated by /ship. Last updated: 2026-09-08

## Summary
A marketing website for **Sandoval Fencing & Welding**, a family-run custom fencing, gates,
shop-building, and pickleball-court business in North Texas (est. 2020). Three competing
homepage designs were built from a single Astro codebase for the client to review; he selected
**Industrial** on 2026-09-08, and it is now the production site.

## Status
- **Phase:** design selected — pre-launch content work
- **Stack:** Astro 6 + Tailwind v4, static, GitHub Pages
- **Classification:** personal (public marketing site — no PHI, no sensitive data)

### Done
- Astro + Tailwind scaffold mirroring the `business-landing` house pattern
- Shared content model (`src/data/content.ts`) as single source of truth
- Three variant pages (Industrial, Rustic, Modern) refactored from the original HTML mockups,
  presented behind a landing / compare page for the client to choose from
- Dependency source vendored for local reference (gitignored)
- Published to public repo `blainecurren/sandoval-sites`; GitHub Pages live at
  <https://blainecurren.github.io/sandoval-sites/>, deploying on `push: main`
- Architecture mapped into Obsidian (`Breakdown/`, 14 notes covering all 10 source files)
- **All six defects found by that mapping cleared** (Sprint 1 Area A, PR #1) — favicon
  double-slash, three inconsistent copyright-year implementations, a hardcoded service count,
  dead CSS classes, and a `Promise` type shadowing the built-in
- **Client chose Industrial (2026-09-08)** — promoted to `/`; Rustic, Modern and the compare
  page removed, along with the exports and palette tokens only they used

### Next
- Real job-site photos replace the 18 placeholder tiles
- Estimate form wired to a handler — GitHub Pages has no server side, so this needs an
  external service or a worker, and it is the first runtime dependency the site would take on
- A testimonial section with real Google reviews — the sample `testimonial` export was removed
  with Rustic (its only consumer), so this now needs markup as well as content
- Custom domain: the site still sits on the `/sandoval-sites` Pages subpath, not a business
  address of its own

Tracked as Sprint 1 "Punch List" — see `Projects/sandoval-sites/Sprints/` in the vault.

## Key Decisions

Recorded as ADRs in the vault (`Projects/sandoval-sites/ADR/`):

| ADR | Decision |
|---|---|
| ADR-001 | Pin Vite to 7.3.5 via npm `overrides` — Astro 6.4.7 floats Vite to 8.x (rolldown), whose oxc resolver breaks `@tailwindcss/vite`. Requires `package-lock.json` stay committed. Binds `business-landing` identically. |
| ADR-002 | Initial stack — Astro over plain HTML (three variants share one content source), Tailwind v4 CSS-first `@theme` (namespaced palettes are the isolation mechanism), GitHub Pages (static, OIDC deploy, no stored secrets). **Note 2026-09-08:** the multi-variant rationale is now spent — only one design remains. The stack choice still holds on its own merits (static, zero-JS, no secrets), but if ADR-002 is ever revisited, that premise no longer applies. |

Still to decide: the estimate-form provider (see ADR-002 → Alternatives, which flags the host
choice as the thing to revisit if that proves painful).

## Contact / Business Facts
- Owner: Adam · Phone: 940-632-9186 · Email: Adam.Sandy@icloud.com · Area: North Texas
