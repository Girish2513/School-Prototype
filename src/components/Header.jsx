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
  // State to manage the visibility of the mobile navigation menu (hamburger toggle).
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Effect to handle body scroll lock when the mobile menu is open.
  // Prevents background scrolling for better UX on mobile; restores on close/unmount.
  // For resilience, this uses direct DOM manipulation; consider a more React-friendly approach like a portal for modals.
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to restore scrolling if component unmounts while menu is open.
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  // Dynamically build the CSS class string for the header based on props and state.
  // Classes: base 'main-header', 'scrolled' for shadow/background, 'light-theme' for contrast, 'menu-open' for mobile.
  const headerClasses = `main-header ${isScrolled ? 'scrolled' : ''} ${
    isLightSectionInView && !isIntro ? 'light-theme' : ''
  } ${isMenuOpen ? 'menu-open' : ''}`;

  /**
   * Closes the mobile navigation menu when a nav link is clicked.
   * Improves UX by auto-closing the menu after selection on touch devices.
   * For extensibility, this can be generalized to handle any menu close event.
   */
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  /**
   * Handles clicks on the header brand/logo.
   * On the home page, it smoothly scrolls to the top.
   * On other pages (like the gallery), it navigates back to the home page.
   */
  const handleBrandClick = (e) => {
    e.preventDefault();
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Use custom routing to navigate to the home page
      window.history.pushState({}, '', '/');
      const navEvent = new PopStateEvent('popstate');
      window.dispatchEvent(navEvent);
    }
  };

  // Navigation items array for maintainability; can be sourced from siteData.js in future.
  const navItems = [
    { href: '#about', label: 'About Us' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#admissions', label: 'Admissions' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <header className={headerClasses} role="banner">
      
      <a href="/" onClick={handleBrandClick} aria-label="Go to home page" className="header-brand">
        <div className="header-left">
          {/* Logo with descriptive alt text for accessibility; consider lazy loading for performance. */}
          <img src="/images/logo.png" alt="Navodaya High School Logo" className="logo" />
          {/* School name as h1 for semantic heading structure, visible only at home (top of page). */}
          {!isScrolled && (
            <h1 className="school-name">
              Navodaya High School
            </h1>
          )}
        </div>
      </a>
      {/* Hamburger menu button, visible only on mobile via CSS; toggles menu state. */}
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
      {/* Main navigation menu: Horizontal on desktop, slide-in panel on mobile.
         aria-hidden for screen readers when closed on mobile; focus management can be added for better a11y. */}
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
  );
}

Header.propTypes = {
  isScrolled: PropTypes.bool.isRequired,
  isIntro: PropTypes.bool.isRequired,
  isLightSectionInView: PropTypes.bool.isRequired,
  isHomePage: PropTypes.bool,
};

export default Header;
