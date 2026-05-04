# Fretflow Design System → React Native translation guide

> Companion file for porting the Fretflow Design System (web/CSS) into the existing React Native (Expo) app.

The design system in [`fretflow-design-system`](https://github.com/sivanoort-coder/fretflow-design-system) is authored in HTML/CSS for documentation clarity. This guide tells you how to translate each piece into RN faithfully — without losing the riso aesthetic.

---

## 1. The five things RN gets wrong by default

Before writing any code, internalize these — they are the most common ways the riso aesthetic collapses in React Native:

| Web pattern | RN trap | The right RN approach |
| --- | --- | --- |
| `box-shadow: 4px 4px 0 var(--spot-700)` (hard offset block) | Reaching for `shadowOffset` / `elevation` — produces a SOFT blurred shadow | Render a sibling `<View>` of the same shape, absolutely positioned 4px right + 4px down, behind the element. See §4. |
| `border-radius: 0` (default) | RN devs habitually round everything to look "polished" | Default radius is **0**. Only note bubbles inside staves get `borderRadius: 999`. Tape labels get `2`. Nothing else. |
| Sentence-case + ALL CAPS display headlines | RN devs auto-Title-Case everything | Sentence case in body, ALL CAPS in display (Space Grotesk, tight tracking). See README tone rules. |
| CSS gradients | RN devs reach for `expo-linear-gradient` to "make it pop" | **No gradients anywhere.** Two flat ink colors only. |
| Stroke-style icons (Lucide on web) | Inconsistent icon weight | Use `lucide-react-native`, stroke 1.75, size 24, `color={tokens.color.fgMuted}`. |

If any of these slip, the design dies.

---

## 2. Tokens — port `colors_and_type.css` to JS

Create `src/design-system/tokens.ts` (or `.js`). Mirror every CSS variable as a JS constant. Group them so consuming components are readable.

```ts
// src/design-system/tokens.ts

export const color = {
  // Paper (background)
  paper50:  '#FBF7EA',
  paper100: '#F4EEDF',
  paper200: '#E8DEC2',

  // Ink (primary)
  ink700:   '#152066',
  ink500:   '#3A4B9E',

  // Spot (accent)
  spot700:  '#FF5A2C',
  spot500:  '#FF8056',

  // Status
  green:    '#3B7A4F',  // "in tune"
  // No third hue. Don't add one.

  // Semantic aliases
  bg:       '#F4EEDF',
  fg:       '#152066',
  fgMuted:  '#3A4B9E',
  border:   '#152066',
  brand:    '#FF5A2C',
} as const;

export const font = {
  display:   'SpaceGrotesk_700Bold',
  editorial: 'EBGaramond_400Regular_Italic',
  ui:        'InterTight_400Regular',
  uiMedium:  'InterTight_500Medium',
  mono:      'JetBrainsMono_400Regular',
} as const;

export const space = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 22,   // gutter
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  none: 0,    // default for everything
  chip: 2,    // tape labels only
  pill: 999,  // note bubbles inside staves only
} as const;

// Hard offset block — used everywhere as the only elevation cue
export const blockShadow = {
  offset: { x: 4, y: 4 },
  color: color.spot700,
} as const;

// Easing — reproduce CSS cubic-bezier in Reanimated/Animated
export const easing = {
  // cubic-bezier(0.32, 0.72, 0, 1) — most UI
  standard: [0.32, 0.72, 0, 1] as const,
  // cubic-bezier(0.34, 1.56, 0.64, 1) — celebratory only
  overshoot: [0.34, 1.56, 0.64, 1] as const,
} as const;

export const duration = {
  tap: 150,
  transition: 240,
  celebration: 400,
} as const;

export const tokens = { color, font, space, radius, blockShadow, easing, duration };
export default tokens;
```

> **Sync rule:** if you change a value in `colors_and_type.css` upstream, change it here too. There is no automated bridge — the design-system repo is documentation; this file is the runtime source of truth in the app. Treat them like a contract.

---

## 3. Fonts — load with `expo-font`

In `App.tsx` (or your root):

```tsx
import { useFonts } from 'expo-font';
import {
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';
import {
  EBGaramond_400Regular_Italic,
} from '@expo-google-fonts/eb-garamond';
import {
  InterTight_400Regular,
  InterTight_500Medium,
} from '@expo-google-fonts/inter-tight';
import {
  JetBrainsMono_400Regular,
} from '@expo-google-fonts/jetbrains-mono';

export default function App() {
  const [loaded] = useFonts({
    SpaceGrotesk_700Bold,
    EBGaramond_400Regular_Italic,
    InterTight_400Regular,
    InterTight_500Medium,
    JetBrainsMono_400Regular,
  });
  if (!loaded) return null;
  return <Root />;
}
```

Install:
```
npx expo install expo-font @expo-google-fonts/space-grotesk @expo-google-fonts/eb-garamond @expo-google-fonts/inter-tight @expo-google-fonts/jetbrains-mono
```

> **letterSpacing for display:** CSS uses `letter-spacing: -0.05em`. RN's `letterSpacing` is in **points**, not em. For a 32pt display headline, that's `letterSpacing: -1.6`. Compute as `fontSize * -0.05`.

---

## 4. The block-shadow component — the most important primitive

This is the single component that makes-or-breaks the aesthetic. Every primary CTA, every emphasized card, every "press-printed" plate uses it.

`src/design-system/BlockShadow.tsx`:

```tsx
import { View, ViewStyle, StyleSheet } from 'react-native';
import { ReactNode } from 'react';
import { color as ffColor, blockShadow } from './tokens';

type Props = {
  children: ReactNode;
  /** Set to true while the button is pressed — the shadow collapses. */
  pressed?: boolean;
  /** Override the offset (default 4×4) or color (default spot700). */
  offset?: { x: number; y: number };
  shadowColor?: string;
  /** Border radius of BOTH the content AND the shadow plate. Default 0. */
  borderRadius?: number;
  style?: ViewStyle;
};

export function BlockShadow({
  children,
  pressed = false,
  offset = blockShadow.offset,
  shadowColor = blockShadow.color,
  borderRadius = 0,
  style,
}: Props) {
  const dx = pressed ? 0 : offset.x;
  const dy = pressed ? 0 : offset.y;

  return (
    <View style={[styles.wrap, style]}>
      {/* Shadow plate — sits behind, offset down-right */}
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor: shadowColor,
            transform: [{ translateX: dx }, { translateY: dy }],
            borderRadius,
          },
        ]}
      />
      {/* Content — sits on top, no offset */}
      <View style={{ borderRadius, overflow: 'hidden' }}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'relative' },
});
```

**Animate the press:**

```tsx
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from 'react-native-reanimated';
import { duration, easing } from './tokens';

// Inside FFButton:
const pressed = useSharedValue(0);
const shadowStyle = useAnimatedStyle(() => ({
  transform: [
    { translateX: 4 * (1 - pressed.value) },
    { translateY: 4 * (1 - pressed.value) },
  ],
}));

// onPressIn:  pressed.value = withTiming(1, { duration: duration.tap, easing: Easing.bezier(...easing.standard) });
// onPressOut: pressed.value = withTiming(0, { duration: duration.tap, easing: Easing.bezier(...easing.standard) });
```

> **Why not `shadowOffset`?** Because iOS native shadow is Gaussian-blurred. Even at `shadowRadius: 0` it has anti-aliased edges — they're soft if you look closely. The riso aesthetic demands a hard rectangle of solid color. Two-`<View>` rendering is the only way.
>
> **Why not Skia?** Overkill for a rectangle. Save Skia for the fretboard pictogram if perf demands it.

---

## 5. FFButton — primary CTA

```tsx
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { BlockShadow } from './BlockShadow';
import { color, font, space } from './tokens';
import { useState } from 'react';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost';
};

export function FFButton({ label, onPress, variant = 'primary' }: Props) {
  const [pressed, setPressed] = useState(false);
  const isPrimary = variant === 'primary';

  return (
    <BlockShadow pressed={pressed}>
      <Pressable
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={[
          styles.btn,
          { backgroundColor: isPrimary ? color.ink700 : color.paper50 },
        ]}
      >
        <Text
          style={[
            styles.label,
            { color: isPrimary ? color.paper50 : color.ink700 },
          ]}
        >
          {label.toUpperCase()}
        </Text>
      </Pressable>
    </BlockShadow>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: space.md,
    paddingHorizontal: space.lg,
    borderWidth: 2,
    borderColor: color.ink700,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: font.display,
    fontSize: 18,
    letterSpacing: -0.9, // 18 * -0.05
  },
});
```

---

## 6. FFCard — paper plate, optional press-printed variant

```tsx
import { View, ViewStyle, StyleSheet } from 'react-native';
import { ReactNode } from 'react';
import { BlockShadow } from './BlockShadow';
import { color, space } from './tokens';

type Props = {
  children: ReactNode;
  pressPrinted?: boolean;
  emphasized?: boolean; // 22px padding instead of 16px
  style?: ViewStyle;
};

export function FFCard({ children, pressPrinted, emphasized, style }: Props) {
  const inner = (
    <View
      style={[
        styles.card,
        { padding: emphasized ? 22 : space.md },
        style,
      ]}
    >
      {children}
    </View>
  );
  return pressPrinted ? <BlockShadow>{inner}</BlockShadow> : inner;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.paper50,
    borderColor: color.ink700,
    borderWidth: 1.5,
    borderRadius: 0,
  },
});
```

---

## 7. FFStave — five-line staff with riso echo

The web version uses two stacked `<div>`s with offset orange. RN equivalent: render two layers of five lines each.

```tsx
import { View, StyleSheet } from 'react-native';
import { color } from './tokens';

const LINE_GAP = 8;
const LINE_COUNT = 5;
const STAFF_HEIGHT = LINE_GAP * (LINE_COUNT - 1);

export function FFStave({ width }: { width: number }) {
  return (
    <View style={{ height: STAFF_HEIGHT + 4, width }}>
      {/* Orange echo, offset 1.4px down */}
      <View style={[StyleSheet.absoluteFillObject, { transform: [{ translateY: 1.4 }] }]}>
        {Array.from({ length: LINE_COUNT }).map((_, i) => (
          <View
            key={`echo-${i}`}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: i * LINE_GAP,
              height: 0.7,
              backgroundColor: color.spot700,
            }}
          />
        ))}
      </View>
      {/* Ink lines, on top */}
      {Array.from({ length: LINE_COUNT }).map((_, i) => (
        <View
          key={`ink-${i}`}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: i * LINE_GAP,
            height: 0.8,
            backgroundColor: color.ink700,
          }}
        />
      ))}
    </View>
  );
}
```

---

## 8. Typography helpers

```tsx
// src/design-system/Type.tsx
import { Text, TextProps, StyleSheet } from 'react-native';
import { color, font } from './tokens';

const make = (style: any) => (props: TextProps) =>
  <Text {...props} style={[style, props.style]} />;

export const Display = make({
  fontFamily: font.display,
  fontSize: 36,
  letterSpacing: -1.8,
  color: color.ink700,
});

export const Editorial = make({
  fontFamily: font.editorial, // already italic
  fontSize: 16,
  color: color.ink700,
});

export const Body = make({
  fontFamily: font.ui,
  fontSize: 16,
  color: color.ink700,
});

export const Mono = make({
  fontFamily: font.mono,
  fontSize: 14,
  color: color.ink700,
});

export const TempoMark = ({ bpm = 60, mark = 'andante, calmly' }) => (
  <Editorial>♩ = {bpm} · {mark}.</Editorial>
);
```

---

## 9. Animation timing

CSS `cubic-bezier(0.32, 0.72, 0, 1)` → Reanimated:

```ts
import { Easing } from 'react-native-reanimated';
import { easing, duration } from './tokens';

const standardEasing = Easing.bezier(...easing.standard);

withTiming(target, { duration: duration.transition, easing: standardEasing });
```

For the **note ring-out** (correct-answer pulse), animate a circle's `scale` from 0 → 1.6 and `opacity` from 0.6 → 0 over 240ms. Single concentric ring, ink color, no rainbow.

---

## 10. Icons

```
npm install lucide-react-native
```

```tsx
import { Check } from 'lucide-react-native';
<Check size={24} strokeWidth={1.75} color={color.fgMuted} />
```

Active state → `color.brand`. That's the only swap.

---

## 11. Status bar & safe areas

- Status bar: `<StatusBar style="dark" backgroundColor={color.paper100} />`.
- Use `react-native-safe-area-context`'s `useSafeAreaInsets()` and apply `paddingTop` on top-level screen `<View>`s — don't rely on default behavior.

---

## 12. Things that DON'T translate — flag and ask

If you find yourself trying to render any of these, stop and ask:

- **Misregistration shimmer** (the brief mentions "the orange echo can briefly slide further from the ink and snap back"). On web this is a CSS transform animation. In RN it's a Reanimated `useSharedValue` driving the echo `translateY`. Implement once in a hook, reuse.
- **Paper grain texture.** On web this is a CSS background image. In RN: bundle `paper-grain.png` as an asset, render as an absolutely-positioned `<Image>` with `opacity: 0.08` and `tintColor` matched to the page. Or skip it for v1 — it's the lowest-priority detail.
- **Text gradients / multi-color text.** Don't. The system has no gradients.
- **Backdrop blur.** Don't. The system has no blur.

---

## 13. Sanity checklist before saying "done"

Walk through each screen and confirm:

- [ ] Every primary CTA has a hard 4×4 orange block shadow (no soft drop shadow anywhere on the screen).
- [ ] Pressed state visibly collapses the shadow to 0.
- [ ] All headlines are Space Grotesk with negative letter-spacing.
- [ ] The italic editorial line beneath each headline uses EB Garamond italic.
- [ ] No `borderRadius` greater than 0 except: pill (note bubbles in staves), 2 (tape labels).
- [ ] No gradients. No third hue. No emoji in product UI.
- [ ] Note names render with proper ♯ / ♭ / ♮ glyphs (not "C#" / "Bb").
- [ ] Tab bar is custom-styled — no system blue, no SF Symbols defaults.
- [ ] Stave lines have the orange echo offset 1.4 below.
- [ ] Microcopy matches the patterns in `README.md` ("Nice." / "Not quite — that was [note].").

If any item fails, the design has drifted. Fix before shipping.
