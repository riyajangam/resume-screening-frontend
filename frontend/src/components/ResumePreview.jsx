import React from 'react';
import { useResume } from '../context/ResumeContext';
import './ResumePreview.css';

const ResumePreview = () => {
  const { resumeData, selectedTemplate } = useResume();

  const downloadResume = () => {
    // This will be connected to resumeService later
    alert('Download functionality will be implemented with the backend');
  };

  if (!resumeData.personalInfo.name) {
    return (
      <div className="resume-preview">
        <div className="preview-placeholder">
          <p>Your resume preview will appear here</p>
          <p>Start by adding your personal information</p>
        </div>
      </div>
    );
  }

  return (
    <div className="resume-preview">
      <div className="preview-header">
        <h3>Resume Preview</h3>
        <button onClick={downloadResume} className="download-button">
          Download Resume
        </button>
      </div>
      
      <div className={`resume-template ${selectedTemplate}`}>
        <div className="resume-header">
          <h1>{resumeData.personalInfo.name}</h1>
          <div className="contact-info">
            {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
            {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
            {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
          </div>
        </div>

        {resumeData.education.length > 0 && (
          <section className="resume-section">
            <h2>Education</h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="education-item">
                <h3>{edu.institution}</h3>
                <p>{edu.degree} {edu.year && `| ${edu.year}`}</p>
              </div>
            ))}
          </section>
        )}

        {resumeData.experience.length > 0 && (
          <section className="resume-section">
            <h2>Experience</h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <h3>{exp.company}</h3>
                <p>{exp.position} {exp.duration && `| ${exp.duration}`}</p>
                <p>{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {resumeData.skills.length > 0 && (
          <section className="resume-section">
            <h2>Skills</h2>
            <div className="skills-list">
              {resumeData.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;