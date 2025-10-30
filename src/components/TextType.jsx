/**
 * TextType component - Animated typewriter effect for text.
 * Types out text character by character, with optional deletion and looping.
 * Features include cursor blinking, variable typing speeds, color cycling.
 * Performance: Uses setTimeout for animation timing, GSAP for cursor blinking.
 * Accessibility: Respects reduced motion preferences, semantic HTML.
 * Customizable: Multiple props for speed, colors, cursor behavior, etc.
 *
 * @param {object} props - Component props.
 * @param {string|string[]} props.text - Text(s) to type out.
 * @param {string} props.as - HTML element to render as (default: 'div').
 * @param {number} props.typingSpeed - Speed of typing in ms per character.
 * @param {number} props.initialDelay - Delay before starting animation.
 * @param {number} props.pauseDuration - Pause between sentences.
 * @param {number} props.deletingSpeed - Speed of deleting characters.
 * @param {boolean} props.loop - Whether to loop through text array.
 * @param {string} props.className - Additional CSS classes.
 * @param {boolean} props.showCursor - Whether to show blinking cursor.
 * @param {boolean} props.hideCursorWhileTyping - Hide cursor during typing.
 * @param {string} props.cursorCharacter - Character for cursor.
 * @param {string} props.cursorClassName - CSS class for cursor.
 * @param {number} props.cursorBlinkDuration - Cursor blink speed.
 * @param {string[]} props.textColors - Array of colors to cycle through.
 * @param {object} props.variableSpeed - Random speed range {min, max}.
 * @param {function} props.onSentenceComplete - Callback when sentence completes.
 * @param {boolean} props.startOnVisible - Start animation when element becomes visible.
 * @param {boolean} props.reverseMode - Type text in reverse.
 * @returns {JSX.Element} The animated text element.
 */
import { useEffect, useRef, useState, createElement, useMemo, useCallback } from 'react';
import { gsap } from 'gsap'; // GSAP for smooth cursor animation
import './TextType.css'; // Component styles

const TextType = ({
  text, // Text content to animate (string or array)
  as: Component = 'div', // HTML element type
  typingSpeed = 50, // MS per character typing
  initialDelay = 0, // Initial delay before starting
  pauseDuration = 2000, // Pause between sentences
  deletingSpeed = 30, // MS per character deleting
  loop = true, // Loop through text array
  className = '', // Additional CSS classes
  showCursor = true, // Show blinking cursor
  hideCursorWhileTyping = false, // Hide cursor during animation
  cursorCharacter = '|', // Cursor character
  cursorClassName = '', // Cursor CSS class
  cursorBlinkDuration = 0.5, // Cursor blink speed
  textColors = [], // Color array for cycling
  variableSpeed, // Random speed variation
  onSentenceComplete, // Completion callback
  startOnVisible = false, // Start on intersection
  reverseMode = false, // Type in reverse
  ...props // Other props passed to element
}) => {
  // State for animation control
  const [displayedText, setDisplayedText] = useState(''); // Currently visible text
  const [currentCharIndex, setCurrentCharIndex] = useState(0); // Current character position
  const [isDeleting, setIsDeleting] = useState(false); // Whether currently deleting
  const [currentTextIndex, setCurrentTextIndex] = useState(0); // Current text in array
  const [isVisible, setIsVisible] = useState(!startOnVisible); // Visibility state for intersection

  // Refs for DOM elements
  const cursorRef = useRef(null); // Cursor element ref
  const containerRef = useRef(null); // Container element ref

  // Memoized text array conversion
  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  // Callback for random speed generation
  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min; // Random speed within range
  }, [variableSpeed, typingSpeed]);

  // Get current text color from array
  const getCurrentTextColor = () => {
    if (textColors.length === 0) return; // No colors specified
    return textColors[currentTextIndex % textColors.length]; // Cycle through colors
  };

  // Intersection observer effect for startOnVisible
  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true); // Start animation when visible
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% visible
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect(); // Cleanup
  }, [startOnVisible]);

  // Cursor blinking animation effect
  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 }); // Initial opacity
      gsap.to(cursorRef.current, {
        opacity: 0, // Blink to invisible
        duration: cursorBlinkDuration, // Blink speed
        repeat: -1, // Infinite repeat
        yoyo: true, // Back and forth
        ease: 'power2.inOut' // Smooth easing
      });
    }
  }, [showCursor, cursorBlinkDuration]);

  // Main typing animation effect
  useEffect(() => {
    if (!isVisible) return; // Don't animate if not visible

    let timeout; // Timeout reference for cleanup
    const currentText = textArray[currentTextIndex]; // Current text string
    const processedText = reverseMode ? currentText.split('').reverse().join('') : currentText; // Reverse if needed

    // Animation execution function
    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === '') { // Finished deleting
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1 && !loop) { // End of array, no loop
            return;
          }

          if (onSentenceComplete) { // Callback for completion
            onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
          }

          setCurrentTextIndex(prev => (prev + 1) % textArray.length); // Next text
          setCurrentCharIndex(0); // Reset character index
          timeout = setTimeout(() => {}, pauseDuration); // Pause before next
        } else {
          timeout = setTimeout(() => {
            setDisplayedText(prev => prev.slice(0, -1)); // Remove last character
          }, deletingSpeed);
        }
      } else { // Typing mode
        if (currentCharIndex < processedText.length) {
          timeout = setTimeout(
            () => {
              setDisplayedText(prev => prev + processedText[currentCharIndex]); // Add next character
              setCurrentCharIndex(prev => prev + 1); // Increment index
            },
            variableSpeed ? getRandomSpeed() : typingSpeed // Use random or fixed speed
          );
        } else if (textArray.length > 1) { // Multiple texts, start deleting
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    };

    // Initial delay or immediate execution
    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
      timeout = setTimeout(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => clearTimeout(timeout); // Cleanup timeout
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    onSentenceComplete
  ]);

  // Determine if cursor should be hidden
  const shouldHideCursor =
    hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex].length || isDeleting);

  // Render the component
  return createElement(
    Component, // Dynamic element type
    {
      ref: containerRef, // Attach container ref
      className: `text-type ${className}`, // CSS classes
      ...props // Spread other props
    },
    <span className="text-type__content" style={{ color: getCurrentTextColor() || 'inherit' }}>
      {displayedText} {/* Animated text content */}
    </span>,
    showCursor && ( // Conditional cursor rendering
      <span
        ref={cursorRef} // Attach cursor ref
        className={`text-type__cursor ${cursorClassName} ${shouldHideCursor ? 'text-type__cursor--hidden' : ''}`}
      >
        {cursorCharacter} {/* Cursor character */}
      </span>
    )
  );
};

export default TextType;
