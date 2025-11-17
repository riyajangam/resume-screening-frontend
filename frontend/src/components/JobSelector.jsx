import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JobSelector.css';

const JobSelector = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  const jobRoles = [
    'Frontend Developer',
    'Backend Developer', 
    'Full Stack Developer',
    'Data Scientist',
    'DevOps Engineer',
    'Mobile Developer',
    'UI/UX Designer'
  ];

  const companySuggestions = {
    'Frontend Developer': ['Google', 'Meta', 'Netflix', 'Airbnb', 'Spotify'],
    'Backend Developer': ['Amazon', 'Microsoft', 'Uber', 'PayPal', 'Stripe'],
    'Full Stack Developer': ['Facebook', 'LinkedIn', 'Twitter', 'Shopify', 'Slack'],
    'Data Scientist': ['IBM', 'Tesla', 'Apple', 'NVIDIA', 'OpenAI'],
    'DevOps Engineer': ['AWS', 'Docker', 'Kubernetes', 'GitLab', 'DigitalOcean'],
    'Mobile Developer': ['Apple', 'Google', 'Facebook', 'Uber', 'Snapchat'],
    'UI/UX Designer': ['Adobe', 'Figma', 'InVision', 'Sketch', 'Canva']
  };

  const handleCompanyToggle = (company) => {
    setSelectedCompanies(prev =>
      prev.includes(company)
        ? prev.filter(c => c !== company)
        : [...prev, company]
    );
  };

  const handleContinue = () => {
    // Save job selection to localStorage
    const jobData = {
      role: selectedRole,
      companies: selectedCompanies,
      selectedDate: new Date().toISOString()
    };
    localStorage.setItem('userJobSelection', JSON.stringify(jobData));
    navigate('/skill-selection');
  };

  return (
    <div className="job-selector-container">
      <h2>Job Selection</h2>
      
      <div className="form-group">
        <label>Select Your Desired Job Role:</label>
        <select 
          value={selectedRole} 
          onChange={(e) => {
            setSelectedRole(e.target.value);
            setSelectedCompanies([]);
          }}
          className="form-select"
        >
          <option value="">Choose a role</option>
          {jobRoles.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      {selectedRole && (
        <div className="suggestions-section">
          <h3>Suggested Companies for {selectedRole}:</h3>
          <div className="companies-grid">
            {companySuggestions[selectedRole]?.map(company => (
              <div key={company} className="company-checkbox">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedCompanies.includes(company)}
                    onChange={() => handleCompanyToggle(company)}
                    className="checkbox-input"
                  />
                  <span className="checkmark"></span>
                  {company}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedCompanies.length > 0 && (
        <div className="selected-companies">
          <h3>Selected Companies:</h3>
          <div className="companies-tags">
            {selectedCompanies.map(company => (
              <span key={company} className="company-tag">
                {company}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="action-buttons">
        <button 
          className="btn-primary"
          onClick={handleContinue}
          disabled={!selectedRole || selectedCompanies.length === 0}
        >
          Continue to Skill Assessment
        </button>
      </div>
    </div>
  );
};

export default JobSelector;