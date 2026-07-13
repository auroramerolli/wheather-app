"use client";

// Ikonat e motit, të vizatuara si SVG.
export default function WeatherIcon({ type, isDay = true, size = 40 }) {
  const sun = "var(--accent-sun)";
  const cloud = "var(--text-muted)";
  const rain = "var(--accent-rain)";

  switch (type) {
    case "sun":
      return isDay ? (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="8" fill={sun} />
          {[...Array(8)].map((_, i) => {
            const a = (i * Math.PI) / 4;
            const x1 = 20 + Math.cos(a) * 13;
            const y1 = 20 + Math.sin(a) * 13;
            const x2 = 20 + Math.cos(a) * 17;
            const y2 = 20 + Math.sin(a) * 17;
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={sun} strokeWidth="2" strokeLinecap="round" />
            );
          })}
        </svg>
      ) : (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <path
            d="M25 8a12 12 0 1 0 7 21.8A14 14 0 0 1 25 8Z"
            fill="var(--accent-sun-soft)"
          />
        </svg>
      );
    case "partly":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <circle cx="16" cy="16" r="6.5" fill={sun} />
          <ellipse cx="22" cy="25" rx="11" ry="7.5" fill={cloud} />
        </svg>
      );
    case "fog":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          {[13, 20, 27].map((y, i) => (
            <line key={i} x1="7" y1={y} x2="33" y2={y} stroke={cloud} strokeWidth="2.5" strokeLinecap="round" opacity={1 - i * 0.2} />
          ))}
        </svg>
      );
    case "drizzle":
    case "rain":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <ellipse cx="20" cy="16" rx="12" ry="8" fill={cloud} />
          {[13, 20, 27].map((x, i) => (
            <line key={i} x1={x} y1="25" x2={x - 3} y2="33" stroke={rain} strokeWidth="2.2" strokeLinecap="round" />
          ))}
        </svg>
      );
    case "snow":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <ellipse cx="20" cy="15" rx="12" ry="8" fill={cloud} />
          {[13, 20, 27].map((x, i) => (
            <circle key={i} cx={x} cy="29" r="1.8" fill="#eaf1ff" />
          ))}
        </svg>
      );
    case "storm":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <ellipse cx="20" cy="14" rx="12" ry="8" fill={cloud} />
          <path d="M21 22 L15 31 L20 31 L17 38 L26 27 L20 27 Z" fill={sun} />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <ellipse cx="20" cy="20" rx="13" ry="9" fill={cloud} />
        </svg>
      );
  }
}
