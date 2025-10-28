import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Hero.css';
import TextType from './TextType';
import HeroStats from './HeroStats';

/**
 * Hero section component displaying the main banner with school slogan, description, CTA button, and background video.
 * The video auto-plays muted for engagement without user interaction.
 * For accessibility, includes semantic elements, descriptive text, and video attributes.
 * For performance, video is optimized with loop/muted; consider lazy loading or poster for slower connections.
 * @param {object} props - The component props.
 * @param {boolean} props.shouldPlay - Controls whether the video should be playing.
 * @param {boolean} props.startAnimations - Controls whether counting animations should start.
 * For extensibility, text/content can be moved to siteData.js; add props for dynamic CTA.
 */
function Hero({ shouldPlay, startAnimations }) {
  const videoRef = useRef(null);

  // Effect to play or pause the video based on the shouldPlay prop
  useEffect(() => {
    if (videoRef.current) {
      if (shouldPlay) {
        videoRef.current.play().catch(() => {}); // Play and ignore potential errors
      } else {
        videoRef.current.pause();
      }
    }
  }, [shouldPlay]);

  return (
    <section className="hero-content" aria-labelledby="hero-heading">
      {/* Hero text overlay with semantic heading and paragraph for screen readers */}
      <div className="hero-text">
        <h1 id="hero-heading" className="hero-title">Empowering Minds,<br />Shaping Futures.</h1>
        <TextType
          as="p"
          className="hero-description"
          text={[
            "Fostering curiosity and creativity, Empowering the leaders of tomorrow.",
            "A place where potential thrive,. Equipping students for success and responsibility.",
            "Every child is unique and full of promise, We guide them to reach their fullest potential."
          ]}
          typingSpeed={50}
          deletingSpeed={30}
          pauseDuration={1500}
          initialDelay={1500}
          loop={true}
        />
        {/* Animated Statistics */}
        <HeroStats startAnimations={startAnimations} />
        {/* CTA buttons with smooth scroll; aria-labels for clarity */}
        <div className="cta-buttons">
          <a href="#admissions" className="cta-button primary" aria-label="Apply for admissions">Apply for Admissions</a>
          <a href="#about-us" className="cta-button secondary" aria-label="Learn more about our school">Learn More</a>
        </div>
      </div>
      {/* Hero video background: Auto-plays muted loop for immersive experience; playsInline for mobile */}
      <div className="hero-video">
        <video 
          ref={videoRef}
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

Hero.propTypes = {
  shouldPlay: PropTypes.bool.isRequired,
  startAnimations: PropTypes.bool.isRequired,
};

export default Hero;
