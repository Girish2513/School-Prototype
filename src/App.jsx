import { useState, useEffect } from 'react';
import { useScroll } from './hooks/useScroll';
import { useSectionInView } from './hooks/useSectionInView';

// 🧩 Components
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
import Achievements from './components/Achievements';
import Contact from './components/Contact';

// 💬 Testimonials Section
const TestimonialsSection = ({ title, description, testimonials, className, id }) => {
  const cn = (...classes) => classes.filter(Boolean).join(' ');

  return (
    <section id={id} className={cn('testimonials-section', className)}>
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2>
            VOICES<br />OF TRUST
          </h2>
          <div className="testimonials-line" />
          <p>{description}</p>
        </div>

        <div className="marquee-wrapper">
          <div className="marquee-container">
            <div className="marquee-content group-hover:[animation-play-state:paused]">
              {testimonials.map((testimonial, i) => (
                <TestimonialCard key={`first-${i}`} {...testimonial} />
              ))}
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

function App() {
  // 🕒 Intro & Popup states
  const [isIntro, setIsIntro] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  // 🎓 Announcements (Ticker)
  const [tickerItems, setTickerItems] = useState([
    '🎓 Admissions are open for 2026!',
    '🏠 Open House: January 15, 2026',
    '🧪 New STEM Lab inaugurated this month',
    '☀️ Summer Camp registrations now live',
  ]);

  // 🖼️ Popup Images
  const [popupImages, setPopupImages] = useState([
    '/images/event.jpg',
    '/images/poster.jpeg',
    '/images/trip.jpeg',
  ]);

  // 📜 Scroll State
  const { isScrolled } = useScroll(50);

  // 👁️ Section In-View States
  const [aboutUsInViewState, setAboutUsInView] = useState(false);
  const [admissionsInViewState, setAdmissionsInView] = useState(false);
  const [galleryInViewState, setGalleryInView] = useState(false);
  const [contactInViewState, setContactInView] = useState(false);

  // Section observers
  const { ref: admissionsSectionRef } = useSectionInView({ threshold: 0.1, onChange: setAdmissionsInView });
  const { ref: aboutUsSectionRef } = useSectionInView({ threshold: 0.1, onChange: setAboutUsInView });
  const { ref: gallerySectionRef } = useSectionInView({ threshold: 0.1, onChange: setGalleryInView });
  const { ref: contactSectionRef } = useSectionInView({ threshold: 0.1, onChange: setContactInView });

  // Intro delay
  useEffect(() => {
    const timer = setTimeout(() => setIsIntro(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // 🌐 Floating buttons visibility
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  useEffect(() => {
    if (!isIntro) {
      const timer = setTimeout(() => setShowWhatsApp(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isIntro]);

  useEffect(() => {
    if (!isIntro) {
      const timer = setTimeout(() => setShowLocation(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isIntro]);

  // Popup timing
  useEffect(() => {
    setTimeout(() => setShowPopup(true), 3000);
  }, []);

  // Lock scroll when popup is open
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

  // 🌗 Header theme control
  const isLightSectionInView = admissionsInViewState || contactInViewState;

  // 🔗 Path routing (manual)
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const onLocationChange = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  // 🖼️ View Gallery Page
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

  // ⚙️ Admin Page
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

  // Default (Home)
  const wrapperClassName = isIntro ? 'intro-state' : '';

  // 💬 Testimonials Data
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
      {/* 🎉 Popup Banner */}
      {showPopup && <PopupBanner imageUrls={popupImages} onClose={() => setShowPopup(false)} />}

      {/* 🧭 Header */}
      <Header
        isScrolled={isScrolled}
        isIntro={isIntro}
        isLightSectionInView={isLightSectionInView}
        isHomePage={true}
        tickerItems={tickerItems}
      />

      {/* 🌍 Main Content */}
      <main role="main" aria-label="Main content">
        {/* 🏫 Hero Section */}
        <div className="hero-section relative">
          <Hero shouldPlay={!showPopup} />
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

        {/* 🏆 Achievements Section */}
        <section id="achievements" style={{ backgroundColor: 'white', padding: '4rem 0' }}>
          <Achievements />
        </section>

        {/* 📖 About Us */}
        <section
          id="about-us"
          ref={aboutUsSectionRef}
          className={`about-us-section-container ${aboutUsInViewState ? 'is-in-view' : ''}`}
        >
          <AboutUs />
        </section>

        {/* 🖼️ Gallery */}
        <section id="gallery" ref={gallerySectionRef} className="gallery-section-container">
          <Gallery />
        </section>

        {/* 📝 Admissions */}
        <section id="admissions" ref={admissionsSectionRef} className="admissions-section-container">
          <Admissions />
        </section>

        {/* 💬 Testimonials */}
        <TestimonialsSection
          id="testimonials"
          title="Voices of Trust"
          description="The heart of our school lies in the people within it. Their words speak of trust, care, and lasting memories."
          testimonials={testimonialsData}
        />

        {/* 📞 Contact */}
        <section id="contact" ref={contactSectionRef} className="contact-section-container">
          <Contact />
        </section>

        {/* ⚙️ Footer */}
        <section className="footer-section-container">
          <Footer />
        </section>
      </main>

      {/* 🟢 WhatsApp Floating Button */}
      <WhatsAppButton visible={showWhatsApp} />
    </div>
  );
}

export default App;
