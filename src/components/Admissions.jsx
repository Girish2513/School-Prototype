import React from 'react';
import PropTypes from 'prop-types';
import { admissionsData } from './siteData';

/**
 * Internal ScrollStack component for displaying stacked panels that reveal on scroll.
 */
function ScrollStack({ panels = [] }) {
  if (!panels || panels.length === 0) {
    return (
      <section className="scroll-stack-container" aria-live="polite">
        <p>No admissions information available at the moment.</p>
      </section>
    );
  }

  return (
    <section className="scroll-stack-container" aria-labelledby="admissions-heading">
      {/* The main section container ID should be different from the sub-section IDs */}
      <div id="admissions"></div>
      {panels.map((panel, index) => (
        // --- THIS IS THE KEY CHANGE ---
        // We are adding the id from our data to each article
        <article key={index} id={panel.id} className="scroll-stack-panel">
            <h2>{panel.title}</h2>
            <p>{panel.content}</p>
      </article>

      ))}
    </section>
  );
}

ScrollStack.propTypes = {
  panels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // Make sure to include 'id' in prop validation
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
 */
function Admissions({ panels: customPanels } = {}) {
  const panelsToUse = customPanels && customPanels.length > 0 ? customPanels : admissionsData;

  return (
    <section className="admissions-section" aria-labelledby="admissions-title">
      <ScrollStack panels={panelsToUse} />
    </section>
  );
}

Admissions.propTypes = {
  panels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.string,
    })
  ),
};

export default Admissions;