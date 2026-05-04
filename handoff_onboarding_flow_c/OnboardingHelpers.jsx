// OnboardingScreens.jsx — three onboarding flows for Fretflow v4.
// Flow A · minimal (3 screens) — promise + instrument + go
// Flow B · balanced (6 screens) — full brief
// Flow C · ambitious (7 screens) — animated fretboard intro, novel calibration

const ON_INSTRUMENTS = [
  { id: 'guitar',  name: 'Guitar',  sub: 'Six strings',     icon: 'guitar' },
  { id: 'piano',   name: 'Piano',   sub: 'Black & white',   icon: 'piano' },
  { id: 'bass',    name: 'Bass',    sub: 'Four strings',    icon: 'bass' },
  { id: 'ukulele', name: 'Ukulele', sub: 'Four strings, high G', icon: 'ukulele' },
];

// ───────── Tiny instrument glyphs (paper-and-ink, not skeuomorphic) ─────────
function InstrumentGlyph({ kind, size = 56, tone = '#152066' }) {
  const s = { width: size, height: size, display: 'block' };
  if (kind === 'guitar') {
    return (
      <svg style={s} viewBox="0 0 56 56" fill="none" stroke={tone} strokeWidth="1.5" strokeLinecap="round">
        {/* slim fretboard slice */}
        <rect x="6" y="14" width="44" height="28" rx="3"/>
        {[0,1,2,3,4,5].map(i => <line key={i} x1="8" y1={17+i*4} x2="48" y2={17+i*4} strokeWidth={i===5?1.6:0.8} opacity={i===5?1:0.55}/>)}
        {[14,22,30,38,46].map(x => <line key={x} x1={x} y1="14" x2={x} y2="42" strokeWidth="0.8" opacity="0.45"/>)}
        <circle cx="22" cy="28" r="1.4" fill={tone} stroke="none"/>
        <circle cx="38" cy="28" r="1.4" fill={tone} stroke="none"/>
      </svg>
    );
  }
  if (kind === 'piano') {
    return (
      <svg style={s} viewBox="0 0 56 56" fill="none" stroke={tone} strokeWidth="1.5" strokeLinecap="round">
        <rect x="6" y="16" width="44" height="24" rx="2"/>
        {[0,1,2,3,4,5,6].map(i => <line key={i} x1={6+i*44/7} y1="16" x2={6+i*44/7} y2="40" strokeWidth="0.9" opacity="0.55"/>)}
        {[1,2,4,5,6].map(i => <rect key={i} x={6+i*44/7-3} y="16" width="6" height="14" fill={tone} stroke="none" opacity="0.85"/>)}
      </svg>
    );
  }
  if (kind === 'bass') {
    return (
      <svg style={s} viewBox="0 0 56 56" fill="none" stroke={tone} strokeWidth="1.5" strokeLinecap="round">
        <rect x="6" y="16" width="44" height="24" rx="3"/>
        {[0,1,2,3].map(i => <line key={i} x1="8" y1={20+i*5} x2="48" y2={20+i*5} strokeWidth={i===3?1.8:1} opacity={i===3?1:0.55}/>)}
        {[14,22,30,38,46].map(x => <line key={x} x1={x} y1="16" x2={x} y2="40" strokeWidth="0.8" opacity="0.45"/>)}
        <circle cx="30" cy="28" r="1.4" fill={tone} stroke="none"/>
      </svg>
    );
  }
  // ukulele
  return (
    <svg style={s} viewBox="0 0 56 56" fill="none" stroke={tone} strokeWidth="1.5" strokeLinecap="round">
      <rect x="10" y="18" width="36" height="20" rx="3"/>
      {[0,1,2,3].map(i => <line key={i} x1="12" y1={21+i*4.5} x2="44" y2={21+i*4.5} strokeWidth={i===0?1.2:0.9} opacity={0.7}/>)}
      {[18,26,34,42].map(x => <line key={x} x1={x} y1="18" x2={x} y2="38" strokeWidth="0.8" opacity="0.45"/>)}
    </svg>
  );
}

// ───────── Phone layout helpers ─────────
function PhonePage({ children, top = 76, bottom = 28, padX = 24 }) {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      padding: `${top}px ${padX}px ${bottom}px`,
      background: FF.paper, color: FF.ink,
      fontFamily: FF.fontBody,
    }}>{children}</div>
  );
}

function PhoneHeader({ step, total, onBack }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
      <button onClick={onBack} style={{
        background: 'transparent', border: 0, color: FF.inkMuted, padding: 0,
        cursor: onBack ? 'pointer' : 'default', display: 'flex', alignItems: 'center',
      }}>
        {onBack && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        )}
      </button>
      {step != null && (
        <div style={{
          fontFamily: FF.fontMono, fontWeight: 700, fontSize: 10,
          letterSpacing: '0.16em', color: FF.inkMuted,
        }}>STEP {step} OF {total}</div>
      )}
      <div style={{ width: 24 }}/>
    </div>
  );
}

// ───────── Bottom-anchored CTA stack ─────────
function PhoneFooter({ children }) {
  return <div style={{ marginTop: 'auto', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>{children}</div>;
}

window.OnboardingHelpers = { ON_INSTRUMENTS, InstrumentGlyph, PhonePage, PhoneHeader, PhoneFooter };
Object.assign(window, { ON_INSTRUMENTS, InstrumentGlyph, PhonePage, PhoneHeader, PhoneFooter });
