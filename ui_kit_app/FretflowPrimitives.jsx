// FretflowPrimitives.jsx — shared UI primitives for Fretflow v4 (Fretboard-Hero).
// Soft 12–14px iOS-native corners on paper-50 cards. The single bold expressive
// gesture is the press-printed primary CTA — a 4×4 spot block shadow.
// Heading voice: Fraunces sentence-case. Editorial: EB Garamond italic. Body: Inter Tight.
// JetBrains Mono ONLY for tiny labels and tabular numerals.

const FF = {
  // Paper (warm newsprint base)
  paper:       '#F4EEDF',  // paper-100 — app background
  paperHi:     '#FBF7EA',  // paper-50  — card / sheet surface
  paperRule:   '#E5DBC0',  // paper-300 — soft hairline + bar tracks
  paperWell:   '#ECE3CC',  // paper-200 — sunken / segmented bg

  // Ink (ultramarine)
  ink:         '#152066',
  ink500:      '#2C3B86',
  ink300:      '#A6AED0',  // hairline border on default cards
  inkMuted:    '#5A6499',

  // Spot (orange — the single expressive accent)
  spot:        '#FF5A2C',
  spotDeep:    '#C13A14',
  spotSoft:    '#FFE3D6',  // red-100 tint

  // Status
  green:       '#2E8B57',
  greenSoft:   '#D7E8DC',
  red:         '#FF5A2C',
  redSoft:     '#FFE3D6',

  // Instrument plate — warm parchment background behind any rendered fretboard
  fretboardPlate: '#EFE6CF',

  // Semantic aliases (back-compat with screen JSX that still references these)
  bg:          '#F4EEDF',
  surface:     '#FBF7EA',
  surface2:    '#ECE3CC',
  sunken:      '#ECE3CC',
  fg:          '#152066',
  fg2:         '#2C3B86',
  fgMuted:     '#5A6499',
  fgSubtle:    '#A6AED0',
  rule:        '#E5DBC0',
  ruleStrong:  '#152066',
  brass:       '#FF5A2C',
  brassDk:     '#C13A14',
  brassSoft:   '#FFE3D6',

  // Block shadow — used ONLY on primary CTA (and once, sparingly, on a hero card)
  blockX: 4, blockY: 4,

  // Type
  fontHeading:   "'Fraunces', Georgia, serif",
  fontEditorial: "'EB Garamond', Georgia, serif",
  fontBody:      "'Inter Tight', system-ui, sans-serif",
  fontMono:      "'JetBrains Mono', ui-monospace, monospace",
  fontPoster:    "'Space Grotesk', system-ui, sans-serif", // celebratory only

  // Motion
  ease:        'cubic-bezier(0.32, 0.72, 0, 1)',
  pluck:       'cubic-bezier(0.34, 1.56, 0.64, 1)',
};

// ───────── Answer pad — the v4 note-naming affordance ─────────
// Replaces the old round NoteBubble. A 12px-radius pad, used for both
// practice answer buttons and the visible "name this note" target.
function NoteBubble({ note, state = 'idle', size = 56, onClick, accidental }) {
  const styles = {
    idle:     { bg: FF.paperHi, fg: FF.ink, border: `1.5px solid ${FF.ink}` },
    selected: { bg: FF.spot,    fg: FF.paper, border: `1.5px solid ${FF.ink}` },
    correct:  { bg: FF.green,   fg: FF.paper, border: `1.5px solid ${FF.green}` },
    wrong:    { bg: FF.spot,    fg: FF.paper, border: `1.5px solid ${FF.spot}` },
    hint:     { bg: FF.paperHi, fg: FF.inkMuted, border: `1.5px dashed ${FF.ink300}` },
    // legacy aliases
    active:   { bg: FF.spot,    fg: FF.paper, border: `1.5px solid ${FF.ink}` },
    soft:     { bg: FF.paperHi, fg: FF.ink, border: `1px solid ${FF.ink300}` },
  }[state] || {};
  const fs = Math.round(size * 0.40);
  const isPress = state === 'selected';
  return (
    <button
      onClick={onClick}
      style={{
        width: size, height: size, borderRadius: 12,
        background: styles.bg, color: styles.fg, border: styles.border,
        fontFamily: FF.fontHeading, fontWeight: 500,
        fontSize: fs, lineHeight: 1, letterSpacing: '-0.01em',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 1,
        cursor: onClick ? 'pointer' : 'default',
        padding: 0, transition: `transform 150ms ${FF.ease}, box-shadow 150ms ${FF.ease}`,
        boxShadow: isPress ? `3px 3px 0 ${FF.ink}` : 'none',
      }}>
      <span>{note}</span>
      {accidental && (
        <span style={{ fontFamily: FF.fontEditorial, fontSize: fs * 0.7, marginLeft: 1 }}>{accidental}</span>
      )}
    </button>
  );
}

