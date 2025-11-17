const API_URL = 'http://localhost:5000/api';

export const skillService = {
  async getSkills() {
    const response = await fetch(`${API_URL}/skills`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch skills');
    }

    return response.json();
  },

  async getQuiz(skill) {
    const response = await fetch(`${API_URL}/skills/quiz?skill=${skill}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch quiz');
    }

    return response.json();
  },

  async submitQuiz(answers) {
    const response = await fetch(`${API_URL}/skills/evaluate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers }),
    });

    if (!response.ok) {
      throw new Error('Evaluation failed');
    }

    return response.json();
  },
};