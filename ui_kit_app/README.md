# Fretflow iOS UI Kit · v2 Riso × Score

High-fidelity React recreation of the Fretflow daily-practice app for iPhone, restyled to the **Riso × Score** design system: ultramarine ink + spot orange on warm newsprint, square corners, hard offset shadows, condensed display crashing against Garamond italics.

Components are simple and mainly cosmetic — meant to be lifted into mockups, decks, and prototypes.

## What's here

- **`index.html`** — interactive demo. One device with a click-through Today → Practice → Complete loop, plus static showcases of Onboarding and Profile.
- **`FretflowPrimitives.jsx`** — `NoteBubble`, `FFButton`, `FFPill`, `FFCard`, `FFProgress`, `FFLabel`, `FFTabBar`, `FFStreak`. Also exposes the `FF` color/type token object on `window`.
- **`Fretboard.jsx`** — interactive 6-string fretboard renderer. Highlights notes by `{string, fret, state}`. States: `active | correct | wrong | hint`. Optional `showAllNotes` for study mode. Standard tuning EADGBE.
- **`Screens.jsx`** — `TodayScreen`, `PracticeScreen`, `CompleteScreen`, `ProfileScreen`, `OnboardingScreen`.
- **`ios-frame.jsx`** — iPhone device frame from the starter kit.

## How to use

```html
<script type="text/babel" src="ui_kits/app/ios-frame.jsx"></script>
<script type="text/babel" src="ui_kits/app/FretflowPrimitives.jsx"></script>
<script type="text/babel" src="ui_kits/app/Fretboard.jsx"></script>
<script type="text/babel" src="ui_kits/app/Screens.jsx"></script>
```

Then drop screens inside an `IOSDevice`:

```jsx
<IOSDevice width={390} height={780}>
  <TodayScreen onStart={() => {}}/>
  <FFTabBar active="today" onChange={setTab}/>
</IOSDevice>
```

## Component coverage

| Element | Component |
| --- | --- |
| Note labels | `NoteBubble` |
| Buttons | `FFButton` (primary / secondary / ghost / danger; sm / md / lg) |
| Pills, badges | `FFPill` (neutral / brass / solid / green / red) — square tape labels |
| Cards | `FFCard` (flat / lifted / hero with spot misregistration shadow) |
| Progress | `FFProgress` |
| Tab bar | `FFTabBar` |
| Streak | `FFStreak` |
| Fretboard | `Fretboard` (with `highlights[]`, `onTap`, `showAllNotes`) |
| Screens | Onboarding, Today, Practice, Complete, Profile |

## What's intentionally not here

- Real audio playback for ear training (the brief mentions audio note recognition; UI shows the ear-training entry points but doesn't generate sound).
- Settings detail screens beyond the main list.
- Any backend / auth.
