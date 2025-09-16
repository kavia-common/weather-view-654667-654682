import React from 'react';

// PUBLIC_INTERFACE
export default function Footer() {
  /** Footer credits area. */
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <div>© {new Date().getFullYear()} Weather Viewer</div>
        <div>
          Built with <a className="link" href="https://react.dev" target="_blank" rel="noreferrer">React</a>
          {" • "}
          Theme: Ocean Professional
        </div>
      </div>
    </footer>
  );
}
