# Changelog

All notable changes to sandoval-sites. Newest first.

## Unreleased — 2026-07-28

### Changed
- Upgraded Astro 6.4.7 → 7.1.4, clearing all four `astro` security advisories plus the
  transitive `sharp` and `esbuild` ones (`npm audit`: 3 vulnerabilities → 0).
- Removed the `overrides.vite: 7.3.5` pin (ADR-001) — the oxc resolver bug it worked around
  is fixed upstream, and Tailwind 4.3.1 builds clean on Vite 8.1.5. Dependencies: 221 → 157.
- Pinned `vite.build.cssMinify: 'esbuild'` (ADR-003) to hold Vite 7's minifier behaviour;
  Vite 8's new Lightning CSS default would raise the browser floor to safari16.4/ios16.4.
  Build output is byte-identical to the Astro 6 build — same CSS content hash, same markup.

### Added
- Initial Astro 6 + Tailwind v4 scaffold (mirrors the `business-landing` house pattern).
- Single-source content model (`src/data/content.ts`): business facts, services, promises,
  testimonial, and the variant list.
- Three homepage design variants refactored from the original HTML mockups:
  Industrial, Rustic, Modern — each a distinct layout sourcing shared content.
- Landing / compare page (`/`) linking all three variants.
- Base layout, global Tailwind theme (three namespaced palettes), favicon.
- Project onboarding: CLAUDE.md, docs, workflow commands, Obsidian vault scaffold.
