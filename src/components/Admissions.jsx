// Import React library for building the component
import React from 'react';
// Import PropTypes for type checking of props
import PropTypes from 'prop-types';
// Import custom hook for detecting when section is in view for animations
import { useSectionInView } from '../hooks/useSectionInView';

/**
 * AdmissionsSection component displaying the admission process and eligibility criteria.
 * This component renders two main sections: the admission process with a flowchart and eligibility criteria with an image.
 * It uses intersection observer hooks to trigger animations when sections come into view.
 * Props: id (string) - The ID for the section, used for navigation and scrolling.
 */
const AdmissionsSection = ({ id }) => {
  // Custom hook to detect when the admission process section is in view for animation triggering
  // threshold: 0.3 means 30% of the element must be visible, triggerOnce: true means animation only once
  const { ref: processRef, inView: processInView } = useSectionInView({ threshold: 0.3, triggerOnce: true });
  // Custom hook for eligibility criteria section
  const { ref: eligibilityRef, inView: eligibilityInView } = useSectionInView({ threshold: 0.3, triggerOnce: true });

  // Render the component
  return (
    // Main section element with dynamic ID for navigation
    <section id={id} className="admissions-section">
      {/* Container for the entire admissions content */}
      <div className="admissions-container">
        {/* Admission Process subsection with animation ref and conditional class */}
        <div id="admission-process" ref={processRef} className={`admission-process-container ${processInView ? 'is-in-view' : ''}`}>
          {/* Header section with fade-up animation */}
          <div className="admissions-header anim-fade-up">
            {/* Main heading for admission process */}
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              ADMISSION PROCESS
            </h2>
            {/* Decorative line element */}
            <div className="admissions-line"></div>
            {/* Descriptive paragraph explaining the admission process */}
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Choosing the right educational institution for your child is one of the most significant decisions you'll make as a parent. At Navodaya High School, we understand that this decision directly impacts your child’s development and future success.
              Our streamlined, step-by-step admission process is designed to help us get to know each other and set clear expectations. We believe in creating a partnership with you to ensure your child’s academic and personal growth in a nurturing and supportive environment. Together, we'll prepare your child for a brighter tomorrow.
            </p>
          </div>
          {/* Content section with fade-in animation */}
          <div className="admissions-content anim-fade-in">
            {/* Container for the flowchart image */}
            <div className="flowchart-container">
              {/* Image displaying the admission process flowchart */}
              <img
                src="/images/admission-flowchart.png"
                alt="Admission Process Flowchart"
                className="flowchart-image"
              />
            </div>
          </div>
        </div>

        {/* Horizontal divider between sections */}
        <hr className="section-divider" />

        {/* Eligibility Criteria subsection with animation ref and conditional class */}
        <div id="eligibility-criteria" ref={eligibilityRef} className={`eligibility-criteria-container ${eligibilityInView ? 'is-in-view' : ''}`}>
          {/* Header section with fade-up animation, reusing class for consistency */}
          <div className="admissions-header anim-fade-up">
            {/* Main heading for eligibility criteria */}
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Eligibility Criteria
            </h2>
            {/* Decorative line element */}
            <div className="admissions-line"></div>
            {/* Descriptive paragraph explaining eligibility requirements */}
            <p className="mt-4 text-lg leading-8">
              To maintain a standard of academic excellence, prospective students must meet certain age and academic prerequisites. Our criteria are designed to ensure that every child is well-prepared for the curriculum at their respective grade level, fostering a productive and supportive learning environment for all.
            </p>
          </div>
          {/* Image container with fade-in animation */}
          <div className="eligibility-image-container anim-fade-in">
            {/* Image displaying eligibility criteria */}
            <img
              src="/images/EligibilityCriteria.png"
              alt="Eligibility Criteria for Admission"
              className="eligibility-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

// PropTypes for type checking
AdmissionsSection.propTypes = {
  /** The ID for the section, used for navigation and scrolling */
  id: PropTypes.string.isRequired,
};

// Export the component as default
export default AdmissionsSection;
