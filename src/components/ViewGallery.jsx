import React, { useEffect } from 'react';
import './ViewGallery.css';

/**
 * A full-page masonry-style gallery with pagination.
 * Uses AOS (Animate on Scroll) for animations and custom logic for navigation.
 * Scripts and styles for external libraries are loaded dynamically.
 */
const ViewGallery = () => {
  useEffect(() => {
    // --- Dynamic Script & Stylesheet Loading ---
    const aosCss = document.createElement('link');
    aosCss.href = 'https://unpkg.com/aos@2.3.1/dist/aos.css';
    aosCss.rel = 'stylesheet';

    const aosJs = document.createElement('script');
    aosJs.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js';
    aosJs.async = true;

    document.head.appendChild(aosCss);
    document.body.appendChild(aosJs);

    // Initialize AOS after its script has loaded
    aosJs.onload = () => {
      window.AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-in-out',
      });
    };

    // --- Gallery Navigation Logic ---
    const wrapper = document.querySelector('.grid-pages-wrapper');
    const pages = document.querySelectorAll('.grid-page');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (!wrapper || !prevBtn || !nextBtn || pages.length === 0) return;

    const totalPages = pages.length;
    let currentIndex = 0;

    if (totalPages <= 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
      return;
    }

    const updateButtonStates = () => {
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= totalPages - 1;
    };

    const goToPage = (pageIndex) => {
      currentIndex = pageIndex;
      wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateButtonStates();
    };

    const handleNext = () => goToPage(currentIndex + 1);
    const handlePrev = () => goToPage(currentIndex - 1);

    nextBtn.addEventListener('click', handleNext);
    prevBtn.addEventListener('click', handlePrev);

    updateButtonStates(); // Initial state

    // Cleanup function to remove listeners and injected scripts/styles
    return () => {
      nextBtn.removeEventListener('click', handleNext);
      prevBtn.removeEventListener('click', handlePrev);
      document.head.removeChild(aosCss);
      document.body.removeChild(aosJs);
    };
  }, []);

  return (
    <section className="masonry-gallery-section">
      <h2 className="gallery-title" data-aos="fade-down">Our Moments</h2>

      <div className="masonry-container" data-aos="fade-up">
        <div className="grid-pages-wrapper">
          {/* Page 1 */}
          <div className="grid-page active">
            <div className="grid-item img-large"><img src="/images/republic-W1.jpg" alt="Republic Day Celebration" loading="lazy" /></div>
            <div className="grid-item img-small"><img src="/images/activity.jpeg" alt="Classroom Activity" loading="lazy" /></div>
            <div className="grid-item img-small"><img src="/images/event.jpg" alt="School Event Performance" loading="lazy" /></div>
            <div className="grid-item img-wide"><img src="/images/group-pic.jpeg" alt="Student Group Photo" loading="lazy" /></div>
          </div>

          {/* Page 2 */}
          <div className="grid-page">
            <div className="grid-item img-large"><img src="/images/trip.jpeg" alt="School Trip to Wonderla" loading="lazy" /></div>
            <div className="grid-item img-small"><img src="/images/class.jpeg" alt="Interactive Classroom" loading="lazy" /></div>
            <div className="grid-item img-small"><img src="/images/trip1.jpeg" alt="Field Trip" loading="lazy" /></div>
            <div className="grid-item img-wide"><img src="/images/maxresdefault.jpg" alt="Hyderabad School Trip" loading="lazy" /></div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button className="arrow prev-btn" aria-label="Previous Slide">&#10094;</button>
        <button className="arrow next-btn" aria-label="Next Slide">&#10095;</button>
      </div>
    </section>
  );
};

export default ViewGallery;