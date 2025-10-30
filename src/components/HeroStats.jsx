/**
 * HeroStats component for displaying animated statistics in the hero section.
 * Shows key metrics like staff count, student count, and years of experience.
 * Uses CountUp component for smooth number animations.
 * Responsive design with mobile adjustments.
 * Accessibility: Semantic structure, screen reader friendly.
 * Performance: Animations start only when triggered by prop.
 *
 * @param {object} props - Component props.
 * @param {boolean} props.startAnimations - Whether to start the count-up animations.
 * @returns {JSX.Element} The rendered hero stats component.
 */
import React from 'react';
import PropTypes from 'prop-types';
import CountUp from './CountUp';
import './HeroStats.css';

/**
 * Individual stat item component.
 * Displays a number with animation and a label.
 */
const StatItem = ({ end, label, startAnimations }) => {
  return (
    <div className="stat-item">
      <span className="stat-number">
        <CountUp to={end} duration={8} separator="," startWhen={startAnimations} />+
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
};

/**
 * Main HeroStats component.
 * Renders a list of statistics.
 */
const HeroStats = ({ startAnimations }) => {
  return (
    <div className="hero-stats">
      <StatItem end={120} label="Staff" startAnimations={startAnimations} />
      <StatItem end={5000} label="Students" startAnimations={startAnimations} />
      <StatItem end={32} label="Years of Experience" startAnimations={startAnimations} />
    </div>
  );
};

HeroStats.propTypes = {
  startAnimations: PropTypes.bool.isRequired,
};

export default HeroStats;
