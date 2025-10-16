// 📂 src/components/WhatsAppButton.jsx
import { useState, useEffect } from "react";
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const phoneNumber = "919876543210";
  
  // NEW: State to control the greeting popup
  const [showGreeting, setShowGreeting] = useState(true);
  // NEW: State to control the message choices popup
  const [showChoices, setShowChoices] = useState(false);

  // Generate a time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  
  // NEW: A list of common questions
  const messageOptions = [
    `Hello! I'd like to know more about the school.`,
    `Hello! I have a question about the admission process.`,
    `${getGreeting()}! I'd like to speak with someone from the office.`
  ];

  // Hide greeting popup automatically after 7 seconds
  useEffect(() => {
    if (showGreeting) {
        const timer = setTimeout(() => setShowGreeting(false), 7000);
        return () => clearTimeout(timer);
    }
  }, [showGreeting]);

  // NEW: This function now opens the choices, instead of WhatsApp directly
  const handleButtonClick = () => {
    setShowGreeting(false); // Hide greeting when choices appear
    setShowChoices(!showChoices); // Toggle the choices popup
  };
  
  // NEW: This function opens WhatsApp with the selected message
  const handleChoiceClick = (message) => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setShowChoices(false); // Hide choices after one is selected
  };

  return (
    <div className="whatsapp-container">
      {/* Greeting Popup */}
      {showGreeting && (
        <div className="whatsapp-popup">
          💬 Chat with our school office!
        </div>
      )}

      {/* NEW: Message Choices Popup */}
      {showChoices && (
        <div className="whatsapp-choices-popup">
          {messageOptions.map((msg, index) => (
            <button key={index} onClick={() => handleChoiceClick(msg)} className="whatsapp-choice-button">
              {msg}
            </button>
          ))}
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        // MODIFIED: This now calls a different function
        onClick={handleButtonClick}
        className="whatsapp-button"
        aria-label="Chat on WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </button>
    </div>
  );
};

export default WhatsAppButton;