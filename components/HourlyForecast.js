"use client";

import WeatherIcon from "./WeatherIcon";
import { describeCode } from "@/lib/weather";

export default function HourlyForecast({ hourly, now }) {
  if (!hourly) return null;

  const nowMs = now.getTime();
  const startIdx = hourly.time.findIndex((t) => new Date(t).getTime() >= nowMs);
  const from = startIdx === -1 ? 0 : startIdx;
  const slice = { length: 24, from };

  const items = [];
  for (let i = 0; i < slice.length; i++) {
    const idx = slice.from + i;
    if (idx >= hourly.time.length) break;
    items.push({
      time: hourly.time[idx],
      temp: hourly.temperature_2m[idx],
      code: hourly.weather_code[idx],
      pop: hourly.precipitation_probability?.[idx],
    });
  }

  return (
    <>
      <div className="section-title">Orari (24 orët e ardhshme)</div>
      <div className="hourly-strip">
        {items.map((it, i) => {
          const { icon } = describeCode(it.code);
          const label = i === 0 ? "Tani" : new Date(it.time).toLocaleTimeString("sq-AL", { hour: "2-digit" });
          return (
            <div className="hourly-item" key={it.time}>
              <div className="hourly-time">{label}</div>
              <WeatherIcon type={icon} size={32} />
              <div className="hourly-temp">{Math.round(it.temp)}°</div>
              {typeof it.pop === "number" && it.pop > 0 && (
                <div className="hourly-pop">{it.pop}%</div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