// ───────── Button ─────────
// PRIMARY: ink fill, paper text, 4×4 spot block shadow. Sentence case.
// GHOST: outlined, no shadow. SECONDARY: same as ghost (back-compat).
function FFButton({ children, variant = 'primary', size = 'md', onClick, disabled, fullWidth, trailing }) {
  const variants = {
    primary:   { bg: FF.ink,    fg: FF.paper, border: 'transparent',     shadow: `${FF.blockX}px ${FF.blockY}px 0 ${FF.spot}` },
    pressed:   { bg: FF.ink,    fg: FF.paper, border: 'transparent',     shadow: 'none', translate: true },
    ghost:     { bg: 'transparent', fg: FF.ink, border: `1.5px solid ${FF.ink}`, shadow: 'none' },
    secondary: { bg: 'transparent', fg: FF.ink, border: `1.5px solid ${FF.ink}`, shadow: 'none' },
    danger:    { bg: FF.spot,   fg: FF.paper, border: 'transparent',     shadow: `${FF.blockX}px ${FF.blockY}px 0 ${FF.ink}` },
  }[variant] || {};
  const sizes = {
    sm: { fs: 14, py: 10, px: 14, r: 12 },
    md: { fs: 15, py: 13, px: 18, r: 14 },
    lg: { fs: 16, py: 16, px: 22, r: 14 },
  }[size];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: variants.bg, color: variants.fg, border: variants.border,
        boxShadow: disabled ? 'none' : variants.shadow,
        transform: variants.translate ? `translate(${FF.blockX}px, ${FF.blockY}px)` : 'none',
        fontFamily: FF.fontBody, fontWeight: 600,
        fontSize: sizes.fs, letterSpacing: '-0.01em',
        padding: `${sizes.py}px ${sizes.px}px`, borderRadius: sizes.r,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        // fullWidth subtracts the block-shadow offset so the shadow doesn't get
        // clipped by an ancestor's overflow:hidden / overflow:auto.
        width: fullWidth ? `calc(100% - ${FF.blockX}px)` : 'auto',
        whiteSpace: 'nowrap',
        transition: `transform 150ms ${FF.ease}, box-shadow 150ms ${FF.ease}`,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}>
      <span style={{ whiteSpace: 'nowrap' }}>{children}</span>
      {trailing && (
        <span style={{ fontFamily: FF.fontEditorial, fontStyle: 'italic', fontWeight: 400, fontSize: sizes.fs * 1.3, lineHeight: 1 }}>{trailing}</span>
      )}
    </button>
  );
}

// ───────── Pill / Status chip — soft, rounded ─────────
function FFPill({ children, tone = 'neutral' }) {
  const tones = {
    neutral: { bg: FF.paperHi,  fg: FF.ink,    border: `1px solid ${FF.ink300}` },
    streak:  { bg: FF.paperHi,  fg: FF.ink,    border: `1px solid ${FF.ink}` },
    spot:    { bg: FF.spotSoft, fg: FF.spotDeep, border: 'transparent' },
    brass:   { bg: FF.spotSoft, fg: FF.spotDeep, border: 'transparent' },
    solid:   { bg: FF.ink,      fg: FF.paper,  border: 'transparent' },
    green:   { bg: FF.greenSoft, fg: FF.green,  border: 'transparent' },
    red:     { bg: FF.redSoft,  fg: FF.spotDeep, border: 'transparent' },
  }[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '5px 10px', borderRadius: 999,
      background: tones.bg, color: tones.fg, border: tones.border,
      fontFamily: FF.fontMono, fontWeight: 700, fontSize: 10,
      letterSpacing: '0.10em', textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }}>{children}</span>
  );
}

