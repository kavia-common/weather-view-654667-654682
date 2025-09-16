import React from 'react';

// PUBLIC_INTERFACE
export default function WeatherDetails({ data, loading, error }) {
  /** Card displaying current weather details. */
  if (error) {
    return <div className="card error" role="alert">Failed to load weather: {error}</div>;
  }
  if (loading) {
    return <div className="card empty">Loading current weather…</div>;
  }
  if (!data) {
    return <div className="card empty">Search for a location to view current weather.</div>;
  }

  return (
    <section className="card" aria-labelledby="current-weather-title">
      <div className="weather-header">
        <div className="location">{data.location}</div>
        <div className="updated">Updated {new Date(data.updatedAt).toLocaleTimeString()}</div>
      </div>

      <h2 id="current-weather-title" className="card-title">Current Weather</h2>

      <div className="weather-main">
        <div className="temp" aria-live="polite">{data.icon} {data.tempC}°C</div>
        <div className="badge" title={`Feels like ${data.feelsLikeC}°C`}>
          <span>Feels like {data.feelsLikeC}°C</span>
        </div>
      </div>

      <div className="meta" role="list">
        <div className="meta-item" role="listitem">
          <div className="meta-label">Condition</div>
          <div className="meta-value">{data.condition}</div>
        </div>
        <div className="meta-item" role="listitem">
          <div className="meta-label">Humidity</div>
          <div className="meta-value">{data.humidity}%</div>
        </div>
        <div className="meta-item" role="listitem">
          <div className="meta-label">Wind</div>
          <div className="meta-value">{data.windKph} kph</div>
        </div>
      </div>
    </section>
  );
}
