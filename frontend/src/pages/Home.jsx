import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: '📄',
      title: 'Upload Resume',
      description: 'Upload your resume and get instant analysis of your skills and experience',
      path: '/upload',
      color: '#667eea'
    },
    {
      icon: '💼',
      title: 'Job Selection',
      description: 'Choose your desired job role and explore matching companies',
      path: '/job-selection',
      color: '#764ba2'
    },
    {
      icon: '🛠️',
      title: 'Skill Assessment',
      description: 'Test your skills with interactive quizzes and get certified',
      path: '/skill-selection',
      color: '#f093fb'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Build Your Perfect
            <span className="gradient-text"> Career Path</span>
          </h1>
          <p className="hero-description">
            Upload your resume, discover job matches, and validate your skills with our AI-powered career platform. 
            Get personalized recommendations and skill assessments.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">95%</span>
              <span className="stat-label">Job Match Accuracy</span>
            </div>
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Companies</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Skills Assessment</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card resume">📄 Resume</div>
          <div className="floating-card job">💼 Job Match</div>
          <div className="floating-card skill">🛠️ Skills</div>
          <div className="connection-line"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2 className="section-title">How It Works</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card"
              onClick={() => navigate(feature.path)}
              style={{ '--accent-color': feature.color }}
            >
              <div className="feature-icon" style={{ backgroundColor: feature.color }}>
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <button className="feature-button">
                Get Started
                <span className="arrow">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Boost Your Career?</h2>
          <p>Start your journey today and discover opportunities that match your skills</p>
          <button 
            className="cta-button"
            onClick={() => navigate('/upload')}
          >
            Upload Your Resume
            <span className="sparkle">✨</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;