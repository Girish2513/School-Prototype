// Import React hooks for managing component state (`useState`), side effects (`useEffect`), and complex state logic (`useReducer`).
import { useState, useEffect, useReducer } from 'react';
// Import a custom hook to track the window's scroll position.
import { useScroll } from './hooks/useScroll';
// Import a custom hook that uses the Intersection Observer API to detect when an element enters the viewport.
import { useSectionInView } from './hooks/useSectionInView';

// --- Component Imports ---
// The Header component, which typically contains the site logo, navigation, and other top-level controls.
import Header from './components/Header';
// The Hero component, which is the main "above the fold" content on the landing page.
import Hero from './components/Hero';
// Icons used for the theme toggle (light/dark mode). Note: These are imported but not directly used in this file; they are likely passed to a child component like Header.
import { LuSun, LuMoon } from 'react-icons/lu';

// The Admissions component, which displays information about the school's admission process.
import Admissions from './components/Admissions';

// The TestimonialCard component, used to display individual testimonials.
import { TestimonialCard } from './components/TestimonialCard';
// The Footer component for the bottom of the site.
import Footer from './components/Footer';
// The Gallery component for displaying a collection of images.
import Gallery from './components/Gallery';
// The ViewGallery component, which likely represents a separate page for viewing all gallery images.
import ViewGallery from './components/ViewGallery';
// The PopupBanner component for displaying promotional pop-up banners.
import PopupBanner from './PopupBanner';
// The AdminPage component for site administration.
import AdminPage from './AdminPage';
// The LoginPage component for user authentication.
import LoginPage from './LoginPage';
// The WhatsAppButton component, a floating button for quick contact.
import WhatsAppButton from './components/WhatsAppButton';
// The AboutUs component, providing information about the school.
import AboutUs from './components/AboutUs';
// The Achievements component for showcasing school accomplishments.
import Achievements from './components/Achievements';
// The Contact component, which includes contact details and a form.
import Contact from './components/Contact';

// --- Stylesheet Imports ---
// Import CSS specifically for the Admissions and Hero components. This is a common pattern for component-specific styles.
import './components/Admissions.css';
import './components/Hero.css';

// --- Default Content ---
// This array holds the default announcement messages for the scrolling ticker in the Header.
// This content can be updated from the Admin Panel and is persisted in localStorage.
const DEFAULT_TICKER_ITEMS = [
  '🎓 Admissions are open for 2026-2027!', // Announcement for admissions opening
  '🌿 Clean Campus, Green Campus — Join Our Eco Initiative!', // Eco friendly campus
  '📞 For Admissions & Queries, Contact: +91-8121153138.', 
  '🎓 Consistently Achieved 100% Results in Board Examinations!', // Achievement announcement
];

// This array holds the default image paths for the promotional popup banner.
// Like the ticker items, this can be managed from the Admin Panel and is stored in localStorage.
const DEFAULT_POPUP_IMAGES = [
  '/images/Pamphlet-1-2025.png', // First pamphlet image (Pamphlet-1-2025.png)
  '/images/Pamphlet-2-2025.png', // Second pamphlet image (Pamphlet-2-2025.png)
];

/**
 * A functional component for rendering the testimonials section.
 * It features a horizontally scrolling marquee of testimonial cards.
 * @param {object} props - The component props.
 * @param {string} props.title - The main title for the section.
 * @param {string} props.description - A short description for the section.
 * @param {Array<object>} props.testimonials - An array of testimonial objects to display.
 * @param {string} props.className - Additional CSS classes for the section.
 * @param {string} props.id - The HTML id for the section element.
 */
