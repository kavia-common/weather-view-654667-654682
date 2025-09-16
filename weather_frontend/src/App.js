import React, { useEffect, useMemo, useRef, useState } from 'react';
import './theme.css';
import Header from './components/Header';
import WeatherDetails from './components/WeatherDetails';
import ForecastList from './components/ForecastList';
import Footer from './components/Footer';
import { fetchCurrentWeather, fetchForecast } from './services/weatherService';

// PUBLIC_INTERFACE
function App() {
  /**
   * Root application container orchestrating search, data loading, and layout.
   * Uses mock data by default unless env variables REACT_APP_WEATHER_API_URL and REACT_APP_WEATHER_API_KEY are provided.
   */

  const [location, setLocation] = useState('');
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loadingCurrent, setLoadingCurrent] = useState(false);
  const [loadingForecast, setLoadingForecast] = useState(false);
  const [errorCurrent, setErrorCurrent] = useState('');
  const [errorForecast, setErrorForecast] = useState('');

  // Abort controllers per load
  const ctrls = useRef({ current: null, forecast: null });

  // PUBLIC_INTERFACE
  const onSearch = async (newLocation) => {
    /**
     * Handles new location searches:
     * - cancels any in-flight requests,
     * - triggers both current weather and forecast fetches.
     */
    setLocation(newLocation);
  };

  // Load data whenever location changes
  useEffect(() => {
    if (!location) return;

    // Cancel in-flight
    if (ctrls.current.current) ctrls.current.current.abort();
    if (ctrls.current.forecast) ctrls.current.forecast.abort();

    const currentCtrl = new AbortController();
    const forecastCtrl = new AbortController();
    ctrls.current.current = currentCtrl;
    ctrls.current.forecast = forecastCtrl;

    setLoadingCurrent(true);
    setLoadingForecast(true);
    setErrorCurrent('');
    setErrorForecast('');

    fetchCurrentWeather(location, { signal: currentCtrl.signal })
      .then(setCurrent)
      .catch((e) => { if (e.name !== 'AbortError') setErrorCurrent(e.message || 'Failed to load'); })
      .finally(() => setLoadingCurrent(false));

    fetchForecast(location, 5, { signal: forecastCtrl.signal })
      .then(setForecast)
      .catch((e) => { if (e.name !== 'AbortError') setErrorForecast(e.message || 'Failed to load'); })
      .finally(() => setLoadingForecast(false));

    return () => {
      currentCtrl.abort();
      forecastCtrl.abort();
    };
  }, [location]);

  // Default hint content memo
  const emptyState = useMemo(() => (!location ? 'Search any city to get started.' : ''), [location]);

  return (
    <div className="app-shell">
      <Header onSearch={onSearch} />

      <main className="container" role="main">
        {emptyState ? (
          <div className="card empty">{emptyState}</div>
        ) : (
          <div className="grid">
            <WeatherDetails data={current} loading={loadingCurrent} error={errorCurrent} />
            <ForecastList items={forecast} loading={loadingForecast} error={errorForecast} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
