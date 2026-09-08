# Changelog

All notable changes to sandoval-sites. Newest first.

## Unreleased

### Changed — 2026-09-08
- **Client chose the Industrial design.** Promoted `src/pages/industrial/index.astro` to the
  site root (`/`); removed the draft badge and the "Rough-draft mockup prepared for review"
  footer note.

### Removed — 2026-09-08
- Rustic and Modern variant pages, and the landing / compare page they were reached from.
- Now-unused content exports: `brandSuffix`, `testimonial`, `Variant`, `variants`.
- Theme tokens for the dropped palettes (`rus-*`, `mod-*`), the rustic-only `--font-serif`,
  and `--color-ind-panel` (never used by any page).

### Added — 2026-07-24
- Initial Astro 6 + Tailwind v4 scaffold (mirrors the `business-landing` house pattern).
- Single-source content model (`src/data/content.ts`): business facts, services, promises,
  testimonial, and the variant list.
- Three homepage design variants refactored from the original HTML mockups:
  Industrial, Rustic, Modern — each a distinct layout sourcing shared content.
- Landing / compare page (`/`) linking all three variants.
- Base layout, global Tailwind theme (three namespaced palettes), favicon.
- Project onboarding: CLAUDE.md, docs, workflow commands, Obsidian vault scaffold.
