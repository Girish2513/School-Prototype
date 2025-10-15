import React, { useState, useEffect } from 'react';
import './PopupBanner.css'; // Import the CSS file

function PopupBanner({ imageUrls, onClose, interval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? imageUrls.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === imageUrls.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const hasMultipleImages = imageUrls && imageUrls.length > 1;
  if (!imageUrls || imageUrls.length === 0) {
    return null; // Don't render anything if there are no images
  }

  return (
    // Add onClick to the overlay to close the popup
    <div className="popup-banner" onClick={onClose}>
      {/* Add onClick to stop clicks inside the content from closing the popup */}
      <div className="popup-banner-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>&times;</span>
        {imageUrls.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Popup Banner ${index + 1}`} className={index === currentIndex ? 'active' : ''} />
        ))}
        {hasMultipleImages && (
          <>
            <button className="arrow-btn left-arrow" onClick={goToPrevious}>
              &#10094;
            </button>
            <button className="arrow-btn right-arrow" onClick={goToNext}>
              &#10095;
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default PopupBanner;