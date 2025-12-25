import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ResumeProvider } from "./context/ResumeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ResumeProvider>
      <App />
    </ResumeProvider>
  </React.StrictMode>
);
