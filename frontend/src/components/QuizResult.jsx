import React from 'react';
import './QuizResult.css';

const QuizResult = ({ skill, level, score, onRetake }) => {
  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return '#e74c3c';
      case 'intermediate':
        return '#f39c12';
      case 'advanced':
        return '#27ae60';
      default:
        return '#3498db';
    }
  };

  const getLevelDescription = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'You have basic understanding of this skill. Keep learning and practicing!';
      case 'intermediate':
        return 'You have good knowledge and can work independently on most tasks.';
      case 'advanced':
        return 'You have expert-level knowledge and can handle complex challenges.';
      default:
        return 'Your skill level has been assessed.';
    }
  };

  return (
    <div className="quiz-result">
      <div className="result-header">
        <h3>Skill Assessment Result</h3>
        <p>for <strong>{skill}</strong></p>
      </div>

      <div className="result-content">
        <div 
          className="level-badge"
          style={{ backgroundColor: getLevelColor(level) }}
        >
          {level}
        </div>

        <div className="score-circle">
          <div className="score-value">{score}%</div>
          <div className="score-label">Score</div>
        </div>

        <div className="level-description">
          <p>{getLevelDescription(level)}</p>
        </div>

        <div className="result-actions">
          <button onClick={onRetake} className="retake-button">
            Retake Quiz
          </button>
          <button className="continue-button">
            Continue to Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;