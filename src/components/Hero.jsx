import React from 'react';

function Hero() {
  return (
    <main className="hero-content">
      <div className="hero-text">
        <h2>Empowering Minds,<br />Shaping Futures.</h2>
        <p>Excellence in education, dedication to discipline, and a commitment to holistic development.</p>
        <a href="#admissions" className="cta-button">Admissions Open</a>
      </div>
      <div className="hero-video">
        <video src="/videos/school-tour.mp4" autoPlay muted loop playsInline>
          Your browser does not support the video tag.
        </video>
      </div>
    </main>
  );
}

export default Hero;