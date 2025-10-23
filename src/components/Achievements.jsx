import React from "react";
import "./Achievements.css";

const achievementsData = [
  {
    title: "Top 10 School",
    description: "Recognized as one of the Top 10 Emerging Schools in the Region (2024)",
    icon: "🏆",
  },
  {
    title: "100% Results",
    description: "Consistently achieved 100% results in Board Examinations",
    icon: "📊",
  },
  {
    title: "State Champions",
    description: "Students won Mandal-level, District-level and State-level Science, Sports, and Art competitions",
    icon: "🥇",
  },
  {
    title: "Active Participation",
    description: "Active participation in Olympiads, Cultural Fests, and Community Service Programs",
    icon: "🎯",
  },
  {
    title: "Prestigious Alumni",
    description: "Alumni placed in prestigious institutions across India and abroad.",
    icon: "🎓",
  },
];

const AchievementItem = ({ title, description, icon }) => (
  <div className="achievement-item">
    <div className="achievement-card">
      <div className="achievement-front">
        <div className="achievement-icon">{icon}</div>
        <h3>{title}</h3>
      </div>
      <div className="achievement-back">
        <p>{description}</p>
      </div>
    </div>
  </div>
);

const Achievements = () => {
  const firstRow = achievementsData.slice(0, 3);
  const secondRow = achievementsData.slice(3, 5);

  return (
    <div className="achievements-wrapper">
      <h2 className="component-header">Wall of Pride</h2>

      <div className="achievements-grid">
        <div className="achievements-row-3">
          {firstRow.map((achievement, index) => (
            <AchievementItem key={index} {...achievement} />
          ))}
        </div>
        <div className="achievements-row-2">
          {secondRow.map((achievement, index) => (
            <AchievementItem key={index + firstRow.length} {...achievement} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
