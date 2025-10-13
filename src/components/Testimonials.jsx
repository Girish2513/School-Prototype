import React, { useEffect, useRef } from "react";
import { testimonialsData } from "./siteData";
import "./Testimonials.css";

export default function Testimonials() {
  const sectionRef = useRef(null);
  const rowRefs = [useRef(null), useRef(null), useRef(null)];

  // Split testimonials into 3 rows of 5
  const rows = [
    testimonialsData.slice(0, 5),
    testimonialsData.slice(5, 10),
    testimonialsData.slice(10, 15),
  ];

  // Dynamic blur update
  useEffect(() => {
    const updateBlur = () => {
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionWidth = sectionRect.width;
      const columnWidth = sectionWidth / 5;

      rowRefs.forEach((ref) => {
        if (!ref.current) return;
        const cards = Array.from(ref.current.children);

        cards.forEach((card) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const relativeX = cardCenter - sectionRect.left;
          const columnIndex = Math.floor(relativeX / columnWidth);

          // Apply blur/opacity based on column
          switch (columnIndex) {
            case 0:
            case 4:
              card.style.filter = "blur(4px)";
              card.style.opacity = "0.3";
              break;
            case 1:
            case 3:
              card.style.filter = "blur(2px)";
              card.style.opacity = "0.6";
              break;
            case 2:
              card.style.filter = "blur(0px)";
              card.style.opacity = "1";
              break;
            default:
              card.style.filter = "blur(4px)";
              card.style.opacity = "0.3";
          }
        });
      });

      requestAnimationFrame(updateBlur);
    };

    requestAnimationFrame(updateBlur);
  }, []);

  return (
    <div ref={sectionRef}>
      <h2>What Our Students Say</h2>

      {rows.map((row, i) => (
        <div
          key={i}
          ref={rowRefs[i]}
          className={`testimonial-row row-${i + 1}`}
        >
          {[...row, ...row].map((t, index) => (
            <div key={index} className="testimonial-card">
              <span className="quote">“</span>
              <p className="testimonial-comment">{t.comment}</p>
              <p className="testimonial-name">{t.name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