const TestimonialsSection = ({ title, description, testimonials, className, id }) => {
  // A utility function to conditionally join CSS class names together.
  // It filters out any falsy values (e.g., null, undefined, false).
  const cn = (...classes) => classes.filter(Boolean).join(' ');

  // The JSX for the testimonials section.
  return (
    <section id={id} className={cn('testimonials-section', className)}>
      <div className="testimonials-container">
        <div className="testimonials-header">
          {/* The main heading for the testimonials section. */}
          <h2>
            VOICES<br />OF TRUST
          </h2>
          {/* A decorative line element. */}
          <div className="testimonials-line" />
          {/* The section's description paragraph. */}
          <p>{description}</p>
        </div>

        {/* This wrapper contains the scrolling marquee. */}
        <div className="marquee-wrapper">
          <div className="marquee-container">
            {/* The content that scrolls. The animation is paused on hover. */}
            <div className="marquee-content group-hover:[animation-play-state:paused]">
              {/* The testimonials are duplicated to create a seamless looping effect. */}
              {testimonials.map((testimonial, i) => (
                <TestimonialCard key={`first-${i}`} {...testimonial} />
              ))}
              {/* The second set of testimonials is hidden from screen readers to avoid duplication. */}
              {testimonials.map((testimonial, i) => (
                <TestimonialCard key={`second-${i}`} {...testimonial} aria-hidden="true" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// This object defines the initial state for tracking which sections are currently visible in the viewport.
// It's used with the `useReducer` hook to manage these boolean flags.
const initialSectionStates = {
  admissions: false, // Whether the admissions section is in view
  aboutUs: false, // Whether the about us section is in view
  achievements: false, // Whether the achievements section is in view
  gallery: false, // Whether the gallery section is in view
  testimonials: false, // Whether the testimonials section is in view
  contact: false, // Whether the contact section is in view
};

/**
 * A reducer function to update the visibility state of different sections.
 * It takes the current state and an action, and returns a new state object.
 * @param {object} state - The current state of section visibilities.
 * @param {object} action - The action to perform, containing `section` and `isInView`.
 * @returns {object} The new state.
 */
function sectionStateReducer(state, action) {
  // Returns a new state object with the visibility of the specified section updated.
  return { ...state, [action.section]: action.isInView };
}

/**
 * The main App component, which serves as the root of the application.
 * It manages global state, routing, and the layout of all major components and pages.
 */
function App() {
  // --- State Management ---
  // `isIntro`: A boolean state to control the display of the initial intro animation.
  const [isIntro, setIsIntro] = useState(true);
  // `showPopup`: A boolean state to control the visibility of the popup banner.
  const [showPopup, setShowPopup] = useState(false);

  // --- Manual Path Routing ---
  // `path` state holds the current URL pathname.
  const [path, setPath] = useState(window.location.pathname);

  /**
   * A helper function to load state from `localStorage`.
   * It tries to parse the stored JSON, but falls back to a `defaultValue` if parsing fails or the key doesn't exist.
   * @param {string} key - The key to retrieve from localStorage.
   * @param {*} defaultValue - The default value to use if the key is not found or parsing fails.
   * @returns {*} The loaded state or the default value.
   */
  const loadState = (key, defaultValue) => {
    try {
      // Attempt to get the item from localStorage.
      const saved = localStorage.getItem(key);
      // If it exists, parse it as JSON; otherwise, return the default value.
      return saved ? JSON.parse(saved) : defaultValue;
    } catch (error) {
      // If there's an error (e.g., invalid JSON), log it and return the default value.
      console.error(`Error reading from localStorage for key "${key}":`, error);
      return defaultValue;
    }
  };

  // `tickerItems`: State for the header announcements. It's initialized from localStorage or with default values.
  const [tickerItems, setTickerItems] = useState(() => loadState('tickerItems', DEFAULT_TICKER_ITEMS));

  // `popupImages`: State for the popup banner images. Also initialized from localStorage or defaults.
  const [popupImages, setPopupImages] = useState(() => loadState('popupImages', DEFAULT_POPUP_IMAGES));

  // Custom hook `useScroll` to detect if the user has scrolled more than 50 pixels down the page.
  const { isScrolled } = useScroll(50);

  // `sectionsInView`: State managed by a reducer to track which page sections are currently in the viewport.
  const [sectionsInView, dispatchSectionState] = useReducer(sectionStateReducer, initialSectionStates);

  /**
   * A factory function that creates an Intersection Observer for a given section.
   * It uses the `useSectionInView` custom hook.
   * @param {string} section - The name of the section to observe.
   * @returns {object} A ref to be attached to the section's DOM element.
   */
  const createSectionObserver = (section) =>
    useSectionInView({
      threshold: 0.1, // The observer triggers when 10% of the section is visible.
      onChange: (isInView) => dispatchSectionState({ section, isInView }), // When visibility changes, dispatch an action to the reducer.
    });

  // Create refs for each major section of the page. These refs will be attached to the respective section elements.
  const { ref: admissionsSectionRef } = createSectionObserver('admissions');
  const { ref: aboutUsSectionRef } = createSectionObserver('aboutUs');
  const { ref: achievementsSectionRef } = createSectionObserver('achievements');
  const { ref: gallerySectionRef } = createSectionObserver('gallery');
  const { ref: testimonialsSectionRef } = createSectionObserver('testimonials');
  const { ref: contactSectionRef } = createSectionObserver('contact');

  // --- Side Effects (useEffect) ---
  // This effect runs once on component mount to hide the intro animation after 2.5 seconds.
  useEffect(() => {
    const timer = setTimeout(() => setIsIntro(false), 2500);
    // Cleanup function: clear the timer if the component unmounts before it fires.
    return () => clearTimeout(timer);
  }, []);

  // This effect persists the `tickerItems` state to localStorage whenever it changes.
  useEffect(() => {
    localStorage.setItem('tickerItems', JSON.stringify(tickerItems));
  }, [tickerItems]);

  // This effect persists the `popupImages` state to localStorage whenever it changes.
  // This state is typically updated via the Admin Panel.
  useEffect(() => {
    localStorage.setItem('popupImages', JSON.stringify(popupImages));
  }, [popupImages]);

  /**
   * A handler function for the "Reset to Defaults" button in the Admin Panel.
   * It clears the relevant localStorage items and reloads the page.
   */
  const handleResetToDefaults = () => {
    // Confirm with the user before proceeding.
    const isConfirmed = window.confirm(
      'Are you sure you want to reset all content to the original defaults? This action cannot be undone.'
    );
    if (isConfirmed) {
      // Clear the items from localStorage.
      localStorage.removeItem('tickerItems');
      localStorage.removeItem('popupImages');
      // Reload the page to reflect the changes.
      window.location.reload();
    }
  };

  // State for controlling the visibility of the floating WhatsApp and Location buttons.
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  // This effect shows the WhatsApp button with a delay after the intro animation finishes.
  useEffect(() => {
    if (!isIntro) {
      const timer = setTimeout(() => setShowWhatsApp(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isIntro]);

  // This effect shows the Location button with a delay after the intro animation finishes.
  useEffect(() => {
    if (!isIntro) {
      const timer = setTimeout(() => setShowLocation(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isIntro]);

  // This effect shows the popup banner after a 3-second delay, but only on the home page.
  useEffect(() => {
    if (path === '/') {
      setTimeout(() => setShowPopup(true), 3000);
    }
  }, [path]); // Reruns when the path changes.

  // This effect manages body scroll behavior when the popup is shown or hidden.
  useEffect(() => {
    if (showPopup) {
      // When the popup is open, disable scrolling on the body.
      document.body.style.overflow = 'hidden';
      // Add a class for additional styling (e.g., a background overlay).
      document.body.classList.add('popup-open');
    } else {
      // When the popup is closed, re-enable scrolling.
      document.body.style.overflow = 'auto';
      document.body.classList.remove('popup-open');
    }
    // Cleanup function to ensure scrolling is restored when the component unmounts.
    return () => {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('popup-open');
    };
  }, [showPopup]);

  // --- Dynamic Theming for Header ---
  // This logic determines if the header should be in "light" mode based on which sections are in view.
  const isLightSectionInView =
    (sectionsInView.admissions ||
      sectionsInView.contact ||
      sectionsInView.aboutUs ||
      sectionsInView.achievements) &&
    !sectionsInView.testimonials;
  // A section is considered "light" if any of the sections with a light background
  // (Contact, Admissions, About Us, Achievements) are in view, and the dark Testimonials section is not.

  // This effect sets up a listener for URL changes to update the `path` state.
  // It manually handles browser history changes to simulate a router.
  useEffect(() => {
    const onLocationChange = () => setPath(window.location.pathname);

    // Monkey-patch `history.pushState` and `history.replaceState` to trigger our location change handler.
    const originalPushState = history.pushState;
    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      onLocationChange();
    };
    const originalReplaceState = history.replaceState;
    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      onLocationChange();
    };

    // Listen for the 'popstate' event (e.g., browser back/forward buttons).
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  // This effect shows the popup banner after a 3-second delay, but only on the home page.
  useEffect(() => {
    if (path === '/') {
      setTimeout(() => setShowPopup(true), 3000);
    }
  }, [path]); // Reruns when the path changes.

  // This effect handles scrolling to a section identified by a URL hash (e.g., #contact).
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Get the element with the corresponding ID.
      const targetId = hash.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // Use a timeout to ensure the element is rendered before scrolling.
        const timer = setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100); // A small delay helps ensure the element is in the DOM.
        return () => clearTimeout(timer);
      }
    }
  }, [path]); // Re-run when the path changes

  // --- Page Rendering Logic ---
  // If the path is '/view-gallery', render the full gallery page.
  if (path === '/view-gallery') {
    // Apply a specific class to the body for gallery page styling.
    document.body.className = 'view-gallery-body';
    return (
      <div>
        {/* Render the Header with props appropriate for a non-home page. */}
        <Header
          isScrolled={isScrolled}
          isIntro={false}
          isLightSectionInView={true}
          isHomePage={false}
          tickerItems={tickerItems}
        />
        {/* The main content area for the gallery. */}
        <main role="main" aria-label="Full gallery page">
          <ViewGallery />
        </main>
        <section className="footer-section-container">
          {/* Render the Footer. */}
          <Footer isHomePage={false} />
        </section>
      </div>
    );
  }

  // If the path is '/admin', render the Admin page, but only if the user is logged in.
  if (path === '/admin') {
    // Check login status from localStorage.
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // Effect to redirect to the login page if not logged in.
    useEffect(() => {
      if (!isLoggedIn) {
        window.location.href = '/login';
      }
    }, [isLoggedIn]);

    // While redirecting, render nothing.
    if (!isLoggedIn) {
      return null; // Render nothing while redirecting
    }

    // Reset body styles for the admin page.
    document.body.className = '';
    document.body.style.overflow = 'auto';
    // Render the AdminPage component with necessary props.
    return <AdminPage
        tickerItems={tickerItems}
        setTickerItems={setTickerItems}
        popupImages={popupImages}
        setPopupImages={setPopupImages}
        onReset={handleResetToDefaults}
      />;
  }

  // If the path is '/login', render the Login page.
  if (path === '/login') {
    // Reset body styles.
    document.body.className = '';
    document.body.style.overflow = 'auto';
    // Render the LoginPage, which will redirect to '/admin' on successful login.
    return <LoginPage onLoginSuccess={() => (window.location.href = '/admin')} />;
  }

  // --- Home Page Rendering (Default) ---
  // Apply a class to the main wrapper during the intro animation.
  const wrapperClassName = isIntro ? 'intro-state' : '';

  // Static data for the testimonials section.
  const testimonialsData = [
    {
      author: {
        name: 'Abdul Arhaan',
        handle: 'Student (Grade 6)',
        avatar: '/images/Testimonials1.jpg',
      },
      text: 'Our school has given me endless opportunities to grow — from academics to sports and leadership programs. The teachers always encourage us to think creatively and aim higher every day.',
    },
    {
      author: {
        name: 'Mrs. B. Rama Devi',
        handle: 'Parent of Grade 3 Student',
        avatar: '/images/Testimonials2.jpg',
      },
      text: "As a parent, I feel proud to see my child enjoy learning every day. The school's focus on both moral values and academic excellence has truly helped my daughter become more confident and responsible.",
    },
    {
      author: {
        name: 'Dr. Hari Prasad',
        handle: 'Alumni (Batch of 2007)',
        avatar: '/images/Testimonials3.jpg',
      },
      text: 'My years at this school were the foundation of my success. The teachers not only prepared us academically but also taught us discipline, teamwork, and compassion — lessons that stay with me even today.',
    },
    {
      author: {
        name: 'N. Alekya',
        handle: 'Student (Grade 10)',
        avatar: '/images/Testimonials4.jpg',
      },
      text: 'This school has helped me discover my passion for science and innovation. The lab facilities, guidance from teachers, and extracurricular support have been incredible. I feel ready for college life ahead!',
    },
    {
      author: {
        name: 'Mr. & Mrs. Ramachandram',
        handle: 'Parents of Alumni',
        avatar: '/images/Testimonials5.jpg',
      },
      text: "We are grateful to the school for shaping our son into a disciplined and ambitious young man. The school's balanced approach to academics and character development is truly commendable.",
    },
  ];

  return (
    <div className={wrapperClassName}>
      {/* Render the PopupBanner if `showPopup` is true. */}
      {showPopup && <PopupBanner imageUrls={popupImages} onClose={() => setShowPopup(false)} />}

      {/* Render the Header component with dynamic props based on scroll state, intro state,
          and which section is currently in view.
      */}
      <Header
        isScrolled={isScrolled}
        isIntro={isIntro}
        isLightSectionInView={isLightSectionInView}
        isHomePage={true}
        tickerItems={tickerItems}
      />

      {/* The main content area of the home page. */}
      <main role="main" aria-label="Main content">
        {/* The Hero section. The video playback is paused if the popup is showing. */}
        <div className="hero-section relative">
          <Hero shouldPlay={!showPopup} />
        </div>

        {/* The Achievements section. The `isInView` prop controls animations. */}
        <section id="achievements" ref={achievementsSectionRef} className="achievements-section-container">
          <Achievements isInView={sectionsInView.achievements} />
        </section>

        {/* The About Us section. A class is toggled based on its visibility. */}
        <section
          id="about-us"
          ref={aboutUsSectionRef}
          className={`about-us-section-container ${sectionsInView.aboutUs ? 'is-in-view' : ''}`}
        >
          <AboutUs />
        </section>

        {/* The Gallery section. */}
        <section id="gallery" ref={gallerySectionRef} className="gallery-section-container">
          <Gallery />
        </section>

        {/* The Admissions section. */}
        <section id="admissions" ref={admissionsSectionRef} className="admissions-section-container">
          <Admissions />
        </section>

        {/* The Testimonials section, rendered using the `TestimonialsSection` component. */}
        <TestimonialsSection
          id="testimonials"
          ref={testimonialsSectionRef}
          title="Voices of Trust"
          description="The heart of our school lies in the people within it. Their words speak of trust, care, and lasting memories."
          testimonials={testimonialsData}
        />

        {/* The Contact section. */}
        <section id="contact" ref={contactSectionRef} className="contact-section-container">
          <Contact />
        </section>

        {/* The Footer section. */}
        <section className="footer-section-container">
          <Footer isHomePage={true} />
        </section>
      </main>

      {/* The floating WhatsApp button, visibility controlled by `showWhatsApp` state. */}
      <WhatsAppButton visible={showWhatsApp} />

      {/* The floating Location button, linking to Google Maps. Visibility controlled by `showLocation` state. */}
      <a
        href="https://maps.app.goo.gl/TyN8RFcqYWwvnMCt9"
        target="_blank"
        rel="noopener noreferrer"
        className={`location-icon ${showLocation ? 'visible' : 'hidden'}`}
        aria-label="View school location on Google Maps"
      >
        <img src="/images/Google_Maps_icon_(2020).svg.png" alt="Location" />
      </a>
    </div>
  );
}

// Export the App component as the default export of this module.
export default App;
