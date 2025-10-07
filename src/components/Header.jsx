import React from 'react';
import ShinyText from './ShinyText';

function Header({ isScrolled, isIntro }) {
  const headerClasses = `main-header ${isScrolled ? 'scrolled' : ''}`;
  return (
    <header className={headerClasses}>
      <div className="header-left">
        <img src="/images/logo.png" alt="Navodaya High School Logo" className="logo" />
        <h1 className="school-name">
          <ShinyText
            text="Navodaya High School"
            speed={3}
            className='shiny-effect-text'
            disabled={isIntro}
          />
        </h1>
      </div>
      <nav className="main-nav">
        <ul>
          <li><a href="#about">About Us</a></li>
          <li><a href="#admissions">Admissions</a></li>
          <li><a href="#academics">Academics</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;