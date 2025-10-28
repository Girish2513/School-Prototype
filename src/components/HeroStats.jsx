import React from 'react';
import CountUp from './CountUp';
import './HeroStats.css';

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

const HeroStats = ({ startAnimations }) => {
  return (
    <div className="hero-stats">
      <StatItem end={120} label="Staff" startAnimations={startAnimations} />
      <StatItem end={5000} label="Students" startAnimations={startAnimations} />
      <StatItem end={32} label="Years of Experience" startAnimations={startAnimations} />
    </div>
  );
};

HeroStats.propTypes = {};

export default HeroStats;