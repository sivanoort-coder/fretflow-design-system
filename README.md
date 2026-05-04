# Fretflow Design System  ·  v4 "Editorial Warm"

> A design system for **Fretflow** — a daily-practice app that helps musicians actually learn the notes on their instrument, not just the shapes.

## About the product

**Fretflow** turns instrument-fluency into a five-minute daily ritual. Through short, gamified drills — note ID by sight, note ID by ear, interval recognition — players go from rote pattern-recall to **fluent fretboard knowledge**.

**Five minutes a day. Real progress.**

The system is designed instrument-agnostic. Today the hero is a guitar fretboard; the same chrome accommodates piano, bass, ukulele, mandolin — any instrument expressible as a fingerboard or keyboard.

---

## Visual concept (one sentence)

**A warm editorial page where the instrument is the hero** — Fraunces sentence-case headings and EB Garamond italic captions sit on warm newsprint, ultramarine ink and spot orange carry the structure and the joy, and a swappable Instrument component (guitar fretboard / piano keyboard) does the actual product work.

### What changed from v2

v2 was a brutalist riso poster — Space Grotesk all-caps headlines, sheet-music staves, 0px corners. v4 is its warmer, more confident sibling. Same paper, same inks, but:

- **Fraunces 500 sentence-case** replaces Space Grotesk all-caps for daily UI.
- **The instrument replaces the stave** as the visual hero — a real fretboard or keyboard component does the structural work the five-line stave used to do.
- **Geometry softens** from 0px brutalist rectangles to 12–14px iOS-native radii. Calmer, more inviting.
- **The all-caps poster register survives** — but only on celebration moments (streak milestones, completion screens). Daily use is calm; the noise is reserved for moments that earned it.

The brand DNA is the same. The voice has matured.

### The two presses

Every Fretflow surface is "printed" with exactly two ink plates:

- **Ultramarine ink** (`--ink-700` `#152066`) — text, lines, default fills, the fretboard. Carries the structure.
- **Spot orange** (`--spot-700` `#FF5A2C`) — accent, misregistration echo, highlighted notes, primary CTA shadow. Carries the joy.

Plus paper (`#F4EEDF`) and a printer's green for "in tune". That's it. **No gradients. No third hue.**

### The misregistration trick

Riso prints almost-but-not-quite line up. We exploit this on:
- Highlighted notes on the instrument (1.5px orange echo behind the ink dot).
- Primary CTAs (4×4px hard offset orange block shadow).
- Selected answer pads (3×3px ink shadow on orange fill — the inverse).

This is not a defect — it's the system's signature. Used sparingly: never more than two block-shadowed elements visible on one screen.

### Three-voice typography

| Voice | Family | When |
| --- | --- | --- |
| **Heading** | Fraunces 500, sentence case, -0.02em tracking | Screen titles, prompts, big numbers |
| **Editorial** | EB Garamond italic | Captions, asides, "About five minutes.", warm second voice |
| **UI / Mono** | Inter Tight (UI body), JetBrains Mono (timers, tiny labels) | Paragraph copy, button text, time displays |
| **Poster** _(reserved)_ | Space Grotesk 700 condensed, ALL CAPS | Streak milestones, "DAY 14." moments — celebration only |

The **contrast** between Fraunces' bookish serif and EB Garamond's italic is the system's editorial voice. Use both — never just one. Fraunces' optical-size axis carries the warmth; don't substitute.

---

## The Instrument component

The single biggest architectural commitment in v4: **the instrument is the screen**.

Where v2 used a five-line stave with note bubbles as the hero, v4 renders a real instrument — a guitar fretboard with strings, frets, inlays, and a highlighted ink dot for the question note. Same paper-and-ink riso treatment, but the visual vocabulary is the instrument, not classical-music notation.

This makes the system **instrument-agnostic by construction**:

```
Fretflow (guitar)  ─┬─→ <GuitarFretboard highlight={{string:5, fret:3}} />
                    ├─→ <PianoKeyboard   highlight={{note:'C', octave:4}} />
Pianoflow           ├─→ <BassFretboard   highlight={...} />
Bassflow            └─→ <Ukulele... />   etc.
```

