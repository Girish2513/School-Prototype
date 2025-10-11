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
import Gallery from './components/Gallery';
import ViewGallery from './components/ViewGallery';

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
  const [galleryInViewState, setGalleryInView] = useState(false);
  const [contactInViewState, setContactInView] = useState(false);

  // Use custom hooks for section visibility detection
  const { ref: aboutSectionRef } = useSectionInView({
    threshold: 0.1,
    onChange: setAboutInView,
  });

  const { ref: admissionsSectionRef } = useSectionInView({
    threshold: 0.1,
    onChange: setAdmissionsInView,
  });

  const { ref: gallerySectionRef } = useSectionInView({
    threshold: 0.1,
    onChange: setGalleryInView,
  });

  const { ref: contactSectionRef } = useSectionInView({
    threshold: 0.1,
    onChange: setContactInView,
  });

  // useEffect for the intro animation (runs only once on mount)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntro(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // A section is "light" if any light-background section is in view
  const isLightSectionInView =
    aboutInViewState || admissionsInViewState || galleryInViewState || contactInViewState;

  // --- Basic Client-Side Routing ---
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => setPath(window.location.pathname);
    // Listen for browser navigation (back/forward buttons) and custom events
    window.addEventListener('popstate', onLocationChange);
    // Cleanup listener on component unmount
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  // Conditionally render the full gallery page
  if (path === '/view-gallery') {
    document.body.className = 'view-gallery-body'; // Apply special body class for the gallery page
    return <ViewGallery />;
  }

  // Dynamically apply classes based on intro state for smooth animations
  const wrapperClassName = isIntro ? 'intro-state' : '';

  return (
    <div className={wrapperClassName} style={{ backgroundColor: '#fff' }}>
      <Header 
        isScrolled={isScrolled} 
        isIntro={isIntro} 
        isLightSectionInView={isLightSectionInView} 
      />

      <main role="main" aria-label="Main content">
        {/* Hero section */}
        <div className="hero-section">
          <Hero />
        </div>

        {/* About section */}
        <section id="about" ref={aboutSectionRef} className="about-section-container">
          <About />
        </section>

        {/* Admissions section */}
        <section id="admissions" ref={admissionsSectionRef} className="admissions-section-container">
          <Admissions />
        </section>

        {/* Gallery section (above testimonials) */}
        <section id="gallery" ref={gallerySectionRef} className="gallery-section-container">
          <Gallery />
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
