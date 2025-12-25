import React, { useState } from "react";
import axios from "axios";
import { useResume } from "../context/ResumeContext";
import "./Upload.css";

const Upload = () => {
  const { setResumeData, resumeData, setResumeError } = useResume();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [stage, setStage] = useState("idle"); 
  // idle | uploading | analyzing | complete

  const handleUpload = async () => {
    if (!name || !email) {
      setResumeError("Please enter name and email");
      return;
    }
    if (!file) {
      setResumeError("Please upload a resume");
      return;
    }

    try {
      setStage("uploading");

      const formData = new FormData();
      formData.append("resume", file);
      formData.append("name", name);
      formData.append("email", email);

      const res = await axios.post(
        "http://localhost:5000/resume/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (!res.data.valid) {
        setResumeError("Invalid resume file");
        setStage("idle");
        return;
      }

      setStage("analyzing");
      setResumeData(res.data);

      setTimeout(() => setStage("complete"), 800);
    } catch (err) {
      console.error(err);
      setResumeError("Resume upload failed");
      setStage("idle");
    }
  };

  return (
    <div className="upload-page-bg">
      <div className="upload-card">

        {/* ===================== INITIAL UPLOAD UI ===================== */}
        {stage === "idle" && (
          <>
            <h2 className="upload-title">Upload Resume</h2>
            <p className="upload-subtitle">
              Supported formats: PDF, DOC, DOCX, TXT (Max 5MB)
            </p>

            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="drop-box">
              <label>
                <input
                  type="file"
                  hidden
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <span>Choose File or Drag & Drop</span>
                <span>We’ll analyze your skills</span>
              </label>
              {file && <div className="file-name">{file.name}</div>}
            </div>

            <button className="upload-btn" onClick={handleUpload}>
              Upload Resume
            </button>

            <div className="features">
              <div>Secure Cloud Storage</div>
              <div>AI Skill Analysis</div>
              <div>Smart Job Matching</div>
              <div>Progress Tracking</div>
            </div>
          </>
        )}

        {/* ===================== PARSING RESULT UI ===================== */}
        {stage === "complete" && resumeData && (
          <>
            <div className="success-banner">
              Analysis Completed Successfully!
            </div>

            <div className="analysis-summary">
              <div>
                <h4>Resume Securely Stored</h4>
                <p>File Name: {resumeData.file_name}</p>
                <p>Education: {resumeData.education}</p>
              </div>
              <div className="score-text">
                <strong>{resumeData.scores.final}%</strong>
              </div>
            </div>

            <div className="result-grid">
              <div className="result-box">
                <h4>Technical Skills</h4>
                {resumeData.skills.map((s, i) => (
                  <span key={i} className="skill-chip">{s}</span>
                ))}
              </div>

              <div className="result-box">
                <h4>Soft Skills</h4>
                {resumeData.soft_skills.map((s, i) => (
                  <span key={i} className="skill-chip">{s}</span>
                ))}
              </div>
            </div>

            <div className="result-box">
              <h4>Score Breakdown</h4>
              <p>Skills Match: {resumeData.scores.skills}%</p>
              <p>Experience: {resumeData.scores.experience}%</p>
              <p>Content Quality: {resumeData.scores.content}%</p>
            </div>

            <div className="result-box">
              <h4>Top Job Matches</h4>
              {resumeData.job_matches.map((job, i) => (
                <p key={i}>
                  {job.title} — <strong>{job.score}%</strong>
                </p>
              ))}
            </div>

            <div style={{ marginTop: "16px" }}>
              <button className="upload-btn">
                Continue to Job Selection
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Upload;
