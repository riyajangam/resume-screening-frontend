const API_URL = 'http://localhost:5000/api';

export const jobService = {
  async getJobRoles() {
    const response = await fetch(`${API_URL}/jobs/roles`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch job roles');
    }

    return response.json();
  },

  async getCompanies(jobRole) {
    const response = await fetch(`${API_URL}/jobs/companies?role=${jobRole}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch companies');
    }

    return response.json();
  },
};