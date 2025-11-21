const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  // Upload resume
  static async uploadResume(file, userData) {
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('email', userData.email);
    formData.append('name', userData.name);

    const response = await fetch(`${API_BASE_URL}/upload-resume`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload resume');
    }

    return response.json();
  }

  // Get resume
  static async getResume(userId) {
    const response = await fetch(`${API_BASE_URL}/resume/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to get resume');
    }
    return response.blob();
  }

  // Save assessment result
  static async saveAssessmentResult(assessmentData) {
    const response = await fetch(`${API_BASE_URL}/save-assessment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assessmentData),
    });

    if (!response.ok) {
      throw new Error('Failed to save assessment result');
    }

    return response.json();
  }

  // Get user assessment results
  static async getAssessmentResults(userId) {
    const response = await fetch(`${API_BASE_URL}/assessment-results/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to get assessment results');
    }
    return response.json();
  }

  // Get user by email
  static async getUserByEmail(email) {
    const response = await fetch(`${API_BASE_URL}/user/${email}`);
    if (!response.ok) {
      return null; // User doesn't exist
    }
    return response.json();
  }

  // Create or get user
  static async createOrGetUser(userData) {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to create/get user');
    }

    return response.json();
  }
}

export default ApiService;