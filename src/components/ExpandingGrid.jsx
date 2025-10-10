import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

/**
 * Interactive expanding grid component displaying a 2x2 grid of cards that expand on hover/click.
 * On mobile, stacks vertically for better usability. Each card shows an icon, title, and expandable HTML content.
 * Sanitizes HTML content using DOMPurify to prevent XSS attacks, enhancing security and reliability.
 * Supports keyboard navigation and ARIA attributes for accessibility.
 * For performance, consider memoizing sections or using React.lazy for large content.
 * For extensibility, add props for grid layout (e.g., columns) or animation duration.
 *
 * @param {object} props - The component's props.
 * @param {string} props.title - The main title for the section (e.g., "About Our School").
 * @param {Array<object>} props.sections - Array of section objects for grid items.
 * @returns {JSX.Element} The rendered expanding grid component.
 */
function ExpandingGrid({ title, sections = [] }) {
  // State to track the currently active (expanded) grid item index; null means none active.
  const [activeIndex, setActiveIndex] = useState(null);

  // Error handling: If no sections, render empty or fallback message for resilience.
  if (!sections || sections.length === 0) {
    return (
      <section className="expanding-grid-section" aria-live="polite">
        <div className="expanding-grid-content-wrapper">
          <h2 className="section-title">{title}</h2>
          <p>No content available at the moment. Please check back later.</p>
        </div>
      </section>
    );
  }

  // Sets the active index on mouse enter for desktop hover effect.
  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  // Clears active index on mouse leave from the grid container (desktop only).
  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  /**
   * Toggles the active state of a grid item on click.
   * Essential for touch devices (mobile) and improves accessibility with keyboard support.
   * If the same item is clicked, it collapses; otherwise, expands the new one.
   * Prevents default on keydown for space/enter to avoid scrolling.
   * @param {number} index - The index of the grid item.
   * @param {Event} [e] - The click or keydown event.
   */
  const handleClick = (index, e) => {
    if (e) {
      e.preventDefault(); // Prevent scrolling on space key
    }
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Sanitize HTML content using DOMPurify to prevent XSS; done once per render for simplicity.
  // For performance in large lists, memoize sanitized content.
  const sanitizedSections = sections.map((section) => ({
    ...section,
    sanitizedContent: DOMPurify.sanitize(section.content, { ALLOWED_TAGS: ['p', 'h3', 'blockquote', 'cite', 'strong', 'em'] })
  }));

  return (
    <section className="expanding-grid-section" aria-labelledby="grid-title">
      <div className="expanding-grid-content-wrapper">
        <h2 id="grid-title" className="section-title">{title}</h2>
        <div
          className={`grid-container ${activeIndex !== null ? `active-item-${activeIndex}` : ''}`}
          onMouseLeave={handleMouseLeave}
          role="grid"
          aria-label={`${title} grid`}
        >
          {sanitizedSections.map((section, index) => {
            const isExpanded = activeIndex === index;
            const detailsId = `${section.id}-details`;

            return (
              <div
                key={section.id}
                className={`grid-item ${isExpanded ? 'active' : ''}`}
                onMouseEnter={() => handleMouseEnter(index)}
                onClick={(e) => handleClick(index, e)}
                // Accessibility: Role button for interactive div, tabIndex for keyboard focus.
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                aria-controls={detailsId}
                // Keyboard support: Enter or Space to toggle.
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleClick(index, e);
                  }
                }}
              >
                {/* Background image for visual appeal; ensure image is accessible/optimized. */}
                <div 
                  className="grid-item-bg" 
                  style={{ backgroundImage: `url(${section.backgroundImage})` }}
                  role="img"
                  aria-label={`${section.title} background`}
                ></div>
                <div className="grid-item-content">
                  <div className="item-header">
                    {/* Icon is decorative; hidden from screen readers. */}
                    <i className={section.icon} aria-hidden="true"></i>
                    <h3 className="highlight-blue">{section.title}</h3>
                  </div>
                  {/* Sanitized HTML content for security; fallback if sanitization fails. */}
                  <div 
                    id={detailsId} 
                    className="item-details" 
                    dangerouslySetInnerHTML={{ __html: section.sanitizedContent || '' }}
                    aria-hidden={!isExpanded}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

ExpandingGrid.propTypes = {
  /** The title of the grid section, displayed as h2 */
  title: PropTypes.string.isRequired,
  /** An array of section objects to display in the grid; defaults to empty array */
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired, // Raw HTML content to sanitize
      backgroundImage: PropTypes.string.isRequired,
    })
  ).isRequired,
};

ExpandingGrid.defaultProps = {
  sections: [],
};

export default ExpandingGrid;
