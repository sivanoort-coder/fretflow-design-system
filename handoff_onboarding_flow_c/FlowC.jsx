// FlowC.jsx — Ambitious onboarding (7 screens). Animated fretboard intro,
// novel "tap what you know" calibration, dial-style goal picker.

// ───────── Animated fretboard that draws itself ─────────
function DrawingFretboard({ width = 300, height = 150 }) {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    let raf, start;
    function tick(now) {
      if (!start) start = now;
      const elapsed = (now - start) / 1800;
      setT(Math.min(1, elapsed));
      if (elapsed < 1.4) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const frets = 7;
  const strings = 6;
  const padX = 18, padY = 14;
  const w = width - padX * 2;
  const h = height - padY * 2;
  const fretX = (i) => padX + (w / frets) * i;
  const stringY = (i) => padY + (h / (strings - 1)) * i;
  const ease = (x) => 1 - Math.pow(1 - x, 3);
  const draw = ease(t);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* parchment plate */}
      <rect x="0" y="0" width={width} height={height} rx="14" fill="#EFE6CF"/>
      {/* nut */}
      <line x1={padX} y1={padY - 2} x2={padX} y2={height - padY + 2} stroke="#152066" strokeWidth="3" opacity={Math.min(1, draw * 4)}/>
      {/* frets */}
      {Array.from({ length: frets }, (_, i) => i + 1).map(i => {
        const local = Math.max(0, Math.min(1, (draw - i / (frets * 1.6)) * 4));
        return <line key={i} x1={fretX(i)} y1={padY} x2={fretX(i)} y2={height - padY} stroke="#152066" strokeWidth="1.2" opacity={0.45 * local}/>;
      })}
      {/* strings — drawn left→right */}
      {Array.from({ length: strings }, (_, i) => {
        const sw = i === strings - 1 ? 1.6 : i === 0 ? 0.7 : 1;
        const local = Math.max(0, Math.min(1, (draw - 0.15 - i * 0.08) * 1.6));
        return (
          <line key={i}
            x1={padX} y1={stringY(i)}
            x2={padX + (width - padX * 2) * local} y2={stringY(i)}
            stroke="#152066" strokeWidth={sw} opacity={0.85}/>
        );
      })}
      {/* inlays */}
      {[3, 5, 7].map(i => (
        <circle key={i} cx={(fretX(i - 1) + fretX(i)) / 2} cy={height / 2}
          r="2.4" fill="#152066"
          opacity={Math.max(0, Math.min(1, (draw - 0.5 - (i - 3) * 0.1) * 3)) * 0.4}/>
      ))}
      {/* note pulse on string 5 fret 3 — appears at end */}
      {draw > 0.85 && (() => {
        const cx = (fretX(2) + fretX(3)) / 2;
        const cy = stringY(4);
        const k = (draw - 0.85) / 0.15;
        return (
          <g>
            <circle cx={cx + 1.2} cy={cy + 1.2} r={6.5} fill="#FF5A2C" opacity={0.85 * k}/>
            <circle cx={cx} cy={cy} r={6} fill="#152066" opacity={k}/>
          </g>
        );
      })()}
    </svg>
  );
}

function FlowC_Intro({ onNext }) {
  return (
    <PhonePage top={68} bottom={28}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: 24 }}>
        <div style={{
          fontFamily: FF.fontMono, fontWeight: 700, fontSize: 10,
          letterSpacing: '0.20em', color: FF.spotDeep, marginBottom: 22,
        }}>FRETFLOW</div>

        <DrawingFretboard width={300} height={150}/>

        <h1 style={{
          fontFamily: FF.fontHeading, fontWeight: 500,
          fontSize: 48, lineHeight: 0.95, letterSpacing: '-0.025em',
          margin: '28px 0 0', color: FF.ink,
        }}>
          The neck.<br/>
          <span style={{ fontFamily: FF.fontEditorial, fontStyle: 'italic', fontWeight: 400 }}>
            Properly <span style={{ color: FF.spotDeep }}>known</span>.
          </span>
        </h1>
        <p style={{
          fontFamily: FF.fontEditorial, fontStyle: 'italic',
          fontSize: 16, lineHeight: 1.45, color: FF.inkMuted,
          margin: '14px 0 0', maxWidth: 280,
        }}>Five minutes a day. The names underneath the shapes.</p>
      </div>
      <PhoneFooter>
        <FFButton fullWidth size="lg" onClick={onNext} trailing="→">Begin</FFButton>
      </PhoneFooter>
    </PhonePage>
  );
}

