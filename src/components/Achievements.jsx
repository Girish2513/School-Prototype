import React from "react";
import "./Achievements.css";

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

const AchievementItem = ({ title, description, icon }) => (
  <div className="achievement-item">
    <div className="achievement-card">
      <div className="achievement-front">
        <div className="achievement-icon">
          <img src={icon} alt={`${title} icon`} />
        </div>
        <h3>{title}</h3>
      </div>
      <div className="achievement-back">
        <p>{description}</p>
      </div>
    </div>
  </div>
);

const Achievements = ({ isInView }) => {
  return (
    <div className={`achievements-wrapper ${isInView ? 'is-in-view' : ''}`}>
      <h2 className="component-header">Wall of Pride</h2>
      <p className="achievements-description">The Wall of Pride honors the achievements that define our school’s journey. From top academic results to state championships, it highlights the hard work and determination of our students and alumni. This is a tribute to the pursuit of excellence in every field.</p>

      <div className="achievements-grid">
        <div className="achievements-row">
          {achievementsData.map((achievement, index) => (
            <AchievementItem key={index} {...achievement} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
