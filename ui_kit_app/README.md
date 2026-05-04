# Fretflow iOS UI kit — v4 (Fretboard-Hero)

High-fidelity React recreation of the Fretflow daily-practice app for iPhone, in the **v4 Fretboard-Hero** direction. The fretboard is the hero of every screen — rendered as a real instrument plate on warm parchment — wrapped in soft daily-app fluency: 12–14px corners, paper-50 cards on a paper-100 ground, Fraunces sentence-case headings, EB Garamond italic asides.

## What's here

- **`index.html`** — interactive demo. One device with a click-through Today → Practice → Complete loop, plus static showcases of Onboarding and Profile.
- **`FretflowPrimitives.jsx`** — `NoteBubble` (now an answer pad), `FFButton`, `FFPill`, `FFCard`, `FFProgress`, `FFStepper`, `FFLabel`, `FFTabBar`, `FFStreak`. Also exposes the `FF` color/type token object on `window`.
- **`Fretboard.jsx`** — the instrument renderer. Sits on the warm parchment plate (`fretboardPlate` token). Highlights take `state: active | ask | correct | wrong | hint`. Standard tuning EADGBE.
- **`Screens.jsx`** — `TodayScreen`, `PracticeScreen`, `CompleteScreen`, `ProfileScreen`, `OnboardingScreen`.
- **`ios-frame.jsx`** — iPhone device frame.

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

## v4 conventions

- **Sentence case everywhere** in app UI. The poster register (Space Grotesk uppercase) is reserved for celebrations and is not used in primitives.
- **Block shadows are reserved.** Only the primary CTA carries one (4×4 spot orange). At most one hero card per screen may also press-print.
- **The fretboard is the hero.** Every practice surface routes through `FFCard elevation="plate"` wrapping a `<Fretboard/>`.
- **Note pads, not bubbles.** `NoteBubble` returns a 12px-radius pad; the same affordance does double-duty as the visible note label and the answer button.

## Component coverage

| Element | Component |
| --- | --- |
| Note pads / answers | `NoteBubble` (states: idle / selected / correct / wrong / hint) |
| Buttons | `FFButton` (primary / ghost / pressed / danger; sm / md / lg) — sentence case |
| Pills, badges | `FFPill` (neutral / streak / spot / green / red) — soft pills |
| Cards | `FFCard` (flat / plate / lifted / hero — hero gets the block shadow) |
| Progress | `FFProgress` (bar) + `FFStepper` (question dots) |
| Tab bar | `FFTabBar` |
| Streak | `FFStreak` (soft chip) |
| Fretboard | `Fretboard` (with `highlights[]`, `onTap`, `showAllNotes`, `showStringLabels`) |
| Screens | Onboarding, Today, Practice, Complete, Profile |

## What's intentionally not here

- Real audio playback for ear training (the brief mentions audio note recognition; UI shows the ear-training entry points but doesn't generate sound).
- Settings detail screens beyond the main list.
- Any backend / auth.
