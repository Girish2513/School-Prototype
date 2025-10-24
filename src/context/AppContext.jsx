import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * AppContext for managing global state across the application.
 * Centralizes state like intro animation, ticker items, popup images, etc.
 * Uses localStorage for persistence where appropriate.
 */
const AppContext = createContext(null);

/**
 * Custom hook to use the AppContext.
 * Throws an error if used outside the AppProvider.
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

/**
 * AppProvider component that wraps the app and provides global state.
 * Manages state for intro, ticker items, popup images, and other app-wide data.
 */
export const AppProvider = ({ children }) => {
  // 🌟 State to manage the intro animation class (fades out after 2.5s)
  const [isIntro, setIsIntro] = useState(true);

  // 🌟 State for controlling popup banner visibility
  const [showPopup, setShowPopup] = useState(false);

  // 🎯 State for editable ticker text items (news headlines)
  const [tickerItems, setTickerItems] = useState(() => {
    const saved = localStorage.getItem('tickerItems');
    return saved
      ? JSON.parse(saved)
      : [
          '🏠 Open House: January 15, 2026',
          '🧪 New STEM Lab inaugurated this month',
          '☀️ Summer Camp registrations now live',
          '🎓 Explore our gallery and campus life!',
        ];
  });

  // 🖼️ State for popup banner images
  const [popupImages, setPopupImages] = useState(() => {
    const saved = localStorage.getItem('popupImages');
    return saved
      ? JSON.parse(saved)
      : ['/images/event.jpg', '/images/poster.jpeg', '/images/trip.jpeg'];
  });

  // 🧭 State for WhatsApp button visibility
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  // 🧭 State for location icon visibility
  const [showLocation, setShowLocation] = useState(false);

  // 💾 Save ticker updates to localStorage
  useEffect(() => {
    localStorage.setItem('tickerItems', JSON.stringify(tickerItems));
  }, [tickerItems]);

  // 💾 Save popup images to localStorage
  useEffect(() => {
    localStorage.setItem('popupImages', JSON.stringify(popupImages));
  }, [popupImages]);

  // 🎬 Trigger the intro animation on mount (2.5s)
  useEffect(() => {
    const timer = setTimeout(() => setIsIntro(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // After intro ends, delay the WhatsApp button appearance
  useEffect(() => {
    if (!isIntro) {
      const timer = setTimeout(() => setShowWhatsApp(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isIntro]);

  // Delay the location icon appearance
  useEffect(() => {
    if (!isIntro) {
      const timer = setTimeout(() => setShowLocation(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isIntro]);

  // 🎬 Show popup banner 3 seconds after page load
  useEffect(() => {
    setTimeout(() => setShowPopup(true), 3000);
  }, []);

  // 🚫 Lock scroll when popup is open
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

  const value = {
    isIntro,
    setIsIntro,
    showPopup,
    setShowPopup,
    tickerItems,
    setTickerItems,
    popupImages,
    setPopupImages,
    showWhatsApp,
    setShowWhatsApp,
    showLocation,
    setShowLocation,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
