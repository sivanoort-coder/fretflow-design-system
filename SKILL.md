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
- `assets/` — logo, logomark, instrument illustration, custom SVG icons
- `ui_kit_app/` — iOS app UI kit with React components: `FretflowPrimitives.jsx`, `Fretboard.jsx`, `Screens.jsx`, `index.html` interactive demo
- `preview/` — small static preview cards rendered into the Design System tab

## Quick reference — v4 "Editorial Warm"

- **Heading font:** Fraunces 500, sentence case, -0.02em tracking — the default editorial voice
- **Editorial font:** EB Garamond italic — captions, asides, "About five minutes."
- **Body font:** Inter Tight — paragraph copy, button labels
- **Mono / labels:** JetBrains Mono — tiny meta, timers
- **Poster (reserved):** Space Grotesk 700 condensed, ALL CAPS — celebration moments only
- **Ink (primary press):** `--ink-700` `#152066` — text, lines, fills
- **Spot (accent press):** `--spot-700` `#FF5A2C` — emphasis, misregistration echo, CTA shadows
- **Paper (page):** `--paper-100` `#F4EEDF` — never pure white
- **Fretboard plate:** `--color-fretboard-plate` `#EFE6CF` — warm parchment behind any instrument
- **Success-only green:** `--green-500` `#1F7A4D` — for "in tune"
- **Radii:** 12–14px iOS-native for cards/CTAs. 0 only for hairlines/tape. 36px phone bezel.
- **Shadow:** hard 4×4px offset block in spot orange. Used sparingly — primary CTA + selected pad.
- **Voice:** patient teacher, second person, sentence case in daily UI. ALL CAPS reserved for celebration. No emoji.
- **The instrument is the hero.** Most product screens render a swappable instrument component (guitar fretboard, piano keyboard, etc) as the structural visual.
