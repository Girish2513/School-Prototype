import React from 'react';
import PropTypes from 'prop-types';
import { useSectionInView } from '../hooks/useSectionInView';

/**
 * Admissions component displaying the admission process flowchart.
 * Shows a visual flowchart image for the admission process.
 */
const AdmissionsSection = ({ id }) => {
  // Hooks to detect when each section is in view to trigger animations.
  const { ref: processRef, inView: processInView } = useSectionInView({ threshold: 0.3, triggerOnce: true });
  const { ref: eligibilityRef, inView: eligibilityInView } = useSectionInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section id={id} className="admissions-section">
      <div className="admissions-container"> 
        <div id="admission-process" ref={processRef} className={`admission-process-container ${processInView ? 'is-in-view' : ''}`}>
          {/* The header and content are now wrapped for animation targeting */}
          <div className="admissions-header anim-fade-up">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              ADMISSION PROCESS
            </h2>
            <div className="admissions-line"></div>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Choosing the right educational institution for your child is one of the most significant decisions you'll make as a parent. At Navodaya High School, we understand that this decision directly impacts your child’s development and future success.
  Our streamlined, step-by-step admission process is designed to help us get to know each other and set clear expectations. We believe in creating a partnership with you to ensure your child’s academic and personal growth in a nurturing and supportive environment. Together, we'll prepare your child for a brighter tomorrow.
            </p>
          </div>
          <div className="admissions-content anim-fade-in">
            <div className="flowchart-container">
              <img
                src="/images/admission-flowchart.png"
                alt="Admission Process Flowchart"
                className="flowchart-image"
              />
            </div>
          </div>
        </div>

        <hr className="section-divider" />

        <div id="eligibility-criteria" ref={eligibilityRef} className={`eligibility-criteria-container ${eligibilityInView ? 'is-in-view' : ''}`}> 
          <div className="admissions-header anim-fade-up"> {/* Re-using the existing class for consistency */}
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Eligibility Criteria
            </h2>
            <div className="admissions-line"></div>
            <p className="mt-4 text-lg leading-8">
              To maintain a standard of academic excellence, prospective students must meet certain age and academic prerequisites. Our criteria are designed to ensure that every child is well-prepared for the curriculum at their respective grade level, fostering a productive and supportive learning environment for all.
            </p>
          </div>
          <div className="eligibility-image-container anim-fade-in">
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

AdmissionsSection.propTypes = {
  /** The ID for the section, used for navigation */
  id: PropTypes.string.isRequired,
};

export default AdmissionsSection;
