import { useState, useEffect, useCallback } from 'react';
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
import PopupBanner from './PopupBanner';
import AdminPage from './AdminPage';

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
  const [showPopup, setShowPopup] = useState(false);

  // State for editable content
  const [tickerItems, setTickerItems] = useState(() => {
    const saved = localStorage.getItem('tickerItems');
    return saved ? JSON.parse(saved) : [
      '🎓 Admissions are open for 2026!',
      '🏠 Open House: January 15, 2026',
      '🧪 New STEM Lab inaugurated this month',
      '☀️ Summer Camp registrations now live'
    ];
  });

  const [popupImages, setPopupImages] = useState(() => {
    const saved = localStorage.getItem('popupImages');
    return saved ? JSON.parse(saved) : [
      "/images/event.jpg",
      "/images/poster.jpeg",
      "/images/trip.jpeg"
    ];
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('tickerItems', JSON.stringify(tickerItems));
  }, [tickerItems]);

  useEffect(() => {
    localStorage.setItem('popupImages', JSON.stringify(popupImages));
  }, [popupImages]);

  // Use custom hook for scroll detection (threshold: 50px)
  const { isScrolled } = useScroll(50);

  // Consolidated state for section visibility to improve maintainability
  const [sectionsInView, setSectionsInView] = useState({
    about: false,
    admissions: false,
    gallery: false,
    contact: false,
    testimonials: false,
  });

  // Generic handler to update the visibility state for any section
  const handleSectionInView = useCallback((sectionName) => (isInView) => {
    setSectionsInView(prev => ({ ...prev, [sectionName]: isInView }));
  }, []);

  // Use custom hooks for section visibility detection
  const options = { threshold: 0.1 };
  const { ref: aboutSectionRef } = useSectionInView({ ...options, onChange: handleSectionInView('about') });
  const { ref: admissionsSectionRef } = useSectionInView({ ...options, onChange: handleSectionInView('admissions') });
  const { ref: gallerySectionRef } = useSectionInView({ ...options, onChange: handleSectionInView('gallery') });
  const { ref: contactSectionRef } = useSectionInView({ ...options, onChange: handleSectionInView('contact') });
  const { ref: testimonialsSectionRef } = useSectionInView({ ...options, onChange: handleSectionInView('testimonials') });

  // useEffect for the intro animation (runs only once on mount)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntro(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setTimeout(() => setShowPopup(true), 3000); // Show popup after 3 seconds
  }, []);

  // Effect to lock body scroll when the popup is open
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showPopup]);
  // A section is considered "light" if any of the sections with a light background
  // (like About, Admissions, or Contact) are currently in the viewport.
  // The gallery section is now dark-themed, so it's excluded from this check.
  const isLightSectionInView = 
    sectionsInView.about || 
    sectionsInView.admissions || 
    sectionsInView.contact || 
    sectionsInView.testimonials;

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
    return (
      // This wrapper ensures the header and footer are part of the gallery page layout
      <div style={{ backgroundColor: '#1A202C' }}>
        <Header
          isScrolled={isScrolled}
          isIntro={false} // No intro animation on sub-pages
          isLightSectionInView={false} // Gallery has a dark background
          isHomePage={false} // Explicitly set to false for the gallery page
          tickerItems={tickerItems}
        />
        <main role="main" aria-label="Full gallery page">
          <ViewGallery />
        </main>
        <section className="footer-section-container">
          <Footer />
        </section>
      </div>
    );
  }

  // Conditionally render the admin page
  if (path === '/admin') {
    document.body.className = ''; // Reset body class
    document.body.style.overflow = 'auto'; // Ensure scrolling is enabled
    return (
      <AdminPage
        tickerItems={tickerItems}
        setTickerItems={setTickerItems}
        popupImages={popupImages}
        setPopupImages={setPopupImages}
      />
    );
  }


  // Dynamically apply classes based on intro state for smooth animations
  const wrapperClassName = isIntro ? 'intro-state' : '';

  return (
    <div className={wrapperClassName}>
      {showPopup && (
        <PopupBanner
          imageUrls={popupImages}
          onClose={() => setShowPopup(false)}
        />
      )}
      <Header
        isScrolled={isScrolled}
        isIntro={isIntro}
        isLightSectionInView={isLightSectionInView}
        isHomePage={true} // This is the main page
        tickerItems={tickerItems}
      />

      <main role="main" aria-label="Main content">
        {/* Hero section */}
        <div className="hero-section">
          <Hero shouldPlay={!showPopup} />
          {/* Location Icon Link */}
          <a
            href="https://maps.app.goo.gl/TyN8RFcqYWwvnMCt9"
            target="_blank"
            rel="noopener noreferrer"
            className="location-icon"
            aria-label="View school location on Google Maps"
          >
            <img src="/images/Google_Maps_icon_(2020).svg.png" alt="Location" />
          </a>
        </div>

        {/* About section */}
        <section id="about" ref={aboutSectionRef} className="about-section-container">
          <About />
        </section>

        {/* Gallery section (moved between About and Admissions) */}
        <section id="gallery" ref={gallerySectionRef} className="gallery-section-container">
          <Gallery />
        </section>

        {/* Admissions section */}
        <section id="admissions" ref={admissionsSectionRef} className="admissions-section-container">
          <Admissions />
        </section>

        {/* Testimonials section */}
        <section id="testimonials" ref={testimonialsSectionRef} className="testimonials-section">
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
