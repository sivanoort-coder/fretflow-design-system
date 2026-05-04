# Fretflow Onboarding — Flow C (Ambitious) · Production Handoff

This folder is the design spec for the **Fretflow onboarding flow** to be built into the iOS app.

## Open this first

**`preview.html`** — the interactive prototype. Tap through every screen to feel the intended interaction, animation, and copy.

## What's in here

- `preview.html` — Interactive prototype (open in browser)
- `FlowC.jsx` — All 7 screens as React components (the source of truth for layout, copy, behaviour)
- `OnboardingHelpers.jsx` — Shared helpers (PhonePage, PhoneHeader, PhoneFooter, instrument glyphs)
- `FretflowPrimitives.jsx` — The Fretflow design system primitives (FFButton, FFCard, FFPill, etc) and the `FF` token object
- `Fretboard.jsx` — The reusable fretboard SVG component
- `ios-frame.jsx` — iOS device frame used for preview only — production should use real iOS / SwiftUI / Expo
- `colors_and_type.css` — Design tokens

## The flow — 7 screens

| # | Screen | Purpose | Key gesture |
| --- | --- | --- | --- |
| 1 | **Animated intro** | First impression. Fretboard draws itself, then a note pulses on string 5 fret 3. "The neck. Properly known." | Tap "Begin" |
| 2 | **Calibrate · tap what you know** | The novel hook. User taps frets they can already name. Sets initial difficulty. | Multi-tap on a real fretboard |
| 3 | **Instrument** | Guitar / piano / bass / ukulele. | Single select |
| 4 | **Goal dial** | Minutes per day. Big number on a paper plate, segmented control below. | Single select (3 / 5 / 10 / 15 / 20) |
| 5 | **Reminder** | One slot per quarter of the day. | Single select + "Allow notifications" |
| 6 | **Practice taste** | Real practice question. Misregistration shimmer on the highlighted note. | Tap correct note from 4 choices |
| 7 | **Day-one triumph** | "You're already practising." Save progress (Apple/Google/email) or continue without saving. | Auth or skip |

## What the screens depend on

- The Fretflow design system (the same files in this folder match the canonical `sivanoort-coder/fretflow-design-system` repo)
- React 18 (the prototype uses CDN; production should use whatever you'd use anyway)

## The build prompt for Claude Code

Copy this prompt to Claude Code (or whichever AI dev assistant you use). Paste the whole thing — including the bullet rules — verbatim:

---

> I'm building an iOS app called **Fretflow** — a daily-practice app that helps musicians learn the notes on their instrument. I have a complete design spec for the onboarding flow that I need you to implement.
>
> **Two reference packages are available:**
>
> 1. **Design system** — clone `git@github.com:sivanoort-coder/fretflow-design-system.git` (or the HTTPS URL). Read its `CLAUDE.md` first — it has the hard rules for tone, type, color, and spacing. Pull tokens from `colors_and_type.css`.
>
> 2. **The onboarding flow itself** — in this folder. The source of truth is `FlowC.jsx` (all 7 screens, behaviour, copy) plus `OnboardingHelpers.jsx`, `FretflowPrimitives.jsx`, and `Fretboard.jsx`. Open `preview.html` in a browser to feel the intended interaction.
>
> **Your job:** port these 7 screens into the production iOS app, in the project's existing tech stack (assume SwiftUI unless I tell you otherwise — confirm with me before starting if unsure).
>
> **Hard requirements:**
>
> - Match the visual spec **pixel-for-pixel** — fonts, colors, spacing, corner radii, the spot-orange block shadow on primary CTAs, the warm-parchment instrument plates. Use `colors_and_type.css` as the canonical token list.
> - Keep the copy **exactly** as written. Sentence case throughout. Italic asides in EB Garamond. No emoji.
> - Replicate the **animated fretboard intro** on screen 1 — strings draw left-to-right, frets fade in, a note pulses on string 5 fret 3 at the end. The total animation runs ~1.8 seconds.
> - Replicate the **"tap what you know" calibration** on screen 2 — the user taps individual fret positions on a real fretboard SVG. Tapped positions show as ink dots with spot-orange offset echo. State persists between screens.
> - Replicate the **misregistration shimmer** on screen 6 (the practice taste) — a subtle drift-and-snap on the highlighted note dot.
> - Persist user choices (instrument, calibration tapped frets, daily minutes, reminder time) so they're available to the rest of the app after onboarding.
>
> **Process:**
>
> 1. Read the design system's `CLAUDE.md` and `README.md` end-to-end before writing anything.
> 2. Open `preview.html` and tap through all 7 screens.
> 3. Read `FlowC.jsx` carefully — it's the spec.
> 4. Confirm the tech stack and target SDK with me before scaffolding.
> 5. Implement screens in order. Show me each one before moving on.
> 6. Don't invent new colors, fonts, corner radii, or copy. If the spec doesn't have something you need, ask me.

---

## Notes for the engineer

- **The fretboard is reusable** across the whole app — Fretboard.jsx already supports highlight states (`active`, `ask`, `correct`, `wrong`, `hint`). Build it as a shared component, not a one-off for onboarding.
- **The "tap what you know" gesture** is novel and load-bearing. If users skip it (no taps), default to "Beginner". If they tap >15 positions, default to "Intermediate". >30 → "Advanced".
- **Block shadows** (`4×4 spot orange`) are reserved. Only the primary CTA carries one. Do not stack them — never more than two block-shadowed elements visible on one screen.
- **The poster register** (Space Grotesk all-caps) is reserved for the day-one triumph screen and future celebration moments. Do not use it elsewhere in onboarding.
