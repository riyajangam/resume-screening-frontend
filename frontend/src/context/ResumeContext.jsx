import React, { createContext, useContext, useState } from 'react';

const ResumeContext = createContext();

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {},
    education: [],
    experience: [],
    skills: [],
    jobSelection: {},
    quizResults: []
  });

  const updateJobSelection = (jobData) => {
    setResumeData(prev => ({
      ...prev,
      jobSelection: jobData
    }));
  };

  const updateSkills = (skills) => {
    setResumeData(prev => ({
      ...prev,
      skills
    }));
  };

  const addQuizResult = (quizResult) => {
    setResumeData(prev => ({
      ...prev,
      quizResults: [...prev.quizResults, quizResult]
    }));
  };

  const value = {
    resumeData,
    updateJobSelection,
    updateSkills,
    addQuizResult
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};