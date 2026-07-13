"use client";

// Harku që tregon ecurinë e ditës mes lindjes
// dhe perëndimit të diellit, me një shënues në pozicionin e tanishëm.
export default function DayArc({ sunrise, sunset, now }) {
  const sunriseMs = new Date(sunrise).getTime();
  const sunsetMs = new Date(sunset).getTime();
  const nowMs = now.getTime();

  const total = sunsetMs - sunriseMs;
  const progress = total > 0 ? Math.min(1, Math.max(0, (nowMs - sunriseMs) / total)) : 0;
  const isDaytime = nowMs >= sunriseMs && nowMs <= sunsetMs;

  // Harku shkon nga 180° (majtas) në 0° (djathtas).
  const angle = Math.PI - progress * Math.PI;
  const cx = 150;
  const cy = 110;
  const r = 92;
  const markerX = cx + Math.cos(angle) * r;
  const markerY = cy - Math.sin(angle) * r;

  const fmt = (iso) =>
    new Date(iso).toLocaleTimeString("sq-AL", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="day-arc-card">
      <div className="day-arc-title">Ecuria e ditës</div>
      <svg viewBox="0 0 300 130" width="100%" height="auto" role="img" aria-label="Pozicioni i diellit gjatë ditës">
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${markerX} ${markerY}`}
          stroke="var(--accent-sun)"
          strokeWidth="2.5"
          fill="none"
          opacity={isDaytime ? 1 : 0.35}
        />
        <circle
          cx={markerX}
          cy={markerY}
          r="7"
          fill={isDaytime ? "var(--accent-sun)" : "var(--text-faint)"}
          stroke="#0d1226"
          strokeWidth="2"
        />
      </svg>
      <div className="day-arc-times">
        <span>Lindja {fmt(sunrise)}</span>
        <span>Perëndimi {fmt(sunset)}</span>
      </div>
    </div>
  );
}
