import React from 'react';
import { useResume } from '../context/ResumeContext';
import './ResumeEditor.css';

const ResumeEditor = () => {
  const { resumeData, updateResumeData } = useResume();

  const handlePersonalInfoChange = (field, value) => {
    updateResumeData({
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value
      }
    });
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    updateResumeData({ education: updatedEducation });
  };

  const addEducation = () => {
    updateResumeData({
      education: [
        ...resumeData.education,
        { institution: '', degree: '', year: '' }
      ]
    });
  };

  return (
    <div className="resume-editor">
      <h2>Edit Your Resume</h2>
      
      <section className="editor-section">
        <h3>Personal Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={resumeData.personalInfo.name || ''}
              onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={resumeData.personalInfo.email || ''}
              onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              value={resumeData.personalInfo.phone || ''}
              onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={resumeData.personalInfo.location || ''}
              onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="editor-section">
        <div className="section-header">
          <h3>Education</h3>
          <button onClick={addEducation} className="add-button">
            + Add Education
          </button>
        </div>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="education-item">
            <div className="form-grid">
              <div className="form-group">
                <label>Institution</label>
                <input
                  type="text"
                  value={edu.institution || ''}
                  onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Degree</label>
                <input
                  type="text"
                  value={edu.degree || ''}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input
                  type="text"
                  value={edu.year || ''}
                  onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ResumeEditor;