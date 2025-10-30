// Import necessary hooks and utilities from React and Framer Motion
import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

/**
 * CountUp component - Animated number counter using Framer Motion.
 * Counts up or down from a starting number to an ending number with smooth spring animation.
 * Triggers animation when the component comes into view.
 * Props:
 * - to: Target number to count to (required)
 * - from: Starting number (default: 0)
 * - direction: 'up' or 'down' (default: 'up')
 * - delay: Delay before animation starts in seconds (default: 0)
 * - duration: Animation duration in seconds (default: 2)
 * - className: Additional CSS classes (default: '')
 * - startWhen: Boolean to control when animation starts (default: true)
 * - separator: Character to use as thousands separator (default: '')
 * - onStart: Callback function called when animation starts
 * - onEnd: Callback function called when animation ends
 */
export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  onStart,
  onEnd
}) {
  // Ref for the span element that displays the number
  const ref = useRef(null);
  // Motion value for the animated number, initialized based on direction
  const motionValue = useMotionValue(direction === 'down' ? to : from);

  // Calculate spring physics parameters based on duration for smooth animation
  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  // Create spring animation with calculated parameters
  const springValue = useSpring(motionValue, {
    damping,
    stiffness
  });

  // Hook to detect when component is in view, triggers once
  const isInView = useInView(ref, { once: true, margin: '0px' });

  /**
   * Helper function to determine the number of decimal places in a number.
   * Used to maintain consistent decimal formatting during animation.
   */
  const getDecimalPlaces = num => {
    const str = num.toString();

    if (str.includes('.')) {
      const decimals = str.split('.')[1];

      if (parseInt(decimals) !== 0) {
        return decimals.length;
      }
    }

    return 0;
  };

  // Calculate maximum decimal places between from and to values
  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  // Initialize the display with the starting value
  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = String(direction === 'down' ? to : from);
    }
  }, [from, to, direction]);

  // Effect to start the animation when component is in view and startWhen is true
  useEffect(() => {
    if (isInView && startWhen) {
      // Call onStart callback if provided
      if (typeof onStart === 'function') onStart();

      // Set timeout to start the motion value animation after delay
      const timeoutId = setTimeout(() => {
        motionValue.set(direction === 'down' ? from : to);
      }, delay * 1000);

      // Set timeout to call onEnd callback after animation completes
      const durationTimeoutId = setTimeout(
        () => {
          if (typeof onEnd === 'function') onEnd();
        },
        delay * 1000 + duration * 1000
      );

      // Cleanup timeouts on unmount or dependency change
      return () => {
        clearTimeout(timeoutId);
        clearTimeout(durationTimeoutId);
      };
    }
  }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration]);

  // Effect to update the displayed text as the spring value changes
  useEffect(() => {
    const unsubscribe = springValue.on('change', latest => {
      if (ref.current) {
        // Check if numbers have decimals
        const hasDecimals = maxDecimals > 0;

        // Formatting options for Intl.NumberFormat
        const options = {
          useGrouping: !!separator, // Enable grouping if separator is provided
          minimumFractionDigits: hasDecimals ? maxDecimals : 0,
          maximumFractionDigits: hasDecimals ? maxDecimals : 0
        };

        // Format the number using Intl.NumberFormat for proper localization
        const formattedNumber = Intl.NumberFormat('en-US', options).format(latest);

        // Replace commas with custom separator if provided, otherwise use formatted number
        ref.current.textContent = separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [springValue, separator, maxDecimals]);

  // Render the span element with ref and className
  return <span className={className} ref={ref} />;
}
