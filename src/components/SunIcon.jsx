/**
 * SunIcon component - SVG icon for sun (light mode).
 * Used in theme toggle button to represent light mode.
 * Icon from Lucide React icons library.
 * Accessible: Semantic SVG with proper attributes.
 * Responsive: Scales with font size.
 *
 * @returns {JSX.Element} The sun icon SVG.
 */
import React from 'react';

export function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"></circle> {/* Central sun circle */}
      <line x1="12" y1="1" x2="12" y2="3"></line> {/* Top ray */}
      <line x1="12" y1="21" x2="12" y2="23"></line> {/* Bottom ray */}
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line> {/* Top-left ray */}
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line> {/* Bottom-right ray */}
      <line x1="1" y1="12" x2="3" y2="12"></line> {/* Left ray */}
      <line x1="21" y1="12" x2="23" y2="12"></line> {/* Right ray */}
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line> {/* Bottom-left ray */}
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line> {/* Top-right ray */}
    </svg>
  );
}
