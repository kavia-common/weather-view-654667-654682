import React from 'react';

// PUBLIC_INTERFACE
export default function ForecastList({ items, loading, error }) {
  /** Forecast list shown as cards. */
  if (error) return <div className="card error" role="alert">Failed to load forecast: {error}</div>;
  if (loading) return <div className="card empty">Loading forecast…</div>;
  if (!items || items.length === 0) return <div className="card empty">No forecast available.</div>;

  return (
    <section className="card" aria-labelledby="forecast-title">
      <h2 id="forecast-title" className="card-title">Forecast</h2>
      <div className="forecast-list">
        {items.map((f, idx) => (
          <article key={`${f.day}-${idx}`} className="forecast-card" aria-label={`Forecast for ${f.day}`}>
            <div className="forecast-day">{f.day}</div>
            <div className="forecast-temp">{f.icon} {f.maxC}° / {f.minC}°C</div>
            <div className="forecast-desc">{f.condition}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
