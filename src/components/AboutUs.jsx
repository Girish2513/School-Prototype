// Import React library for building the component
import React from 'react';
// Import the CSS file for styling the AboutUs component
import './AboutUs.css';
// Import custom hook for detecting when sections are in view for animations
import { useSectionInView } from '../hooks/useSectionInView';

/**
 * AboutUs component displaying information about the school, principal's message, and vice principal's message.
 * This component renders three main sections: general about us content, principal's message with image, and vice principal's message with image.
 * It uses intersection observer hooks to trigger animations when the message sections come into view.
 */
const AboutUs = () => {
  // Create separate observers for the principal and vice-principal messages
  // The animation will trigger once when the section is 30% visible
  const { ref: principalRef, inView: principalInView } = useSectionInView({ threshold: 0.3, triggerOnce: true });
  const { ref: vicePrincipalRef, inView: vicePrincipalInView } = useSectionInView({ threshold: 0.3, triggerOnce: true });
  const { ref: visionMissionRef, inView: visionMissionInView } = useSectionInView({ threshold: 0.3, triggerOnce: true });

  // Render the component
  return (
    // Main section element with ID for navigation
    <section id="about-us" className="about-us-section">
      {/* Wrapper for the entire about us content */}
      <div className="about-us-wrapper">
        {/* Main about us container */}
        <div id="about-us-main" className="about-us-container">
          {/* Text block for the about us content */}
          <div className="about-us-text-block">
            {/* Text content container */}
            <div className="about-us-text-content">
              {/* Main heading */}
              <h2 className="about-us-heading">About Us</h2>
              {/* Content paragraphs */}
              <div className="about-us-content">
                {/* Welcome paragraph */}
                <p>Welcome to our esteemed school, where excellence in education meets a nurturing environment. Founded with a vision to empower young minds, we have been dedicated to providing holistic development for over decades.</p>
                {/* History and achievements paragraph */}
                <p>Our institution prides itself on a rich history of academic achievements and innovative teaching methodologies. We believe in fostering not just knowledge, but also character, creativity, and critical thinking skills in every student.</p>
                {/* Facilities and curriculum paragraph */}
                <p>With state-of-the-art facilities, experienced faculty, and a comprehensive curriculum, we prepare our students for the challenges of tomorrow. Our commitment to values like integrity, respect, and community service shapes well-rounded individuals.</p>
                {/* Community invitation paragraph */}
                <p>Join our vibrant community where learning is an adventure, friendships are lifelong, and dreams take flight. We invite you to explore the possibilities that await at our school.</p>
                {/* Closing statement */}
                <p>Experience the difference that quality education and personalized attention can make in shaping your child's future.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal divider between sections */}
        <hr className="section-divider" />

        {/* Principal's message section with animation ref and conditional class */}
        <div
          id="principals-message"
          ref={principalRef}
          className={`principals-message-container ${principalInView ? 'is-in-view' : ''}`}
        >
          {/* Container for principal's image */}
          <div className="principals-image-container">
            {/* Principal's image */}
            <img src="/images/principal2.png" alt="Principal" className="principals-image" />
          </div>
          {/* Container for principal's content */}
          <div className="principals-content">
            {/* Principal's message heading */}
            <h3 className="principals-heading">Principal's Message</h3>
            {/* Inspirational quote */}
            <blockquote className="message-quote">“Education is not just about learning facts, but about developing minds that can think, create, and lead with purpose.”</blockquote>
            {/* Principal's message text */}
            <p>Dear Students and Parents,At our school, we believe every child is unique and full of potential. Our aim is to create an environment where learning becomes a joyful journey, not just a routine. Together, let us nurture curiosity, build confidence, and shape responsible citizens for tomorrow.</p>
            {/* Principal's signature */}
            <p>Warm regards,<br />K. Giri</p>
          </div>
        </div>

        {/* Horizontal divider between sections */}
        <hr className="section-divider" />

        {/* Vice Principal's message section with animation ref and conditional class */}
        <div
          id="vice-principals-message"
          ref={vicePrincipalRef}
          className={`principals-message-container vice-principal ${vicePrincipalInView ? 'is-in-view' : ''}`}
        >
          {/* Container for vice principal's image */}
          <div className="principals-image-container">
            {/* Vice principal's image */}
            <img src="/images/vice_principal1.png" alt="Vice Principal" className="principals-image" />
          </div>
          {/* Container for vice principal's content */}
          <div className="principals-content">
            {/* Vice principal's message heading */}
            <h3 className="principals-heading">Vice Principal's Message</h3>
            {/* Inspirational quote */}
            <blockquote className="message-quote">“Our goal is to support every student's journey, ensuring they have the resources and encouragement to excel in all their endeavors.”</blockquote>
            {/* Vice principal's message text */}
            <p>To our wonderful school community, I am honored to work alongside our dedicated staff and talented students. My focus is on fostering a positive and inclusive atmosphere where every individual feels valued and empowered. Let's continue to build a legacy of excellence together.</p>
            {/* Vice principal's signature */}
            <p>Sincerely,<br />K. Sravan Kumar</p>
          </div>
        </div>

        {/* Horizontal divider between sections */}
        <hr className="section-divider" />

        {/* Vision and Mission Section */}
        <div
          id="vision-mission"
          ref={visionMissionRef}
          className={`vision-mission-container ${visionMissionInView ? 'is-in-view' : ''}`}
        >
          <div className="vision-mission-content">
            <div className="statement-block">
              <h3 className="statement-heading">Vision</h3>
              <p>To nurture intellectually curious, emotionally strong, and socially responsible individuals who strive for excellence and contribute positively to society. We envision our school as a place where education empowers every learner to reach their fullest potential through knowledge, creativity, and compassion.</p>
            </div>
            <div className="vertical-divider"></div>
            <div className="statement-block">
              <h3 className="statement-heading">Mission</h3>
              <p>Our mission is to provide holistic education through innovative teaching methods, value-based learning, and a supportive environment. We aim to instill integrity, leadership, and lifelong learning skills in our students by engaging parents, teachers, and the community as partners in education.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

// Export the component as default
export default AboutUs;
