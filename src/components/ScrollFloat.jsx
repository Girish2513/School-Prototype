/**
 * ScrollFloat component - Animated text reveal on scroll.
 * Splits text into individual characters and animates them in with GSAP.
 * Used for dramatic headings that appear as user scrolls.
 * Performance: Uses GSAP for smooth animations, ScrollTrigger for scroll-based triggers.
 * Accessibility: Preserves semantic heading structure.
 * Customizable: Props for duration, easing, scroll positions, stagger.
 *
 * @param {object} props - Component props.
 * @param {string|ReactNode} props.children - Text content to animate.
 * @param {React.RefObject} props.scrollContainerRef - Custom scroll container ref.
 * @param {string} props.containerClassName - Additional CSS class for container.
 * @param {string} props.textClassName - Additional CSS class for text span.
 * @param {number} props.animationDuration - Duration of animation in seconds.
 * @param {string} props.ease - GSAP easing function.
 * @param {string} props.scrollStart - ScrollTrigger start position.
 * @param {string} props.scrollEnd - ScrollTrigger end position.
 * @param {number} props.stagger - Stagger delay between characters.
 * @returns {JSX.Element} The animated heading element.
 */
import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollFloat.css';

// Register GSAP ScrollTrigger plugin for scroll-based animations
gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03
}) => {
  // Ref for the container element to attach animations
  const containerRef = useRef(null);

  // Memoized split text into individual character spans
  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split('').map((char, index) => (
      <span className="char" key={index}>
        {char === ' ' ? '\u00A0' : char} {/* Preserve spaces */}
      </span>
    ));
  }, [children]);

  // Effect to set up GSAP animation when component mounts
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return; // Exit if element not found

    // Determine scroll container (custom or window)
    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    // Select all character elements for animation
    const charElements = el.querySelectorAll('.char');

    // Animate characters from hidden/scaled to visible/normal
    gsap.fromTo(
      charElements,
      {
        willChange: 'opacity, transform', // Optimize performance
        opacity: 0, // Start invisible
        yPercent: 120, // Start below
        scaleY: 2.3, // Start stretched vertically
        scaleX: 0.7, // Start compressed horizontally
        transformOrigin: '50% 0%' // Scale from top center
      },
      {
        duration: animationDuration, // Animation length
        ease: ease, // Easing function
        opacity: 1, // End visible
        yPercent: 0, // End at normal position
        scaleY: 1, // End at normal scale
        scaleX: 1, // End at normal scale
        stagger: stagger, // Delay between each character
        scrollTrigger: {
          trigger: el, // Element that triggers animation
          scroller, // Scroll container
          start: scrollStart, // When animation starts
          end: scrollEnd, // When animation ends
          scrub: true // Smooth scrubbing with scroll
        }
      }
    );
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  // Render the heading with split text
  return (
    <h2 ref={containerRef} className={`scroll-float ${containerClassName}`}>
      <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
    </h2>
  );
};

export default ScrollFloat;
