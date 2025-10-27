import React from 'react';
import PropTypes from 'prop-types';

/**
 * Admissions component displaying the admission process flowchart.
 * Shows a visual flowchart image for the admission process.
 */
const AdmissionsSection = ({ id }) => {
  return (
    <section id={id} className="admissions-section">
      <div className="admissions-container"> 
        <div id="admission-process">
          <div className="admissions-header">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              ADMISSION PROCESS
            </h2>
            <div className="admissions-line"></div>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Choosing the right educational institution for your child is one of the most significant decisions you'll make as a parent. At Navodaya High School, we understand that this decision directly impacts your child’s development and future success.
  Our streamlined, step-by-step admission process is designed to help us get to know each other and set clear expectations. We believe in creating a partnership with you to ensure your child’s academic and personal growth in a nurturing and supportive environment. Together, we'll prepare your child for a brighter tomorrow.
            </p>
          </div>
          <div className="admissions-content">
            <div className="flowchart-container">
              <img
                src="/images/admission-flowchart.png"
                alt="Admission Process Flowchart"
                className="flowchart-image"
              />
            </div>
          </div>
        </div>

        <div id="eligibility-criteria" className="eligibility-criteria-container"> 
          <div className="admissions-header"> {/* Re-using the existing class for consistency */}
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Eligibility Criteria
            </h2>
            <div className="admissions-line"></div>
            <p className="mt-4 text-lg leading-8">
              To maintain a standard of academic excellence, prospective students must meet certain age and academic prerequisites. Our criteria are designed to ensure that every child is well-prepared for the curriculum at their respective grade level, fostering a productive and supportive learning environment for all.
            </p>
          </div>
          <div className="eligibility-image-container">
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
