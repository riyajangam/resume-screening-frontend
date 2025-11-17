import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Quiz from '../components/Quiz';
import './QuizPage.css';

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizInfo, setQuizInfo] = useState(null);

  useEffect(() => {
    const state = location.state || {};
    const searchParams = new URLSearchParams(location.search);
    
    // Handle both state (from navigation) and URL parameters
    if (state.company && state.role) {
      setQuizInfo({
        type: 'job',
        company: state.company,
        role: state.role,
        category: state.quizCategory,
        level: state.level || 'beginner'
      });
    } else if (state.skill && state.level) {
      setQuizInfo({
        type: 'skill',
        skill: state.skill,
        level: state.level,
        category: state.category || 'Programming'
      });
    } else if (searchParams.get('company') && searchParams.get('role')) {
      setQuizInfo({
        type: 'job',
        company: searchParams.get('company'),
        role: searchParams.get('role'),
        category: searchParams.get('category') || 'frontend',
        level: searchParams.get('level') || 'beginner'
      });
    } else if (searchParams.get('skill') && searchParams.get('level')) {
      setQuizInfo({
        type: 'skill',
        skill: searchParams.get('skill'),
        level: searchParams.get('level'),
        category: searchParams.get('category') || 'Programming'
      });
    }
  }, [location.state, location.search]);

  const handleBack = () => {
    if (quizInfo?.type === 'job') {
      navigate('/job-selection');
    } else {
      navigate('/skill-selection');
    }
  };

  if (!quizInfo) {
    return (
      <div className="quiz-page">
        <div className="quiz-container">
          <div className="error-state">
            <h2>No Quiz Information Found</h2>
            <p>Please go back and select a quiz to take.</p>
            <button onClick={() => navigate('/')} className="btn-primary">
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        {!quizStarted ? (
          <div className="quiz-intro">
            <div className="intro-card">
              <div className="quiz-header">
                <button className="back-button" onClick={handleBack}>
                  <i className="fas fa-arrow-left"></i> Back
                </button>
                <h1>Skill Assessment</h1>
                <p>Test your knowledge and validate your skills</p>
              </div>

              <div className="quiz-info">
                {quizInfo.type === 'job' ? (
                  <>
                    <h2>{quizInfo.company} - {quizInfo.role} Assessment</h2>
                    <p className="quiz-category">{quizInfo.category} • {quizInfo.level} Level • Company Specific</p>
                  </>
                ) : (
                  <>
                    <h2>{quizInfo.skill} Skill Assessment</h2>
                    <p className="quiz-category">{quizInfo.level} Level • {quizInfo.category}</p>
                  </>
                )}
                
                <div className="quiz-details">
                  <div className="detail-item">
                    <i className="fas fa-question-circle"></i>
                    <span>10 Multiple Choice Questions</span>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-clock"></i>
                    <span>Approx. 10-15 minutes</span>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-shuffle"></i>
                    <span>Randomized questions</span>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-star"></i>
                    <span>{quizInfo.level} level difficulty</span>
                  </div>
                </div>
              </div>

              <div className="quiz-instructions">
                <h3>Instructions</h3>
                <ul>
                  <li>Read each question carefully</li>
                  <li>Select the best answer from the options</li>
                  <li>You can navigate between questions</li>
                  <li>Score will be shown at the end</li>
                  <li>Results will be saved to your profile</li>
                  <li>Minimum passing score: 70%</li>
                </ul>
              </div>

              <div className="quiz-actions">
                <button 
                  className="btn-start-quiz"
                  onClick={() => setQuizStarted(true)}
                >
                  Start Assessment
                  <i className="fas fa-play"></i>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Quiz 
            quizInfo={quizInfo}
            onComplete={(score) => {
              console.log('Quiz completed with score:', score);
              setQuizStarted(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default QuizPage;