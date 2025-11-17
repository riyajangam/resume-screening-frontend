import React, { useState, useEffect } from 'react';
import './JobSelection.css';

const JobSelection = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [detectedRole, setDetectedRole] = useState('');

  const companyDatabase = [
    {
      id: 1,
      name: 'Google',
      logo: '🔍',
      roles: ['Frontend Developer', 'Full Stack Developer'],
      positions: ['Frontend Engineer', 'UI Developer'],
      requiredSkills: ['JavaScript', 'React', 'TypeScript', 'HTML/CSS'],
      preferredSkills: ['Angular', 'Vue.js', 'GraphQL'],
      experienceLevel: 'Intermediate to Advanced',
      location: 'Mountain View, CA & Remote',
      description: 'Build scalable web applications for millions of users worldwide.',
      salaryRange: '$120,000 - $180,000',
      quizCategory: 'frontend'
    },
    {
      id: 2,
      name: 'Meta',
      logo: '👥',
      roles: ['Frontend Developer', 'Full Stack Developer'],
      positions: ['Frontend Software Engineer', 'Web Developer'],
      requiredSkills: ['React', 'JavaScript', 'CSS', 'Redux'],
      preferredSkills: ['GraphQL', 'React Native', 'TypeScript'],
      experienceLevel: 'All Levels',
      location: 'Menlo Park, CA & Remote',
      description: 'Work on Facebook, Instagram, WhatsApp and other Meta products.',
      salaryRange: '$115,000 - $170,000',
      quizCategory: 'frontend'
    },
    {
      id: 3,
      name: 'Amazon',
      logo: '📦',
      roles: ['Backend Developer', 'Full Stack Developer'],
      positions: ['Backend Engineer', 'Software Development Engineer'],
      requiredSkills: ['Java', 'Python', 'AWS', 'SQL'],
      preferredSkills: ['Docker', 'Kubernetes', 'Microservices'],
      experienceLevel: 'All Levels',
      location: 'Seattle, WA & Worldwide',
      description: 'Build scalable backend systems for e-commerce and cloud services.',
      salaryRange: '$110,000 - $160,000',
      quizCategory: 'backend'
    },
    {
      id: 4,
      name: 'Microsoft',
      logo: '💻',
      roles: ['Backend Developer'],
      positions: ['Backend Software Engineer', 'Cloud Developer'],
      requiredSkills: ['C#', '.NET', 'Azure', 'SQL Server'],
      preferredSkills: ['Python', 'Docker', 'Kubernetes'],
      experienceLevel: 'Intermediate to Advanced',
      location: 'Redmond, WA & Remote',
      description: 'Develop backend services for Office, Windows, and Azure cloud.',
      salaryRange: '$115,000 - $165,000',
      quizCategory: 'backend'
    },
    {
      id: 5,
      name: 'Shopify',
      logo: '🛒',
      roles: ['Full Stack Developer'],
      positions: ['Full Stack Developer', 'Software Engineer'],
      requiredSkills: ['React', 'Ruby on Rails', 'JavaScript', 'GraphQL'],
      preferredSkills: ['TypeScript', 'Redis', 'Docker'],
      experienceLevel: 'All Levels',
      location: 'Ottawa, Canada & Remote',
      description: 'Build e-commerce solutions used by millions of merchants worldwide.',
      salaryRange: '$100,000 - $150,000',
      quizCategory: 'fullstack'
    }
  ];

  const jobRoles = [
    'Frontend Developer',
    'Backend Developer', 
    'Full Stack Developer',
    'Data Scientist',
    'DevOps Engineer'
  ];

  useEffect(() => {
    const resumeAnalysis = localStorage.getItem('resumeAnalysis');
    if (resumeAnalysis) {
      try {
        const analysis = JSON.parse(resumeAnalysis);
        
        // Simple role detection
        const technicalSkills = analysis.analysis?.skills?.technical || [];
        if (technicalSkills.some(skill => 
          skill.toLowerCase().includes('react') || skill.toLowerCase().includes('javascript'))) {
          setDetectedRole('Frontend Developer');
          setSelectedRole('Frontend Developer');
        } else if (technicalSkills.some(skill => 
          skill.toLowerCase().includes('java') || skill.toLowerCase().includes('python'))) {
          setDetectedRole('Backend Developer');
          setSelectedRole('Backend Developer');
        } else {
          setDetectedRole('Full Stack Developer');
          setSelectedRole('Full Stack Developer');
        }
      } catch (error) {
        setDetectedRole('Full Stack Developer');
        setSelectedRole('Full Stack Developer');
      }
    } else {
      setDetectedRole('Full Stack Developer');
      setSelectedRole('Full Stack Developer');
    }
  }, []);

  const getCompaniesForRole = () => {
    if (!selectedRole) return [];
    return companyDatabase.filter(company => 
      company.roles.includes(selectedRole)
    );
  };

  const handleTakeQuiz = (company) => {
    // Navigate to quiz page with company data
    window.location.href = `/quiz?company=${encodeURIComponent(company.name)}&role=${encodeURIComponent(selectedRole)}&category=${encodeURIComponent(company.quizCategory)}`;
  };

  const companiesForRole = getCompaniesForRole();

  return (
    <div className="job-selection-page">
      <div className="job-selection-container">
        <div className="selection-header">
          <h1>Job Selection</h1>
          <p>Choose your desired job role and explore companies that match your skills.</p>
        </div>

        {/* Role Selection */}
        <div className="role-selection-section">
          <div className="section-title">
            <h2>Select Your Job Role</h2>
            {detectedRole && (
              <p>Based on your resume, we recommend: <strong>{detectedRole}</strong></p>
            )}
          </div>
          
          <div className="role-dropdown-container">
            <select 
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                setSelectedCompany(null);
              }}
              className="role-dropdown"
            >
              <option value="">Choose a job role...</option>
              {jobRoles.map((role, index) => (
                <option key={index} value={role}>
                  {role} {role === detectedRole ? ' (Recommended)' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Companies Section */}
        {selectedRole && (
          <div className="companies-section">
            <div className="section-title">
              <h2>Companies hiring for <span className="role-highlight">{selectedRole}</span></h2>
              <p>Select a company to view details and take skill assessment</p>
            </div>

            <div className="companies-grid">
              {companiesForRole.map(company => (
                <div 
                  key={company.id}
                  className={`company-card ${selectedCompany?.id === company.id ? 'selected' : ''}`}
                  onClick={() => setSelectedCompany(company)}
                >
                  <div className="company-header">
                    <div className="company-logo">
                      {company.logo}
                    </div>
                    <div className="company-info">
                      <h4 className="company-name">{company.name}</h4>
                      <span className="company-location">
                        <i className="fas fa-map-marker-alt"></i>
                        {company.location}
                      </span>
                    </div>
                  </div>
                  
                  <div className="company-preview">
                    <p className="preview-description">{company.description}</p>
                    <div className="salary-range">
                      <i className="fas fa-money-bill-wave"></i>
                      {company.salaryRange}
                    </div>
                  </div>

                  <div className="company-positions">
                    {company.positions.map((position, index) => (
                      <span key={index} className="position-tag">{position}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Company Details */}
            {selectedCompany && (
              <div className="company-details">
                <div className="details-card">
                  <div className="details-header">
                    <div className="company-brand">
                      <div className="company-logo-large">
                        {selectedCompany.logo}
                      </div>
                      <div className="company-title">
                        <h3>{selectedCompany.name}</h3>
                        <div className="company-roles">
                          {selectedCompany.roles.map((role, index) => (
                            <span key={index} className="role-tag">{role}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="company-description">{selectedCompany.description}</p>
                  </div>

                  <div className="details-content">
                    <div className="detail-section">
                      <h4 className="section-subtitle">
                        <i className="fas fa-briefcase"></i>
                        Available Positions
                      </h4>
                      <div className="positions-list">
                        {selectedCompany.positions.map((position, index) => (
                          <span key={index} className="position-tag detailed">{position}</span>
                        ))}
                      </div>
                    </div>

                    <div className="skills-section">
                      <h4 className="section-subtitle">
                        <i className="fas fa-check-circle"></i>
                        Required Skills
                      </h4>
                      <div className="skills-list">
                        {selectedCompany.requiredSkills.map((skill, index) => (
                          <span key={index} className="skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="company-info">
                      <div className="info-item">
                        <i className="fas fa-chart-line"></i>
                        <span>Experience: {selectedCompany.experienceLevel}</span>
                      </div>
                      <div className="info-item">
                        <i className="fas fa-money-bill-wave"></i>
                        <span>Salary: {selectedCompany.salaryRange}</span>
                      </div>
                      <div className="info-item">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>Location: {selectedCompany.location}</span>
                      </div>
                    </div>

                    <div className="quiz-section">
                      <button 
                        className="take-quiz-btn"
                        onClick={() => handleTakeQuiz(selectedCompany)}
                      >
                        <i className="fas fa-brain"></i>
                        Take Skill Assessment Quiz
                        <i className="fas fa-arrow-right"></i>
                      </button>
                      <p className="quiz-note">
                        Test your knowledge with a quiz tailored for {selectedCompany.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSelection;