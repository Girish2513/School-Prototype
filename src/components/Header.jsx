/**
 * Header component for the school website navigation.
 * Displays the school logo, name, navigation menu with dropdowns, hamburger menu for mobile, and news ticker.
 * Handles scrolling to sections, mobile menu toggle, and theme changes based on scroll position.
 * Responsive design with mobile-first approach.
 * Accessibility: ARIA labels, keyboard navigation, semantic HTML.
 * Performance: Uses React hooks for state management, optimized re-renders.
 * Extensibility: Props for customization, sub-menu support.
 *
 * @param {object} props - Component props.
 * @param {boolean} props.isScrolled - Whether the user has scrolled past a threshold.
 * @param {boolean} props.isIntro - Whether the intro animation is playing.
 * @param {boolean} props.isLightSectionInView - Whether a light background section is in view.
 * @param {boolean} props.isHomePage - Whether the current page is the home page.
 * @returns {JSX.Element} The rendered header component.
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Header.css';

/**
 * Main Header component function.
 * Manages state for mobile menu, sub-menus, and handles navigation events.
 */
function Header({ isScrolled, isIntro, isLightSectionInView, isHomePage = true, tickerItems }) {
 const [isMenuOpen, setIsMenuOpen] = useState(false);
 const [openSubMenu, setOpenSubMenu] = useState(null); // State to track open sub-menu

 useEffect(() => {
 document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
 return () => {
 document.body.style.overflow = 'auto';
  };
  }, [isMenuOpen]);

  const headerClasses = `main-header ${isScrolled ? 'scrolled' : ''} ${
 isLightSectionInView && !isIntro ? 'light-theme' : ''
  } ${isMenuOpen ? 'menu-open' : ''} ${isHomePage ? 'home-page' : ''}`;

  const handleNavClick = () => {
    setIsMenuOpen(false);
    setOpenSubMenu(null); // Close sub-menu when main menu closes
  };
 
  /**
   * Handles clicks on navigation links to smoothly scroll the target section to the center of the viewport.
   * @param {React.MouseEvent<HTMLAnchorElement>} e - The click event.
   */
  const handleScrollToSection = (e) => {
    e.preventDefault(); // Prevent the default anchor link jump
    handleNavClick(); // Close the mobile menu and any open sub-menu
 
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
 
    if (!isHomePage) {
      // If not on the home page, navigate to home with the hash
      // Use pushState to avoid a full page reload.
      // The App component will listen for this and handle the scroll.
      const path = `/${targetId ? '#' + targetId : ''}`;
      window.history.pushState({ targetId }, '', path);
      const navEvent = new PopStateEvent('popstate');
      window.dispatchEvent(navEvent);
    } else {
      // If on the home page, scroll smoothly
      if (targetElement) {
        // The 'center' block option scrolls the element to the middle of the viewport.
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };



  /**
   * Toggles the sub-menu on mobile or prevents default on desktop.
   * @param {React.MouseEvent<HTMLAnchorElement>} e - The click event.
   * @param {string} menuLabel - The label of the menu being clicked.
   */
  const handleSubMenuToggle = (e, menuLabel) => {
    // Check if we are in mobile view (you might need a more robust check)
    if (window.innerWidth <= 768) {
      e.preventDefault(); // Prevent navigation only on mobile
      setOpenSubMenu(openSubMenu === menuLabel ? null : menuLabel);
    }
    // On desktop, do nothing, allowing the default link behavior or hover to work.
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
    { 
      href: '#about-us', 
      label: 'About Us',
      subMenu: [
        { href: '#about-us-main', label: 'About Us' },
        { href: '#principals-message', label: 'Principal\'s Message' },
        { href: '#vice-principals-message', label: 'Vice Principal\'s Message' }
      ]
    },
    { href: '#gallery', label: 'Gallery' },
    { 
      href: '#admissions', 
      label: 'Admissions',
      subMenu: [
        { href: '#admission-process', label: 'Admission Process' },
        { href: '#eligibility-criteria', label: 'Eligibility Criteria' }
      ]
    },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <>
      <header className={headerClasses} role="banner">
        <a href="/" onClick={handleBrandClick} aria-label="Go to home page" className="header-brand">
          <div className="header-left">
            <img src="/images/logo.png" alt="Navodaya High School Logo" className="logo" />
            {((!isScrolled && isHomePage) || !isHomePage) && (
              <div className="school-title-container">
                <h1 className="school-name">Navodaya High School</h1>
              </div>
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
              <li 
                key={item.href} 
                className={`${item.subMenu ? 'dropdown' : ''} ${openSubMenu === item.label ? 'submenu-open' : ''}`}
              >
                <a 
                  href={item.href} 
                  onClick={(e) => {
                    // Check window size only when the click happens
                    if (item.subMenu && window.innerWidth <= 768) {
                      handleSubMenuToggle(e, item.label);
                    } else if (item.subMenu && !isHomePage) {
                      handleScrollToSection(e);
                    } else {
                      handleScrollToSection(e);
                    }
                  }}
                >
                  {item.label}
                </a>
                {item.subMenu && (
                  <ul className="dropdown-content">
                    {item.subMenu.map((subItem) => (
                      <li key={subItem.href}>
                        <a href={subItem.href} onClick={handleScrollToSection}>{subItem.label}</a>
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
  tickerItems: PropTypes.array.isRequired,
};

export default Header;