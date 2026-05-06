# Fretflow Fonts

The Fretflow design system uses **five Google Fonts**, all under the SIL Open Font License (free for commercial use, including bundling in mobile apps).

| Font | Role | Weights needed | Google Fonts |
| --- | --- | --- | --- |
| **Fraunces** | Headlines (sentence case) | 500 | https://fonts.google.com/specimen/Fraunces |
| **EB Garamond** | Italic editorial asides | 400 italic | https://fonts.google.com/specimen/EB+Garamond |
| **Inter Tight** | Body, UI, buttons | 400, 500, 600, 700 | https://fonts.google.com/specimen/Inter+Tight |
| **JetBrains Mono** | Tabular labels, mono digits | 400, 700 | https://fonts.google.com/specimen/JetBrains+Mono |
| **Space Grotesk** | Poster register (celebration only) | 700 | https://fonts.google.com/specimen/Space+Grotesk |

## Web (this repo)

Loaded via the CDN import at the top of `colors_and_type.css`. No font files in this repo — the import does it.

## React Native / Expo apps

Use `expo-google-fonts`:

```bash
npx expo install expo-font \
  @expo-google-fonts/fraunces \
  @expo-google-fonts/eb-garamond \
  @expo-google-fonts/inter-tight \
  @expo-google-fonts/jetbrains-mono \
  @expo-google-fonts/space-grotesk
```

Then in your root component:

```jsx
import { useFonts } from 'expo-font';
import { Fraunces_500Medium } from '@expo-google-fonts/fraunces';
import { EBGaramond_400Regular_Italic } from '@expo-google-fonts/eb-garamond';
import {
  InterTight_400Regular, InterTight_500Medium,
  InterTight_600SemiBold, InterTight_700Bold,
} from '@expo-google-fonts/inter-tight';
import { JetBrainsMono_400Regular, JetBrainsMono_700Bold } from '@expo-google-fonts/jetbrains-mono';
import { SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';

const [loaded] = useFonts({
  Fraunces_500Medium,
  EBGaramond_400Regular_Italic,
  InterTight_400Regular,
  InterTight_500Medium,
  InterTight_600SemiBold,
  InterTight_700Bold,
  JetBrainsMono_400Regular,
  JetBrainsMono_700Bold,
  SpaceGrotesk_700Bold,
});

if (!loaded) return null;
```

Reference by exact name in styles: `fontFamily: 'Fraunces_500Medium'`.

## Native iOS (SwiftUI / UIKit)

1. Download the .ttf files from the Google Fonts URLs above. You only need the weights listed.
2. Drag the .ttf files into your Xcode project (check **Copy items if needed**).
3. Add them to **Info.plist** under `Fonts provided by application`:
   ```xml
   <key>UIAppFonts</key>
   <array>
     <string>Fraunces-Medium.ttf</string>
     <string>EBGaramond-Italic.ttf</string>
     <string>InterTight-Regular.ttf</string>
     <string>InterTight-Medium.ttf</string>
     <string>InterTight-SemiBold.ttf</string>
     <string>InterTight-Bold.ttf</string>
     <string>JetBrainsMono-Regular.ttf</string>
     <string>JetBrainsMono-Bold.ttf</string>
     <string>SpaceGrotesk-Bold.ttf</string>
   </array>
   ```
4. Use in SwiftUI: `Text("Hello").font(.custom("Fraunces-Medium", size: 32))`

## License

All five fonts are licensed under the **SIL Open Font License v1.1** — bundle them in commercial apps, no attribution required in-app (license file ships with the .ttf metadata).
