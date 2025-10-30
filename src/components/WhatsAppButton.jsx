/**
 * WhatsAppButton component - Floating WhatsApp contact button.
 * Opens WhatsApp chat with predefined message when clicked.
 * Features visibility control, auto-hiding popup, and accessibility.
 * Performance: Lightweight with minimal state management.
 * Accessibility: Proper ARIA labels, keyboard accessible.
 * Responsive: Positioned fixed, adapts to screen size.
 *
 * @param {object} props - Component props.
 * @param {boolean} props.visible - Controls button visibility.
 * @returns {JSX.Element} The WhatsApp button component.
 */
import { useState, useEffect } from "react";
import './WhatsAppButton.css'; // Button-specific styles

const WhatsAppButton = ({ visible }) => {
  // WhatsApp configuration - replace with actual school number
  const phoneNumber = "919876543210"; // Phone number without + (country code included)
  const message = "Hello! I would like to know more about Navodaya High School."; // Default message

  // State for controlling greeting popup visibility
  const [showPopup, setShowPopup] = useState(true); // Initially show popup

  // Effect to auto-hide popup after 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(false), 7000); // 7 second delay
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  // Click handler to open WhatsApp chat
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`; // WhatsApp URL
    window.open(url, "_blank"); // Open in new tab
  };

  // Render the button container
  return (
    <div className={`whatsapp-container ${visible ? "visible" : "hidden"}`}>
      {/* Main WhatsApp button */}
      <button
        onClick={handleClick} // Handle click to open WhatsApp
        className="whatsapp-button" // CSS class for styling
        aria-label="Chat on WhatsApp" // Accessibility label
      >
        <i className="fab fa-whatsapp"></i> {/* WhatsApp icon */}
      </button>
    </div>
  );
};

export default WhatsAppButton;
