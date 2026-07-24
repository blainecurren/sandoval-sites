# sandoval-sites

Marketing site for **Sandoval Fencing & Welding** (North Texas) — three homepage design
directions (**Industrial · Rustic · Modern**) built from one Astro + Tailwind codebase so the
client can compare and choose. Deploys to GitHub Pages.

## Quick start
```bash
npm install
npm run dev      # http://localhost:4321/sandoval-sites/
```
- `/` — landing / compare page linking all three designs
- `/industrial`, `/rustic`, `/modern` — the three variants

## Editing content
All business facts, services, and contact details live in **`src/data/content.ts`**. Edit them
once there and every variant updates — no need to touch three files.

## Build & deploy
```bash
npm run build    # → dist/  (static, hostable on any static host)
```
Hosted on **GitHub Pages** at `https://blainecurren.github.io/sandoval-sites/`.
Once the client picks a design, promote that variant's page to the site root and drop the others.

## Before launch
- Replace the diagonal-hatch photo placeholders with Adam's real job-site photos.
- Wire the estimate CTA to a real form handler (currently `tel:`/`mailto:` only).
- Confirm contact details: **940-632-9186**, **Adam.Sandy@icloud.com**.

## Notes
- `_mockups/` holds the original hand-written HTML mockups (reference only).
- `open-source/` holds vendored dependency source for local reference — gitignored, not pushed.