function FlowC_Calibrate({ onNext, onBack }) {
  // user taps frets they "know" — novel calibration gesture
  const [tapped, setTapped] = React.useState(new Set(['5-3', '5-5', '6-3']));
  const toggle = (key) => {
    const next = new Set(tapped);
    if (next.has(key)) next.delete(key); else next.add(key);
    setTapped(next);
  };

  const frets = 7, strings = 6;
  const W = 326, H = 142;
  const padX = 22, padY = 16;
  const cellW = (W - padX * 2) / frets;
  const cellH = (H - padY * 2) / (strings - 1);

  return (
    <PhonePage>
      <PhoneHeader step={1} total={6} onBack={onBack}/>
      <h2 style={{
        fontFamily: FF.fontHeading, fontWeight: 500, fontSize: 28,
        margin: '0 0 4px', color: FF.ink, letterSpacing: '-0.02em',
      }}>What can you find?</h2>
      <p style={{
        fontFamily: FF.fontEditorial, fontStyle: 'italic',
        fontSize: 15, color: FF.inkMuted, margin: '0 0 18px',
      }}>Tap the notes you can already name. We'll start where you are.</p>

      <FFCard elevation="plate" padding={6}>
        <svg width={W} height={H + 18} viewBox={`0 0 ${W} ${H + 18}`}>
          {/* nut */}
          <line x1={padX} y1={padY - 2} x2={padX} y2={H - padY + 2} stroke={FF.ink} strokeWidth="3"/>
          {/* frets */}
          {Array.from({ length: frets }, (_, i) => i + 1).map(i => (
            <line key={i} x1={padX + cellW * i} y1={padY} x2={padX + cellW * i} y2={H - padY} stroke={FF.ink} strokeWidth="1" opacity="0.45"/>
          ))}
          {/* strings */}
          {Array.from({ length: strings }, (_, i) => {
            const sw = i === strings - 1 ? 1.6 : i === 0 ? 0.7 : 1;
            return <line key={i} x1={padX} y1={padY + cellH * i} x2={W - padX} y2={padY + cellH * i} stroke={FF.ink} strokeWidth={sw} opacity="0.85"/>;
          })}
          {/* tap targets */}
          {Array.from({ length: frets }, (_, fi) => Array.from({ length: strings }, (_, si) => {
            const key = `${si + 1}-${fi + 1}`;
            const cx = padX + cellW * fi + cellW / 2;
            const cy = padY + cellH * si;
            const isTapped = tapped.has(key);
            return (
              <g key={key} onClick={() => toggle(key)} style={{ cursor: 'pointer' }}>
                <circle cx={cx} cy={cy} r="11" fill="transparent"/>
                {isTapped && <circle cx={cx + 1} cy={cy + 1} r="6.5" fill={FF.spot} opacity="0.85"/>}
                {isTapped && <circle cx={cx} cy={cy} r="6" fill={FF.ink}/>}
              </g>
            );
          }))}
          {/* fret numbers */}
          {[1,2,3,4,5,6,7].map(n => (
            <text key={n} x={padX + cellW * (n - 1) + cellW / 2} y={H + 10}
              fontFamily="'JetBrains Mono', monospace" fontSize="9" fontWeight="700"
              fill={FF.inkMuted} textAnchor="middle">{n}</text>
          ))}
        </svg>
      </FFCard>

      <div style={{
        marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: FF.fontMono, fontWeight: 700, fontSize: 10,
        letterSpacing: '0.14em', color: FF.inkMuted,
      }}>
        <span>{tapped.size} TAPPED</span>
        <button onClick={() => setTapped(new Set())} style={{
          background: 'transparent', border: 0, color: FF.inkMuted,
          fontFamily: FF.fontEditorial, fontStyle: 'italic', fontSize: 13, cursor: 'pointer',
        }}>clear</button>
      </div>

      <PhoneFooter>
        <FFButton fullWidth size="lg" onClick={onNext}>{tapped.size === 0 ? 'Skip — I\'m a beginner' : 'Continue'}</FFButton>
      </PhoneFooter>
    </PhonePage>
  );
}