Adding a new instrument = building one new component that knows how to render itself and where the highlighted note(s) go. The rest of the app — Today, Practice, Review, Onboarding — is unchanged.

See `ui_kits/app/` for the canonical implementations.

---

## Sources

This system was created from scratch — no prior brand kit. The v4 visual identity emerged from eight directions explored on canvas; the chosen direction (warm editorial × instrument-as-hero) was promoted to the system after validating across full screen flows.

If you have an existing Fretflow brand kit, **please share it** and we'll reconcile.

---

## Index

| Path | What's in it |
| --- | --- |
| `README.md` | This file. Brand context, content rules, visual foundations. |
| `colors_and_type.css` | All design tokens — colors (raw + semantic), type, spacing, radii, shadows, motion. |
| `system.html` | **The canonical overview page.** All tokens demonstrated in context. |
| `v4/index.html` | The v4 reference canvas — Today, Practice, Review, Onboarding, around-the-app, celebration, Pianoflow proof. |
| `preview/` | Small static cards rendered into the Design System tab. |
| `ui_kits/app/` | iOS mobile-app UI kit (React reference). |
| `directions/hybrid.html` | The v2 reference, kept for historical comparison. |

---

## CONTENT FUNDAMENTALS — How Fretflow talks

### Tone

**Patient teacher, not a chirpy mascot.** Fretflow is the experienced musician friend who's calm, slightly nerdy about theory, and never condescending. Warm but precise — uses musical vocabulary correctly without dumbing it down. The Garamond italic does the editorial softening; the copy itself stays direct.

### Voice rules

- **Second person ("you")** — direct, conversational.
- **Sentence case everywhere in daily UI.** Headings ("Today, the A string."), buttons ("Begin practice"), captions — all sentence case.
- **ALL CAPS is reserved for celebration moments.** "DAY 14." on a streak milestone is allowed. "TODAY'S RANGE" as a section header is not — that goes mono small-caps instead (`fr-mono-label`).
- **Note names: uppercase + bold:** C, F♯, B♭. Always proper sharp ♯ and flat ♭ glyphs.
- **Em dash, not hyphen,** for asides.
- **Numbers under 10 spelled out** in marketing; numerals everywhere in UI.
- **Italics for asides** ("*About five minutes.*", "*Five notes between the nut and seventh fret.*"). The Garamond italic is doing the editorial work — lean on it.

### Casing examples

| ✅ Daily UI (sentence case) | ❌ Don't (over-poster) |
| --- | --- |
| Today, the A string. | TODAY · A STRING |
| What note is this? | NAME THIS |
| Begin practice | BEGIN PRACTICE |
| Nice. | NICE. _(except on the celebration screen)_ |

| ✅ Tiny meta (mono small-caps) | ✅ Celebration (poster) |
| --- | --- |
| TODAY'S RANGE | DAY 14. |
| HIT · MISS | NICE. _(on streak completion)_ |
| QUESTION 3 OF 8 | OP. XIV — _named-session header_ |

### Emoji

**No emoji in product UI.** Not in buttons, not in copy, not in notifications.

### Microcopy patterns

| Situation | Pattern |
| --- | --- |
| Greeting | "Hi, [name]." _(Garamond italic)_ |
| Today's prompt | "Today, the A string." / "Today, the second-position chords." |
| Subtitle | "Five notes between the nut and seventh fret." |
| Question prompt | "What note is this?" |
| Correct answer | "Nice." / "Yep." / "That's it." |
| Incorrect answer | "Not quite — that was [note]." |
| Streak milestone | "Day 14. Keep going." |
| Empty state | "No drills yet. Start with the notes on string 6." |
| Time estimate | "*About five minutes.*" _(always italic, always reassuring)_ |

---

## VISUAL FOUNDATIONS

### Imagery

- **No photography of guitars or hands.**
- **The instrument component is primary** — guitar fretboard, piano keyboard, etc. Treated as paper-and-ink press print, not skeuomorphic wood/lacquer.
- **Subtle paper grain** allowed everywhere (use the `.fr-paper` utility).
- **No gradients. No filters. No photography.**
- **Sheet music** survives only as a printed-marketing motif — not in product UI. v4 retired the five-line stave from screens in favor of the actual instrument.

### Backgrounds

