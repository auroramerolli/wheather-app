// Të gjitha thirrjet përdorin Open-Meteo — falas, pa çelës API.

const GEOCODE_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

// Përshkrimet në shqip për kodet WMO të motit, + tipi i ikonës për t'u vizatuar.
export const WEATHER_CODES = {
  0: { label: "Qiell i pastër", icon: "sun" },
  1: { label: "Kryesisht i pastër", icon: "sun" },
  2: { label: "Pjesërisht i vranët", icon: "partly" },
  3: { label: "I vranët", icon: "cloud" },
  45: { label: "Mjegull", icon: "fog" },
  48: { label: "Mjegull ngrirëse", icon: "fog" },
  51: { label: "Vesë e lehtë", icon: "drizzle" },
  53: { label: "Vesë mesatare", icon: "drizzle" },
  55: { label: "Vesë e dendur", icon: "drizzle" },
  56: { label: "Vesë ngrirëse", icon: "drizzle" },
  57: { label: "Vesë ngrirëse e dendur", icon: "drizzle" },
  61: { label: "Shi i lehtë", icon: "rain" },
  63: { label: "Shi mesatar", icon: "rain" },
  65: { label: "Shi i fortë", icon: "rain" },
  66: { label: "Shi ngrirës", icon: "rain" },
  67: { label: "Shi ngrirës i fortë", icon: "rain" },
  71: { label: "Borë e lehtë", icon: "snow" },
  73: { label: "Borë mesatare", icon: "snow" },
  75: { label: "Borë e fortë", icon: "snow" },
  77: { label: "Kokrriza bore", icon: "snow" },
  80: { label: "Rrebesh i lehtë", icon: "rain" },
  81: { label: "Rrebesh mesatar", icon: "rain" },
  82: { label: "Rrebesh i fortë", icon: "rain" },
  85: { label: "Rrebesh bore i lehtë", icon: "snow" },
  86: { label: "Rrebesh bore i fortë", icon: "snow" },
  95: { label: "Stuhi me rrufe", icon: "storm" },
  96: { label: "Stuhi me breshër", icon: "storm" },
  99: { label: "Stuhi e fortë me breshër", icon: "storm" },
};

export function describeCode(code) {
  return WEATHER_CODES[code] ?? { label: "E panjohur", icon: "cloud" };
}

// Kërkon qytete sipas emrit. Kthen një listë vendesh me koordinata.
export async function geocodeCity(query) {
  if (!query || query.trim().length < 2) return [];

  const url = new URL(GEOCODE_URL);
  url.searchParams.set("name", query.trim());
  url.searchParams.set("count", "5");
  url.searchParams.set("language", "sq");
  url.searchParams.set("format", "json");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Gjeokodimi dështoi");
  const data = await res.json();
  return data.results ?? [];
}

// Merr motin aktual, orar (24h) dhe ditor (7 ditë) për një koordinatë.
export async function getForecast(latitude, longitude) {
  const url = new URL(FORECAST_URL);
  url.searchParams.set("latitude", latitude);
  url.searchParams.set("longitude", longitude);
  url.searchParams.set(
    "current",
    "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m"
  );
  url.searchParams.set("hourly", "temperature_2m,weather_code,precipitation_probability");
  url.searchParams.set(
    "daily",
    "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max"
  );
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("forecast_days", "7");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Marrja e motit dështoi");
  return res.json();
}
