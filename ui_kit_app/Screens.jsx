// Screens.jsx — Fretflow app screens, refreshed for the Riso × Score system.

function HeaderBar({ title, right, subtitle }) {
  return (
    <div style={{
      padding: '70px 20px 8px', display: 'flex',
      alignItems: 'flex-end', justifyContent: 'space-between', gap: 12,
    }}>
      <div style={{ minWidth: 0 }}>
        {subtitle && <FFLabel>{subtitle}</FFLabel>}
        <div style={{
          fontFamily: FF.fontDisplay, fontWeight: 700, fontSize: 36,
          lineHeight: 0.9, letterSpacing: FF.trackDisplay, textTransform: 'uppercase',
          color: FF.ink, marginTop: subtitle ? 6 : 0,
        }}>{title}</div>
      </div>
      {right && <div style={{ flexShrink: 0 }}>{right}</div>}
    </div>
  );
}

// Section eyebrow: tiny ink rule + mono caps label.
function SectionTitle({ children, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ width: 14, height: 1.5, background: color || FF.ink }}/>
      <FFLabel color={color || FF.ink}>{children}</FFLabel>
    </div>
  );
}

// ───────── Today screen ─────────
function TodayScreen({ onStart }) {
  return (
    <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <HeaderBar
        subtitle="Wed · day 14"
        title={<>Five<br/>minutes.</>}
        right={<FFStreak days={14}/>}
      />

      <FFCard elevation="hero" padding={22}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <SectionTitle color={FF.spot}>Today's drill</SectionTitle>
          <span style={{
            fontFamily: FF.fontEditorial, fontStyle: 'italic',
            fontSize: 15, color: FF.ink500,
          }}>op. 14</span>
        </div>
        <div style={{
          fontFamily: FF.fontDisplay, fontWeight: 700, fontSize: 30,
          lineHeight: 0.95, letterSpacing: FF.trackDisplay, textTransform: 'uppercase',
          color: FF.ink, marginTop: 10,
        }}>Notes on<br/>String 5</div>
        <div style={{
          fontFamily: FF.fontEditorial, fontStyle: 'italic',
          fontSize: 15, color: FF.ink500, marginTop: 6, lineHeight: 1.35,
        }}>Identify each note as it appears. Frets 0–7.</div>
        <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
          <NoteBubble note="A" state="soft" size={42}/>
          <NoteBubble note="B" state="soft" size={42}/>
          <NoteBubble note="C" state="active" size={50}/>
          <NoteBubble note="D" state="soft" size={42}/>
          <NoteBubble note="E" state="soft" size={42}/>
        </div>
        <div style={{ marginTop: 22 }}>
          <FFButton variant="primary" size="lg" fullWidth onClick={onStart}>
            Start session
          </FFButton>
        </div>
      </FFCard>

      <div>
        <SectionTitle>This week</SectionTitle>
        <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
          {['M','T','W','T','F','S','S'].map((d, i) => {
            const done = i < 3;
            const today = i === 2;
            return (
              <div key={i} style={{
                flex: 1, aspectRatio: '1 / 1.2',
                background: today ? FF.spot : (done ? FF.paperHi : 'transparent'),
                border: `1.5px solid ${FF.ink}`,
                borderRadius: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 4,
                boxShadow: today ? `2px 2px 0 ${FF.ink}` : 'none',
              }}>
                <span style={{
                  fontFamily: FF.fontMono, fontSize: 10, fontWeight: 700,
                  color: today ? FF.paper : FF.ink, letterSpacing: '0.14em',
                }}>{d}</span>
                {done && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke={today ? FF.paper : FF.ink} strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <SectionTitle>Recent</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
          {[
            { t: 'String 6 · frets 0–7',   m: 'Yesterday',     score: '92%', tone: 'green' },
            { t: 'Intervals · 4ths & 5ths', m: '2 days ago',    score: '78%', tone: 'brass' },
            { t: 'Open chords by ear',      m: '4 days ago',    score: '65%', tone: 'brass' },
          ].map((r, i) => (
            <div key={i} style={{
              padding: '12px 14px',
              background: FF.paperHi,
              border: `1.5px solid ${FF.ink}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
            }}>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{
                  fontFamily: FF.fontDisplay, fontWeight: 700, fontSize: 14,
                  letterSpacing: '-0.01em',
                  color: FF.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  textTransform: 'uppercase',
                }}>{r.t}</div>
                <div style={{
                  fontFamily: FF.fontEditorial, fontStyle: 'italic',
                  fontSize: 12, color: FF.ink500, marginTop: 1, whiteSpace: 'nowrap',
                }}>{r.m}</div>
              </div>
              <div style={{
                fontFamily: FF.fontMono, fontWeight: 700, fontSize: 14,
                color: r.tone === 'green' ? FF.green : FF.spot,
                fontVariantNumeric: 'tabular-nums',
              }}>{r.score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ───────── Practice (note ID) screen ─────────
function PracticeScreen({ onAnswer, question, feedback }) {
  return (
    <div style={{ padding: '60px 16px 16px', display: 'flex', flexDirection: 'column', gap: 14, height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <FFPill tone="neutral">String 5 · 3 of 8</FFPill>
        <div style={{
          fontFamily: FF.fontMono, fontWeight: 700, fontSize: 18, color: FF.ink,
          fontVariantNumeric: 'tabular-nums', letterSpacing: '0.05em',
        }}>2:14</div>
      </div>
      <FFProgress value={3} max={8}/>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 18 }}>
        <div style={{ textAlign: 'center' }}>
          <FFLabel>Name this note</FFLabel>
          <div style={{
            fontFamily: FF.fontEditorial, fontStyle: 'italic', fontWeight: 400,
            fontSize: 22, color: FF.ink, marginTop: 6, lineHeight: 1.2,
          }}>Where would you play it?</div>
        </div>

        <div style={{
          padding: 14, background: FF.paperHi,
          border: `1.5px solid ${FF.ink}`,
        }}>
          <Fretboard
            width={324} height={140}
            frets={7}
            highlights={[{ string: 4, fret: question?.fret || 3, state: feedback?.state || 'active', note: feedback?.state ? (question?.note || '?') : '?' }]}
            markers={[3, 5, 7]}/>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8,
        }}>
          {['G','A','B','C','D','E','F','G'].map((n, i) => {
            const isAnswer = feedback && question?.note === n;
            const isWrong = feedback?.state === 'wrong' && feedback?.guess === n;
            const isResult = isAnswer || isWrong;
            return (
              <button key={i}
                onClick={() => onAnswer && onAnswer(n)}
                disabled={!!feedback}
                style={{
                  background: isAnswer ? FF.green : (isWrong ? FF.spot : FF.paperHi),
                  color: isResult ? FF.paper : FF.ink,
                  border: `1.5px solid ${FF.ink}`,
                  borderRadius: 0, padding: '14px 0',
                  fontFamily: FF.fontMono, fontWeight: 700, fontSize: 18,
                  cursor: feedback ? 'default' : 'pointer',
                  boxShadow: feedback ? 'none' : `2px 2px 0 ${FF.ink}`,
                  transform: feedback ? 'none' : 'translate(0,0)',
                  transition: `all 200ms ${FF.ease}`,
                }}>{n}</button>
            );
          })}
        </div>

        <div style={{ minHeight: 24, textAlign: 'center' }}>
          {feedback?.state === 'correct' && (
            <span style={{
              fontFamily: FF.fontEditorial, fontStyle: 'italic',
              fontSize: 16, fontWeight: 500, color: FF.green,
            }}>Nice — that's it.</span>
          )}
          {feedback?.state === 'wrong' && (
            <span style={{
              fontFamily: FF.fontEditorial, fontStyle: 'italic',
              fontSize: 16, fontWeight: 500, color: FF.spotDeep,
            }}>Not quite — that was {question?.note}.</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ───────── Session complete ─────────
function CompleteScreen({ onContinue }) {
  return (
    <div style={{ padding: '70px 20px 24px', display: 'flex', flexDirection: 'column', gap: 18, height: '100%', justifyContent: 'center' }}>
      <FFCard elevation="hero" padding={28}>
        <div style={{ textAlign: 'center' }}>
          <SectionTitle color={FF.spot}>Session complete</SectionTitle>
          <div style={{
            fontFamily: FF.fontDisplay, fontWeight: 700, fontSize: 64,
            lineHeight: 0.85, letterSpacing: '-0.06em', textTransform: 'uppercase',
            color: FF.ink, marginTop: 12,
          }}>NICE.</div>
          <div style={{
            fontFamily: FF.fontEditorial, fontStyle: 'italic',
            fontSize: 18, color: FF.ink500, marginTop: 6,
          }}>Day 14 — don't break the chain.</div>

          <div style={{
            display: 'flex', justifyContent: 'center', gap: 24, marginTop: 24,
            paddingTop: 18, borderTop: `1.5px solid ${FF.ink}`,
          }}>
            <Stat label="Accuracy" value="87%"/>
            <Stat label="Time" value="4:48"/>
            <Stat label="Notes" value="24"/>
          </div>
        </div>
      </FFCard>

      <FFCard elevation="flat" padding={16}>
        <SectionTitle>You missed</SectionTitle>
        <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
          <NoteBubble note="B♭" state="soft" size={48}/>
          <NoteBubble note="F♯" state="soft" size={48}/>
        </div>
        <div style={{
          fontFamily: FF.fontEditorial, fontStyle: 'italic',
          fontSize: 13, color: FF.ink500, marginTop: 12,
        }}>Want to drill these tomorrow?</div>
      </FFCard>

      <FFButton variant="primary" size="lg" fullWidth onClick={onContinue}>Continue</FFButton>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: FF.fontDisplay, fontWeight: 700, fontSize: 28,
        letterSpacing: '-0.03em',
        color: FF.ink, fontVariantNumeric: 'tabular-nums',
      }}>{value}</div>
      <div style={{
        fontFamily: FF.fontMono, fontSize: 9, fontWeight: 700,
        letterSpacing: '0.18em', textTransform: 'uppercase', color: FF.inkMuted, marginTop: 4,
      }}>{label}</div>
    </div>
  );
}

// ───────── Profile ─────────
function ProfileScreen() {
  return (
    <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <HeaderBar subtitle="Your progress" title="THEO"/>

      <FFCard elevation="flat" padding={16}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <FFStreak days={14}/>
          <div>
            <div style={{
              fontFamily: FF.fontMono, fontWeight: 700, fontSize: 14, color: FF.ink,
              letterSpacing: '0.05em', whiteSpace: 'nowrap',
            }}>87% lifetime</div>
            <div style={{
              fontFamily: FF.fontEditorial, fontStyle: 'italic',
              fontSize: 13, color: FF.ink500, whiteSpace: 'nowrap', marginTop: 2,
            }}>across 312 notes</div>
          </div>
        </div>
      </FFCard>

      <div>
        <SectionTitle>Fretboard mastery</SectionTitle>
        <div style={{
          marginTop: 10, padding: 14, background: FF.paperHi,
          border: `1.5px solid ${FF.ink}`,
        }}>
          <Fretboard
            width={324} height={150}
            frets={12}
            showAllNotes={false}
            highlights={[
              { string: 5, fret: 3, state: 'correct', size: 9 },
              { string: 5, fret: 5, state: 'correct', size: 9 },
              { string: 5, fret: 7, state: 'correct', size: 9 },
              { string: 4, fret: 3, state: 'correct', size: 9 },
              { string: 4, fret: 5, state: 'correct', size: 9 },
              { string: 4, fret: 7, state: 'hint', size: 9 },
              { string: 3, fret: 5, state: 'hint', size: 9 },
              { string: 0, fret: 7, state: 'hint', size: 9 },
            ]}/>
          <div style={{
            display: 'flex', gap: 14, marginTop: 12,
            fontFamily: FF.fontMono, fontSize: 10, fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: FF.ink,
          }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
              <span style={{width:10,height:10,background:FF.green,border:`1px solid ${FF.ink}`}}/>solid
            </span>
            <span style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
              <span style={{width:10,height:10,background:FF.paperHi,border:`1px solid ${FF.ink}`}}/>learning
            </span>
            <span style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
              <span style={{width:10,height:10,background:'transparent',border:`1px dashed ${FF.ink}`}}/>untouched
            </span>
          </div>
        </div>
      </div>

      <div>
        <SectionTitle>Settings</SectionTitle>
        <div style={{
          marginTop: 10, background: FF.paperHi,
          border: `1.5px solid ${FF.ink}`, overflow: 'hidden',
        }}>
          {[
            { t: 'Daily reminder', v: '8:00 AM' },
            { t: 'Tuning', v: 'Standard EADGBE' },
            { t: 'Sound', v: 'On' },
            { t: 'Sign out', v: '' },
          ].map((row, i, arr) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '14px 16px',
              borderBottom: i < arr.length - 1 ? `1px solid ${FF.ink}` : 'none',
            }}>
              <span style={{
                fontFamily: FF.fontBody, fontSize: 15, fontWeight: 500, color: FF.ink,
              }}>{row.t}</span>
              <span style={{
                fontFamily: FF.fontMono, fontSize: 11, fontWeight: 600,
                letterSpacing: '0.10em', color: FF.ink500,
              }}>{row.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ───────── Onboarding (sign-in) ─────────
function OnboardingScreen({ onContinue }) {
  return (
    <div style={{ padding: '90px 24px 24px', display: 'flex', flexDirection: 'column', gap: 24, height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: 72, height: 72, background: FF.spot,
          border: `2px solid ${FF.ink}`,
          boxShadow: `4px 4px 0 ${FF.ink}`,
          display: 'grid', placeItems: 'center',
          fontFamily: FF.fontDisplay, fontWeight: 700, fontSize: 38,
          letterSpacing: '-0.05em', color: FF.paper,
        }}>F</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: FF.fontDisplay, fontWeight: 700, fontSize: 44,
          lineHeight: 0.9, letterSpacing: '-0.05em', textTransform: 'uppercase',
          color: FF.ink,
        }}>Know the<br/>notes.</div>
        <div style={{
          fontFamily: FF.fontEditorial, fontStyle: 'italic',
          fontSize: 17, color: FF.ink500, marginTop: 14, lineHeight: 1.35,
        }}>Five minutes a day. Real progress on your fretboard.</div>
      </div>

      <div style={{ padding: 14, background: FF.paperHi, border: `1.5px solid ${FF.ink}` }}>
        <Fretboard width={300} height={130} frets={7}
          highlights={[
            { string: 4, fret: 3, state: 'active', note: 'C', size: 14 },
            { string: 5, fret: 0, state: 'hint', note: 'E', size: 11 },
            { string: 3, fret: 2, state: 'hint', note: 'E', size: 11 },
          ]}
          markers={[3, 5, 7]}/>
      </div>

      <div style={{ flex: 1 }}/>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <FFButton variant="primary" size="lg" fullWidth onClick={onContinue}>Get started</FFButton>
        <FFButton variant="ghost" size="md" fullWidth>I already have an account</FFButton>
      </div>
    </div>
  );
}

Object.assign(window, {
  TodayScreen, PracticeScreen, CompleteScreen, ProfileScreen, OnboardingScreen,
});
