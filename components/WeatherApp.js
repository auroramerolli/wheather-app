"use client";

import { useEffect, useState, useCallback } from "react";
import SearchBar from "./SearchBar";
import DayArc from "./DayArc";
import HourlyForecast from "./HourlyForecast";
import DailyForecast from "./DailyForecast";
import WeatherIcon from "./WeatherIcon";
import { getForecast, describeCode } from "@/lib/weather";

const DEFAULT_PLACE = { name: "Tiranë", country: "Shqipëri", latitude: 41.3275, longitude: 19.8187 };

export default function WeatherApp() {
  const [place, setPlace] = useState(null);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [now, setNow] = useState(new Date());

  const loadForPlace = useCallback(async (p) => {
    setStatus("loading");
    setPlace(p);
    try {
      const forecast = await getForecast(p.latitude, p.longitude);
      setData(forecast);
      setNow(new Date());
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, []);

  // Ngarkimi fillestar: provo vendndodhjen e shfletuesit, përndryshe Tiranë.
  useEffect(() => {
    if (!navigator.geolocation) {
      loadForPlace(DEFAULT_PLACE);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        loadForPlace({
          name: "Vendndodhja jote",
          country: "",
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      () => loadForPlace(DEFAULT_PLACE),
      { timeout: 5000 }
    );
  }, [loadForPlace]);

  useEffect(() => {
    if (data?.current) {
      document.body.classList.toggle("is-night", data.current.is_day === 0);
    }
  }, [data]);

  const current = data?.current;
  const { label, icon } = current ? describeCode(current.weather_code) : { label: "", icon: "cloud" };

  return (
    <div className="container">
      <SearchBar onSelectPlace={loadForPlace} />

      {status === "loading" && (
        <div className="state-panel">
          <div className="icon-wrap">
            <WeatherIcon type="partly" size={48} />
          </div>
          <div className="state-title">Duke marrë motin…</div>
        </div>
      )}

      {status === "error" && (
        <div className="state-panel">
          <div className="icon-wrap">
            <WeatherIcon type="storm" size={48} />
          </div>
          <div className="state-title">Nuk munda ta marr motin</div>
          <p>Provo përsëri ose kërko një qytet tjetër.</p>
          <button className="pill-btn" onClick={() => loadForPlace(place ?? DEFAULT_PLACE)}>
            Provo përsëri
          </button>
        </div>
      )}

      {status === "ready" && data && (
        <>
          <div className="hero">
            <h1 className="hero-place">
              {place.name}
              {place.country ? `, ${place.country}` : ""}
            </h1>
            <div className="hero-date">
              {now.toLocaleDateString("sq-AL", { weekday: "long", day: "numeric", month: "long" })}
            </div>

            <div className="hero-temp-row">
              <WeatherIcon type={icon} isDay={current.is_day === 1} size={72} />
              <div className="hero-temp">
                {Math.round(current.temperature_2m)}
                <sup>°C</sup>
              </div>
            </div>

            <div className="hero-meta">
              <span className="label">{label}</span> · Ndihet si{" "}
              {Math.round(current.apparent_temperature)}°C · Lagështia{" "}
              {current.relative_humidity_2m}% · Erë {Math.round(current.wind_speed_10m)} km/h
            </div>
          </div>

          <DayArc sunrise={data.daily.sunrise[0]} sunset={data.daily.sunset[0]} now={now} />

          <HourlyForecast hourly={data.hourly} now={now} />
          <DailyForecast daily={data.daily} />

          <div className="footer-note">Të dhënat nga Open-Meteo</div>
        </>
      )}
    </div>
  );
}
