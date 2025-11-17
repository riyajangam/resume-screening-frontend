import React, { useState } from 'react';
import './Generate.css';

const Generate = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const templates = [
    {
      id: 'professional',
      name: 'Professional',
      description: 'Clean and formal design suitable for corporate roles',
      icon: '💼',
      color: '#3498db'
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Contemporary design with creative elements',
      icon: '🚀',
      color: '#9b59b6'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Colorful and innovative design for creative industries',
      icon: '🎨',
      color: '#e74c3c'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and elegant design focusing on content',
      icon: '⚡',
      color: '#2ecc71'
    }
  ];

  const handleGenerateResume = () => {
    setIsGenerating(true);
    // Simulate resume generation process
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 2000);
  };

  const handleDownload = (format) => {
    // Handle download in different formats
    console.log(`Downloading resume in ${format} format`);
    alert(`Downloading resume in ${format.toUpperCase()} format!`);
  };

  const getTemplatePreview = (templateId) => {
    const previews = {
      professional: {
        backgroundColor: '#3498db',
        accentColor: '#2980b9'
      },
      modern: {
        backgroundColor: '#9b59b6',
        accentColor: '#8e44ad'
      },
      creative: {
        backgroundColor: '#e74c3c',
        accentColor: '#c0392b'
      },
      minimal: {
        backgroundColor: '#2ecc71',
        accentColor: '#27ae60'
      }
    };
    return previews[templateId] || previews.professional;
  };

  return (
    <div className="generate-container">
      <div className="generate-header">
        <h1>Generate Your Resume</h1>
        <p>Select a template and create your professional resume</p>
      </div>

      <div className="generate-content">
        {/* Template Selection Section */}
        <div className="template-section">
          <div className="section-header">
            <h2>Choose a Template</h2>
            <span className="section-badge">{templates.length} Templates</span>
          </div>
          
          <div className="templates-grid">
            {templates.map(template => (
              <div 
                key={template.id}
                className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="template-preview" style={{ 
                  background: getTemplatePreview(template.id).backgroundColor 
                }}>
                  <div className="template-icon">{template.icon}</div>
                  <div className="template-preview-content">
                    <div className="preview-header" style={{ 
                      background: getTemplatePreview(template.id).accentColor 
                    }}></div>
                    <div className="preview-body">
                      <div className="preview-line short"></div>
                      <div className="preview-line medium"></div>
                      <div className="preview-line long"></div>
                    </div>
                  </div>
                </div>
                
                <div className="template-info">
                  <div className="template-header">
                    <h3 className="template-name">{template.name}</h3>
                    {selectedTemplate === template.id && (
                      <div className="selected-badge">Selected</div>
                    )}
                  </div>
                  <p className="template-description">{template.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Section */}
        <div className="action-section">
          <div className="generate-action">
            <button 
              className={`generate-btn ${isGenerating ? 'generating' : ''} ${isGenerated ? 'generated' : ''}`}
              onClick={handleGenerateResume}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <div className="spinner"></div>
                  Generating Resume...
                </>
              ) : isGenerated ? (
                <>
                  <span className="success-icon">✓</span>
                  Resume Generated!
                </>
              ) : (
                <>
                  <span className="generate-icon">✨</span>
                  Generate Resume
                </>
              )}
            </button>
          </div>

          {isGenerated && (
            <div className="download-section">
              <h3>Download Your Resume</h3>
              <div className="download-options">
                <button 
                  className="download-option pdf"
                  onClick={() => handleDownload('pdf')}
                >
                  <span className="format-icon">📄</span>
                  <span className="format-info">
                    <strong>PDF</strong>
                    <span>High Quality</span>
                  </span>
                </button>
                
                <button 
                  className="download-option docx"
                  onClick={() => handleDownload('docx')}
                >
                  <span className="format-icon">📝</span>
                  <span className="format-info">
                    <strong>DOCX</strong>
                    <span>Editable</span>
                  </span>
                </button>
                
                <button 
                  className="download-option txt"
                  onClick={() => handleDownload('txt')}
                >
                  <span className="format-icon">📃</span>
                  <span className="format-info">
                    <strong>TXT</strong>
                    <span>Plain Text</span>
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Preview Section */}
        <div className="preview-section">
          <div className="section-header">
            <h2>Live Preview</h2>
            <span className="preview-badge">Real-time</span>
          </div>
          
          <div className="preview-container">
            {isGenerated ? (
              <div className="resume-preview">
                <div className="preview-header" style={{ 
                  background: getTemplatePreview(selectedTemplate).backgroundColor 
                }}>
                  <div className="preview-personal">
                    <div className="preview-avatar"></div>
                    <div className="preview-name">John Doe</div>
                    <div className="preview-title">Software Developer</div>
                  </div>
                </div>
                
                <div className="preview-content">
                  <div className="preview-section">
                    <h4>Skills</h4>
                    <div className="preview-skills">
                      <span className="skill-tag">JavaScript</span>
                      <span className="skill-tag">React</span>
                      <span className="skill-tag">Node.js</span>
                      <span className="skill-tag">Python</span>
                    </div>
                  </div>
                  
                  <div className="preview-section">
                    <h4>Experience</h4>
                    <div className="preview-experience">
                      <div className="experience-item">
                        <strong>Senior Developer</strong>
                        <span>Tech Company • 2020-Present</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="preview-placeholder">
                <div className="placeholder-icon">👁️</div>
                <h3>Preview Available After Generation</h3>
                <p>Your resume preview will appear here once you generate it with your selected template.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;