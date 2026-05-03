---
name: fretflow-design
description: Use this skill to generate well-branded interfaces and assets for Fretflow, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Files in this skill

- `README.md` — full brand context, content rules, visual foundations, iconography
- `colors_and_type.css` — design tokens (colors, type, spacing, radii, shadows, motion)
- `system.html` — canonical overview page; all tokens demonstrated in one place
- `fonts/README.md` — font substitution notes
- `assets/` — logo, logomark, fretboard motif, custom SVG icons
- `directions/hybrid.html` — the chosen direction (Today, Practice, Review artboards)
- `ui_kits/app/` — iOS app UI kit with React components: `FretflowPrimitives.jsx`, `Fretboard.jsx`, `Screens.jsx`, plus `index.html` interactive demo
- `preview/` — small static preview cards rendered into the Design System tab

## Quick reference — v2 "Riso × Score"

- **Display font:** Space Grotesk 700 (Google Fonts), tracked tight at -0.05em
- **Editorial font:** EB Garamond italic (Google Fonts) — captions, asides, "with feeling"
- **Body font:** Inter Tight (Google Fonts)
- **Mono / labels:** JetBrains Mono (Google Fonts)
- **Ink (primary press):** `--ink-700` `#152066` — text, lines, fills
- **Spot (accent press):** `--spot-700` `#FF5A2C` — emphasis, misregistration echo, CTA shadows
- **Paper (page):** `--paper-100` `#F4EEDF` — never pure white
- **Success-only green:** `--green-500` `#1F7A4D` — for "in tune"
- **Radii:** 0 by default. Pills only on note bubbles.
- **Shadow:** hard 4×4px offset block in spot orange. Never a soft drop.
- **Voice:** editorial coach, second person, sentence case (display headlines may go ALL CAPS), no emoji.
