const API_URL = 'http://localhost:5000/api';

export const resumeService = {
  async uploadResume(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/resume/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return response.json();
  },

  async parseResume(fileId) {
    const response = await fetch(`${API_URL}/resume/parse/${fileId}`);
    
    if (!response.ok) {
      throw new Error('Parsing failed');
    }

    return response.json();
  },

  async generateResume(resumeData, template) {
    const response = await fetch(`${API_URL}/resume/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resumeData, template }),
    });

    if (!response.ok) {
      throw new Error('Generation failed');
    }

    return response.blob();
  },
};