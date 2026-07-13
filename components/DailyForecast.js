"use client";

import WeatherIcon from "./WeatherIcon";
import { describeCode } from "@/lib/weather";

export default function DailyForecast({ daily }) {
  if (!daily) return null;

  const allMax = Math.max(...daily.temperature_2m_max);
  const allMin = Math.min(...daily.temperature_2m_min);
  const span = allMax - allMin || 1;

  return (
    <>
      <div className="section-title">7 ditët e ardhshme</div>
      <div className="daily-list">
        {daily.time.map((date, i) => {
          const { icon } = describeCode(daily.weather_code[i]);
          const max = daily.temperature_2m_max[i];
          const min = daily.temperature_2m_min[i];
          const leftPct = ((min - allMin) / span) * 100;
          const widthPct = ((max - min) / span) * 100;
          const dayLabel =
            i === 0
              ? "Sot"
              : new Date(date).toLocaleDateString("sq-AL", { weekday: "short" });

          return (
            <div className="daily-row" key={date}>
              <div className="daily-day">{dayLabel}</div>
              <WeatherIcon type={icon} size={26} />
              <div className="daily-bar-track">
                <div
                  className="daily-bar-fill"
                  style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                />
              </div>
              <div className="daily-temps">
                <span className="max">{Math.round(max)}°</span>
                <span className="min">{Math.round(min)}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