function FlowC_Instrument({ onNext, onBack, picked, setPicked }) {
  return (
    <PhonePage>
      <PhoneHeader step={2} total={6} onBack={onBack}/>
      <h2 style={{
        fontFamily: FF.fontHeading, fontWeight: 500, fontSize: 28,
        margin: '0 0 4px', color: FF.ink, letterSpacing: '-0.02em',
      }}>Your instrument.</h2>
      <p style={{
        fontFamily: FF.fontEditorial, fontStyle: 'italic',
        fontSize: 15, color: FF.inkMuted, margin: '0 0 18px',
      }}>The fretboard adapts. You can switch any time.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ON_INSTRUMENTS.map(it => {
          const sel = picked === it.id;
          return (
            <button key={it.id} onClick={() => setPicked(it.id)} style={{
              padding: '14px 18px', borderRadius: 14,
              background: sel ? FF.fretboardPlate : FF.paperHi,
              border: sel ? `1.5px solid ${FF.ink}` : `1px solid ${FF.ink300}`,
              boxShadow: sel ? `3px 3px 0 ${FF.spot}` : 'none',
              display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', textAlign: 'left',
            }}>
              <InstrumentGlyph kind={it.icon} size={42} tone={FF.ink}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: FF.fontHeading, fontWeight: 500, fontSize: 19, color: FF.ink }}>{it.name}</div>
                <div style={{ fontFamily: FF.fontEditorial, fontStyle: 'italic', fontSize: 13, color: FF.inkMuted }}>{it.sub}</div>
              </div>
              {sel && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={FF.ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              )}
            </button>
          );
        })}
      </div>
      <PhoneFooter>
        <FFButton fullWidth size="lg" onClick={onNext} disabled={!picked}>Continue</FFButton>
      </PhoneFooter>
    </PhonePage>
  );
}