// ───────── Card — soft borders, 14px corners ─────────
// elevation: 'flat' (default — paper-50 + hairline ink-300)
//            'plate' (warm parchment — for instrument backgrounds)
//            'lifted' (1.5px ink border)
//            'hero' (ink border + 4×4 block shadow — sparingly)
function FFCard({ children, elevation = 'flat', radius = 14, padding = 18, style = {} }) {
  const elev = {
    flat:   { bg: FF.paperHi,        border: `1px solid ${FF.ink300}`, shadow: 'none' },
    plate:  { bg: FF.fretboardPlate, border: `1px solid ${FF.ink300}`, shadow: 'none' },
    lifted: { bg: FF.paperHi,        border: `1.5px solid ${FF.ink}`,  shadow: 'none' },
    hero:   { bg: FF.paperHi,        border: `1.5px solid ${FF.ink}`,  shadow: `${FF.blockX}px ${FF.blockY}px 0 ${FF.spot}` },
  }[elevation];
  return (
    <div style={{
      background: elev.bg, border: elev.border, borderRadius: radius,
      padding, boxShadow: elev.shadow, position: 'relative', ...style,
    }}>
      {children}
    </div>
  );
}

// ───────── Progress bar — soft, rounded, paper-300 track ─────────
function FFProgress({ value = 0, max = 100, height = 8, tone = 'ink' }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const fill = tone === 'green' ? FF.green : tone === 'spot' ? FF.spot : FF.ink;
  return (
    <div style={{
      width: '100%', height, background: FF.paperRule,
      borderRadius: 999, overflow: 'hidden', position: 'relative',
    }}>
      <div style={{
        width: `${pct}%`, height: '100%', background: fill, borderRadius: 999,
        transition: `width 400ms ${FF.ease}`,
      }}/>
    </div>
  );
}

// ───────── Stepper — for "question 3 of 8" ─────────
function FFStepper({ value = 0, total = 8 }) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {Array.from({ length: total }, (_, i) => {
        const state = i < value ? 'done' : i === value ? 'now' : 'pending';
        const bg = state === 'done' ? FF.ink : state === 'now' ? FF.spot : FF.paperRule;
        return <div key={i} style={{ flex: 1, height: 6, background: bg, borderRadius: 999 }}/>;
      })}
    </div>
  );
}

// ───────── Label — tiny mono caps, soft ink-muted ─────────
function FFLabel({ children, color }) {
  return (
    <div style={{
      fontFamily: FF.fontMono, fontWeight: 700, fontSize: 10,
      letterSpacing: '0.16em', textTransform: 'uppercase',
      color: color || FF.inkMuted,
    }}>{children}</div>
  );
}

// ───────── Tab bar ─────────
function FFTabBar({ active = 'today', onChange = () => {} }) {
  const tabs = [
    { id: 'today',   label: 'Today',   icon: 'M3 12l9-9 9 9M5 10v10h14V10' },
    { id: 'learn',   label: 'Learn',   icon: 'M4 19V5a2 2 0 0 1 2-2h11l3 3v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM8 7h8M8 11h8M8 15h5' },
    { id: 'ear',     label: 'Ear',     icon: 'M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1v-6h3zM3 19a2 2 0 0 0 2 2h1v-6H3z' },
    { id: 'profile', label: 'Profile', icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z' },
  ];
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-around', alignItems: 'stretch',
      background: FF.paper, borderTop: `1px solid ${FF.paperRule}`,
      padding: '8px 0 10px',
    }}>
      {tabs.map(t => {
        const on = active === t.id;
        return (
          <button key={t.id} onClick={() => onChange(t.id)}
            style={{
              flex: 1, background: 'transparent', border: 0, cursor: 'pointer',
              padding: '6px 4px', display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 4,
              color: on ? FF.ink : FF.inkMuted,
            }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={on ? 2.25 : 1.75}
              strokeLinecap="round" strokeLinejoin="round">
              <path d={t.icon}/>
            </svg>
            <span style={{
              fontFamily: FF.fontBody, fontWeight: on ? 600 : 500, fontSize: 10,
              letterSpacing: '0.02em',
            }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ───────── Streak chip — soft pill ─────────
function FFStreak({ days = 14 }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 7,
      padding: '6px 12px', borderRadius: 999,
      background: FF.paperHi, border: `1px solid ${FF.ink}`,
      fontFamily: FF.fontMono, fontWeight: 700, fontSize: 11,
      letterSpacing: '0.08em', color: FF.ink,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: FF.spot }}/>
      day {days}
    </span>
  );
}

window.FF = FF;
Object.assign(window, { NoteBubble, FFButton, FFPill, FFCard, FFProgress, FFStepper, FFLabel, FFTabBar, FFStreak });
