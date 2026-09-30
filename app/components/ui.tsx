"use client";
import { useEffect, useMemo, useRef, useState } from "react";

/* ===== Animated Teddy (pure SVG) ===== */
export function TeddyBear({
  size = 64, className = "", sparkle = true,
}: { size?: number; className?: string; sparkle?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}
      style={{ filter: "drop-shadow(0 6px 20px rgba(255,77,141,0.35))" }}>
      <circle cx="24" cy="26" r="13" fill="#FFB3D1" stroke="#C2185B" strokeWidth="2.5" />
      <circle cx="76" cy="26" r="13" fill="#FFB3D1" stroke="#C2185B" strokeWidth="2.5" />
      <circle cx="24" cy="26" r="6"  fill="#FF4D8D" />
      <circle cx="76" cy="26" r="6"  fill="#FF4D8D" />
      <circle cx="50" cy="52" r="32" fill="#FFB3D1" stroke="#C2185B" strokeWidth="2.5" />
      <ellipse cx="50" cy="62" rx="17" ry="14" fill="#FFE6F0" />
      <circle cx="39" cy="48" r="3.2" fill="#0B0B0F" />
      <circle cx="61" cy="48" r="3.2" fill="#0B0B0F" />
      <circle cx="40.2" cy="47" r="1" fill="#fff" />
      <circle cx="62.2" cy="47" r="1" fill="#fff" />
      <ellipse cx="50" cy="60" rx="3.2" ry="2.6" fill="#0B0B0F" />
      <path d="M50 62 Q46 68 42 65 M50 62 Q54 68 58 65" stroke="#0B0B0F" strokeWidth="1.8"
        fill="none" strokeLinecap="round" />
      <circle cx="32" cy="60" r="3.5" fill="#FF4D8D" opacity="0.45" />
      <circle cx="68" cy="60" r="3.5" fill="#FF4D8D" opacity="0.45" />
      {sparkle && (
        <>
          <circle cx="20" cy="72" r="1.6" fill="#FFB3D1">
            <animate attributeName="opacity" values="0.2;1;0.2" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="82" cy="70" r="1.4" fill="#FFB3D1">
            <animate attributeName="opacity" values="1;0.2;1" dur="2.2s" repeatCount="indefinite" />
          </circle>
        </>
      )}
    </svg>
  );
}

/* ===== Heart ===== */
export function Heart({ size = 24, className = "", color = "#FF4D8D" }: {
  size?: number; className?: string; color?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill={color}>
      <path d="M12 21s-7.5-4.35-9.6-9.06C.9 8.6 3.3 5 6.9 5c2.1 0 3.6 1.1 4.6 2.5C12.5 6.1 14 5 16.1 5c3.6 0 6 3.6 4.5 6.94C18.5 16.65 12 21 12 21z" />
    </svg>
  );
}

/* ===== Reason icons ===== */
export function ReasonIcon({ name, size = 28 }: { name: string; size?: number }) {
  const c = "#FF4D8D";
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none" as const };
  switch (name) {
    case "smile":
      return (<svg {...p}><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="2" /><path d="M8 14c1 1.6 2.4 2.4 4 2.4s3-.8 4-2.4" stroke={c} strokeWidth="2" strokeLinecap="round" /><circle cx="9" cy="10" r="1" fill={c} /><circle cx="15" cy="10" r="1" fill={c} /></svg>);
    case "music":
      return (<svg {...p}><path d="M9 18V6l10-2v12" stroke={c} strokeWidth="2" strokeLinecap="round" /><circle cx="7" cy="18" r="2.5" stroke={c} strokeWidth="2" /><circle cx="17" cy="16" r="2.5" stroke={c} strokeWidth="2" /></svg>);
    case "heart":
      return <Heart size={size} color={c} />;
    case "star":
      return (<svg {...p}><path d="M12 3l2.6 5.8 6.4.5-4.9 4.2 1.5 6.3L12 16.6 6.4 19.8l1.5-6.3L3 9.3l6.4-.5L12 3z" stroke={c} strokeWidth="2" strokeLinejoin="round" /></svg>);
    case "crown":
    default:
      return (<svg {...p}><path d="M4 18h16l-1.2-9-4 3.6L12 6l-2.8 6.6-4-3.6L4 18z" stroke={c} strokeWidth="2" strokeLinejoin="round" /></svg>);
  }
}

/* ===== Typewriter ===== */
export function Typewriter({
  lines, speed = 42, lineDelay = 500, onDone,
}: { lines: string[]; speed?: number; lineDelay?: number; onDone?: () => void }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    if (lineIdx >= lines.length) {
      if (!doneRef.current) { doneRef.current = true; onDone?.(); }
      return;
    }
    const cur = lines[lineIdx];
    if (charIdx < cur.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), speed);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => { setLineIdx(l => l + 1); setCharIdx(0); }, lineDelay);
    return () => clearTimeout(t);
  }, [lineIdx, charIdx, lines, speed, lineDelay, onDone]);

  return (
    <div className="space-y-3">
      {lines.slice(0, lineIdx).map((l, i) => (
        <p key={i} className="text-pink-100/90 leading-relaxed">{l}</p>
      ))}
      {lineIdx < lines.length && (
        <p className="text-pink-100/90 leading-relaxed">
          {lines[lineIdx].slice(0, charIdx)}
          <span className="tw-caret text-pink-400 font-light">|</span>
        </p>
      )}
    </div>
  );
}

/* ===== Confetti ===== */
type Piece = { id: number; left: number; delay: number; duration: number; size: number; type: "teddy" | "heart"; };

export function Confetti({ show }: { show: boolean }) {
  const pieces = useMemo<Piece[]>(
    () => Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1.4,
      duration: 2.8 + Math.random() * 2.4,
      size: 16 + Math.random() * 22,
      type: Math.random() > 0.5 ? "teddy" : "heart",
    })),
    []
  );
  if (!show) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {pieces.map(p => (
        <div key={p.id} className="absolute animate-fall" style={{
          left: `${p.left}%`,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.duration}s`,
        }}>
          {p.type === "teddy"
            ? <TeddyBear size={p.size} sparkle={false} />
            : <Heart size={p.size} color="#FF4D8D" />}
        </div>
      ))}
    </div>
  );
}

/* ===== FloatingBackground — re-export ===== */
export { default as FloatingBackground } from "./FloatingBackground";