- **Default page:** flat newsprint paper (`--paper-100` `#F4EEDF`) with grain.
- **Cards:** `--paper-50` `#FBF7EA` with 1px ink-300 border.
- **Instrument plate:** `--color-fretboard-plate` `#EFE6CF` — the warm parchment behind any rendered instrument.
- **No gradients anywhere.**

### Animation & motion

- **Easing:** `cubic-bezier(0.32, 0.72, 0, 1)` for most UI. Overshoot `cubic-bezier(0.34, 1.56, 0.64, 1)` for celebratory moments only.
- **Durations:** 150ms taps, 240ms transitions, 400ms celebrations.
- **Note ring-out:** soft circular pulse on correct hit — like a struck note ringing.
- **Misregistration shimmer:** on highlight, the orange echo can briefly slide further from the ink and snap back. Used very sparingly.
- **No bouncy animations. No confetti. No parallax.**

### Borders, dividers, rules

- **Default rule color is INK** (`--ink-700`). Hairlines on paper use `--paper-300`.
- **1px** for hairlines, **1.5–2px** for emphasized blocks, **3px** for poster outlines.
- **The instrument** is drawn at 0.6–1.0px stroke ink with subtle inlays. See `ui_kits/app/Fretboard.jsx`.

### Shadows & elevation

- **No soft drop shadows. Anywhere.** (Exception: phone bezels in design-canvas previews use a soft shadow to read as a phone — never use this in product UI.)
- **Hard offset block** in spot orange (`4px 4px 0 var(--spot-700)`) for primary CTAs and instrument plates.
- **Selected answer pads** flip the relationship: orange fill, ink block shadow (`3px 3px 0 var(--ink-700)`).
- **Pressed state:** the offset closes to `0 0 0 var(--spot-700)` (button "settles" onto the page).
- **Use sparingly.** Never more than two block-shadowed elements visible on one screen.

### Corner radii

| Token | Value | Used for |
| --- | --- | --- |
| `--radius-none` | 0 | Hairlines, full-bleed plates |
| `--radius-sm` | 2px | Tape labels, micro chips |
| `--radius-md` | 12px | Answer pads, secondary cards |
| `--radius-lg` | 14px | Primary cards, instrument plate, CTAs |
| `--radius-xl` | 36px | Phone bezel (iOS-native) |
| `--radius-pill` | 999px | Day-streak chip, progress bars, dots |

v4 deliberately walks back from v2's 0px-everywhere brutalism. The instrument is the structural element; cards frame it with iOS-native warmth.

### Disabled & focus

- **Disabled** drops to 40% opacity.
- **Focus ring:** 3px spot-orange at 45% opacity, no offset.

### Layout rules

- Mobile-first, 24px gutter.
- 4px base grid.
- Generous vertical rhythm. The system breathes.
- Single-column. No fixed sidebars.

---

## ICONOGRAPHY

Fretflow uses **Lucide** for utility icons, **stroke 1.75px** at 24px size, color inheriting `currentColor`. Default `--color-fg-muted`, active `--color-brand`.

**Iconography is secondary.** The instrument component does the visual work; icons are reserved for utility nav (back, settings, share) and editing affordances.

### Unicode glyphs (preferred over icons in copy)

- **♯** (U+266F) — sharp
- **♭** (U+266D) — flat
- **♮** (U+266E) — natural
- **♩** (U+2669) — quarter note
- **—** (U+2014) — em dash

Render musical glyphs in the **editorial** font (EB Garamond), not the body font.

---

## How to use this system

1. **Read this README in full.** Tone is the easiest thing to get wrong.
2. **Pull tokens from `colors_and_type.css`** — never reinvent.
3. **Open `system.html`** to see all tokens demonstrated.
4. **Open `v4/index.html`** to see the full screen flows on canvas.
5. **Embrace the two-press constraint.** If you need a third color, you're solving the wrong problem.
6. **The instrument carries the design.** Most screens have an instrument as the hero — give it space. Don't crowd it.
7. **Sentence case in daily UI; ALL CAPS only on celebration moments.** When in doubt, lowercase wins.
8. **When in doubt:** Fraunces sentence-case heading + Garamond-italic line beneath + mono-uppercase metadata. Three voices, every screen.
