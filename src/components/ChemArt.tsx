// Decorative line-art chemistry drawings (molecules, flasks, formulas).
type P = { className?: string };

export function Benzene({ className }: P) {
  return (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <polygon points="100,30 160,65 160,135 100,170 40,135 40,65" />
      <polygon points="100,48 145,74 145,126 100,152 55,126 55,74" strokeDasharray="0" opacity=".0" />
      <line x1="100" y1="44" x2="148" y2="72" /><line x1="148" y1="128" x2="100" y2="156" /><line x1="52" y1="128" x2="52" y2="72" />
      <line x1="160" y1="65" x2="190" y2="48" /><text x="186" y="40" fontSize="14" fill="currentColor" stroke="none">OH</text>
      <line x1="40" y1="135" x2="10" y2="152" /><text x="0" y="172" fontSize="14" fill="currentColor" stroke="none">CH₃</text>
    </svg>
  );
}

export function MoleculeNet({ className }: P) {
  const nodes: [number, number][] = [[30, 40], [90, 20], [150, 55], [120, 120], [55, 110], [190, 130], [80, 175], [170, 190]];
  const edges: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [3, 5], [4, 6], [6, 7], [5, 7], [1, 4]];
  return (
    <svg viewBox="0 0 220 220" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a]![0]} y1={nodes[a]![1]} x2={nodes[b]![0]} y2={nodes[b]![1]} />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 7 : 4.5} fill="currentColor" fillOpacity={i % 3 === 0 ? 0.25 : 0.6} />
      ))}
    </svg>
  );
}

export function Flask({ className }: P) {
  return (
    <svg viewBox="0 0 120 160" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d="M45 10h30M50 10v45L15 135a12 12 0 0 0 11 17h68a12 12 0 0 0 11-17L70 55V10" />
      <path d="M28 110h64" strokeDasharray="4 4" />
      <circle cx="50" cy="128" r="4" /><circle cx="68" cy="120" r="3" /><circle cx="60" cy="138" r="2.5" />
      <path d="M75 30h8M75 42h5" />
    </svg>
  );
}

export function Formula({ className }: P) {
  return (
    <svg viewBox="0 0 320 60" className={className} aria-hidden>
      <text x="0" y="40" fontSize="26" fontFamily="Fraunces, serif" fill="currentColor">
        C₈H₉NO₂ + H₂O ⇌ C₇H₇O⁻ + …
      </text>
    </svg>
  );
}

export function SectionDivider({ className }: P) {
  return (
    <svg viewBox="0 0 600 40" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <line x1="0" y1="20" x2="250" y2="20" />
      <polygon points="300,4 316,12 316,28 300,36 284,28 284,12" />
      <circle cx="300" cy="20" r="5" fill="currentColor" />
      <line x1="350" y1="20" x2="600" y2="20" />
    </svg>
  );
}
