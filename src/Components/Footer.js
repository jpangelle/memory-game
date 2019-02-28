import React from 'react';
import '../styles/Footer.css';

export default () => (
  <div className="footer">
    <span className="emily">
      Inspired By{' '}
      <a
        href="https://www.instagram.com/emirlo/"
        rel="noopener noreferrer"
        target="_blank"
      >
        Emily
      </a>
    </span>
    <span className="pipe">|</span>
    <span className="jp">
      Developed by{' '}
      <a
        href="https://github.com/jpangelle/memory-game"
        rel="noopener noreferrer"
        target="_blank"
      >
        JP
      </a>
    </span>
  </div>
);
