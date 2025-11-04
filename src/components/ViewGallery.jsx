/**
 * ViewGallery component - Full-page masonry-style photo gallery with pagination.
 * Displays school events and activities in a paginated grid layout.
 * Features AOS animations, lazy loading images, and navigation controls.
 * Performance: Dynamic loading of AOS library, lazy image loading.
 * Accessibility: Proper alt text, ARIA labels, keyboard navigation.
 * Responsive: Masonry grid adapts to different screen sizes.
 *
 * @returns {JSX.Element} The gallery section component.
 */
import React, { useEffect } from 'react';
import './ViewGallery.css'; // Gallery-specific styles

const ViewGallery = () => {
  // Effect to handle dynamic script loading and gallery navigation
  useEffect(() => {
    // Dynamic loading of AOS (Animate On Scroll) library
    const aosCss = document.createElement('link');
    aosCss.href = 'https://unpkg.com/aos@2.3.1/dist/aos.css'; // AOS CSS
    aosCss.rel = 'stylesheet';

    const aosJs = document.createElement('script');
    aosJs.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js'; // AOS JS
    aosJs.async = true; // Load asynchronously

    // Inject scripts into document
    document.head.appendChild(aosCss);
    document.body.appendChild(aosJs);

    // Initialize AOS after script loads
    aosJs.onload = () => {
      window.AOS.init({
        duration: 1000, // Animation duration
        once: true, // Animate only once
        easing: 'ease-in-out', // Easing function
      });
    };

    // Gallery navigation setup
    const wrapper = document.querySelector('.grid-pages-wrapper'); // Page container
    const pages = document.querySelectorAll('.grid-page'); // Individual pages
    const prevBtn = document.querySelector('.prev-btn'); // Previous button
    const nextBtn = document.querySelector('.next-btn'); // Next button

    // Early return if elements not found
    if (!wrapper || !prevBtn || !nextBtn || pages.length === 0) return;

    const totalPages = pages.length; // Total number of pages
    let currentIndex = 0; // Current page index

    // Hide navigation if only one page
    if (totalPages <= 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
      return;
    }

    // Update button states based on current page
    const updateButtonStates = () => {
      prevBtn.disabled = currentIndex === 0; // Disable prev on first page
      nextBtn.disabled = currentIndex >= totalPages - 1; // Disable next on last page
    };

    // Navigate to specific page
    const goToPage = (pageIndex) => {
      currentIndex = pageIndex;
      wrapper.style.transform = `translateX(-${currentIndex * 100}%)`; // Slide pages
      updateButtonStates(); // Update button states
    };

    // Event handlers for navigation
    const handleNext = () => goToPage(currentIndex + 1);
    const handlePrev = () => goToPage(currentIndex - 1);

    // Attach event listeners
    nextBtn.addEventListener('click', handleNext);
    prevBtn.addEventListener('click', handlePrev);

    updateButtonStates(); // Set initial button states

    // Cleanup function to remove event listeners and injected scripts
    return () => {
      nextBtn.removeEventListener('click', handleNext);
      prevBtn.removeEventListener('click', handlePrev);
      document.head.removeChild(aosCss); // Remove AOS CSS
      document.body.removeChild(aosJs); // Remove AOS JS
    };
  }, []); // Empty dependency array - runs once on mount

  // Render the gallery component
  return (
    <section className="masonry-gallery-section">
      {/* Gallery title with AOS animation */}
      <h2 className="gallery-title" data-aos="fade-down">Our Moments</h2>

      <div className="masonry-container" data-aos="fade-up">
        {/* Page wrapper for sliding animation */}
        <div className="grid-pages-wrapper">
          {/* Page 1 - First set of images */}
          <div className="grid-page active">
            <div className="grid-item img-large">
              <img src="/images/flag-hoisting-1.png" alt="Republic Day Celebration" loading="lazy" />
            </div>
            <div className="grid-item img-small">
              <img src="/images/singing.png" alt="Singing Competition" loading="lazy" />
            </div>
            <div className="grid-item img-small">
              <img src="/images/school-name.png" alt="School Event Performance" loading="lazy" />
            </div>
            <div className="grid-item img-wide">
              <img src="/images/welcome.jpg" alt="Student-Group-Photo" loading="lazy" />
            </div>
          </div>

          {/* Page 2 - Second set of images */}
          <div className="grid-page">
            <div className="grid-item img-wide">
              <img src="/images/event3.png" alt="Cultural Event At School" loading="lazy" />
            </div>
            <div className="grid-item img-large">
              <img src="/images/event.jpg" alt="Republic Day Event At School" loading="lazy" />
            </div>
            <div className="grid-item img-small">
              <img src="/images/activity.jpeg" alt="Interactive Classroom" loading="lazy" />
            </div>
            <div className="grid-item img-small">
              <img src="/images/lab.png" alt="Computer-lab-Facility" loading="lazy" />
            </div>
          </div>

          {/* Page 3 - Third set of images */}
          <div className="grid-page">
            <div className="grid-item img-large">
              <img src="/images/flag-hoisting.jpg" alt="Flag Hoisting Eventat School" loading="lazy" />
            </div>
            <div className="grid-item img-wide">
              <img src="/images/marching.png" alt="Marching Band Performance" loading="lazy" />
            </div>
            <div className="grid-item img-wide">
              <img src="/images/lab2.png" alt="School Lab" loading="lazy" />
            </div>
          </div>

          {/* Page 4 - Fourth set of images */}
          <div className="grid-page">
            <div className="grid-item img-large">
              <img src="/images/event2.png" alt="School Trip to Wonderla" loading="lazy" />
            </div>
            <div className="grid-item img-small">
              <img src="/images/primary-block-office.png" alt="School Primary Block Office" loading="lazy" />
            </div>
            <div className="grid-item img-small">
              <img src="/images/school-ground-2.png" alt="School Ground" loading="lazy" />
            </div>
            <div className="grid-item img-wide">
              <img src="/images/bus.png" alt="School Bus Facility" loading="lazy" />
            </div>
          </div>
          
          {/* Page 5 - Fifth set of images */}
          <div className="grid-page">
            <div className="grid-item img-large">
              <img src="/images/school-front-side.jpg" alt="School Front View" loading="lazy" />
            </div>
            <div className="grid-item img-small">
              <img src="/images/school-ground.jpg" alt="School Playground" loading="lazy" />
            </div>
            <div className="grid-item img-small">
              <img src="/images/cultural-event2.png" alt="School Primary Block Office" loading="lazy" />
            </div>
            <div className="grid-item img-wide">
              <img src="/images/cultural-event.png" alt="Cultural Event" loading="lazy" />
            </div>
          </div>

          {/* Page 6 - Sixth set of images */}
          <div className="grid-page">
            <div className="grid-item img-large">
              <img src="/images/cultural-event3.png" alt="Cultural Event" loading="lazy" />
            </div>
            <div className="grid-item img-wide">
              <img src="/images/cultural-event4.png" alt="Cultural Event" loading="lazy" />
            </div>
            <div className="grid-item img-wide">
              <img src="/images/school-block2.png" alt="School Block" loading="lazy" />
            </div>
          </div>

          {/* Page 7 - Seventh set of images */}
          <div className="grid-page active">
            <div className="grid-item img-large">
              <img src="/images/cultural-event10.png" alt="Cultural Event At School" loading="lazy" />
            </div>
            <div className="grid-item img-large">
              <img src="/images/cultural-event11.png" alt="Cultural Event At School" loading="lazy" />
            </div>
          </div>
          {/* Page 8 - Eighth set of images*/}
           <div className="grid-page active">
            <div className="grid-item img-large">
              <img src="/images/main-droneview.png" alt="School campus drone view" loading="lazy" />
            </div>
            <div className="grid-item img-small">
              <img src="/images/solo-performance.png" alt="Fashion Competition" loading="lazy" />
            </div>
            <div className="grid-item img-small">
              <img src="/images/school-block.png" alt="School Campus" loading="lazy" />
            </div>
            <div className="grid-item img-wide">
              <img src="/images/event4.jpg" alt="Student-Group-Photo" loading="lazy" />
            </div>
          </div>

          {/* Page 9 - Nine set of images*/}
          <div className="grid-page">
            <div className="grid-item img-wide">
              <img src="/images/cultural-event5.png" alt="Cultural Event At School" loading="lazy" />
            </div>
            <div className="grid-item img-large">
              <img src="/images/cultural-event6.png" alt="Republic Day Event At School" loading="lazy" />
            </div>
            <div className="grid-item img-small">
              <img src="/images/cultural-event7.png" alt="Cultural Event  " loading="lazy" />
            </div>
            <div className="grid-item img-small">
              <img src="/images/bus2.png" alt="Bus Facility" loading="lazy" />
            </div>
          </div>
          {/* Page 10 - tenth set of images */}
          <div className="grid-page active">
           <div className="grid-item img-large">
              <img src="/images/cultural-event8.png" alt="Cultural Event At School" loading="lazy" />
            </div>
           <div className="grid-item img-large">
              <img src="/images/cultural-event9.png" alt="Cultural Event At School" loading="lazy" />
            </div>
          </div>
           
          {/* Page 11 - Eleventh set of images */}
          <div className="grid-page">
            <div className="grid-item img-large">
              <img src="/images/cultural-event17.png" alt="Cultural Event At School" loading="lazy" />
            </div>
            <div className="grid-item img-wide">
              <img src="/images/cultural-event15.png" alt="Cultural Event At School" loading="lazy" />
            </div>
            <div className="grid-item img-wide">
              <img src="/images/cultural-event16.png" alt="Cultural Event At School" loading="lazy" />
            </div>
          </div>

          {/* Page 12 - Tweleth set of images */}
          <div className="grid-page active">
           <div className="grid-item img-large">
              <img src="/images/cultural-event12.png" alt="Cultural Event At School" loading="lazy" />
            </div>
           <div className="grid-item img-large">
              <img src="/images/cultural-event13.png" alt="Cultural Event At School" loading="lazy" />
            </div>
          </div>

        </div>

        {/* Navigation arrows with accessibility labels */}
        <button className="arrow prev-btn" aria-label="Previous Slide">&#10094;</button>
        <button className="arrow next-btn" aria-label="Next Slide">&#10095;</button>
      </div>
    </section>
  );
};

export default ViewGallery;
