import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Upload from './pages/Upload';
import JobSelection from './pages/JobSelection';
import SkillSelection from './pages/SkillSelection';
import Generate from './pages/Generate';
import QuizPage from './pages/QuizPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Landing from './pages/Landing';
import './styles/index.css';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = () => {
    try {
      const userData = localStorage.getItem('user');
      return !!userData;
    } catch {
      return false;
    }
  };

  return isAuthenticated() ? children : <Navigate to="/login" />;
};

// Public Route component (redirect to dashboard if already authenticated)
const PublicRoute = ({ children }) => {
  const isAuthenticated = () => {
    try {
      const userData = localStorage.getItem('user');
      return !!userData;
    } catch {
      return false;
    }
  };

  return !isAuthenticated() ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={
            <PublicRoute>
              <Landing />
            </PublicRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />

          {/* Protected routes - only accessible after login */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/upload" element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          } />
          <Route path="/job-selection" element={
            <ProtectedRoute>
              <JobSelection />
            </ProtectedRoute>
          } />
          <Route path="/skill-selection" element={
            <ProtectedRoute>
              <SkillSelection />
            </ProtectedRoute>
          } />
          <Route path="/generate" element={
            <ProtectedRoute>
              <Generate />
            </ProtectedRoute>
          } />
          <Route path="/quiz" element={
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          {/* Redirect all other routes appropriately */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;