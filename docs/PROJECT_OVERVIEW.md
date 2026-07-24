# Project Overview — sandoval-sites

> Human-readable current state. Updated by /ship. Last updated: 2026-07-24

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

### Next
- `git init`, publish public repo `blainecurren/sandoval-sites`, enable GitHub Pages
- Client picks a design → promote winner to root, drop the others
- Real job-site photos replace placeholders
- Estimate form wired to a static-host form handler

## Key Decisions
- **Astro over plain HTML** — the three variants share content; a single source of truth avoids
  editing copy three times.
- **Tailwind v4** — matches the existing `business-landing` repo for tooling consistency.
- **GitHub Pages** — simplest static host for a public marketing site.

## Contact / Business Facts
- Owner: Adam · Phone: 940-632-9186 · Email: Adam.Sandy@icloud.com · Area: North Texas
