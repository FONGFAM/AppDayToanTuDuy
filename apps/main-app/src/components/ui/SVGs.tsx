export function Cloud({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 70" className={className} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="65" cy="48" rx="55" ry="28" fill="white" />
      <ellipse cx="42" cy="35" rx="30" ry="25" fill="white" />
      <ellipse cx="82" cy="32" rx="28" ry="23" fill="white" />
    </svg>
  );
}

export function Rainbow({ className = "" }: { className?: string }) {
  const bands = [
    { r: 155, c: "#FF6B6B" },
    { r: 140, c: "#FF9F43" },
    { r: 125, c: "#FFD95A" },
    { r: 110, c: "#8EE28E" },
    { r: 95, c: "#7CC8FF" },
    { r: 80, c: "#C8A8FF" },
  ];
  return (
    <svg viewBox="0 0 320 165" className={className} xmlns="http://www.w3.org/2000/svg">
      {bands.map(({ r, c }) => (
        <path
          key={r}
          d={`M${160 - r} 162 A${r} ${r} 0 0 1 ${160 + r} 162`}
          fill="none"
          stroke={c}
          strokeWidth="13"
          opacity="0.78"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

export function SunSVG({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const r = (a * Math.PI) / 180;
        return (
          <line
            key={a}
            x1={32 + 23 * Math.cos(r)}
            y1={32 + 23 * Math.sin(r)}
            x2={32 + 30 * Math.cos(r)}
            y2={32 + 30 * Math.sin(r)}
            stroke="#FFB300"
            strokeWidth="4"
            strokeLinecap="round"
          />
        );
      })}
      <circle cx="32" cy="32" r="19" fill="#FFD95A" />
      <circle cx="32" cy="32" r="16" fill="#FFE57A" />
      <circle cx="27" cy="28" r="2.5" fill="#FFCA28" opacity="0.7" />
      <circle cx="37" cy="28" r="2.5" fill="#FFCA28" opacity="0.7" />
      <path d="M26 37 Q32 44 38 37" fill="none" stroke="#FFCA28" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
