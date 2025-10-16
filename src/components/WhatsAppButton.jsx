// 📂 src/components/WhatsAppButton.jsx
import { useState, useEffect } from "react";
import './WhatsAppButton.css';

const WhatsAppButton = ({isPopupVisible}) => {
  // 🟢 Replace with your actual WhatsApp number (country code without +)
  const phoneNumber = "919876543210";
  const message = "Hello! I would like to know more about Navodaya High School.";

  // State to control the greeting popup
  const [showPopup, setShowPopup] = useState(true);

  // Hide popup automatically after 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(false), 7000);
    return () => clearTimeout(timer);
  }, []);

  // Open WhatsApp chat when button is clicked
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="whatsapp-container">
      {/* WhatsApp Button */}
      <button
        onClick={handleClick}
        className="whatsapp-button"
        aria-label="Chat on WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </button>
    </div>
  );
};

export default WhatsAppButton;