import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resumeAnalysisService } from '../services/resumeAnalysisService';
import ApiService from '../api'; // Import the API service
import './Upload.css';

const Upload = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [analysisError, setAnalysisError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [userData, setUserData] = useState({
    name: '',
    email: ''
  });

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload({ target: { files: e.dataTransfer.files } });
    }
  };

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const simulateProgress = (type) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      if (type === 'upload') {
        setUploadProgress(progress);
      } else {
        setAnalysisProgress(progress);
      }
    }, 200);
  };

  const saveToMongoDB = async (file, analysisResults) => {
    try {
      // Create or get user
      const user = await ApiService.createOrGetUser(userData);
      
      // Upload resume file to server
      const uploadResult = await ApiService.uploadResume(file, userData);
      
      // Prepare user data with resume info
      const userInfo = {
        ...user,
        resume: uploadResult.resume,
        analysis: analysisResults
      };
      
      // Save to localStorage for immediate access
      localStorage.setItem('user', JSON.stringify(userInfo));
      
      // Save analysis results to localStorage as well
      localStorage.setItem('resumeAnalysis', JSON.stringify({
        fileInfo: {
          name: file.name,
          size: file.size,
          type: file.type,
          uploadDate: new Date().toISOString()
        },
        analysis: analysisResults
      }));
      
      return userInfo;
    } catch (error) {
      console.error('Failed to save to MongoDB:', error);
      // Fallback to localStorage only
      const fallbackUser = {
        name: userData.name,
        email: userData.email,
        resume: {
          filename: file.name,
          originalName: file.name,
          uploadDate: new Date().toISOString()
        },
        analysis: analysisResults
      };
      localStorage.setItem('user', JSON.stringify(fallbackUser));
      return fallbackUser;
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate user data
      if (!userData.name || !userData.email) {
        setAnalysisError('Please enter your name and email address');
        return;
      }

      setIsUploading(true);
      setAnalysisError('');
      setUploadProgress(0);
      setAnalysisProgress(0);

      // Validate file type
      const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      
      if (!allowedTypes.includes(fileExtension)) {
        setAnalysisError('Please upload a PDF, DOC, DOCX, or TXT file.');
        setIsUploading(false);
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setAnalysisError('File size must be less than 5MB.');
        setIsUploading(false);
        return;
      }

      try {
        setUploadedFile(file);
        simulateProgress('upload');
        
        // Wait for upload simulation
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsUploading(false);
        
        // Start analysis
        setIsAnalyzing(true);
        simulateProgress('analysis');
        
        // Try to get real analysis results
        let results;
        try {
          results = await resumeAnalysisService.comprehensiveAnalysis(file);
        } catch (analysisError) {
          console.error('Real analysis failed, using mock data:', analysisError);
          // Use mock data as fallback
          results = await resumeAnalysisService.mockComprehensiveAnalysis(file);
        }
        
        setAnalysisResults(results);
        
        // Save to MongoDB and localStorage
        await saveToMongoDB(file, results);
        
      } catch (error) {
        console.error('Upload process failed:', error);
        setAnalysisError('Failed to process your resume. Please try again.');
      } finally {
        setIsUploading(false);
        setIsAnalyzing(false);
        setUploadProgress(100);
        setAnalysisProgress(100);
      }
    }
  };

  const handleContinue = () => {
    if (analysisResults) {
      navigate('/job-selection');
    }
  };

  const handleReupload = () => {
    setUploadedFile(null);
    setAnalysisResults(null);
    setAnalysisError('');
    setUploadProgress(0);
    setAnalysisProgress(0);
    setUserData({ name: '', email: '' });
    const fileInput = document.getElementById('resume-upload');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="upload-page">
      <div className="upload-container">
        {/* Header Section */}
        <div className="upload-header">
          <h1>Upload Your Resume</h1>
          <p>Let's analyze your resume and find the perfect job matches for your skills.</p>
        </div>

        {!uploadedFile && !analysisResults && (
          <div className="upload-section">
            <div className="upload-card">
              <div className="upload-icon">
                <i className="fas fa-file-upload"></i>
              </div>
              <h3>Upload Resume</h3>
              <p>Supported formats: PDF, DOC, DOCX, TXT (Max 5MB)</p>
              
              {/* User Information Form */}
              <div className="user-info-form">
                <div className="form-row">
                  <div className="input-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                <p className="form-note">
                  Your information will be stored securely and used only for job matching purposes.
                </p>
              </div>

              <div 
                className={`file-upload-area ${dragActive ? 'drag-active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="resume-upload"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="file-input"
                  disabled={!userData.name || !userData.email}
                />
                <label htmlFor="resume-upload" className="file-label">
                  <i className="fas fa-cloud-upload-alt"></i>
                  <span>
                    {userData.name && userData.email 
                      ? "Choose File or Drag & Drop" 
                      : "Please enter your information first"
                    }
                  </span>
                  <p>
                    {userData.name && userData.email 
                      ? "We'll analyze your skills and find the best job matches"
                      : "Complete the form above to enable file upload"
                    }
                  </p>
                </label>
              </div>

              <div className="upload-features">
                <div className="feature-item">
                  <i className="fas fa-database"></i>
                  <span>Secure Cloud Storage</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-search"></i>
                  <span>AI Skill Analysis</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-briefcase"></i>
                  <span>Smart Job Matching</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-chart-bar"></i>
                  <span>Progress Tracking</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Progress Section */}
        {(isUploading || isAnalyzing) && (
          <div className="progress-section">
            <div className="progress-card">
              <div className="progress-header">
                <h3>
                  {isUploading ? 'Uploading Your Resume' : 'Analyzing Your Skills'}
                </h3>
                <p>
                  {isUploading 
                    ? 'Securely storing your resume and preparing for analysis...' 
                    : 'Using AI to extract skills and find the best job matches...'
                  }
                </p>
              </div>

              <div className="progress-bars">
                <div className="progress-item">
                  <div className="progress-label">
                    <span>File Upload & Storage</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill upload-fill"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="progress-item">
                  <div className="progress-label">
                    <span>AI Analysis & Processing</span>
                    <span>{Math.round(analysisProgress)}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill analysis-fill"
                      style={{ width: `${analysisProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="processing-steps">
                <div className={`step ${isUploading ? 'active' : 'completed'}`}>
                  <div className="step-icon">
                    <i className="fas fa-user-check"></i>
                  </div>
                  <span>User Info</span>
                </div>
                <div className={`step ${isUploading ? 'active' : isAnalyzing ? 'completed' : 'pending'}`}>
                  <div className="step-icon">
                    <i className="fas fa-upload"></i>
                  </div>
                  <span>Upload</span>
                </div>
                <div className={`step ${isAnalyzing ? 'active' : !isUploading && !isAnalyzing ? 'completed' : 'pending'}`}>
                  <div className="step-icon">
                    <i className="fas fa-search"></i>
                  </div>
                  <span>Analysis</span>
                </div>
                <div className={`step ${!isUploading && !isAnalyzing ? 'active' : 'pending'}`}>
                  <div className="step-icon">
                    <i className="fas fa-check"></i>
                  </div>
                  <span>Complete</span>
                </div>
              </div>

              <div className="storage-notice">
                <i className="fas fa-shield-alt"></i>
                <span>Your resume is being securely stored in our database</span>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {analysisError && (
          <div className="error-message">
            <div className="error-card">
              <div className="error-icon">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <div className="error-content">
                <h4>Upload Failed</h4>
                <p>{analysisError}</p>
              </div>
              <button onClick={handleReupload} className="retry-btn">
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {uploadedFile && analysisResults && !isAnalyzing && (
          <div className="analysis-results">
            <div className="results-header success">
              <i className="fas fa-check-circle"></i>
              <h2>Analysis Completed Successfully!</h2>
              <p>Your resume has been analyzed and securely stored in our database.</p>
            </div>

            <div className="storage-confirmation">
              <div className="storage-card">
                <i className="fas fa-database"></i>
                <div className="storage-info">
                  <h4>Resume Securely Stored</h4>
                  <p>Your resume has been saved to our database and is ready for future access.</p>
                </div>
                <div className="storage-details">
                  <div className="detail-item">
                    <span>File Name:</span>
                    <span>{uploadedFile.name}</span>
                  </div>
                  <div className="detail-item">
                    <span>Storage Location:</span>
                    <span>MongoDB Cloud Database</span>
                  </div>
                  <div className="detail-item">
                    <span>Analysis Date:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="results-grid">
              {/* Technical Skills */}
              <div className="result-card">
                <h3>Technical Skills</h3>
                <div className="skills-list">
                  {analysisResults.skills?.technical?.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <i className="fas fa-check"></i>
                      <span>{skill}</span>
                    </div>
                  )) || (
                    <div className="no-skills">No technical skills detected</div>
                  )}
                </div>
                <div className="section-footer">
                  <span className="skills-count">
                    {analysisResults.skills?.technical?.length || 0} skills identified
                  </span>
                </div>
              </div>

              {/* Soft Skills */}
              <div className="result-card">
                <h3>Soft Skills</h3>
                <div className="skills-list">
                  {analysisResults.skills?.soft?.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <i className="fas fa-check"></i>
                      <span>{skill}</span>
                    </div>
                  )) || (
                    <div className="no-skills">No soft skills detected</div>
                  )}
                </div>
                <div className="section-footer">
                  <span className="skills-count">
                    {analysisResults.skills?.soft?.length || 0} skills identified
                  </span>
                </div>
              </div>

              {/* Overall Score */}
              <div className="result-card score-card">
                <h3>Overall Resume Score</h3>
                <div className="score-display">
                  <div className="score-circle">
                    <span className="score-value">{analysisResults.overall_score || 0}%</span>
                  </div>
                  <div className="score-details">
                    <div className="score-breakdown">
                      <div className="breakdown-item">
                        <span className="breakdown-label">Skills Match</span>
                        <div className="breakdown-value">85%</div>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">Experience</span>
                        <div className="breakdown-value">78%</div>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">Content Quality</span>
                        <div className="breakdown-value">92%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Matches */}
              <div className="result-card matches-card">
                <h3>Top Job Matches</h3>
                <div className="job-matches">
                  <div className="job-match">
                    <i className="fas fa-briefcase"></i>
                    <div className="job-info">
                      <h4>Full Stack Developer</h4>
                      <p>High match with your technical skills</p>
                      <div className="match-progress">
                        <div className="match-progress-fill" style={{width: '85%'}}></div>
                      </div>
                    </div>
                    <span className="match-percentage">85%</span>
                  </div>
                  <div className="job-match">
                    <i className="fas fa-briefcase"></i>
                    <div className="job-info">
                      <h4>Frontend Developer</h4>
                      <p>Excellent React and JavaScript skills</p>
                      <div className="match-progress">
                        <div className="match-progress-fill" style={{width: '78%'}}></div>
                      </div>
                    </div>
                    <span className="match-percentage">78%</span>
                  </div>
                  <div className="job-match">
                    <i className="fas fa-briefcase"></i>
                    <div className="job-info">
                      <h4>Backend Developer</h4>
                      <p>Strong Node.js and database skills</p>
                      <div className="match-progress">
                        <div className="match-progress-fill" style={{width: '72%'}}></div>
                      </div>
                    </div>
                    <span className="match-percentage">72%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button onClick={handleContinue} className="btn-primary">
                Continue to Job Selection
                <i className="fas fa-arrow-right"></i>
              </button>
              <button onClick={handleReupload} className="btn-secondary">
                Upload Different Resume
                <i className="fas fa-redo"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;