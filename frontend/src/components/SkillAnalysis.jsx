// src/components/SkillAnalysis.jsx
import React from 'react';
import SkillTag from './SkillTag';

const SkillAnalysis = ({ data, name }) => {
  const {
    technical = [],
    soft = [],
    tools = [],
    analysis = {}
  } = data;

  return (
    <div className="skill-analysis">
      <div className="analysis-header">
        <h3>Resume Analysis Complete!</h3>
        <p>We've analyzed <strong>{name}'s</strong> resume and identified the following skills:</p>
      </div>

      <div className="skill-category">
        <h4>Technical Skills</h4>
        <div className="skill-tags">
          {technical.map((skill, index) => (
            <SkillTag
              key={index}
              skill={skill.skill}
              level={skill.level}
              confidence={skill.confidence}
            />
          ))}
        </div>
      </div>

      <div className="skill-category">
        <h4>Soft Skills</h4>
        <div className="skill-tags">
          {soft.map((skill, index) => (
            <SkillTag
              key={index}
              skill={skill.skill}
              level={skill.level}
              confidence={skill.confidence}
            />
          ))}
        </div>
      </div>

      <div className="skill-category">
        <h4>Tools & Technologies</h4>
        <div className="skill-tags">
          {tools.map((skill, index) => (
            <SkillTag
              key={index}
              skill={skill.skill}
              level={skill.level}
              confidence={skill.confidence}
            />
          ))}
        </div>
      </div>

      <div className="analysis-summary">
        <h4>Analysis Summary</h4>
        <div className="summary-grid">
          <div className="summary-item">
            <div className="summary-label">Overall Match Score</div>
            <div className="summary-value">{analysis.matchScore || '85'}%</div>
          </div>
          <div className="summary-item">
            <div className="summary-label">Experience Level</div>
            <div className="summary-value">{analysis.experience || '4 years'}</div>
          </div>
          <div className="summary-item">
            <div className="summary-label">Top Skills</div>
            <div className="summary-skills">
              {(analysis.topSkills || ['JavaScript', 'React', 'Problem Solving']).join(', ')}
            </div>
          </div>
        </div>
      </div>

      <div className="recommendations">
        <h4>Recommendations</h4>
        <ul>
          {(analysis.recommendations || [
            'Consider learning TypeScript',
            'Add more backend projects to your portfolio',
            'Obtain AWS certification'
          ]).map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SkillAnalysis;