import React, { createContext, useContext, useState } from "react";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(null);
  const [resumeError, setResumeError] = useState("");

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        resumeError,
        setResumeError,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
