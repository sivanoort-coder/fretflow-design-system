// Fretboard.jsx — interactive fretboard rendered as a sheet-music staff in the
// Riso × Score system. The "wood" is now ink-on-paper. Highlights are spot/ink/green.

const STANDARD_TUNING = ['E', 'B', 'G', 'D', 'A', 'E']; // top→bottom in display = high E first
const CHROMATIC = ['C','C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B'];

// Riso palette (mirrors FretflowPrimitives.jsx FF object)
const RISO = {
  paper:    '#F4EEDF',
  paperHi:  '#FBF7EA',
  paperWell:'#ECE3CC',
  ink:      '#152066',
  ink500:   '#2C3B86',
  ink300:   '#6E7BB8',
  inkMuted: '#5A6499',
  spot:     '#FF5A2C',
  spotSoft: '#FFB69E',
  spotDeep: '#C13A14',
  green:    '#1F7A4D',
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
  markers = [3, 5, 7, 9, 12],
}) {
  const stringCount = 6;
  const padX = 22, padY = 16;
  const w = width - padX * 2;
  const h = height - padY * 2;
  const fretW = w / frets;
  const stringSpace = h / (stringCount - 1);

  // String "weights" — staff lines are uniform; we vary subtly for guitar feel.
  const stringWeights = [1.0, 1.1, 1.3, 1.5, 1.7, 2.0];

  const fretX = (fretIdx) => padX + fretIdx * fretW;
  const cellCenterX = (fretIdx) => padX + fretIdx * fretW - fretW / 2;
  const stringY = (strIdx) => padY + strIdx * stringSpace;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      {/* paper bed (no wood — this is a printed staff) */}
      <rect x="0" y="0" width={width} height={height} fill={RISO.paperHi}/>

      {/* hairline staff rule outline */}
      <rect x={padX - 4} y={padY - 6} width={w + 8} height={h + 12}
        fill="none" stroke={RISO.ink} strokeWidth="1"/>

      {/* fret markers (ink dots between strings 3 & 4 — like a staff caesura) */}
      {markers.filter(m => m <= frets).map(m => {
        const cx = cellCenterX(m);
        const cy = padY + h / 2;
        if (m === 12) {
          return (
            <g key={m}>
              <circle cx={cx} cy={padY + stringSpace * 1.5} r="3" fill={RISO.ink} opacity="0.75"/>
              <circle cx={cx} cy={padY + stringSpace * 3.5} r="3" fill={RISO.ink} opacity="0.75"/>
            </g>
          );
        }
        return <circle key={m} cx={cx} cy={cy} r="3" fill={RISO.ink} opacity="0.75"/>;
      })}

      {/* nut — heavier ink bar */}
      <rect x={padX - 2} y={padY - 6} width="3" height={h + 12} fill={RISO.ink}/>

      {/* frets (thin ink rules) */}
      {Array.from({length: frets}, (_, i) => i + 1).map(f => (
        <line key={f}
          x1={fretX(f)} y1={padY - 6} x2={fretX(f)} y2={padY + h + 6}
          stroke={RISO.ink} strokeWidth="1" strokeLinecap="butt" opacity="0.55"/>
      ))}

      {/* strings = staff lines */}
      {Array.from({length: stringCount}, (_, i) => i).map(i => (
        <line key={i}
          x1={padX} y1={stringY(i)} x2={padX + w} y2={stringY(i)}
          stroke={RISO.ink} strokeWidth={stringWeights[i]} strokeLinecap="butt"/>
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

      {/* show-all-notes mode (study) */}
      {showAllNotes && Array.from({length: stringCount}, (_, s) =>
        Array.from({length: frets + 1}, (_, f) => {
          const n = noteAt(STANDARD_TUNING[s], f);
          return (
            <text key={`l-${s}-${f}`}
              x={f === 0 ? padX / 2 : cellCenterX(f)}
              y={stringY(s) + 3}
              textAnchor="middle"
              fontFamily="'JetBrains Mono', monospace"
              fontWeight="700"
              fontSize="9"
              fill={RISO.ink}
              opacity="0.55">{n}</text>
          );
        })
      )}

      {/* highlights — note bubbles on the staff */}
      {highlights.map((hh, i) => {
        const cx = hh.fret === 0 ? padX / 2 : cellCenterX(hh.fret);
        const cy = stringY(hh.string);
        const colors = {
          active:  { fill: RISO.spot,    stroke: RISO.ink, text: RISO.paper },
          correct: { fill: RISO.green,   stroke: RISO.ink, text: RISO.paper },
          wrong:   { fill: RISO.spot,    stroke: RISO.ink, text: RISO.paper },
          hint:    { fill: RISO.paperHi, stroke: RISO.ink, text: RISO.ink   },
        }[hh.state || 'active'];
        const r = hh.size || 12;
        const label = hh.note || noteAt(STANDARD_TUNING[hh.string], hh.fret);
        return (
          <g key={i}>
            {/* spot misregistration echo for active state */}
            {hh.state === 'active' && (
              <circle cx={cx + 1.2} cy={cy + 1.2} r={r} fill={RISO.spot} opacity="0.55"/>
            )}
            <circle cx={cx} cy={cy} r={r} fill={colors.fill} stroke={colors.stroke} strokeWidth="1.5"/>
            <text x={cx} y={cy + r * 0.32}
              textAnchor="middle" fontFamily="'JetBrains Mono', monospace"
              fontWeight="700" fontSize={r * 0.85} fill={colors.text}>{label}</text>
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
