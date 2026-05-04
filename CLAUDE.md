# Claude Code instructions — Fretflow design system

You're looking at the Fretflow design system. **Always use this system** when building or editing Fretflow product code, mocks, or marketing surfaces.

## Read these first

1. **`README.md`** — full brand context, voice, content rules, visual foundations. Read all of it.
2. **`SKILL.md`** — quick reference card for tokens and conventions.
3. **`colors_and_type.css`** — every design token as a CSS custom property. Pull values from here; never reinvent.

## Then look at

- **`system.html`** — canonical overview page. Every token demonstrated in context.
- **`ui_kit_app/`** — React reference implementations of the iOS app screens. Lift these patterns into production.
- **`preview/`** — small cards illustrating each component family in isolation.
- **`assets/`** — logo, logomark, fretboard illustration, custom SVG icons.

## Hard rules

- **Sentence case in daily UI.** "Begin practice" not "BEGIN PRACTICE". The poster register (Space Grotesk all-caps) is reserved for celebration moments only.
- **Three-voice typography on every screen.** Fraunces 500 sentence-case heading + EB Garamond italic line beneath + JetBrains Mono uppercase metadata.
- **Two presses only.** Ultramarine ink (`--ink-700` `#152066`) and spot orange (`--spot-700` `#FF5A2C`) on warm paper (`--paper-100` `#F4EEDF`). Plus a printer's green for "in tune". No gradients. No third hue.
- **The instrument is the hero.** Practice surfaces render a real fretboard or keyboard component on the warm parchment plate (`--color-fretboard-plate` `#EFE6CF`). Don't reach for sheet-music staves — v4 retired them.
- **Block shadows are reserved.** 4×4px hard offset in spot orange, used only on primary CTAs and at most one hero card per screen.
- **Corners are 12–14px iOS-native** for cards and CTAs. 0 only for hairlines and tape labels. 36px for phone bezels.
- **No emoji in product UI.** Anywhere.
- **No photography.** No gradients. No drop shadows. No skeuomorphic textures.

## When you build

- **Pull from `colors_and_type.css`** via the CSS custom properties (`var(--ink-700)` etc). The semantic aliases (`--color-fg`, `--color-brand`) exist for theming.
- **Match copy patterns** from the "Microcopy patterns" table in README.md. Tone is patient teacher, not chirpy mascot.
- **Test against `system.html` and `ui_kit_app/`** — if your output doesn't visually feel of-a-piece with those, something's drifted.
- **Keep variations close to the canon.** This system isn't a starting point for divergence; it's the destination. Honor the constraints — they're the brand.

## If you're unsure

- Ask the user. Don't invent a token, a font, a corner radius, or a color hex.
- Default to the simpler, calmer choice. Fretflow's voice is restrained.
- When in doubt about casing: lowercase wins.
