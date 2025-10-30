// Import React and useEffect hook for component lifecycle management
import React, { useEffect } from "react";
// Import the CSS file for styling the gallery component
import "./Gallery.css";

/**
 * Gallery component that displays a rotating sneak peek of school images.
 * Features an automatic carousel animation showing 3 images at a time (left, center, right).
 * Includes a button to navigate to the full gallery view.
 */
const Gallery = () => {
  // useEffect hook to set up the gallery animation when the component mounts
  useEffect(() => {
    // Get the gallery track element from the DOM
    const track = document.getElementById("galleryTrack");
    if (!track) return; // Exit if track element is not found

    // Get all gallery item elements
    const items = track.querySelectorAll(".gallery-item");
    const totalItems = items.length;
    // Warn if there are fewer than 3 items (required for the 3-position animation)
    if (totalItems < 3) {
      console.warn("Gallery animation requires at least 3 items.");
      return;
    }

    // Initialize the center index for the carousel
    let centerIndex = 0;
    let animationInterval; // Variable to hold the interval ID

    // Function to update the gallery positions (left, center, right)
    const updateGallery = () => {
      // Calculate indices for left and right positions relative to center
      const leftIndex = (centerIndex - 1 + totalItems) % totalItems;
      const rightIndex = (centerIndex + 1) % totalItems;

      // Update classes for each item based on its position
      items.forEach((item, index) => {
        item.classList.remove("left", "center", "right"); // Remove existing position classes
        if (index === centerIndex) item.classList.add("center"); // Center position
        else if (index === leftIndex) item.classList.add("left"); // Left position
        else if (index === rightIndex) item.classList.add("right"); // Right position
      });
    };

    // Function to advance to the next image in the carousel
    const advance = () => {
      centerIndex = (centerIndex + 1) % totalItems; // Increment center index with wrap-around
      updateGallery(); // Update the gallery positions
    };

    // Function to start the automatic animation
    const startAnimation = () => {
      clearInterval(animationInterval); // Clear any existing interval
      animationInterval = setInterval(advance, 3000); // Set new interval (3 seconds)
    };

    // Initialize the gallery and start animation
    updateGallery();
    startAnimation();

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(animationInterval);
  }, []); // Empty dependency array means this runs once on mount

  // Handler function for the "View Full Gallery" button click
  const handleViewFullGallery = (e) => {
    e.preventDefault(); // Prevent default link behavior (page reload)
    // Update the URL in the browser's address bar without reloading
    window.history.pushState({}, '', '/view-gallery');
    // Dispatch a 'popstate' event to notify the app of the URL change
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  // Render the component JSX
  return (
    // Main section for the gallery
    <section className="gallery-section">
      {/* Header section with title and description */}
      <div className="gallery-header">
        <h2>SNEAK<br />PEAK</h2> {/* Title with line break */}
        <div className="gallery-line"></div> {/* Decorative line */}
        <p>Catch a sneak peek of campus life! 🎓<br />Where every picture tells a story of learning, laughter, and growth.</p> {/* Description */}
      </div>

      {/* Content section containing the gallery track */}
      <div className="gallery-content">
        {/* Gallery track container with ID for DOM manipulation */}
        <div id="galleryTrack" className="gallery-track">
          {/* Individual gallery items with images */}
          <div className="gallery-item"><img src="/images/welcome.jpg" alt="Welcome" /></div>
          <div className="gallery-item"><img src="/images/school-ground.jpg" alt="Activity" /></div>
          <div className="gallery-item"><img src="/images/flag-hoisting.jpg" alt="Classroom" /></div>
          <div className="gallery-item"><img src="/images/event.jpg" alt="Event" /></div>
          <div className="gallery-item"><img src="/images/school-front-side.jpg" alt="Group Photo"/></div>
        </div>
      </div>
      {/* Link/button to view the full gallery */}
      <a href="/view-gallery" onClick={handleViewFullGallery} className="btn-gallery-view">
        View Full Gallery
      </a>
    </section>
  );
};

// Export the component as default
export default Gallery;
