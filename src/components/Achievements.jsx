// Import React library for building the component
import React from "react";
// Import the CSS file for styling the Achievements component
import "./Achievements.css";

/**
 * Array of achievement data objects.
 * Each object contains title, description, and icon path for an achievement.
 */
const achievementsData = [
  {
    title: "Top 10 School",
    description: "Recognized as one of the Top 10 Emerging Schools in the Region (2024)",
    icon: "/images/achievement1.png",
  },
  {
    title: "100% Results",
    description: "Consistently achieved 100% results in Board Examinations",
    icon: "/images/achievement2.png",
  },
  {
    title: "State Champions",
    description: "Students won Mandal-level, District-level and State-level Science, Sports, and Art competitions",
    icon: "/images/achievement3.png",
  },
  {
    title: "Active Participation",
    description: "Active participation in Olympiads, Cultural Fests, and Community Service Programs",
    icon: "/images/achievement4.png",
  },
  {
    title: "Prestigious Alumni",
    description: "Alumni placed in prestigious institutions across India and abroad.",
    icon: "/images/achievement5.png",
  },
];

/**
 * AchievementItem component representing a single achievement card.
 * Displays an icon, title on the front, and description on the back (flip effect).
 * Props: title (string), description (string), icon (string path)
 */
const AchievementItem = ({ title, description, icon }) => (
  // Container for the achievement item
  <div className="achievement-item">
    {/* Flip card container */}
    <div className="achievement-card">
      {/* Front side of the card */}
      <div className="achievement-front">
        {/* Icon container */}
        <div className="achievement-icon">
          {/* Achievement icon image */}
          <img src={icon} alt={`${title} icon`} />
        </div>
        {/* Achievement title */}
        <h3>{title}</h3>
      </div>
      {/* Back side of the card */}
      <div className="achievement-back">
        {/* Achievement description */}
        <p>{description}</p>
      </div>
    </div>
  </div>
);

/**
 * Achievements component displaying a grid of achievement cards with flip animation.
 * Shows a "Wall of Pride" section with school achievements.
 * Props: isInView (boolean) - Determines if the component is in view for animations
 */
const Achievements = ({ isInView }) => {
  // Render the component
  return (
    // Main wrapper with conditional class for animations
    <div className={`achievements-wrapper ${isInView ? 'is-in-view' : ''}`}>
      {/* Section header */}
      <h2 className="component-header">Wall of Pride</h2>
      {/* Description paragraph */}
      <p className="achievements-description">The Wall of Pride honors the achievements that define our school’s journey. From top academic results to state championships, it highlights the hard work and determination of our students and alumni. This is a tribute to the pursuit of excellence in every field.</p>

      {/* Grid container for achievements */}
      <div className="achievements-grid">
        {/* Row container */}
        <div className="achievements-row">
          {/* Map over achievements data to render each item */}
          {achievementsData.map((achievement, index) => (
            <AchievementItem key={index} {...achievement} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Export the component as default
export default Achievements;
