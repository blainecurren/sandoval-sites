# Project Overview — sandoval-sites

> Human-readable current state. Updated by /ship. Last updated: 2026-07-27

## Summary
A marketing website for **Sandoval Fencing & Welding**, a family-run custom fencing, gates,
shop-building, and pickleball-court business in North Texas (est. 2020). The site presents
**three competing homepage designs** from a single Astro codebase; the client reviews all three
and selects one, which then becomes the production site.

## Status
- **Phase:** initial build / client design review
- **Stack:** Astro 6 + Tailwind v4, static, GitHub Pages
- **Classification:** personal (public marketing site — no PHI, no sensitive data)

### Done
- Astro + Tailwind scaffold mirroring the `business-landing` house pattern
- Shared content model (`src/data/content.ts`) as single source of truth
- Three variant pages (Industrial, Rustic, Modern) refactored from the original HTML mockups
- Landing / compare page linking all three
- Dependency source vendored for local reference (gitignored)
- Published to public repo `blainecurren/sandoval-sites`; GitHub Pages live at
  <https://blainecurren.github.io/sandoval-sites/>, deploying on `push: main`
- Architecture mapped into Obsidian (`Breakdown/`, 14 notes covering all 10 source files)
- **All six defects found by that mapping cleared** (Sprint 1 Area A, PR #1) — favicon
  double-slash, three inconsistent copyright-year implementations, a hardcoded service count,
  dead CSS classes, and a `Promise` type shadowing the built-in

### Next
- **Client picks a design** → promote winner to root, drop the other two + compare page
- Real job-site photos replace the 18 placeholder tiles
- Estimate form wired to a handler — GitHub Pages has no server side, so this needs an
  external service or a worker, and it is the first runtime dependency the site would take on
- Real Google reviews replace the sample testimonial (`content.ts` → `testimonial.sample`)

Tracked as Sprint 1 "Punch List" — see `Projects/sandoval-sites/Sprints/` in the vault.

## Key Decisions

Recorded as ADRs in the vault (`Projects/sandoval-sites/ADR/`):

| ADR | Decision |
|---|---|
| ADR-001 | Pin Vite to 7.3.5 via npm `overrides` — Astro 6.4.7 floats Vite to 8.x (rolldown), whose oxc resolver breaks `@tailwindcss/vite`. Requires `package-lock.json` stay committed. Binds `business-landing` identically. |
| ADR-002 | Initial stack — Astro over plain HTML (three variants share one content source), Tailwind v4 CSS-first `@theme` (namespaced palettes are the isolation mechanism), GitHub Pages (static, OIDC deploy, no stored secrets). |

Still to decide: the estimate-form provider (see ADR-002 → Alternatives, which flags the host
choice as the thing to revisit if that proves painful).

## Contact / Business Facts
- Owner: Adam · Phone: 940-632-9186 · Email: Adam.Sandy@icloud.com · Area: North Texas
