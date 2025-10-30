/**
 * Testimonials component - Displays student testimonials in a dynamic carousel.
 * Features 3 rows of testimonials with dynamic blur effects based on position.
 * Testimonials are duplicated for seamless infinite scroll effect.
 * Performance: Uses requestAnimationFrame for smooth blur updates.
 * Accessibility: Semantic structure with proper headings.
 * Data: Imported from siteData.js.
 *
 * @returns {JSX.Element} The testimonials section.
 */
import React, { useEffect, useRef } from "react";
import { testimonialsData } from "./siteData"; // Import testimonial data array
import "./Testimonials.css"; // Import component styles

export default function Testimonials() {
  // Ref for the main section container
  const sectionRef = useRef(null);
  // Refs for each testimonial row
  const rowRefs = [useRef(null), useRef(null), useRef(null)];

  // Split testimonials into 3 rows of 5 testimonials each
  const rows = [
    testimonialsData.slice(0, 5), // First row: testimonials 0-4
    testimonialsData.slice(5, 10), // Second row: testimonials 5-9
    testimonialsData.slice(10, 15), // Third row: testimonials 10-14
  ];

  // Effect to dynamically update blur and opacity based on card position
  useEffect(() => {
    // Function to calculate and apply blur/opacity effects
    const updateBlur = () => {
      // Get section dimensions
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionWidth = sectionRect.width;
      const columnWidth = sectionWidth / 5; // Divide into 5 columns

      // Process each row
      rowRefs.forEach((ref) => {
        if (!ref.current) return; // Skip if ref not attached
        const cards = Array.from(ref.current.children); // Get all card elements

        // Apply effects to each card based on its position
        cards.forEach((card) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2; // Center of card
          const relativeX = cardCenter - sectionRect.left; // Position relative to section
          const columnIndex = Math.floor(relativeX / columnWidth); // Which column (0-4)

          // Apply blur/opacity based on column position (center is clearest)
          switch (columnIndex) {
            case 0: // Leftmost column
            case 4: // Rightmost column
              card.style.filter = "blur(4px)"; // Heavy blur
              card.style.opacity = "0.3"; // Low opacity
              break;
            case 1: // Second from left
            case 3: // Second from right
              card.style.filter = "blur(2px)"; // Medium blur
              card.style.opacity = "0.6"; // Medium opacity
              break;
            case 2: // Center column
              card.style.filter = "blur(0px)"; // No blur
              card.style.opacity = "1"; // Full opacity
              break;
            default: // Fallback
              card.style.filter = "blur(4px)"; // Heavy blur
              card.style.opacity = "0.3"; // Low opacity
          }
        });
      });

      // Continuously update on next frame for smooth animation
      requestAnimationFrame(updateBlur);
    };

    // Start the blur update loop
    requestAnimationFrame(updateBlur);
  }, []); // Empty dependency array - runs once on mount

  // Render the testimonials section
  return (
    <div ref={sectionRef}>
      <h2>What Our Students Say</h2> {/* Section heading */}

      {/* Render each row of testimonials */}
      {rows.map((row, i) => (
        <div
          key={i} // Unique key for React
          ref={rowRefs[i]} // Attach ref for blur calculations
          className={`testimonial-row row-${i + 1}`} // CSS class with row number
        >
          {/* Duplicate row for seamless scrolling effect */}
          {[...row, ...row].map((t, index) => (
            <div key={index} className="testimonial-card">
              <span className="quote">"</span> {/* Opening quote mark */}
              <p className="testimonial-comment">{t.comment}</p> {/* Testimonial text */}
              <p className="testimonial-name">{t.name}</p> {/* Student name */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
