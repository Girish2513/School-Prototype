import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useScroll } from './hooks/useScroll';
import { useSectionInView } from './hooks/useSectionInView';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About'; 
import Admissions from './components/Admissions';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

/**
 * Main App component serving as the root of the application.
 * Manages global state for intro animation, scroll detection, and section visibility
 * to dynamically update the header theme and animations.
 * Uses custom hooks for reusability and maintainability.
 * For scalability, state management can be lifted to Context or Redux if more complex interactions are added.
 * Wrapped by ErrorBoundary in main.jsx for resilience.
 */
function App() {
  // State to manage the intro animation class (fades out after 2.5s)
  const [isIntro, setIsIntro] = useState(true);

  // Use custom hook for scroll detection (threshold: 50px)
  const { isScrolled } = useScroll(50);

  // State to track if light-background sections are in view for header theme
  const [aboutInViewState, setAboutInView] = useState(false);
  const [admissionsInViewState, setAdmissionsInView] = useState(false);
  const [contactInViewState, setContactInView] = useState(false);

  // Use custom hooks for section visibility detection
  // Each hook provides ref and uses onChange to update local state
  const { ref: aboutSectionRef } = useSectionInView({
    threshold: 0.1,
    onChange: setAboutInView
  });

  const { ref: admissionsSectionRef } = useSectionInView({
    threshold: 0.1, // Trigger when 10% of the section is visible
    onChange: setAdmissionsInView
  });

  const { ref: contactSectionRef } = useSectionInView({
    threshold: 0.1,
    onChange: setContactInView
  });

  // useEffect for the intro animation (runs only once on mount)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntro(false);
    }, 2500);
    
    // Cleanup function to clear the timer if component unmounts early
    return () => clearTimeout(timer);
  }, []);

  // A section is "light" if any light-background section (About, Admissions, Contact) is in view
  // This determines the header theme for better contrast
  const isLightSectionInView = aboutInViewState || admissionsInViewState || contactInViewState;

  // Dynamically apply classes based on intro state for smooth animations
  const wrapperClassName = isIntro ? 'intro-state' : '';

  return (
    // Wrapper div for intro animation class, as direct <body> manipulation is not recommended in React
    // For extensibility, this can be replaced with a CSS-in-JS solution or theme provider
    <div className={wrapperClassName}>
      {/* Pass states to Header for dynamic styling */}
      <Header 
        isScrolled={isScrolled} 
        isIntro={isIntro} 
        isLightSectionInView={isLightSectionInView} 
      />
      <main role="main" aria-label="Main content">
        {/* Hero section with full-width layout */}
        <div className="hero-section">
          <Hero />
        </div>
        {/* About section with scroll-snap and inView ref for theme switching */}
        <section id="about" ref={aboutSectionRef} className="about-section-container">
          <About />
        </section>
        {/* Admissions section */}
        <section id="admissions" ref={admissionsSectionRef} className="admissions-section-container">
          <Admissions />
        </section>
        {/* Testimonials section */}
        <section id="testimonials">
          <Testimonials />
        </section>
        {/* Contact section */}
        <section id="contact" ref={contactSectionRef} className="contact-section-container">
          <Contact />
        </section>
        {/* Footer section */}
        <section className="footer-section-container">
          <Footer />
        </section>
      </main>
    </div>
  );
}

App.propTypes = {
  // No props expected, but PropTypes added for consistency and future extensibility
};

export default App;
