import React from 'react';

/**
 * Hero section component displaying the main banner with school slogan, description, CTA button, and background video.
 * The video auto-plays muted for engagement without user interaction.
 * For accessibility, includes semantic elements, descriptive text, and video attributes.
 * For performance, video is optimized with loop/muted; consider lazy loading or poster for slower connections.
 * For extensibility, text/content can be moved to siteData.js; add props for dynamic CTA.
 */
function Hero() {
  return (
    <section className="hero-content" aria-labelledby="hero-heading">
      {/* Hero text overlay with semantic heading and paragraph for screen readers */}
      <div className="hero-text">
        <h1 id="hero-heading" className="hero-title">Empowering Minds,<br />Shaping Futures.</h1>
        <p className="hero-description">Excellence in education, dedication to discipline, and a commitment to holistic development.</p>
        {/* CTA button with smooth scroll to admissions; aria-label for clarity */}
        <a href="#admissions" className="cta-button" aria-label="Learn more about admissions">Admissions Open</a>
      </div>
      {/* Hero video background: Auto-plays muted loop for immersive experience; playsInline for mobile */}
      <div className="hero-video">
        <video 
          src="/videos/school-tour.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline
          poster="/images/school-campus.png"
          aria-label="Video tour of Navodaya High School campus"
          title="School Tour Video"
        >
          Your browser does not support the video tag. Consider upgrading for the best experience.
        </video>
      </div>
    </section>
  );
}

export default Hero;