// ─── Goal dial — circular picker ───
function FlowC_Goal({ onNext, onBack, mins, setMins }) {
  const opts = [3, 5, 10, 15, 20];
  return (
    <PhonePage>
      <PhoneHeader step={3} total={6} onBack={onBack}/>
      <h2 style={{
        fontFamily: FF.fontHeading, fontWeight: 500, fontSize: 28,
        margin: '0 0 4px', color: FF.ink, letterSpacing: '-0.02em',
      }}>How many minutes?</h2>
      <p style={{
        fontFamily: FF.fontEditorial, fontStyle: 'italic',
        fontSize: 15, color: FF.inkMuted, margin: '0 0 24px',
      }}>Daily. Small consistency beats big sporadic.</p>

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '16px 0' }}>
        <div style={{
          width: 180, height: 180, borderRadius: '50%',
          background: FF.fretboardPlate,
          border: `1.5px solid ${FF.ink}`,
          boxShadow: `4px 4px 0 ${FF.spot}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column',
        }}>
          <div style={{
            fontFamily: FF.fontHeading, fontWeight: 500, fontSize: 80,
            lineHeight: 0.85, color: FF.ink, letterSpacing: '-0.04em',
          }}>{mins}</div>
          <div style={{
            fontFamily: FF.fontEditorial, fontStyle: 'italic',
            fontSize: 18, color: FF.inkMuted, marginTop: 4,
          }}>minutes</div>
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 24 }}>
          {opts.map(m => {
            const sel = mins === m;
            return (
              <button key={m} onClick={() => setMins(m)} style={{
                width: 44, height: 44, borderRadius: 999,
                background: sel ? FF.ink : 'transparent',
                color: sel ? FF.paper : FF.ink,
                border: `1.5px solid ${sel ? FF.ink : FF.ink300}`,
                fontFamily: FF.fontMono, fontWeight: 700, fontSize: 13,
                cursor: 'pointer',
              }}>{m}</button>
            );
          })}
        </div>
      </div>

      <PhoneFooter>
        <FFButton fullWidth size="lg" onClick={onNext}>Continue</FFButton>
      </PhoneFooter>
    </PhonePage>
  );
}

function FlowC_Reminder({ onNext, onBack, time, setTime }) {
  const slots = [
    { t: '7:00',  label: 'morning' },
    { t: '12:30', label: 'lunch' },
    { t: '18:00', label: 'after work' },
    { t: '21:30', label: 'before bed' },
  ];
  return (
    <PhonePage>
      <PhoneHeader step={4} total={6} onBack={onBack}/>
      <h2 style={{
        fontFamily: FF.fontHeading, fontWeight: 500, fontSize: 28,
        margin: '0 0 4px', color: FF.ink, letterSpacing: '-0.02em',
      }}>When's good?</h2>
      <p style={{
        fontFamily: FF.fontEditorial, fontStyle: 'italic',
        fontSize: 15, color: FF.inkMuted, margin: '0 0 18px',
      }}>One quiet nudge a day. Nothing more.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {slots.map(s => {
          const sel = time === s.t;
          return (
            <button key={s.t} onClick={() => setTime(s.t)} style={{
              padding: '14px 18px', borderRadius: 14,
              background: sel ? FF.fretboardPlate : FF.paperHi,
              border: sel ? `1.5px solid ${FF.ink}` : `1px solid ${FF.ink300}`,
              boxShadow: sel ? `3px 3px 0 ${FF.spot}` : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              cursor: 'pointer',
            }}>
              <span style={{
                fontFamily: FF.fontHeading, fontWeight: 500, fontSize: 24, color: FF.ink,
                fontVariantNumeric: 'tabular-nums',
              }}>{s.t}</span>
              <span style={{
                fontFamily: FF.fontEditorial, fontStyle: 'italic',
                fontSize: 14, color: FF.inkMuted,
              }}>{s.label}</span>
            </button>
          );
        })}
      </div>
      <PhoneFooter>
        <FFButton fullWidth size="lg" onClick={onNext}>Allow notifications</FFButton>
        <button onClick={onNext} style={{
          background: 'transparent', border: 0, padding: '8px 0', cursor: 'pointer',
          fontFamily: FF.fontEditorial, fontStyle: 'italic',
          fontSize: 14, color: FF.inkMuted,
        }}>not now</button>
      </PhoneFooter>
    </PhonePage>
  );
}

function FlowC_Taste({ onNext, onBack }) {
  const [picked, setPicked] = React.useState(null);
  const [shimmer, setShimmer] = React.useState(false);
  const correct = 'C';
  const choices = ['A', 'B', 'C', 'D'];

  React.useEffect(() => {
    const t = setInterval(() => setShimmer(s => !s), 1300);
    return () => clearInterval(t);
  }, []);

  return (
    <PhonePage>
      <PhoneHeader step={5} total={6} onBack={onBack}/>
      <h2 style={{
        fontFamily: FF.fontHeading, fontWeight: 500, fontSize: 26,
        margin: '0 0 4px', color: FF.ink, letterSpacing: '-0.02em',
      }}>This is what practice feels like.</h2>
      <p style={{
        fontFamily: FF.fontEditorial, fontStyle: 'italic',
        fontSize: 14, color: FF.inkMuted, margin: '0 0 16px',
      }}>One question. Then you're in.</p>

      <FFCard elevation="plate" padding={12} style={{ position: 'relative' }}>
        <Fretboard width={300} height={130} frets={5} highlights={[{ string: 5, fret: 3, state: 'ask' }]} showStringLabels={false}/>
        {/* misregistration shimmer overlay — animated dot drift */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          opacity: shimmer ? 0.4 : 0,
          transition: `opacity 700ms ${FF.ease}`,
        }}/>
      </FFCard>

      <div style={{ marginTop: 14, fontFamily: FF.fontMono, fontWeight: 700, fontSize: 10, letterSpacing: '0.16em', color: FF.inkMuted, textAlign: 'center' }}>
        WHAT NOTE?
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
        {choices.map(c => {
          const isPicked = picked === c;
          const isRight = picked && c === correct;
          const isWrong = isPicked && c !== correct;
          let bg = FF.paperHi, fg = FF.ink, border = `1.5px solid ${FF.ink}`;
          if (isRight) { bg = FF.green; fg = FF.paper; border = `1.5px solid ${FF.green}`; }
          else if (isWrong) { bg = FF.spot; fg = FF.paper; border = `1.5px solid ${FF.spot}`; }
          return (
            <button key={c} onClick={() => setPicked(c)} disabled={!!picked} style={{
              padding: '16px 0', borderRadius: 12,
              background: bg, color: fg, border,
              fontFamily: FF.fontHeading, fontWeight: 500, fontSize: 22,
              cursor: picked ? 'default' : 'pointer',
            }}>{c}</button>
          );
        })}
      </div>

      {picked && (
        <div style={{
          marginTop: 10, fontFamily: FF.fontEditorial, fontStyle: 'italic',
          fontSize: 15, color: picked === correct ? FF.green : FF.spotDeep, textAlign: 'center',
        }}>
          {picked === correct ? 'Yep. C, fifth string third fret.' : `Not quite — that was ${correct}.`}
        </div>
      )}

      <PhoneFooter>
        <FFButton fullWidth size="lg" onClick={onNext} disabled={!picked} trailing="→">Keep going</FFButton>
      </PhoneFooter>
    </PhonePage>
  );
}

function FlowC_Triumph({ onBack }) {
  return (
    <PhonePage>
      <PhoneHeader step={6} total={6} onBack={onBack}/>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{
          fontFamily: FF.fontPoster, fontWeight: 700, fontSize: 14,
          letterSpacing: '0.22em', color: FF.spotDeep, textTransform: 'uppercase', marginBottom: 14,
        }}>DAY ONE.</div>
        <h2 style={{
          fontFamily: FF.fontHeading, fontWeight: 500, fontSize: 50,
          lineHeight: 0.95, letterSpacing: '-0.025em', margin: 0, color: FF.ink,
        }}>
          You're<br/>
          <span style={{ fontFamily: FF.fontEditorial, fontStyle: 'italic', fontWeight: 400 }}>already</span>
          <br/><span style={{ color: FF.spotDeep }}>practising</span>.
        </h2>
        <p style={{
          fontFamily: FF.fontEditorial, fontStyle: 'italic',
          fontSize: 16, lineHeight: 1.45, color: FF.inkMuted,
          margin: '20px 0 0', maxWidth: 280,
        }}>Tomorrow: five more notes. Same time, same place. <span style={{ color: FF.ink }}>Save your streak?</span></p>
      </div>
      <PhoneFooter>
        <FFButton fullWidth size="lg">Save with Apple</FFButton>
        <button style={{
          background: 'transparent', border: `1.5px solid ${FF.ink}`,
          padding: '14px 0', borderRadius: 14, cursor: 'pointer',
          fontFamily: FF.fontBody, fontWeight: 600, fontSize: 15, color: FF.ink,
        }}>Continue without saving</button>
      </PhoneFooter>
    </PhonePage>
  );
}

window.FlowC = {
  Intro: FlowC_Intro, Calibrate: FlowC_Calibrate, Instrument: FlowC_Instrument,
  Goal: FlowC_Goal, Reminder: FlowC_Reminder, Taste: FlowC_Taste, Triumph: FlowC_Triumph,
};
Object.assign(window, { FlowC_Intro, FlowC_Calibrate, FlowC_Instrument, FlowC_Goal, FlowC_Reminder, FlowC_Taste, FlowC_Triumph });
