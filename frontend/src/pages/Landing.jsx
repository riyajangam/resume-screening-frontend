// src/pages/Landing.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="landing-hero">
        <div className="hero-content">
          <h1>Build Your Perfect Resume</h1>
          <p className="hero-subtitle">
            Create professional resumes that stand out to employers. 
            Get job-specific suggestions, skill assessments, and multiple template options.
          </p>
          
          <div className="hero-features">
            <div className="feature">
              <span className="feature-icon">🚀</span>
              <h3>Quick Setup</h3>
              <p>Get started in minutes with our easy-to-use builder</p>
            </div>
            
            <div className="feature">
              <span className="feature-icon">🎯</span>
              <h3>Job Targeted</h3>
              <p>Get company suggestions based on your desired role</p>
            </div>
            
            <div className="feature">
              <span className="feature-icon">📊</span>
              <h3>Skill Assessment</h3>
              <p>Take quizzes to validate and showcase your skills</p>
            </div>
            
            <div className="feature">
              <span className="feature-icon">🎨</span>
              <h3>Multiple Templates</h3>
              <p>Choose from professional, modern, and creative designs</p>
            </div>
          </div>

          <div className="hero-actions">
            <Link to="/register" className="cta-button primary">
              Get Started Free
            </Link>
            <Link to="/login" className="cta-button secondary">
              Sign In
            </Link>
          </div>

          <div className="hero-footer">
            <p>Already have an account? <Link to="/login">Sign in here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;