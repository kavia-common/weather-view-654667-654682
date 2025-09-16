/**
 * Weather service providing mock and real API-ready functions.
 * Uses environment variables for later configuration. Do not hardcode secrets.
 */

// PUBLIC_INTERFACE
export async function fetchCurrentWeather(location, { signal } = {}) {
  /**
   * Fetch current weather for a given location.
   * If no API is configured, returns mock data.
   *
   * Params:
   * - location: string city or "city,countryCode"
   * - options.signal: AbortSignal for cancellation (optional)
   *
   * Returns:
   * - { location, tempC, tempF, condition, icon, humidity, windKph, feelsLikeC, updatedAt }
   */
  const apiUrl = process.env.REACT_APP_WEATHER_API_URL;
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  if (!apiUrl || !apiKey) {
    // Mock response
    await delay(250);
    const now = new Date();
    const base = mockBase(location);
    return {
      location: base.pretty,
      tempC: base.tempC,
      tempF: cToF(base.tempC),
      condition: base.condition,
      icon: base.icon,
      humidity: base.humidity,
      windKph: base.windKph,
      feelsLikeC: base.tempC - 1,
      updatedAt: now.toISOString(),
    };
  }

  // Example real call (kept ready for integration)
  const url = `${apiUrl}/current?location=${encodeURIComponent(location)}&key=${apiKey}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
  const data = await res.json();
  // Map your API data model here
  return mapCurrentFromApi(data);
}

// PUBLIC_INTERFACE
export async function fetchForecast(location, days = 5, { signal } = {}) {
  /**
   * Fetch forecast for a given location.
   * Returns mock data if no API config is present.
   *
   * Params:
   * - location: string
   * - days: number of days to fetch
   * - options.signal: AbortSignal (optional)
   *
   * Returns:
   * - Array<{ day, minC, maxC, condition, icon }>
   */
  const apiUrl = process.env.REACT_APP_WEATHER_API_URL;
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  if (!apiUrl || !apiKey) {
    await delay(250);
    return mockForecast(days);
  }

  const url = `${apiUrl}/forecast?location=${encodeURIComponent(location)}&days=${days}&key=${apiKey}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Forecast API error: ${res.status}`);
  const data = await res.json();
  return mapForecastFromApi(data);
}

// Helpers

function cToF(c) { return Math.round((c * 9) / 5 + 32); }
function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

function mockBase(location) {
  const pretty = location
    ? location
    : "San Francisco, US";
  const seed = (pretty.length + new Date().getDate()) % 5;
  const presets = [
    { tempC: 18, condition: "Partly Cloudy", icon: "⛅", humidity: 72, windKph: 14 },
    { tempC: 24, condition: "Sunny", icon: "☀️", humidity: 55, windKph: 10 },
    { tempC: 12, condition: "Light Rain", icon: "🌦️", humidity: 80, windKph: 18 },
    { tempC: 30, condition: "Hot & Sunny", icon: "☀️", humidity: 45, windKph: 8 },
    { tempC: 5, condition: "Cold & Clear", icon: "🌤️", humidity: 60, windKph: 12 },
  ];
  return { pretty, ...presets[seed] };
}

function mockForecast(days) {
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const out = [];
  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    const min = 8 + ((i * 3) % 6);
    const max = min + 7 + (i % 3);
    const roll = (d.getDate() + i) % 4;
    const cond = ["Sunny","Partly Cloudy","Cloudy","Light Rain"][roll];
    const icon = ["☀️","⛅","☁️","🌦️"][roll];
    out.push({
      day: dayNames[d.getDay()],
      minC: min,
      maxC: max,
      condition: cond,
      icon,
    });
  }
  return out;
}

// Mappers for future real API shape
function mapCurrentFromApi(api) {
  // Example mapping; adjust to your API contract
  const c = api.current || api;
  return {
    location: api.location?.name ?? "Unknown",
    tempC: Math.round(c.temp_c ?? c.tempC ?? 0),
    tempF: Math.round(c.temp_f ?? c.tempF ?? 0),
    condition: c.condition?.text ?? c.condition ?? "N/A",
    icon: "☀️",
    humidity: c.humidity ?? 0,
    windKph: Math.round(c.wind_kph ?? c.windKph ?? 0),
    feelsLikeC: Math.round(c.feelslike_c ?? c.feelsLikeC ?? 0),
    updatedAt: new Date().toISOString(),
  };
}

function mapForecastFromApi(api) {
  const days = api.forecast?.forecastday ?? api.days ?? [];
  return days.slice(0, 7).map(d => ({
    day: new Date(d.date).toLocaleDateString(undefined, { weekday: "short" }),
    minC: Math.round(d.day?.mintemp_c ?? d.minC ?? 0),
    maxC: Math.round(d.day?.maxtemp_c ?? d.maxC ?? 0),
    condition: d.day?.condition?.text ?? d.condition ?? "N/A",
    icon: "⛅",
  }));
}
