import React from 'react';
import { useResume } from '../context/ResumeContext';
import './TemplateSelector.css';

const TemplateSelector = () => {
  const { selectedTemplate, setSelectedTemplate } = useResume();

  const templates = [
    { id: 'modern', name: 'Modern', description: 'Clean and professional design' },
    { id: 'classic', name: 'Classic', description: 'Traditional resume format' },
    { id: 'creative', name: 'Creative', description: 'Modern with creative elements' },
    { id: 'minimal', name: 'Minimal', description: 'Simple and concise layout' }
  ];

  return (
    <div className="template-selector">
      <h3>Choose a Template</h3>
      <div className="templates-grid">
        {templates.map(template => (
          <div
            key={template.id}
            className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <div className="template-preview">
              <div className="preview-placeholder">
                {template.name}
              </div>
            </div>
            <div className="template-info">
              <h4>{template.name}</h4>
              <p>{template.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;