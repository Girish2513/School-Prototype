import React from 'react';
import './AboutUs.css';
import { useSectionInView } from '../hooks/useSectionInView';

const AboutUs = () => {
  // Create separate observers for the principal and vice-principal messages
  // The animation will trigger once when the section is 30% visible.
  const { ref: principalRef, inView: principalInView } = useSectionInView({ threshold: 0.3, triggerOnce: true });
  const { ref: vicePrincipalRef, inView: vicePrincipalInView } = useSectionInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section id="about-us" className="about-us-section">
      <div className="about-us-wrapper">
        <div id="about-us-main" className="about-us-container">
          <div className="about-us-text-block">
            <div className="about-us-text-content">
              <h2 className="about-us-heading">About Us</h2>
              <div className="about-us-content">
                <p>Welcome to our esteemed school, where excellence in education meets a nurturing environment. Founded with a vision to empower young minds, we have been dedicated to providing holistic development for over decades.</p>
                <p>Our institution prides itself on a rich history of academic achievements and innovative teaching methodologies. We believe in fostering not just knowledge, but also character, creativity, and critical thinking skills in every student.</p>
                <p>With state-of-the-art facilities, experienced faculty, and a comprehensive curriculum, we prepare our students for the challenges of tomorrow. Our commitment to values like integrity, respect, and community service shapes well-rounded individuals.</p>
                <p>Join our vibrant community where learning is an adventure, friendships are lifelong, and dreams take flight. We invite you to explore the possibilities that await at our school.</p>
                <p>Experience the difference that quality education and personalized attention can make in shaping your child's future.</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="section-divider" />

        <div 
          id="principals-message" 
          ref={principalRef} 
          className={`principals-message-container ${principalInView ? 'is-in-view' : ''}`}
        >
          <div className="principals-image-container">
            <img src="/images/principal2.png" alt="Principal" className="principals-image" />
          </div>
          <div className="principals-content">
            <h3 className="principals-heading">Principal's Message</h3>
            <blockquote className="message-quote">“Education is not just about learning facts, but about developing minds that can think, create, and lead with purpose.”</blockquote>
            <p>Dear Students and Parents,At our school, we believe every child is unique and full of potential. Our aim is to create an environment where learning becomes a joyful journey, not just a routine. Together, let us nurture curiosity, build confidence, and shape responsible citizens for tomorrow.</p>
            <p>Warm regards,<br />K. Giri</p>
          </div>
        </div>

        <hr className="section-divider" />

        <div 
          id="vice-principals-message" 
          ref={vicePrincipalRef} 
          className={`principals-message-container vice-principal ${vicePrincipalInView ? 'is-in-view' : ''}`}
        >
          <div className="principals-image-container">
            <img src="/images/vice_principal1.png" alt="Vice Principal" className="principals-image" />
          </div>
          <div className="principals-content">
            <h3 className="principals-heading">Vice Principal's Message</h3>
            <blockquote className="message-quote">“Our goal is to support every student's journey, ensuring they have the resources and encouragement to excel in all their endeavors.”</blockquote>
            <p>To our wonderful school community, I am honored to work alongside our dedicated staff and talented students. My focus is on fostering a positive and inclusive atmosphere where every individual feels valued and empowered. Let's continue to build a legacy of excellence together.</p>
            <p>Sincerely,<br />K. Sravan Kumar</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
