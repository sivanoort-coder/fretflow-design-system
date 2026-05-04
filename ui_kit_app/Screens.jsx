// Screens.jsx — Fretflow v4 (Fretboard-Hero).
// Sentence case throughout. The fretboard sits at the center of every practice
// flow, on a warm parchment plate. Daily-app fluency: 14px corners, soft borders,
// the press-printed primary CTA is the single bold gesture per screen.

function HeaderBar({ title, right, eyebrow }) {
  return (
    <div style={{
      padding: '70px 20px 6px', display: 'flex',
      alignItems: 'flex-end', justifyContent: 'space-between', gap: 12,
    }}>
      <div style={{ minWidth: 0, flex: 1 }}>
        {eyebrow && (
          <div style={{
            fontFamily: FF.fontEditorial, fontStyle: 'italic',
            fontSize: 14, color: FF.inkMuted, marginBottom: 2,
          }}>{eyebrow}</div>
        )}
        <div style={{
          fontFamily: FF.fontHeading, fontWeight: 500, fontSize: 36,
          lineHeight: 1, letterSpacing: '-0.02em', color: FF.ink,
        }}>{title}</div>
      </div>
      {right && <div style={{ flexShrink: 0 }}>{right}</div>}
    </div>
  );
}

// Section eyebrow
function SectionTitle({ children, color }) {
  return <FFLabel color={color || FF.inkMuted}>{children}</FFLabel>;
}

