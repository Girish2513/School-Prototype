import React from 'react';
import PropTypes from 'prop-types';
import ExpandingGrid from './ExpandingGrid';
import { aboutSectionsData } from './siteData';

/**
 * About section component serving as a wrapper for the ExpandingGrid.
 * Displays school information (principal message, vision/mission, history, faculty) in an interactive grid.
 * Data is sourced from siteData.js for maintainability; no direct props for extensibility.
 * For scalability, this can accept custom data or title as props.
 * Wrapped in section for semantic HTML and accessibility.
 */
function About() {
  return (
    <section className="about-section" aria-labelledby="about-title">
      <ExpandingGrid 
        title="About Our School" 
        sections={aboutSectionsData} 
      />
    </section>
  );
}

About.propTypes = {
  // No props, but PropTypes for consistency; can extend with custom data in future
};

export default About;
