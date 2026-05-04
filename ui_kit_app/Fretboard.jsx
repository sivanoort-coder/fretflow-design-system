// Fretboard.jsx — Fretflow v4. The fretboard is the hero — rendered as a real
// instrument plate on warm parchment, not as printed score.
// Used inside an FFCard elevation="plate".

const STANDARD_TUNING = ['E', 'B', 'G', 'D', 'A', 'E']; // top→bottom = high E first
const CHROMATIC = ['C','C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B'];

const RISO = {
  paper:    '#F4EEDF',
  paperHi:  '#FBF7EA',
  plate:    '#EFE6CF',  // warm parchment behind the fretboard
  ink:      '#152066',
  ink500:   '#2C3B86',
  ink300:   '#A6AED0',
  inkMuted: '#5A6499',
  spot:     '#FF5A2C',
  spotDeep: '#C13A14',
  green:    '#2E8B57',
};

function noteAt(openNote, fret) {
  const idx = CHROMATIC.indexOf(openNote);
  return CHROMATIC[(idx + fret) % 12];
}

function Fretboard({
  frets = 12,
  width = 360,
  height = 180,
  highlights = [],
  onTap,
  showAllNotes = false,
  showStringLabels = true,
  markers = [3, 5, 7, 9, 12],
}) {
  const stringCount = 6;
  const padX = showStringLabels ? 26 : 18;
  const padY = 14;
  const w = width - padX - 14;
  const h = height - padY * 2;
  const fretW = w / frets;
  const stringSpace = h / (stringCount - 1);

  // String "weights" — high to low E
  const stringWeights = [0.9, 1.0, 1.2, 1.4, 1.7, 2.0];
  const stringLabels = ['e', 'B', 'G', 'D', 'A', 'E'];

  const fretX = (fretIdx) => padX + fretIdx * fretW;
  const cellCenterX = (fretIdx) => padX + fretIdx * fretW - fretW / 2;
  const stringY = (strIdx) => padY + strIdx * stringSpace;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', overflow: 'visible' }}>
      {/* parchment plate */}
      <rect x={padX - 2} y={padY - 6} width={w + 8} height={h + 12} fill={RISO.plate} stroke={RISO.ink} strokeWidth="1"/>

      {/* nut — heavier ink bar */}
      <rect x={padX - 4} y={padY - 6} width="3" height={h + 12} fill={RISO.ink}/>

      {/* fret wire — thin ink rules */}
      {Array.from({length: frets}, (_, i) => i + 1).map(f => (
        <line key={f}
          x1={fretX(f)} y1={padY - 6} x2={fretX(f)} y2={padY + h + 6}
          stroke={RISO.ink} strokeWidth="0.85" strokeLinecap="butt" opacity="0.85"/>
      ))}

      {/* fret position markers — soft inlays in the parchment */}
      {markers.filter(m => m <= frets).map(m => {
        const cx = cellCenterX(m);
        if (m === 12) {
          return (
            <g key={m}>
              <circle cx={cx} cy={padY + stringSpace * 1.5} r="2.6" fill={RISO.ink} opacity="0.18"/>
              <circle cx={cx} cy={padY + stringSpace * 3.5} r="2.6" fill={RISO.ink} opacity="0.18"/>
            </g>
          );
        }
        const cy = padY + h / 2;
        return <circle key={m} cx={cx} cy={cy} r="2.6" fill={RISO.ink} opacity="0.18"/>;
      })}

      {/* strings */}
      {Array.from({length: stringCount}, (_, i) => i).map(i => (
        <line key={i}
          x1={padX} y1={stringY(i)} x2={padX + w} y2={stringY(i)}
          stroke={RISO.ink} strokeWidth={stringWeights[i]} strokeLinecap="butt" opacity="0.95"/>
      ))}

      {/* tuning labels (left of nut) */}
      {showStringLabels && Array.from({length: stringCount}, (_, i) => (
        <text key={`tn-${i}`}
          x={padX - 8} y={stringY(i) + 3} textAnchor="end"
          fontFamily="'JetBrains Mono', monospace" fontWeight="700" fontSize="9"
          fill={RISO.ink} opacity="0.65">{stringLabels[i]}</text>
      ))}

      {/* tap targets */}
      {onTap && Array.from({length: stringCount}, (_, s) =>
        Array.from({length: frets + 1}, (_, f) => (
          <rect key={`${s}-${f}`}
            x={f === 0 ? 0 : fretX(f - 1)}
            y={stringY(s) - stringSpace / 2}
            width={f === 0 ? padX : fretW}
            height={stringSpace}
            fill="transparent"
            style={{ cursor: 'pointer' }}
            onClick={() => onTap({ string: s, fret: f, note: noteAt(STANDARD_TUNING[s], f) })}/>
        ))
      )}

      {/* show-all-notes (study mode) */}
      {showAllNotes && Array.from({length: stringCount}, (_, s) =>
        Array.from({length: frets + 1}, (_, f) => {
          const n = noteAt(STANDARD_TUNING[s], f);
          return (
            <text key={`l-${s}-${f}`}
              x={f === 0 ? padX / 2 : cellCenterX(f)}
              y={stringY(s) + 3} textAnchor="middle"
              fontFamily="'JetBrains Mono', monospace"
              fontWeight="700" fontSize="9" fill={RISO.ink} opacity="0.50">{n}</text>
          );
        })
      )}

      {/* highlights — note dots on strings (with soft spot drop for active) */}
      {highlights.map((hh, i) => {
        const cx = hh.fret === 0 ? padX / 2 : cellCenterX(hh.fret);
        const cy = stringY(hh.string);
        const colors = {
          active:  { fill: RISO.ink,    stroke: RISO.paper, text: RISO.paper, drop: RISO.spot },
          ask:     { fill: RISO.ink,    stroke: RISO.paper, text: RISO.paper, drop: RISO.spot, label: '?' },
          correct: { fill: RISO.green,  stroke: RISO.paper, text: RISO.paper, drop: null },
          wrong:   { fill: RISO.spot,   stroke: RISO.paper, text: RISO.paper, drop: null },
          hint:    { fill: RISO.paper,  stroke: RISO.ink,   text: RISO.ink,   drop: null },
        }[hh.state || 'active'];
        const r = hh.size || 11;
        const label = hh.label || hh.note || colors.label || noteAt(STANDARD_TUNING[hh.string], hh.fret);
        return (
          <g key={i}>
            {colors.drop && (
              <circle cx={cx} cy={cy} r={r + 2} fill={colors.drop} opacity="0.75"/>
            )}
            <circle cx={cx} cy={cy} r={r} fill={colors.fill} stroke={colors.stroke} strokeWidth="1.5"/>
            <text x={cx} y={cy + r * 0.32}
              textAnchor="middle"
              fontFamily="'Fraunces', Georgia, serif"
              fontWeight="500" fontSize={r * 1.0}
              letterSpacing="-0.02em"
              fill={colors.text}>{label}</text>
          </g>
        );
      })}
    </svg>
  );
}

window.Fretboard = Fretboard;
window.STANDARD_TUNING = STANDARD_TUNING;
window.noteAt = noteAt;
window.CHROMATIC = CHROMATIC;
