import React, { useState } from 'react';
import './UploadForm.css';

const UploadForm = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

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
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type === 'application/pdf' || 
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      setSelectedFile(file);
    } else {
      alert('Please upload a PDF or DOCX file');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  };
  console.log("handle------------------------->",handleSubmit)

  return (
    <div className="upload-form">
      <form 
        className={`upload-area ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onSubmit={handleSubmit}
      >
        <input
          type="file"
          id="file-upload"
          accept=".pdf,.docx"
          onChange={handleChange}
          className="file-input"
        />
        <label htmlFor="file-upload" className="upload-label">
          <div className="upload-icon">📄</div>
          <p>Drag & drop your resume here or click to browse</p>
          <p className="upload-hint">Supports PDF and DOCX files</p>
        </label>
        
        {selectedFile && (
          <div className="selected-file">
            <p>Selected: {selectedFile.name}</p>
            <button type="submit" className="upload-button">
              Upload Resume
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadForm;