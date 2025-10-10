import React from 'react';
import PropTypes from 'prop-types';
import { admissionsData } from './siteData';

/**
 * Internal ScrollStack component for displaying stacked panels that reveal on scroll.
 * Each panel shows a title and content; stacks visually for engaging admissions info.
 * For accessibility, uses semantic elements and ARIA; content is plain text for simplicity.
 * For security, if HTML is added later, sanitize with DOMPurify.
 * For extensibility, add props for animation type or panel height.
 *
 * @param {object} props - Props for ScrollStack.
 * @param {Array<object>} props.panels - Array of {title, content} objects.
 * @returns {JSX.Element} Stacked panels section.
 */
function ScrollStack({ panels = [] }) {
  // Fallback if no panels for resilience
  if (!panels || panels.length === 0) {
    return (
      <section className="scroll-stack-container" aria-live="polite">
        <p>No admissions information available at the moment.</p>
      </section>
    );
  }

  return (
    <section id="admissions" className="scroll-stack-container" aria-labelledby="admissions-heading">
      {panels.map((panel, index) => (
        <article key={index} className="scroll-stack-panel" aria-labelledby={`panel-${index}-title`}>
          <h2 id={`panel-${index}-title`}>{panel.title}</h2>
          <p>{panel.content}</p>
        </article>
      ))}
    </section>
  );
}

ScrollStack.propTypes = {
  panels: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};

ScrollStack.defaultProps = {
  panels: [],
};

/**
 * Admissions section component wrapping ScrollStack with data from siteData.js.
 * Displays eligibility, process, dates, and policy in a scrollable stack format.
 * Data externalized for maintainability; updates in siteData propagate here.
 * For scalability, can accept custom panels prop to override siteData.
 * For extensibility, add form integration or dynamic dates from API.
 * Semantic section with ARIA for accessibility.
 */
function Admissions({ panels: customPanels } = {}) {
  const panelsToUse = customPanels || admissionsData;

  return (
    <section className="admissions-section" aria-labelledby="admissions-title">
      <ScrollStack panels={panelsToUse} />
    </section>
  );
}

Admissions.propTypes = {
  panels: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.string,
    })
  ),
};

export default Admissions;
