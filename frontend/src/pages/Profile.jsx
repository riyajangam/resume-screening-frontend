import React, { useState, useEffect, useCallback } from 'react';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [uploadedResumes, setUploadedResumes] = useState([]);
  const [generatedResumes, setGeneratedResumes] = useState([]);

  const getProficiencyLevel = useCallback((score) => {
    if (score >= 90) return 'Expert';
    if (score >= 80) return 'Advanced';
    if (score >= 70) return 'Proficient';
    if (score >= 60) return 'Intermediate';
    return 'Beginner';
  }, []);

  const generateSkillsFromQuizResults = useCallback((quizResults) => {
    const skills = {};
    quizResults.forEach(result => {
      skills[result.skill] = {
        level: result.level,
        score: result.score,
        proficiency: getProficiencyLevel(result.score),
        lastAssessed: result.date
      };
    });
    return skills;
  }, [getProficiencyLevel]);

  const generateSummaryFromQuizResults = useCallback((quizResults) => {
    const topSkills = quizResults
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(result => `${result.skill} (${getProficiencyLevel(result.score)})`);

    return `Skilled professional with verified expertise in ${topSkills.join(', ')}. All skills validated through comprehensive assessments.`;
  }, [getProficiencyLevel]);

  const createGeneratedResume = useCallback((userData, quizResults) => {
    const generatedResume = {
      id: Date.now(),
      name: `${userData.name || 'User'}_Enhanced_Resume.pdf`,
      created: new Date().toISOString(),
      skills: generateSkillsFromQuizResults(quizResults),
      experience: userData.experience || 'Enhanced with skill assessments',
      education: userData.education || 'Skill-verified profile',
      summary: generateSummaryFromQuizResults(quizResults)
    };

    const newGeneratedResumes = [generatedResume];
    setGeneratedResumes(newGeneratedResumes);
    localStorage.setItem('generatedResumes', JSON.stringify(newGeneratedResumes));
  }, [generateSkillsFromQuizResults, generateSummaryFromQuizResults]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);

    // Load uploaded resumes
    const resumeAnalysis = localStorage.getItem('resumeAnalysis');
    if (resumeAnalysis) {
      try {
        const analysis = JSON.parse(resumeAnalysis);
        if (analysis.fileInfo) {
          setUploadedResumes([analysis.fileInfo]);
        }
      } catch (error) {
        console.error('Error parsing resume analysis:', error);
      }
    }

    // Load generated resumes
    const generatedResumesData = localStorage.getItem('generatedResumes');
    if (generatedResumesData) {
      try {
        setGeneratedResumes(JSON.parse(generatedResumesData));
      } catch (error) {
        console.error('Error parsing generated resumes:', error);
      }
    }

    // Load quiz results for generated resume
    const quizResults = userData.quizResults || [];
    if (quizResults.length > 0 && generatedResumes.length === 0) {
      createGeneratedResume(userData, quizResults);
    }
  }, [createGeneratedResume, generatedResumes.length]);

  const downloadResume = (resume, type) => {
    // Simulate download
    const element = document.createElement('a');
    const file = new Blob([`${type} Resume: ${resume.name}\n\nGenerated on: ${new Date(resume.created).toLocaleDateString()}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = resume.name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div className="not-logged-in">
            <h2>Please log in to view your profile</h2>
            <p>You need to be logged in to access your profile information.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>User Profile</h1>
          <p>Manage your account and view your resume collection</p>
        </div>

        <div className="profile-content">
          <div className="profile-sidebar">
            <button 
              className={`sidebar-tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <i className="fas fa-user"></i>
              Profile Details
            </button>
            <button 
              className={`sidebar-tab ${activeTab === 'uploaded' ? 'active' : ''}`}
              onClick={() => setActiveTab('uploaded')}
            >
              <i className="fas fa-upload"></i>
              Uploaded Resumes
              <span className="count-badge">{uploadedResumes.length}</span>
            </button>
            <button 
              className={`sidebar-tab ${activeTab === 'generated' ? 'active' : ''}`}
              onClick={() => setActiveTab('generated')}
            >
              <i className="fas fa-file-alt"></i>
              Generated Resumes
              <span className="count-badge">{generatedResumes.length}</span>
            </button>
            <button 
              className={`sidebar-tab ${activeTab === 'skills' ? 'active' : ''}`}
              onClick={() => setActiveTab('skills')}
            >
              <i className="fas fa-chart-bar"></i>
              Skill Assessments
            </button>
          </div>

          <div className="profile-main">
            {activeTab === 'profile' && (
              <div className="profile-details">
                <h2>Personal Information</h2>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Full Name</label>
                    <p>{user.name || 'Not provided'}</p>
                  </div>
                  <div className="info-item">
                    <label>Email</label>
                    <p>{user.email || 'Not provided'}</p>
                  </div>
                  <div className="info-item">
                    <label>Phone</label>
                    <p>{user.phone || 'Not provided'}</p>
                  </div>
                  <div className="info-item">
                    <label>Location</label>
                    <p>{user.location || 'Not provided'}</p>
                  </div>
                </div>

                <div className="stats-grid">
                  <div className="stat-card">
                    <i className="fas fa-file-upload"></i>
                    <div className="stat-content">
                      <h3>{uploadedResumes.length}</h3>
                      <p>Uploaded Resumes</p>
                    </div>
                  </div>
                  <div className="stat-card">
                    <i className="fas fa-file-alt"></i>
                    <div className="stat-content">
                      <h3>{generatedResumes.length}</h3>
                      <p>Generated Resumes</p>
                    </div>
                  </div>
                  <div className="stat-card">
                    <i className="fas fa-chart-line"></i>
                    <div className="stat-content">
                      <h3>{user.quizResults?.length || 0}</h3>
                      <p>Skills Assessed</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'uploaded' && (
              <div className="resumes-section">
                <h2>Uploaded Resumes</h2>
                <p>Resumes you have uploaded for analysis</p>
                
                {uploadedResumes.length === 0 ? (
                  <div className="empty-state">
                    <i className="fas fa-file-upload"></i>
                    <h3>No resumes uploaded yet</h3>
                    <p>Upload your first resume to get started with job matching</p>
                  </div>
                ) : (
                  <div className="resumes-grid">
                    {uploadedResumes.map((resume, index) => (
                      <div key={index} className="resume-card">
                        <div className="resume-icon">
                          <i className="fas fa-file-pdf"></i>
                        </div>
                        <div className="resume-info">
                          <h4>{resume.name}</h4>
                          <p>Uploaded: {new Date(resume.uploadDate).toLocaleDateString()}</p>
                          <p>Size: {(resume.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <div className="resume-actions">
                          <button 
                            className="btn-download"
                            onClick={() => downloadResume(resume, 'Uploaded')}
                          >
                            <i className="fas fa-download"></i>
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'generated' && (
              <div className="resumes-section">
                <h2>Generated Resumes</h2>
                <p>AI-enhanced resumes with verified skill levels</p>
                
                {generatedResumes.length === 0 ? (
                  <div className="empty-state">
                    <i className="fas fa-file-alt"></i>
                    <h3>No generated resumes yet</h3>
                    <p>Complete skill assessments to generate enhanced resumes</p>
                  </div>
                ) : (
                  <div className="resumes-grid">
                    {generatedResumes.map((resume) => (
                      <div key={resume.id} className="resume-card enhanced">
                        <div className="resume-icon">
                          <i className="fas fa-star"></i>
                        </div>
                        <div className="resume-info">
                          <h4>{resume.name}</h4>
                          <p>Generated: {new Date(resume.created).toLocaleDateString()}</p>
                          <div className="skills-preview">
                            {Object.entries(resume.skills || {}).slice(0, 3).map(([skill, data]) => (
                              <span key={skill} className="skill-badge">
                                {skill}: {data.proficiency}
                              </span>
                            ))}
                            {Object.keys(resume.skills || {}).length > 3 && (
                              <span className="more-skills">
                                +{Object.keys(resume.skills || {}).length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="resume-actions">
                          <button 
                            className="btn-download primary"
                            onClick={() => downloadResume(resume, 'Generated')}
                          >
                            <i className="fas fa-download"></i>
                            Download
                          </button>
                          <button className="btn-preview">
                            <i className="fas fa-eye"></i>
                            Preview
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="skills-section">
                <h2>Skill Assessments</h2>
                <p>Your verified skill levels from assessments</p>
                
                {(!user.quizResults || user.quizResults.length === 0) ? (
                  <div className="empty-state">
                    <i className="fas fa-chart-bar"></i>
                    <h3>No assessments completed</h3>
                    <p>Take skill assessments to verify your proficiency levels</p>
                  </div>
                ) : (
                  <div className="skills-grid">
                    {user.quizResults.map((result, index) => (
                      <div key={index} className="skill-assessment-card">
                        <div className="skill-header">
                          <h4>{result.skill}</h4>
                          <span className={`level-badge ${result.level}`}>
                            {result.level}
                          </span>
                        </div>
                        <div className="skill-details">
                          <div className="score-display">
                            <div className="score-circle">
                              <span className="score-value">{result.score}%</span>
                            </div>
                            <div className="score-info">
                              <p>Proficiency: {getProficiencyLevel(result.score)}</p>
                              <p>Date: {new Date(result.date).toLocaleDateString()}</p>
                              <p>Questions: {result.totalQuestions}/10 correct</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;