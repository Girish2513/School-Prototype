import { useInView } from 'react-intersection-observer';

/**
 * Custom hook to detect if a section is in view using Intersection Observer API.
 * This encapsulates the inView logic for reusability across sections, improving maintainability.
 * Uses the react-intersection-observer library for performance and simplicity.
 * For extensibility, threshold and other options can be customized.
 * 
 * @param {object} options - Configuration for the Intersection Observer.
 * @param {number} [options.threshold=0.1] - The visibility threshold (0 to 1).
 * @param {Function} [options.onChange] - Callback when inView changes.
 * @returns {object} Object with ref and inView state.
 */
export const useSectionInView = (options = {}) => {
  const { threshold = 0.1, onChange } = options;

  const { ref, inView } = useInView({
    threshold,
    onChange: (inView) => {
      if (onChange) onChange(inView);
    },
    // Trigger once for performance in scroll-heavy apps
    triggerOnce: false,
  });

  return { ref, inView };
};
