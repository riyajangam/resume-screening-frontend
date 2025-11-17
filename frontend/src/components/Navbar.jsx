import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const checkAuthStatus = () => {
  try {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = checkAuthStatus();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('resumeAnalysis');
    localStorage.removeItem('userJobSelection');
    navigate('/');
    window.location.reload();
  };

  const handleLogoClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div onClick={handleLogoClick} className="nav-logo" style={{cursor: 'pointer'}}>
          <span className="logo-icon">🚀</span>
          <span className="logo-text">CareerBuilder</span>
        </div>
        
        <div className="nav-menu">
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className={`nav-link ${isActiveRoute('/dashboard') ? 'active' : ''}`}
              >
                <span className="nav-icon">🏠</span>
                <span className="nav-label">Dashboard</span>
              </Link>
              <Link 
                to="/upload" 
                className={`nav-link ${isActiveRoute('/upload') ? 'active' : ''}`}
              >
                <span className="nav-icon">📄</span>
                <span className="nav-label">Upload Resume</span>
              </Link>
              <Link 
                to="/job-selection" 
                className={`nav-link ${isActiveRoute('/job-selection') ? 'active' : ''}`}
              >
                <span className="nav-icon">💼</span>
                <span className="nav-label">Job Selection</span>
              </Link>
              <Link 
                to="/skill-selection" 
                className={`nav-link ${isActiveRoute('/skill-selection') ? 'active' : ''}`}
              >
                <span className="nav-icon">🛠️</span>
                <span className="nav-label">Skill Assessment</span>
              </Link>
              <Link 
                to="/profile" 
                className={`nav-link ${isActiveRoute('/profile') ? 'active' : ''}`}
              >
                <span className="nav-icon">👤</span>
                <span className="nav-label">Profile</span>
              </Link>
              <button onClick={handleLogout} className="nav-logout">
                <span className="nav-icon">🚪</span>
                <span className="nav-label">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/" 
                className={`nav-link ${isActiveRoute('/') ? 'active' : ''}`}
              >
                <span className="nav-icon">🏠</span>
                <span className="nav-label">Home</span>
              </Link>
              <Link 
                to="/login" 
                className={`nav-link ${isActiveRoute('/login') ? 'active' : ''}`}
              >
                <span className="nav-icon">🔐</span>
                <span className="nav-label">Login</span>
              </Link>
              <Link 
                to="/register" 
                className={`nav-link ${isActiveRoute('/register') ? 'active' : ''}`}
              >
                <span className="nav-icon">👤</span>
                <span className="nav-label">Sign Up</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;