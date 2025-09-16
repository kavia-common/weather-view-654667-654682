import React, { useState } from 'react';

// PUBLIC_INTERFACE
export default function Header({ onSearch }) {
  /** Header with app title and location search bar. */
  const [query, setQuery] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q) onSearch(q);
  };

  return (
    <header className="header" role="banner">
      <div className="header-inner">
        <div className="brand">
          <div className="brand-badge" aria-hidden>WX</div>
          <div>
            <div className="brand-title" style={{color: 'var(--color-text)'}}>Weather Viewer</div>
            <div className="brand-sub">Ocean Professional • Clean & modern forecast</div>
          </div>
        </div>

        <form className="search" role="search" onSubmit={submit}>
          <label htmlFor="location" className="small" style={{position:'absolute', left:'-9999px'}}>Search location</label>
          <input
            id="location"
            className="search-input"
            type="text"
            placeholder="Search city or 'City, CountryCode' (e.g., Paris or Austin, US)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search location"
          />
          <button className="btn" type="submit" aria-label="Search">Search</button>
        </form>
      </div>
    </header>
  );
}
