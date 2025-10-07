import React from 'react';

function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2>About <span className="highlight-blue">Navodaya High School</span></h2>
        <div className="about-content">
          <div className="about-image">
            <img src="/images/school-campus.png" alt="Navodaya High School Campus" />
          </div>
          <div className="about-text">
            <p>Founded on the principles of academic rigor and holistic development, Navodaya High School has been a cornerstone of quality education for over two decades. Our mission is to nurture inquisitive, responsible, and compassionate individuals who are equipped to face the challenges of the future.</p>
            <p>We believe in a balanced approach to education, combining a state-of-the-art curriculum with a rich program of extracurricular activities. Our dedicated faculty are more than just teachers; they are mentors who guide our students on their journey of discovery and growth. At Navodaya, we are not just building students; we are shaping the leaders of tomorrow.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;