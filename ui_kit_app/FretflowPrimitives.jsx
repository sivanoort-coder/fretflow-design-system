// FretflowPrimitives.jsx — shared UI primitives matching the Riso × Score design system.
// Two-color riso print look: ultramarine ink + spot orange on warm newsprint.
// All components inline-style so they're portable.

const FF = {
  // Paper (warm newsprint)
  paper:     '#F4EEDF',
  paperHi:   '#FBF7EA',
  paperWell: '#ECE3CC',
  paperRule: '#DDD0AE',

  // Ink (ultramarine — primary press color)
  ink:       '#152066',
  ink500:    '#2C3B86',
  ink300:    '#6E7BB8',
  inkDeep:   '#0B1240',
  inkMuted:  '#5A6499',

  // Spot (newsprint orange-red — accent press color)
  spot:      '#FF5A2C',
  spotHi:    '#FF7B52',
  spotSoft:  '#FFB69E',
  spotDeep:  '#C13A14',

  // Status
  green:     '#1F7A4D',
  greenSoft: '#D7E8DC',
  red:       '#FF5A2C', // same press; rely on context + iconography
  redSoft:   '#FFDFD2',

  // Semantic aliases (kept for back-compat with existing JSX)
  bg:         '#F4EEDF',
  surface:    '#FBF7EA',
  surface2:   '#ECE3CC',
  sunken:     '#ECE3CC',
  fg:         '#152066',
  fg2:        '#2C3B86',
  fgMuted:    '#5A6499',
  fgSubtle:   '#6E7BB8',
  rule:       '#DDD0AE',
  ruleStrong: '#152066',
  brass:      '#FF5A2C',  // brand accent slot
  brassDk:    '#C13A14',
  brassSoft:  '#FFDFD2',
  brassTint:  '#FFE9DF',
  greenDk:    '#15573A',
  redDk:      '#C13A14',
  wood:       '#152066',  // fretboard "wood" is now ink

  // Misregistration offsets
  misregX:   4,
  misregY:   4,
  misregLine: 1.4,

  // Type
  fontDisplay: "'Space Grotesk', system-ui, sans-serif",
  fontEditorial: "'EB Garamond', Georgia, serif",
  fontBody:    "'Inter Tight', system-ui, sans-serif",
  fontMono:    "'JetBrains Mono', ui-monospace, monospace",
  trackDisplay: '-0.05em',

  // Motion
  ease:        'cubic-bezier(0.32, 0.72, 0, 1)',
  pluck:       'cubic-bezier(0.34, 1.56, 0.64, 1)',
};

// ───────── Note bubble (sheet-music context — pill is allowed here) ─────────
function NoteBubble({ note, state = 'active', size = 56, onClick }) {
  const styles = {
    active: { bg: FF.spot,     fg: FF.paper, border: FF.ink, dashed: false },
    soft:   { bg: FF.paperHi,  fg: FF.ink,   border: FF.ink, dashed: false },
    correct:{ bg: FF.green,    fg: FF.paper, border: FF.ink, dashed: false },
    wrong:  { bg: FF.spot,     fg: FF.paper, border: FF.ink, dashed: false },
    ghost:  { bg: 'transparent', fg: FF.inkMuted, border: FF.ink, dashed: true },
  }[state] || {};
  return (
    <button
      onClick={onClick}
      style={{
        width: size, height: size, borderRadius: 999,
        background: styles.bg, color: styles.fg,
        border: `${styles.dashed ? '1.5px dashed' : '2px solid'} ${styles.border}`,
        fontFamily: FF.fontMono, fontWeight: 700,
        fontSize: size * 0.4, lineHeight: 1,
        display: 'grid', placeItems: 'center',
        cursor: onClick ? 'pointer' : 'default',
        padding: 0, transition: `transform 150ms ${FF.ease}`,
      }}>
      {note}
    </button>
  );
}

// ───────── Button (riso: square corners, hard offset shadow) ─────────
function FFButton({ children, variant = 'primary', size = 'md', onClick, disabled, fullWidth }) {
  const variants = {
    primary:   { bg: FF.spot,    fg: FF.paper, border: FF.ink, shadow: true },
    secondary: { bg: FF.paperHi, fg: FF.ink,   border: FF.ink, shadow: true },
    ghost:     { bg: 'transparent', fg: FF.ink, border: 'transparent', shadow: false },
    danger:    { bg: FF.spotDeep, fg: FF.paper, border: FF.ink, shadow: true },
  }[variant];
  const sizes = {
    sm: { fs: 13, py: 8, px: 14 },
    md: { fs: 15, py: 12, px: 20 },
    lg: { fs: 17, py: 16, px: 24 },
  }[size];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: variants.bg, color: variants.fg,
        border: `2px solid ${variants.border}`,
        boxShadow: variants.shadow && !disabled ? `${FF.misregX}px ${FF.misregY}px 0 ${FF.ink}` : 'none',
        fontFamily: FF.fontDisplay, fontWeight: 700,
        fontSize: sizes.fs, letterSpacing: variants.shadow ? '0.02em' : 0,
        textTransform: variants.shadow ? 'uppercase' : 'none',
        padding: `${sizes.py}px ${sizes.px}px`, borderRadius: 0,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        width: fullWidth ? '100%' : 'auto',
        transition: `transform 150ms ${FF.ease}, box-shadow 150ms ${FF.ease}`,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}>
      {children}
    </button>
  );
}

