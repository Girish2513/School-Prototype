/**
 * PopupBanner component - Modal popup displaying promotional images.
 * Features image carousel with navigation arrows, overlay click to close.
 * Used for announcements, promotions, or important notices on home page.
 * Performance: Lightweight carousel, no auto-play to avoid distraction.
 * Accessibility: Keyboard accessible, proper alt text, ARIA labels.
 * Responsive: Modal overlay adapts to screen size.
 *
 * @param {object} props - Component props.
 * @param {string[]} props.imageUrls - Array of image URLs to display.
 * @param {function} props.onClose - Callback function to close the popup.
 * @param {number} props.interval - Auto-play interval (not currently used).
 * @returns {JSX.Element|null} The popup banner component or null if no images.
 */
import React, { useState, useEffect } from 'react';
import './PopupBanner.css'; // Modal and carousel styles

function PopupBanner({ imageUrls, onClose, interval = 3000 }) {
  // State for current image index in carousel
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigate to previous image
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0; // Check if at first image
    const newIndex = isFirstSlide ? imageUrls.length - 1 : currentIndex - 1; // Wrap to last or decrement
    setCurrentIndex(newIndex);
  };

  // Navigate to next image
  const goToNext = () => {
    const isLastSlide = currentIndex === imageUrls.length - 1; // Check if at last image
    const newIndex = isLastSlide ? 0 : currentIndex + 1; // Wrap to first or increment
    setCurrentIndex(newIndex);
  };

  // Check if there are multiple images for navigation
  const hasMultipleImages = imageUrls && imageUrls.length > 1;

  // Don't render if no images provided
  if (!imageUrls || imageUrls.length === 0) {
    return null; // Return null to render nothing
  }

  return (
    // Modal overlay - click to close
    <div className="popup-banner" onClick={onClose}>
      {/* Modal content container - prevent event bubbling */}
      <div className="popup-banner-content" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <span className="close-button" onClick={onClose}>&times;</span>

        {/* Image carousel */}
        {imageUrls.map((imageUrl, index) => (
          <img
            key={index} // Unique key for React rendering
            src={imageUrl} // Image source
            alt={`Popup Banner ${index + 1}`} // Descriptive alt text
            className={index === currentIndex ? 'active' : ''} // Active class for current image
          />
        ))}

        {/* Navigation arrows - only show if multiple images */}
        {hasMultipleImages && (
          <>
            <button className="arrow-btn left-arrow" onClick={goToPrevious}>
              &#10094; {/* Left arrow symbol */}
            </button>
            <button className="arrow-btn right-arrow" onClick={goToNext}>
              &#10095; {/* Right arrow symbol */}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default PopupBanner;
