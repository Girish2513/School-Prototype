import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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
    { 
      href: '#admissions', 
      label: 'Admissions',
      subMenu: [
        { href: '#eligibility', label: 'Eligibility Criteria' },
        { href: '#process', label: 'Admission Process' },
        { href: '#dates', label: 'Important Dates' },
        { href: '#reservation', label: 'Reservation Policies' }
      ] 
    },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' }
  ];

  const tickerItems = [
    'Admissions are open for 2026!',
    'Open House: January 15, 2026',
    'New STEM Lab inaugurated this month',
    'Summer Camp registrations now live'
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
          aria-label="Main navigation"
        >
          <ul>
            {navItems.map((item) => (
              <li key={item.href} className={item.subMenu ? 'dropdown' : ''}>
                <a href={item.href} onClick={!item.subMenu ? handleNavClick : (e) => e.preventDefault()}>
                  {item.label}
                </a>
                {item.subMenu && (
                  <ul className="dropdown-content">
                    {item.subMenu.map((subItem) => (
                      <li key={subItem.href}>
                        <a href={subItem.href} onClick={handleNavClick}>{subItem.label}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="news-ticker">
        <div className="ticker-wrapper">
          <ul className="ticker-list">
            {tickerItems.map((item, index) => (
              <li key={`first-${index}`}>{item}</li>
            ))}
          </ul>
          <ul className="ticker-list">
            {tickerItems.map((item, index) => (
              <li key={`second-${index}`}>{item}</li>
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

export default Header;