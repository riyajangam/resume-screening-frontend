import React from 'react';
import ResumeEditor from '../components/ResumeEditor';
import ResumePreview from '../components/ResumePreview';
import TemplateSelector from '../components/TemplateSelector';
import './Edit.css';

const Edit = () => {
  return (
    <div className="edit-page">
      <div className="page-header">
        <h1>Edit Your Resume</h1>
        <p>Customize your resume information and choose a template</p>
      </div>

      <div className="edit-layout">
        <div className="edit-sidebar">
          <TemplateSelector />
        </div>

        <div className="edit-main">
          <div className="edit-section">
            <ResumeEditor />
          </div>
          
          <div className="preview-section">
            <ResumePreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;