// ───────── Today screen ─────────
function TodayScreen({ onStart }) {
  return (
    <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <HeaderBar
        eyebrow="Wednesday — five quiet minutes."
        title="Today, the A string."
        right={<FFStreak days={14}/>}
      />

      {/* Hero card — instrument plate is the focus */}
      <FFCard elevation="hero" padding={18}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
          <SectionTitle>Today's range</SectionTitle>
          <span style={{
            fontFamily: FF.fontEditorial, fontStyle: 'italic',
            fontSize: 13, color: FF.inkMuted,
          }}>about five minutes</span>
        </div>
        <div style={{
          fontFamily: FF.fontHeading, fontWeight: 500, fontSize: 26,
          lineHeight: 1.05, letterSpacing: '-0.02em', color: FF.ink,
        }}>Five notes, between the nut and seventh fret.</div>

        <div style={{
          marginTop: 14,
          background: FF.fretboardPlate,
          border: `1px solid ${FF.ink300}`,
          borderRadius: 12,
          padding: '10px 6px',
        }}>
          <Fretboard
            width={314} height={104}
            frets={7}
            highlights={[
              { string: 4, fret: 0, state: 'hint',   note: 'A',  size: 8 },
              { string: 4, fret: 2, state: 'hint',   note: 'B',  size: 8 },
              { string: 4, fret: 3, state: 'active', note: 'C',  size: 11 },
              { string: 4, fret: 5, state: 'hint',   note: 'D',  size: 8 },
              { string: 4, fret: 7, state: 'hint',   note: 'E',  size: 8 },
            ]}
            markers={[3, 5, 7]}/>
        </div>

        <div style={{ marginTop: 14 }}>
          <FFButton variant="primary" size="lg" fullWidth trailing="→" onClick={onStart}>
            Begin practice
          </FFButton>
        </div>
      </FFCard>

      {/* This week */}
      <div>
        <SectionTitle>This week</SectionTitle>
        <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
          {['M','T','W','T','F','S','S'].map((d, i) => {
            const done = i < 3;
            const today = i === 2;
            return (
              <div key={i} style={{
                flex: 1, aspectRatio: '1 / 1.15',
                background: today ? FF.spot : (done ? FF.paperHi : 'transparent'),
                border: today ? 'none' : `1px solid ${FF.ink300}`,
                borderRadius: 10,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 3,
              }}>
                <span style={{
                  fontFamily: FF.fontMono, fontSize: 10, fontWeight: 700,
                  color: today ? FF.paper : FF.inkMuted, letterSpacing: '0.10em',
                }}>{d}</span>
                {done && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke={today ? FF.paper : FF.green} strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent */}
      <div>
        <SectionTitle>Recent sessions</SectionTitle>
        <FFCard elevation="flat" padding={0} style={{ marginTop: 10, overflow: 'hidden' }}>
          {[
            { t: 'String 6 — frets 0 to 7',    m: 'Yesterday',  score: 92, tone: 'green' },
            { t: 'Intervals — fourths & fifths', m: '2 days ago', score: 78, tone: 'spot'  },
            { t: 'Open chords by ear',         m: '4 days ago', score: 65, tone: 'spot'  },
          ].map((r, i, arr) => (
            <div key={i} style={{
              padding: '14px 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
              borderTop: i === 0 ? 'none' : `1px solid ${FF.paperRule}`,
            }}>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{
                  fontFamily: FF.fontBody, fontWeight: 600, fontSize: 14,
                  color: FF.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>{r.t}</div>
                <div style={{
                  fontFamily: FF.fontEditorial, fontStyle: 'italic',
                  fontSize: 13, color: FF.inkMuted, marginTop: 1, whiteSpace: 'nowrap',
                }}>{r.m}</div>
              </div>
              <div style={{
                fontFamily: FF.fontMono, fontWeight: 700, fontSize: 13,
                color: r.tone === 'green' ? FF.green : FF.spotDeep,
                fontVariantNumeric: 'tabular-nums',
              }}>{r.score}%</div>
            </div>
          ))}
        </FFCard>
      </div>
    </div>
  );
}

// ───────── Practice (note ID) screen ─────────
function PracticeScreen({ onAnswer, question, feedback }) {
  const fret = question?.fret ?? 3;
  const correctNote = question?.note ?? 'C';
  return (
    <div style={{ padding: '60px 16px 16px', display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>
      {/* Top meta */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{
          fontFamily: FF.fontMono, fontSize: 11, fontWeight: 700,
          letterSpacing: '0.05em', color: FF.inkMuted,
          fontVariantNumeric: 'tabular-nums',
        }}>QUESTION 3 OF 8</div>
        <div style={{
          fontFamily: FF.fontMono, fontWeight: 700, fontSize: 14, color: FF.ink,
          fontVariantNumeric: 'tabular-nums', letterSpacing: '0.04em',
        }}>2:14</div>
      </div>
      <FFStepper value={2} total={8}/>

      {/* Question */}
      <div style={{ textAlign: 'center', marginTop: 4 }}>
        <div style={{
          fontFamily: FF.fontHeading, fontWeight: 500, fontSize: 28,
          lineHeight: 1.05, letterSpacing: '-0.02em', color: FF.ink,
        }}>What note is this?</div>
      </div>

      {/* Fretboard plate */}
      <FFCard elevation="plate" padding={12}>
        <Fretboard
          width={324} height={140}
          frets={7}
          highlights={[{
            string: 4,
            fret,
            state: feedback ? feedback.state : 'ask',
            label: feedback ? correctNote : '?',
            size: 14,
          }]}
          markers={[3, 5, 7]}/>
      </FFCard>

      {/* Answer pads */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {['G','A','B','C','D','E','F','don\'t know'].map((n, i) => {
          const isAnswer = feedback && correctNote === n;
          const isWrong = feedback?.state === 'wrong' && feedback?.guess === n;
          const disabled = !!feedback;
          const isDontKnow = n === "don't know";

          let bg = FF.paperHi, fg = FF.ink, border = `1.5px solid ${FF.ink}`, family = FF.fontHeading, weight = 500, fs = 22, italic = false, opacity = 1;
          if (isAnswer) { bg = FF.green; fg = FF.paper; border = `1.5px solid ${FF.green}`; }
          else if (isWrong) { bg = FF.spot; fg = FF.paper; border = `1.5px solid ${FF.spot}`; }
          else if (disabled) { opacity = 0.45; }
          if (isDontKnow) { family = FF.fontEditorial; weight = 400; italic = true; fs = 15; bg = 'transparent'; border = `1.5px dashed ${FF.ink300}`; fg = FF.inkMuted; }

          return (
            <button key={i}
              onClick={() => onAnswer && onAnswer(n)}
              disabled={disabled}
              style={{
                background: bg, color: fg, border, borderRadius: 12, padding: '14px 0',
                fontFamily: family, fontWeight: weight, fontStyle: italic ? 'italic' : 'normal', fontSize: fs,
                letterSpacing: '-0.01em',
                cursor: disabled ? 'default' : 'pointer',
                opacity,
                transition: `all 200ms ${FF.ease}`,
              }}>{n}</button>
          );
        })}
      </div>

      {/* Feedback */}
      <div style={{ minHeight: 24, textAlign: 'center' }}>
        {feedback?.state === 'correct' && (
          <span style={{
            fontFamily: FF.fontEditorial, fontStyle: 'italic',
            fontSize: 16, color: FF.green,
          }}>— that's it.</span>
        )}
        {feedback?.state === 'wrong' && (
          <span style={{
            fontFamily: FF.fontEditorial, fontStyle: 'italic',
            fontSize: 16, color: FF.spotDeep,
          }}>— not quite. That was {correctNote}.</span>
        )}
      </div>
    </div>
  );
}

// ───────── Session complete ─────────
function CompleteScreen({ onContinue }) {
  return (
    <div style={{ padding: '70px 20px 24px', display: 'flex', flexDirection: 'column', gap: 18, height: '100%', justifyContent: 'flex-start' }}>
      <div style={{ textAlign: 'center', marginTop: 12 }}>
        <div style={{
          fontFamily: FF.fontEditorial, fontStyle: 'italic',
          fontSize: 16, color: FF.inkMuted,
        }}>— that's day fourteen.</div>
        <div style={{
          fontFamily: FF.fontHeading, fontWeight: 500, fontSize: 56,
          lineHeight: 1, letterSpacing: '-0.03em', color: FF.ink, marginTop: 10,
        }}>Nice run.</div>
      </div>

      {/* Stats */}
      <FFCard elevation="lifted" padding={20}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        }}>
          <Stat label="Accuracy" value="87%" tone="green"/>
          <Stat label="Time" value="4:48"/>
          <Stat label="Notes" value="24"/>
        </div>
      </FFCard>

      {/* Missed */}
      <FFCard elevation="flat" padding={16}>
        <SectionTitle>You missed two</SectionTitle>
        <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
          <NoteBubble note="B" accidental="♭" state="idle" size={56}/>
          <NoteBubble note="F" accidental="♯" state="idle" size={56}/>
        </div>
        <div style={{
          fontFamily: FF.fontEditorial, fontStyle: 'italic',
          fontSize: 14, color: FF.inkMuted, marginTop: 12,
        }}>Drill these tomorrow?</div>
      </FFCard>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 'auto' }}>
        <FFButton variant="primary" size="lg" fullWidth trailing="→" onClick={onContinue}>
          Continue
        </FFButton>
        <FFButton variant="ghost" size="md" fullWidth>Drill the miss</FFButton>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: FF.fontHeading, fontWeight: 500, fontSize: 30,
        letterSpacing: '-0.02em',
        color: tone === 'green' ? FF.green : FF.ink,
        fontVariantNumeric: 'tabular-nums',
      }}>{value}</div>
      <div style={{
        fontFamily: FF.fontMono, fontSize: 9, fontWeight: 700,
        letterSpacing: '0.16em', textTransform: 'uppercase', color: FF.inkMuted, marginTop: 4,
      }}>{label}</div>
    </div>
  );
}

// ───────── Profile ─────────
function ProfileScreen() {
  return (
    <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <HeaderBar eyebrow="Your progress" title="Theo Hill"/>

      {/* Lifetime band */}
      <FFCard elevation="flat" padding={16}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <FFStreak days={14}/>
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontFamily: FF.fontHeading, fontWeight: 500, fontSize: 22,
              letterSpacing: '-0.02em', color: FF.ink, lineHeight: 1,
            }}>87% lifetime</div>
            <div style={{
              fontFamily: FF.fontEditorial, fontStyle: 'italic',
              fontSize: 13, color: FF.inkMuted, marginTop: 2,
            }}>across 312 notes</div>
          </div>
        </div>
      </FFCard>

      {/* Mastery map */}
      <div>
        <SectionTitle>Fretboard mastery</SectionTitle>
        <FFCard elevation="plate" padding={14} style={{ marginTop: 10 }}>
          <Fretboard
            width={314} height={150}
            frets={12}
            showAllNotes={false}
            highlights={[
              { string: 5, fret: 3, state: 'correct', size: 8 },
              { string: 5, fret: 5, state: 'correct', size: 8 },
              { string: 5, fret: 7, state: 'correct', size: 8 },
              { string: 4, fret: 3, state: 'correct', size: 8 },
              { string: 4, fret: 5, state: 'correct', size: 8 },
              { string: 4, fret: 7, state: 'hint',    size: 8 },
              { string: 3, fret: 5, state: 'hint',    size: 8 },
              { string: 0, fret: 7, state: 'hint',    size: 8 },
            ]}/>
          <div style={{
            display: 'flex', gap: 14, marginTop: 12, flexWrap: 'wrap',
            fontFamily: FF.fontMono, fontSize: 10, fontWeight: 700,
            letterSpacing: '0.10em', textTransform: 'uppercase', color: FF.inkMuted,
          }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
              <span style={{width:9,height:9,borderRadius:999,background:FF.green}}/>solid
            </span>
            <span style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
              <span style={{width:9,height:9,borderRadius:999,background:FF.paper,border:`1px solid ${FF.ink}`}}/>learning
            </span>
            <span style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
              <span style={{width:9,height:9,borderRadius:999,background:'transparent',border:`1px dashed ${FF.ink300}`}}/>untouched
            </span>
          </div>
        </FFCard>
      </div>

      {/* Settings */}
      <div>
        <SectionTitle>Settings</SectionTitle>
        <FFCard elevation="flat" padding={0} style={{ marginTop: 10, overflow: 'hidden' }}>
          {[
            { t: 'Daily reminder',    v: '8:00 a.m.' },
            { t: 'Tuning',            v: 'Standard EADGBE' },
            { t: 'Sound',             v: 'On' },
            { t: 'Sign out',          v: '' },
          ].map((row, i, arr) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '14px 16px',
              borderTop: i === 0 ? 'none' : `1px solid ${FF.paperRule}`,
            }}>
              <span style={{
                fontFamily: FF.fontBody, fontSize: 15, fontWeight: 500, color: FF.ink,
              }}>{row.t}</span>
              <span style={{
                fontFamily: FF.fontMono, fontSize: 12, fontWeight: 600,
                letterSpacing: '0.05em', color: FF.inkMuted,
              }}>{row.v}</span>
            </div>
          ))}
        </FFCard>
      </div>
    </div>
  );
}

// ───────── Onboarding ─────────
function OnboardingScreen({ onContinue }) {
  return (
    <div style={{ padding: '76px 24px 24px', display: 'flex', flexDirection: 'column', gap: 22, height: '100%' }}>
      {/* Logomark — soft rounded square, ink fill */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: 64, height: 64, borderRadius: 16,
          background: FF.ink,
          display: 'grid', placeItems: 'center',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <line x1="6" y1="4" x2="6" y2="20" stroke={FF.paper} strokeWidth="2" strokeLinecap="round"/>
            <line x1="12" y1="4" x2="12" y2="20" stroke={FF.paper} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
            <line x1="18" y1="4" x2="18" y2="20" stroke={FF.paper} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
            <circle cx="12" cy="12" r="3" fill={FF.spot}/>
          </svg>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: FF.fontHeading, fontWeight: 500, fontSize: 42,
          lineHeight: 1, letterSpacing: '-0.02em', color: FF.ink,
        }}>Know your<br/>fretboard.</div>
        <div style={{
          fontFamily: FF.fontEditorial, fontStyle: 'italic',
          fontSize: 17, color: FF.inkMuted, marginTop: 12, lineHeight: 1.4,
          maxWidth: 280, marginLeft: 'auto', marginRight: 'auto',
        }}>Five quiet minutes a day. Real progress, fret by fret.</div>
      </div>

      <FFCard elevation="plate" padding={12}>
        <Fretboard width={300} height={130} frets={7}
          highlights={[
            { string: 4, fret: 3, state: 'active', note: 'C', size: 12 },
            { string: 5, fret: 0, state: 'hint', note: 'A', size: 9 },
            { string: 3, fret: 2, state: 'hint', note: 'E', size: 9 },
          ]}
          markers={[3, 5, 7]}/>
      </FFCard>

      <div style={{ flex: 1 }}/>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <FFButton variant="primary" size="lg" fullWidth trailing="→" onClick={onContinue}>
          Get started
        </FFButton>
        <FFButton variant="ghost" size="md" fullWidth>I already have an account</FFButton>
      </div>
    </div>
  );
}

Object.assign(window, {
  HeaderBar, SectionTitle, Stat,
  TodayScreen, PracticeScreen, CompleteScreen, ProfileScreen, OnboardingScreen,
});