// ───────── Pill / Badge (square tape labels — radius 2) ─────────
function FFPill({ children, tone = 'neutral' }) {
  const tones = {
    neutral: { bg: FF.paperHi,  fg: FF.ink,     border: FF.ink },
    brass:   { bg: FF.spotSoft, fg: FF.spotDeep, border: FF.ink },
    solid:   { bg: FF.spot,     fg: FF.paper,   border: FF.ink },
    green:   { bg: FF.greenSoft, fg: '#15573A',  border: FF.ink },
    red:     { bg: FF.redSoft,  fg: FF.spotDeep, border: FF.ink },
  }[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: 2,
      background: tones.bg, color: tones.fg,
      border: `1.5px solid ${tones.border}`,
      fontFamily: FF.fontMono, fontWeight: 700, fontSize: 10,
      letterSpacing: '0.14em', textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }}>{children}</span>
  );
}

// ───────── Card (riso: square, hard offset shadow on hero) ─────────
function FFCard({ children, elevation = 'flat', radius = 0, padding = 20, style = {} }) {
  const isHero = elevation === 'hero';
  const isLifted = elevation === 'lifted';
  return (
    <div style={{
      background: FF.paperHi,
      border: `1.5px solid ${FF.ink}`,
      borderRadius: 0,
      padding,
      boxShadow: isHero
        ? `${FF.misregX}px ${FF.misregY}px 0 ${FF.spot}`
        : isLifted
          ? `2px 2px 0 ${FF.ink}`
          : 'none',
      position: 'relative',
      overflow: 'visible',
      ...style,
    }}>
      {children}
    </div>
  );
}

// ───────── Progress bar (square, ink-bordered, spot fill) ─────────
function FFProgress({ value = 0, max = 100, height = 10 }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div style={{
      width: '100%', height, background: FF.paperWell,
      border: `1.5px solid ${FF.ink}`, borderRadius: 0, overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{
        width: `${pct}%`, height: '100%', background: FF.spot, borderRadius: 0,
        transition: `width 400ms ${FF.ease}`,
      }}/>
    </div>
  );
}

// ───────── Label (mono caps — "tape label" voice) ─────────
function FFLabel({ children, color }) {
  return (
    <div style={{
      fontFamily: FF.fontMono, fontWeight: 700, fontSize: 10,
      letterSpacing: '0.18em', textTransform: 'uppercase',
      color: color || FF.inkMuted,
    }}>{children}</div>
  );
}

// ───────── Tab bar (mobile) — top hairline rule, ink on paper ─────────
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
      background: FF.paper, borderTop: `1.5px solid ${FF.ink}`,
      padding: '6px 0 8px',
    }}>
      {tabs.map(t => {
        const on = active === t.id;
        return (
          <button key={t.id} onClick={() => onChange(t.id)}
            style={{
              flex: 1, background: 'transparent', border: 0, cursor: 'pointer',
              padding: '6px 4px', display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 4,
              color: on ? FF.spot : FF.inkMuted,
              position: 'relative',
            }}>
            {on && (
              <span style={{
                position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)',
                width: 22, height: 3, background: FF.spot,
              }}/>
            )}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={on ? 2.25 : 1.75}
              strokeLinecap="round" strokeLinejoin="round">
              <path d={t.icon}/>
            </svg>
            <span style={{
              fontFamily: FF.fontMono, fontWeight: 700, fontSize: 9,
              letterSpacing: '0.14em', textTransform: 'uppercase',
            }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ───────── Streak counter — square ink chip with spot accent ─────────
function FFStreak({ days = 14 }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '6px 10px',
      background: FF.ink, borderRadius: 0,
      border: `1.5px solid ${FF.ink}`,
      boxShadow: `2px 2px 0 ${FF.spot}`,
      fontFamily: FF.fontMono, fontWeight: 700, fontSize: 11,
      letterSpacing: '0.14em', textTransform: 'uppercase',
      color: FF.paper,
    }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill={FF.spot}
        stroke={FF.spot} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 15 8l6 .9-4.5 4.4 1 6.2L12 16.7 6.5 19.5l1-6.2L3 8.9 9 8z"/>
      </svg>
      <span>Day {days}</span>
    </div>
  );
}

window.FF = FF;
Object.assign(window, { NoteBubble, FFButton, FFPill, FFCard, FFProgress, FFLabel, FFTabBar, FFStreak });
