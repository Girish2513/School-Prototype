import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * The main header component for the website.
 * Handles responsive navigation (hamburger menu on mobile) and dynamically changes appearance
 * based on scroll position, intro animation, and current section visibility.
 * Includes accessibility features like ARIA labels, keyboard navigation, and a skip link for screen readers.
 * For scalability, navigation items can be externalized to siteData.js.
 * For extensibility, add support for dynamic menu items or search bar.
 *
 * @param {object} props - The component's props.
 * @param {boolean} props.isScrolled - True if the user has scrolled down from the top (applies scrolled class).
 * @param {boolean} props.isIntro - True during the initial intro animation (affects theme).
 * @param {boolean} props.isLightSectionInView - True if the header is over a light-colored section (switches to light theme).
 * @param {boolean} [props.isHomePage=true] - True if the header is on the main single-page layout.
 * @returns {JSX.Element} The rendered header component.
 */
function Header({ isScrolled, isIntro, isLightSectionInView, isHomePage = true }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const headerClasses = `main-header ${isScrolled ? 'scrolled' : ''} ${
    isLightSectionInView && !isIntro ? 'light-theme' : ''
  } ${isMenuOpen ? 'menu-open' : ''}`;

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  const handleBrandClick = (e) => {
    e.preventDefault();
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.pushState({}, '', '/');
      const navEvent = new PopStateEvent('popstate');
      window.dispatchEvent(navEvent);
    }
  };

  const navItems = [
    { href: '#about', label: 'About Us' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#admissions', label: 'Admissions' },
    { href: '#contact', label: 'Contact' }
  ];

  // Sample news ticker items
  const tickerItems = [
    '🎓 Admissions are open for 2026!',
    '🏠 Open House: January 15, 2026',
    '🧪 New STEM Lab inaugurated this month',
    '☀️ Summer Camp registrations now live'
  ];

  return (
    <>
      <header className={headerClasses} role="banner">
        <a href="/" onClick={handleBrandClick} aria-label="Go to home page" className="header-brand">
          <div className="header-left">
            <img src="/images/logo.png" alt="Navodaya High School Logo" className="logo" />
            {!isScrolled && isHomePage && (
              <h1 className="school-name">Navodaya High School</h1>
            )}
          </div>
        </a>

        <button 
          className="hamburger-menu" 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="main-nav"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <nav 
          id="main-nav"
          className="main-nav" 
          role="navigation"
          onClick={handleNavClick}
          aria-label="Main navigation"
        >
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={handleNavClick}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* News Ticker Below Header */}
      <div className="news-ticker">
        <div className="ticker-wrapper">
          <ul className="ticker-list">
            {tickerItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

Header.propTypes = {
  isScrolled: PropTypes.bool.isRequired,
  isIntro: PropTypes.bool.isRequired,
  isLightSectionInView: PropTypes.bool.isRequired,
  isHomePage: PropTypes.bool,
};

export default Header;