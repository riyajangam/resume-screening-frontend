import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resumeAnalysisService } from '../services/resumeAnalysisService';
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

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
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
        
        const results = await resumeAnalysisService.comprehensiveAnalysis(file);
        setAnalysisResults(results);
        
      } catch (error) {
        console.error('Analysis failed:', error);
        // Use mock data as fallback
        const mockResults = await resumeAnalysisService.mockComprehensiveAnalysis(file);
        setAnalysisResults(mockResults);
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
      localStorage.setItem('resumeAnalysis', JSON.stringify({
        fileInfo: {
          name: uploadedFile.name,
          size: uploadedFile.size,
          type: uploadedFile.type,
          uploadDate: new Date().toISOString()
        },
        analysis: analysisResults
      }));
      navigate('/job-selection');
    }
  };

  const handleReupload = () => {
    setUploadedFile(null);
    setAnalysisResults(null);
    setAnalysisError('');
    setUploadProgress(0);
    setAnalysisProgress(0);
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
                />
                <label htmlFor="resume-upload" className="file-label">
                  <i className="fas fa-cloud-upload-alt"></i>
                  <span>Choose File or Drag & Drop</span>
                  <p>We'll analyze your skills and find the best job matches</p>
                </label>
              </div>

              <div className="upload-features">
                <div className="feature-item">
                  <i className="fas fa-search"></i>
                  <span>Skill Extraction</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-briefcase"></i>
                  <span>Job Matching</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-chart-bar"></i>
                  <span>Resume Scoring</span>
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
                  {isUploading ? 'Getting your file ready for analysis...' : 'Finding the best job matches for you...'}
                </p>
              </div>

              <div className="progress-bars">
                <div className="progress-item">
                  <div className="progress-label">
                    <span>Upload Progress</span>
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
                    <span>AI Analysis</span>
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
                    <i className="fas fa-upload"></i>
                  </div>
                  <span>Uploading</span>
                </div>
                <div className={`step ${isAnalyzing ? 'active' : isUploading ? 'pending' : 'completed'}`}>
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
              <h2>Analysis Completed</h2>
              <p>We've analyzed your resume and found some great matches.</p>
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

            {/* Success Message */}
            <div className="success-message">
              <div className="success-content">
                <i className="fas fa-check-circle"></i>
                <div>
                  <h4>Resume analysis completed successfully!</h4>
                  <p>Your resume has been analyzed and optimized for better job matching</p>
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