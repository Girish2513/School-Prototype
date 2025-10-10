import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the user has scrolled past a certain threshold.
 * This enhances maintainability by encapsulating scroll event logic.
 * For extensibility, the threshold can be made configurable.
 * 
 * @param {number} threshold - The scroll Y position to trigger the state change (default: 50).
 * @returns {object} Object with isScrolled state and setter (if needed).
 */
export const useScroll = (threshold = 50) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true }); // Passive for performance

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return { isScrolled, setIsScrolled };
};
