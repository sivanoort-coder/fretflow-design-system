# Fretflow Design System  ·  v2 "Riso × Score"

> A design system for **Fretflow** — a daily-practice app that helps guitarists actually learn the notes on their fretboard, not just the shapes.

---

## Getting started

```bash
git clone https://github.com/sivanoort-coder/fretflow-design-system.git
cd fretflow-design-system
open system.html        # macOS — see all tokens & components
open directions/hybrid.html   # the chosen Today/Practice/Review direction
```

**Looking for…**

| Need | Open |
| --- | --- |
| Design tokens (colors, type, spacing, shadows) | [`colors_and_type.css`](./colors_and_type.css) |
| Canonical token + component overview | [`system.html`](./system.html) |
| Tone, voice, content rules | [`README.md`](#content-fundamentals--how-fretflow-talks) (below) |
| AI / Claude usage guide | [`SKILL.md`](./SKILL.md) |
| Reference iOS screens (React, will port to SwiftUI) | [`ui_kit_app/`](./ui_kit_app) |
| Brand assets (logo, motif, icons) | [`assets/`](./assets) |

> **Note for engineers:** the React components in `ui_kit_app/` are *visual reference only* — Fretflow ships as a native iOS app, so they exist to lock the look-and-feel and will be re-implemented in SwiftUI. Tokens in `colors_and_type.css` are the source of truth and should be mirrored as Swift constants.

---

## About the product

**Fretflow** turns fretboard memorization into a five-minute daily ritual. Through short, gamified drills — note ID by sight, note ID by ear, interval recognition — players go from rote pattern-recall to **fluent fretboard knowledge**.

**Five minutes a day. Real progress.**

---

## Visual concept (one sentence)

**A two-color riso print of an editorial sheet-music page** — ultramarine ink and spot orange on warm newsprint, where brutalist condensed display type crashes against delicate Garamond italics, and sheet-music grammar (staves, treble clef, measure counts, tempo marks) is kept intact as the system's structural DNA.

### The two presses

Every Fretflow surface is "printed" with exactly two ink plates:

- **Ultramarine ink** (`--ink-700` `#152066`) — text, lines, default fills, the staff. Carries the structure.
- **Spot orange** (`--spot-700` `#FF5A2C`) — accent, misregistration echo, emphasized notes, CTAs' drop block. Carries the joy.

Plus paper (`#F4EEDF`) and a printer's green for "in tune". That's it. **No gradients. No third hue.**

### The misregistration trick

Riso prints almost-but-not-quite line up. We exploit this:
- Every staff line has a 1.4px orange echo offset below it.
- Display type can be set with a 3-4px orange ghost behind ink.
- CTAs and important cards sit on a hard 4×4px orange block shadow.

This is not a defect — it's the system's signature.

### Three-voice typography

| Voice | Family | When |
| --- | --- | --- |
| **Display** | Space Grotesk 700, condensed via -0.05em tracking | Brutalist headlines, big numbers, "NICE." moments, CTA labels |
| **Editorial** | EB Garamond italic | Captions, asides, named features, "with feeling", solfège ledgers |
| **UI / Mono** | Inter Tight (UI body), JetBrains Mono (timers, codes) | Paragraph copy, time displays, mono small-caps labels |

The **contrast** between condensed display and italic Garamond is the entire system. Use both — never just one.

### Sheet-music grammar (kept intact)

These elements are non-decorative; they structure the product:

- **Five-line stave** — wraps any "what you played" content.
- **Treble clef** (𝄞) — anchors a staff. Always Garamond.
- **Roman numerals** — for measure counts and ordinal session numbers (*measure iii of viii*, *Op. xiv*).
- **Tempo marks** — italic Garamond, e.g. *♩ = 60 · andante, calmly.*
- **Solfège names** under answer pads (do, re, mi, fa, sol, la, si).

---

## Sources

This system was created from scratch — no prior brand kit, codebase, or Figma. The visual identity is an original interpretation of the brand brief. v1 of this system was a "wood + ink + brass" instrument-shop direction; v2 (this version) replaces it after exploring eight directions on canvas.

If you have an existing Fretflow brand kit, **please share it** and we'll reconcile.

---

## Index

| Path | What's in it |
| --- | --- |
| `README.md` | This file. Brand context, content rules, visual foundations. |
| `colors_and_type.css` | All design tokens — colors (raw + semantic), type, spacing, radii, shadows. |
| `system.html` | **The canonical overview page.** All tokens demonstrated in one place. |
| `directions/hybrid.html` | The chosen direction's three artboards: Today, Practice, Review. |
| `directions/v2.html`, `directions/index.html` | Direction explorations (kept for reference). |
| `preview/` | Small static cards rendered into the Design System tab. |
| `ui_kits/app/` | iOS mobile-app UI kit (v1 — pending refresh to v2 system). |

---

## CONTENT FUNDAMENTALS — How Fretflow talks

### Tone

**Encouraging coach, not a chirpy mascot.** Fretflow is the experienced guitarist friend who's patient, slightly nerdy about music theory, and never condescending. Warm but precise — uses musical vocabulary correctly without dumbing it down.

### Voice rules

- **Second person ("you")** — direct, conversational.
- **Sentence case everywhere.** No Title Case Headlines. **EXCEPT** in display headlines, where ALL CAPS condensed sets are part of the riso poster aesthetic.
- **Note names: uppercase + bold:** C, F♯, B♭. Always proper sharp ♯ and flat ♭ glyphs.
- **Em dash, not hyphen,** for asides.
- **Numbers under 10 spelled out** in marketing; numerals everywhere in UI.
- **Italics for asides** ("*with feeling*", "*— five minutes, calmly*"). The Garamond italic is doing the editorial work.

### Casing in headlines (NEW)

Display headlines may use ALL CAPS — this is the riso-poster register, not shouting:
- ✅ "STRING FIVE." / "NAME THIS." / "NICE."
- The italic editorial line beneath always returns to sentence case: "Five notes, five minutes — *with feeling.*"

### Emoji

**No emoji in product UI.** Not in buttons, not in copy, not in notifications.

### Microcopy patterns

| Situation | Pattern |
| --- | --- |
| Correct answer | "Nice." / "Yep." / "That's it." |
| Incorrect answer | "Not quite — that was [note]." |
| Streak milestone | "Day 14. Keep going." |
| Tempo mark | "*♩ = 60 · andante, calmly.*" |
| Measure counter | "measure iii of viii" |
| Session header | "Op. xiv · No. 26" |
| Empty state | "No drills yet. Start with the notes on string 6." |

---

## VISUAL FOUNDATIONS

### Imagery

- **No photography of guitars or hands.**
- **Sheet music as primary motif** — staves, clefs, notes-on-a-line. Treated as structural, not decorative.
- **Fretboard as press-printed pictogram** — flat 2-color, chunky, treated like a poster element.
- **Subtle paper grain** allowed everywhere (use the `.fr-paper` utility class).
- **No grain overlays beyond paper noise. No filters. No photography.**

### Backgrounds

- **Default:** flat newsprint paper (`--paper-100`) with grain.
- **No gradients anywhere.**
- **Cards and emphasized blocks** sit on the same paper but get a hard offset orange block-shadow.

### Animation & motion

- **Easing:** `cubic-bezier(0.32, 0.72, 0, 1)` for most UI. Overshoot `cubic-bezier(0.34, 1.56, 0.64, 1)` for celebratory moments only.
- **Durations:** 150ms taps, 240ms transitions, 400ms celebrations.
- **Note ring-out:** soft circular pulse on correct hit — like a struck note ringing.
- **Misregistration shimmer:** on highlight, the orange echo can briefly slide further from the ink and snap back. Used very sparingly.
- **No bouncy childish animations. No confetti.**

### Borders, dividers, rules

- **Default rule color is INK** (`--ink-700`), not gray. Full-strength rules.
- **1px** for hairlines, **1.5–2px** for emphasized blocks, **3px** for poster-button outlines.
- **Five-line staves** are 0.8px ink + 0.7px orange echo offset 1.4px below.

### Shadows & elevation

- **No soft drop shadows. Anywhere.**
- **Hard offset block** in spot orange (`4px 4px 0 var(--spot-700)`) for emphasized cards, primary CTAs, and "press-printed" plates.
- **Pressed state:** the offset closes to `0 0 0 var(--spot-700)` (button "settles" onto the page).

### Corner radii

- **0px** is the default. Buttons, cards, tiles.
- **2px** for tape labels and small chips (the only soft thing).
- **999px (pill)** is reserved for **note bubbles inside sheet-music contexts** — used very sparingly.

### Cards

- Paper-50 fill on paper-100 ground.
- 1.5–2px ink border.
- 0px radius.
- Internal padding: `16px` standard, `22px` for important cards.
- **Press-printed cards** (the emphasized variant) add a 4×4px orange block-shadow.

### Disabled & focus

- **Disabled** drops to 40% opacity.
- **Focus ring:** 3px spot-orange at 45% opacity, no offset.

### Layout rules

- Mobile-first, 22px gutter (matches the Today/Practice screens).
- 4px base grid.
- Generous vertical rhythm. The system breathes.
- Single-column. No fixed sidebars.

---

## ICONOGRAPHY

Fretflow uses **Lucide** for utility icons, **stroke 1.75px** at 24px size, color inheriting `currentColor`. Default `--color-fg-muted`, active `--color-brand`.

**Iconography is secondary** in this system. The sheet-music grammar (staves, clefs, notes) does most of the visual work; icons are reserved for utility nav and editing affordances.

### Unicode glyphs (preferred over icons in copy)

- **♯** (U+266F) — sharp
- **♭** (U+266D) — flat
- **♮** (U+266E) — natural
- **𝄞** (U+1D11E) — treble clef (anchor any staff)
- **♩** (U+2669) — quarter note (tempo marks)
- **—** (U+2014) — em dash

Render musical glyphs in the **editorial** font (EB Garamond), not the body font.

---

## How to use this system

1. **Read this README in full.** Tone is the easiest thing to get wrong.
2. **Pull tokens from `colors_and_type.css`** — never reinvent.
3. **Open `system.html`** to see all tokens and components in context.
4. **Embrace the two-press constraint.** If you need a third color, you're solving the wrong problem.
5. **When in doubt:** the headline goes condensed-display, the line beneath goes Garamond-italic, the metadata goes mono-uppercase. Three voices, every screen.
