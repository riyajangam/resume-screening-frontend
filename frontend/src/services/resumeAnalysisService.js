// src/services/resumeAnalysisService.js
const API_BASE_URL = 'http://localhost:5000/api'; // Your backend URL

export const resumeAnalysisService = {
  // Extract skills from resume
  async extractSkills(resumeFile) {
    const formData = new FormData();
    formData.append('resume', resumeFile);

    try {
      const response = await fetch(`${API_BASE_URL}/extract-skills`, {
        method: 'POST',
        body: formData,
      });
      return await response.json();
    } catch (error) {
      console.error('Error extracting skills:', error);
      throw error;
    }
  },

  // Analyze resume and get job match suggestions
  async analyzeResume(resumeFile, jobRole = '') {
    const formData = new FormData();
    formData.append('resume', resumeFile);
    if (jobRole) {
      formData.append('job_role', jobRole);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/analyze-resume`, {
        method: 'POST',
        body: formData,
      });
      return await response.json();
    } catch (error) {
      console.error('Error analyzing resume:', error);
      throw error;
    }
  },

  // Parse resume and job description
  async parseResumeAndJD(resumeFile, jobDescription = '') {
    const formData = new FormData();
    formData.append('resume', resumeFile);
    if (jobDescription) {
      formData.append('job_description', jobDescription);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/parse-resume`, {
        method: 'POST',
        body: formData,
      });
      return await response.json();
    } catch (error) {
      console.error('Error parsing resume:', error);
      throw error;
    }
  },

  // Comprehensive analysis combining all three
  async comprehensiveAnalysis(resumeFile, jobRole = '') {
    const formData = new FormData();
    formData.append('resume', resumeFile);
    if (jobRole) {
      formData.append('job_role', jobRole);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/comprehensive-analysis`, {
        method: 'POST',
        body: formData,
      });
      return await response.json();
    } catch (error) {
      console.error('Error in comprehensive analysis:', error);
      throw error;
    }
  }
};