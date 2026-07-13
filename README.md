# Aplikacion moti me Next.js

Weather-App është një aplikacion i thjeshtë dhe i shpejtë për parashikimin e motit, i ndërtuar me Next.js (App Router). Është përdor **Open-Meteo**, (një API moti falas) i cili nuk kërkon çelës (API key).

## Veçoritë

- Kërkim qytetesh me sugjerime automatike (gjeokodim)
- Moti aktual: temperatura, ndjesia termike, lagështia, era
- "Ecuria e ditës" — hark që tregon pozicionin e diellit mes lindjes dhe perëndimit
- Parashikim orar për 24 orët e ardhshme
- Parashikim ditor për 7 ditë
- Vendndodhja automatike e shfletuesit (me Tiranën si alternativë)
- Sfond që ndryshon lehtë mes ditës dhe natës

## Si ta ekzekutosh lokalisht

npm install
npm run dev

## Struktura e projektit

app/
  layout.js       # Layout rrënjë, fontet (Fraunces + Inter)
  page.js         # Faqja kryesore
  globals.css     # Sistemi i dizajnit (ngjyra, tipografi)
components/
  WeatherApp.js   # Komponenti kryesor — gjendja dhe rrjedha e të dhënave
  SearchBar.js    # Kërkimi i qyteteve me sugjerime
  DayArc.js       # Harku i ecurisë së ditës
  HourlyForecast.js
  DailyForecast.js
  WeatherIcon.js  # Ikonat SVG të motit
lib/
  weather.js      # Thirrjet ndaj Open-Meteo (gjeokodim + parashikim)


## API e përdorur

[Open-Meteo](https://open-meteo.com) — falas për përdorim jo-komercial, pa çelës API:

- Gjeokodimi: `https://geocoding-api.open-meteo.com/v1/search`
- Parashikimi: `https://api.open-meteo.com/v1/forecast`

