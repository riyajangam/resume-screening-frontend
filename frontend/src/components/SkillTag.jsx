// src/components/SkillTag.jsx
import React from 'react';

const SkillTag = ({ skill, level = 'intermediate', confidence = 75 }) => {
  const getLevelClass = (lvl) => {
    const classes = {
      beginner: 'beginner',
      intermediate: 'intermediate',
      advanced: 'advanced',
      expert: 'expert'
    };
    return classes[lvl.toLowerCase()] || 'intermediate';
  };

  const getLevelColor = (lvl) => {
    const colors = {
      beginner: '#ff9a9e',
      intermediate: '#a1c4fd',
      advanced: '#84fab0',
      expert: '#667eea'
    };
    return colors[lvl.toLowerCase()] || '#a1c4fd';
  };

  return (
    <div className="skill-tag-wrapper">
      <span className={`skill-tag ${getLevelClass(level)}`}>
        {skill}
        {confidence > 0 && (
          <span className="confidence-badge">
            {confidence}%
          </span>
        )}
      </span>
      {confidence > 0 && (
        <div className="confidence-bar">
          <div 
            className="confidence-level" 
            style={{ 
              width: `${confidence}%`,
              backgroundColor: getLevelColor(level)
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default SkillTag;