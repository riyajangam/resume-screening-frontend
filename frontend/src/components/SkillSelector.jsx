import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SkillSelector.css';

const SkillSelector = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const programmingLanguages = [
    'JavaScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'Go', 'Rust',
    'TypeScript', 'PHP', 'Swift', 'Kotlin', 'SQL', 'HTML/CSS', 'React',
    'Angular', 'Vue.js', 'Node.js', 'Django', 'Spring Boot', 'MongoDB',
    'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Azure'
  ];

  const proficiencyLevels = ['Beginner', 'Intermediate', 'Advanced'];

  const handleAddSkill = () => {
    if (selectedLanguage && selectedLevel) {
      if (!skills.find(skill => skill.language === selectedLanguage)) {
        setSkills([...skills, { 
          language: selectedLanguage, 
          level: selectedLevel, 
          quizCompleted: false, 
          score: 0 
        }]);
        // Reset selections
        setSelectedLanguage('');
        setSelectedLevel('');
      } else {
        alert('This skill has already been added!');
      }
    }
  };

  const handleRemoveSkill = (language) => {
    setSkills(skills.filter(skill => skill.language !== language));
  };

  const handleTakeQuiz = (language) => {
    navigate(`/quiz/${encodeURIComponent(language)}`);
  };

  const handleContinue = () => {
    // Save skills to localStorage
    const skillsData = {
      skills: skills,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('userSkills', JSON.stringify(skillsData));
    navigate('/generate');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddSkill();
    }
  };

  return (
    <div className="skill-selector-container">
      <h2>Skill Selection & Assessment</h2>
      
      <div className="skill-input-section">
        <div className="form-group">
          <label>Select Programming Language:</label>
          <select 
            value={selectedLanguage} 
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="form-select"
          >
            <option value="">Choose a language</option>
            {programmingLanguages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Select Proficiency Level:</label>
          <select 
            value={selectedLevel} 
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="form-select"
          >
            <option value="">Choose level</option>
            {proficiencyLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <button 
          className="add-skill-btn"
          onClick={handleAddSkill}
          disabled={!selectedLanguage || !selectedLevel}
        >
          Add Skill
        </button>
      </div>

      {/* Quick Add Section */}
      <div className="quick-add-section">
        <h3>Quick Add Popular Skills:</h3>
        <div className="quick-skills-grid">
          {['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'HTML/CSS', 'AWS'].map(skill => (
            <button
              key={skill}
              className="quick-skill-btn"
              onClick={() => {
                setSelectedLanguage(skill);
                setSelectedLevel('Intermediate');
              }}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Skills List */}
      <div className="skills-list-section">
        <h3>Your Selected Skills ({skills.length})</h3>
        
        {skills.length === 0 ? (
          <div className="no-skills">
            <p>No skills added yet. Add some skills to get started.</p>
            <p className="hint">You can add multiple skills using the form above or quick add buttons.</p>
          </div>
        ) : (
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-card">
                <div className="skill-header">
                  <span className="skill-name">{skill.language}</span>
                  <button 
                    className="remove-skill-btn"
                    onClick={() => handleRemoveSkill(skill.language)}
                    title="Remove skill"
                  >
                    ×
                  </button>
                </div>
                
                <div className="skill-details">
                  <span className={`skill-level level-${skill.level.toLowerCase()}`}>
                    {skill.level}
                  </span>
                  
                  <div className="skill-actions">
                    {!skill.quizCompleted ? (
                      <button 
                        className="quiz-btn"
                        onClick={() => handleTakeQuiz(skill.language)}
                      >
                        Take Quiz
                      </button>
                    ) : (
                      <span className="quiz-score">
                        Score: {skill.score}%
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="skill-status">
                  {skill.quizCompleted ? (
                    <span className="status-completed">✓ Quiz Completed</span>
                  ) : (
                    <span className="status-pending">⏳ Quiz Pending</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {skills.length > 0 && (
        <div className="action-buttons">
          <div className="actions-info">
            <p>You have added {skills.length} skill(s). You can take quizzes for each skill to get certified scores.</p>
          </div>
          <button 
            className="continue-btn"
            onClick={handleContinue}
          >
            Continue to Generate Resume
          </button>
          <button 
            className="add-more-btn"
            onClick={() => {
              setSelectedLanguage('');
              setSelectedLevel('');
            }}
          >
            Add More Skills
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillSelector;