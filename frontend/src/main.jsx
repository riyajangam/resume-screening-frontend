import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { ResumeProvider } from './context/ResumeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ResumeProvider>
        <App />
      </ResumeProvider>
    </AuthProvider>
  </React.StrictMode>,
)