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
import WhatsAppButton from './components/WhatsAppButton';

/**
 * Main App component serving as the root of the application.
 * Manages global state for intro animation, scroll detection, and section visibility
 * to dynamically update the header theme and animations.
 * Uses custom hooks for reusability and maintainability.
 * For scalability, state management can be lifted to Context or Redux if more complex interactions are added.
 * Wrapped by ErrorBoundary in main.jsx for resilience.
 */
function App() {
  // 🌟 State to manage the intro animation class (fades out after 2.5s)
  const [isIntro, setIsIntro] = useState(true);

  // 🌟 State for controlling popup banner visibility
  const [showPopup, setShowPopup] = useState(false);

  // 🎯 State for editable ticker text items (news headlines)
  const [tickerItems, setTickerItems] = useState(() => {
    const saved = localStorage.getItem('tickerItems');
    return saved
      ? JSON.parse(saved)
      : [
          '🎓 Admissions are open for 2026!',
          '🏠 Open House: January 15, 2026',
          '🧪 New STEM Lab inaugurated this month',
          '☀️ Summer Camp registrations now live',
        ];
  });

  // 🖼️ State for popup banner images
  const [popupImages, setPopupImages] = useState(() => {
    const saved = localStorage.getItem('popupImages');
    return saved
      ? JSON.parse(saved)
      : ['/images/event.jpg', '/images/poster.jpeg', '/images/trip.jpeg'];
  });

  // 💾 Save ticker updates to localStorage
  useEffect(() => {
    localStorage.setItem('tickerItems', JSON.stringify(tickerItems));
  }, [tickerItems]);

  // 💾 Save popup images to localStorage
  useEffect(() => {
    localStorage.setItem('popupImages', JSON.stringify(popupImages));
  }, [popupImages]);

  // 🧭 Custom hook for detecting scroll position (used for header shadow & theme)
  const { isScrolled } = useScroll(50);

  // State to track if light-background sections are in view for header theme
  const [aboutInViewState, setAboutInView] = useState(false);
  const [admissionsInViewState, setAdmissionsInView] = useState(false);
  const [galleryInViewState, setGalleryInView] = useState(false);
  const [contactInViewState, setContactInView] = useState(false);
  const [testimonialsInViewState, setTestimonialsInView] = useState(false);

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

  const { ref: testimonialsSectionRef } = useSectionInView({
    threshold: 0.1,
    onChange: setTestimonialsInView,
  });

  // 🎬 Trigger the intro animation on mount (2.5s)
  useEffect(() => {
    const timer = setTimeout(() => setIsIntro(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // 🧩 Add this new state
const [showWhatsApp, setShowWhatsApp] = useState(false);

// 🟢 Delay showing the location icon after logo moves to top-left
const [showLocation, setShowLocation] = useState(false);


// After intro ends, delay the WhatsApp button appearance
useEffect(() => {
  if (!isIntro) {
    const timer = setTimeout(() => setShowWhatsApp(true), 1500); // wait 1.5s after intro ends
    return () => clearTimeout(timer);
  }
}, [isIntro]);

useEffect(() => {
  if (!isIntro) {
    const timer = setTimeout(() => setShowLocation(true), 1500); // 1.5s delay after intro
    return () => clearTimeout(timer);
  }
}, [isIntro]);


  // 🎬 Show popup banner 3 seconds after page load
  useEffect(() => {
    setTimeout(() => setShowPopup(true), 3000);
  }, []);

  // 🚫 Lock scroll when popup is open
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('popup-open');
    } else {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('popup-open');
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('popup-open');
    };
  }, [showPopup]);

  // A section is considered "light" if any of the sections with a light background
  // (like About, Admissions, or Contact) are currently in the viewport.
  // The gallery section is now dark-themed, so it's excluded from this check.
  const isLightSectionInView =
    aboutInViewState || admissionsInViewState || contactInViewState || testimonialsInViewState;

  // 🧭 Handle basic client-side routing (since no router is used)
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  // 🖼️ If user is on the "View Gallery" page
  if (path === '/view-gallery') {
    document.body.className = 'view-gallery-body';
    return (
      <div style={{ backgroundColor: '#1A202C' }}>
        <Header
          isScrolled={isScrolled}
          isIntro={false}
          isLightSectionInView={false}
          isHomePage={false}
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

  // 🔐 If user navigates to /admin, render the Admin page
  if (path === '/admin') {
    document.body.className = '';
    document.body.style.overflow = 'auto';
    return (
      <AdminPage
        tickerItems={tickerItems}
        setTickerItems={setTickerItems}
        popupImages={popupImages}
        setPopupImages={setPopupImages}
      />
    );
  }

  // 🎞️ Add intro class for fade-in/fade-out effect
  const wrapperClassName = isIntro ? 'intro-state' : '';

  return (
    <div className={wrapperClassName}>
      {/* 🎉 Popup banner shown after page load */}
      {showPopup && (
        <PopupBanner
          imageUrls={popupImages}
          onClose={() => setShowPopup(false)}
        />
      )}

      {/* 🧭 Header with scroll and theme logic */}
      <Header
        isScrolled={isScrolled}
        isIntro={isIntro}
        isLightSectionInView={isLightSectionInView}
        isHomePage={true}
        tickerItems={tickerItems}
      />

      {/* 📜 Main content sections */}
      <main role="main" aria-label="Main content">
        {/* 🏫 Hero section */}
        <div className="hero-section">
          <Hero shouldPlay={!showPopup} />
          {/* Location Icon Link */}
          <a
            href="https://maps.app.goo.gl/TyN8RFcqYWwvnMCt9"
            target="_blank"
            rel="noopener noreferrer"
            className={`location-icon ${showLocation ? "visible" : "hidden"}`}
            aria-label="View school location on Google Maps"
          >
            <img src="/images/Google_Maps_icon_(2020).svg.png" alt="Location" />
          </a>
        </div>

        {/* ℹ️ About section */}
        <section id="about" ref={aboutSectionRef} className="about-section-container">
          <About />
        </section>

        {/* 🖼️ Gallery section */}
        <section id="gallery" ref={gallerySectionRef} className="gallery-section-container">
          <Gallery />
        </section>

        {/* 📝 Admissions section */}
        <section id="admissions" ref={admissionsSectionRef} className="admissions-section-container">
          <Admissions />
        </section>

        {/* 💬 Testimonials section */}
        <section id="testimonials" ref={testimonialsSectionRef} className="testimonials-section">
          <Testimonials />
        </section>

        {/* 📞 Contact section */}
        <section id="contact" ref={contactSectionRef} className="contact-section-container">
          <Contact />
        </section>

        {/* ⚙️ Footer section */}
        <section className="footer-section-container">
          <Footer />
        </section>
      </main>

      {/* ✅ WhatsApp floating button (added safely at the bottom)
          This will appear on all pages except /admin or /view-gallery
          It includes a greeting popup and floating WhatsApp icon */}
      <WhatsAppButton visible={showWhatsApp} />
    </div>
  );
}

App.propTypes = {
  // No props expected currently, but added for scalability
};

export default App;
