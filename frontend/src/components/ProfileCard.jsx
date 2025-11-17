import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './ProfileCard.css';

const ProfileCard = ({ editable = false }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    location: ''
  });

  const handleSave = () => {
    // Save profile data
    setIsEditing(false);
  };

  if (!user) {
    return <div>Please log in to view profile</div>;
  }

  return (
    <div className="profile-card">
      <div className="profile-header">
        <h2>Profile Information</h2>
        {editable && (
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="edit-button"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
        )}
      </div>

      <div className="profile-content">
        {isEditing ? (
          <div className="profile-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={profileData.location}
                onChange={(e) => setProfileData({...profileData, location: e.target.value})}
              />
            </div>
          </div>
        ) : (
          <div className="profile-info">
            <div className="info-item">
              <strong>Name:</strong> {profileData.name}
            </div>
            <div className="info-item">
              <strong>Email:</strong> {profileData.email}
            </div>
            <div className="info-item">
              <strong>Phone:</strong> {profileData.phone || 'Not provided'}
            </div>
            <div className="info-item">
              <strong>Location:</strong> {profileData.location || 'Not provided'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;