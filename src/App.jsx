import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useScroll } from './hooks/useScroll';
import { useSectionInView } from './hooks/useSectionInView';
import Header from './components/Header';
import Hero from './components/Hero';

import Admissions from './components/Admissions';
import { TestimonialCard } from './components/TestimonialCard';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import ViewGallery from './components/ViewGallery';
import PopupBanner from './PopupBanner';
import AdminPage from './AdminPage';
import WhatsAppButton from './components/WhatsAppButton';
import AboutUs from './components/AboutUs';

const TestimonialsSection = ({ title, description, testimonials, className, id }) => {
  const cn = (...classes) => classes.filter(Boolean).join(' ');

  return (
    <section id={id} className={cn("testimonials-section", className)}>
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2>VOICES<br />OF TRUST</h2>
          <div className="testimonials-line"></div>
          <p>{description}</p>
        </div>

        <div className="marquee-wrapper">
          <div className="marquee-container">
            <div className="marquee-content group-hover:[animation-play-state:paused]">
              {/* First set of testimonials */}
              {testimonials.map((testimonial, i) => (
                <TestimonialCard 
                  key={`first-${i}`}
                  {...testimonial}
                />
              ))}
              {/* Second, duplicated set for seamless loop */}
              {testimonials.map((testimonial, i) => (
                <TestimonialCard 
                  key={`second-${i}`}
                  {...testimonial}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import Contact from './components/Contact';

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
  const [aboutUsInViewState, setAboutUsInView] = useState(false);
  const [admissionsInViewState, setAdmissionsInView] = useState(false);
  const [galleryInViewState, setGalleryInView] = useState(false);
  const [contactInViewState, setContactInView] = useState(false);

  const { ref: admissionsSectionRef } = useSectionInView({
    threshold: 0.1,
    onChange: setAdmissionsInView,
  });

  const { ref: aboutUsSectionRef } = useSectionInView({
    threshold: 0.1,
    onChange: setAboutUsInView,
  });

  const { ref: gallerySectionRef } = useSectionInView({
    threshold: 0.1,
    onChange: setGalleryInView,
  });

  const { ref: contactSectionRef } = useSectionInView({
    threshold: 0.1,
    onChange: setContactInView,
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
  // (like Admissions, or Contact) are currently in the viewport.
  // The gallery section is now dark-themed, so it's excluded from this check.
  const isLightSectionInView =
    admissionsInViewState || contactInViewState;

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

  const testimonialsData = [
    {
      author: {
        name: "Abdul Arhaan",
        handle: "Student (Grade 6)",
        avatar: "/images/Testimonials1.jpg"
      },
      text: "Our school has given me endless opportunities to grow — from academics to sports and leadership programs. The teachers always encourage us to think creatively and aim higher every day.",
      // href: "#"
    },
    {
      author: {
        name: "Mrs. B. Rama Devi",
        handle: "Parent of Grade 3 Student",
        avatar: "/images/Testimonials2.jpg"
      },
      text: "As a parent, I feel proud to see my child enjoy learning every day. The school’s focus on both moral values and academic excellence has truly helped my daughter become more confident and responsible.",
      // href: "#"
    },
    {
      author: {
        name: "Dr. Hari Prasad",
        handle: "Alumni (Batch of 2007)",
        avatar: "/images/Testimonials3.jpg"
      },
      text: "My years at this school were the foundation of my success. The teachers not only prepared us academically but also taught us discipline, teamwork, and compassion — lessons that stay with me even today."
    },
    {
      author: {
        name: "N. Alekya",
        handle: "Student (Grade 10)",
        avatar: "/images/Testimonials4.jpg"
      },
      text: "This school has helped me discover my passion for science and innovation. The lab facilities, guidance from teachers, and extracurricular support have been incredible. I feel ready for college life ahead!"
    },
    {
      author: {
        name: "Mr. & Mrs. Ramachandram",
        handle: "Parents of Alumni",
        avatar: "/images/Testimonials5.jpg"
      },
      text: "We are grateful to the school for shaping our son into a disciplined and ambitious young man. The school’s balanced approach to academics and character development is truly commendable."
    }
  ];

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

        {/* 📖 About Us section */}
        <section
          id="about-us"
          ref={aboutUsSectionRef}
          className={`about-us-section-container ${aboutUsInViewState ? 'is-in-view' : ''
            }`}
        >
          <AboutUs />
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
        <TestimonialsSection
          id="testimonials"
          title="Voices of Trust"
          description="The heart of our school lies in the people within it. Their words speak of trust, care, and lasting memories."
          testimonials={testimonialsData}
        />

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
