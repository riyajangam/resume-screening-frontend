from flask import Flask, request, jsonify
from flask_cors import CORS
import PyPDF2
from docx import Document
import re

app = Flask(__name__)
CORS(app)

class SimpleSkillExtractor:
    def __init__(self):
        self.technical_skills = [
            'javascript', 'python', 'java', 'c++', 'react', 'angular', 'vue', 'node.js',
            'html', 'css', 'sql', 'mongodb', 'postgresql', 'aws', 'docker', 'kubernetes',
            'git', 'jenkins', 'linux', 'rest api', 'graphql', 'typescript', 'php', 'ruby',
            'go', 'rust', 'swift', 'kotlin', 'machine learning', 'ai', 'data analysis',
            'tableau', 'power bi'
        ]
        
        self.soft_skills = [
            'communication', 'teamwork', 'leadership', 'problem solving', 'critical thinking',
            'time management', 'adaptability', 'creativity', 'collaboration'
        ]

    def extract_skills(self, text):
        text_lower = text.lower()
        
        technical_found = []
        soft_found = []
        
        for skill in self.technical_skills:
            if skill in text_lower:
                technical_found.append(skill.title())
        
        for skill in self.soft_skills:
            if skill in text_lower:
                soft_found.append(skill.title())
        
        return {
            'technical': list(set(technical_found)),
            'soft': list(set(soft_found))
        }

class SimpleResumeParser:
    def parse_resume(self, text):
        experience_level = self.extract_experience_level(text)
        education = self.extract_education(text)
        achievements = self.extract_achievements(text)
        
        return {
            'experience_level': experience_level,
            'education': education,
            'achievements': achievements
        }

    def extract_experience_level(self, text):
        text_lower = text.lower()
        
        if any(word in text_lower for word in ['senior', 'lead', 'principal', 'manager', '5+', '5 years']):
            return 'Senior (5+ years)'
        elif any(word in text_lower for word in ['mid-level', 'mid level', '3 years', '4 years']):
            return 'Mid-Level (3-5 years)'
        elif any(word in text_lower for word in ['junior', 'entry', 'fresher', '0-2', '1 year', '2 years']):
            return 'Junior (0-2 years)'
        else:
            return 'Not specified'

    def extract_education(self, text):
        education = []
        degree_patterns = [
            r'bachelor[^.]*?(?:of|in)?\s*([a-zA-Z\s]+)',
            r'master[^.]*?(?:of|in)?\s*([a-zA-Z\s]+)',
            r'phd[^.]*?(?:of|in)?\s*([a-zA-Z\s]+)',
            r'b\.?s\.?c?', r'm\.?s\.?c?', r'b\.?tech', r'm\.?tech'
        ]
        
        for pattern in degree_patterns:
            matches = re.finditer(pattern, text, re.IGNORECASE)
            for match in matches:
                edu = match.group().strip()
                if len(edu) > 3:
                    education.append(edu.title())
        
        return list(set(education)) if education else ['Bachelor\'s Degree']

    def extract_achievements(self, text):
        achievements = []
        sentences = re.split(r'[.!?]+', text)
        
        achievement_keywords = ['achieved', 'led', 'managed', 'improved', 'increased', 
                               'reduced', 'developed', 'created', 'implemented']
        
        for sentence in sentences:
            if any(keyword in sentence.lower() for keyword in achievement_keywords):
                achievement = sentence.strip()
                if len(achievement) > 10:
                    achievements.append(achievement)
        
        return achievements[:3]

def extract_text_from_file(file):
    filename = file.filename.lower()
    
    if filename.endswith('.pdf'):
        return extract_text_from_pdf(file)
    elif filename.endswith(('.doc', '.docx')):
        return extract_text_from_docx(file)
    elif filename.endswith('.txt'):
        return file.read().decode('utf-8')
    else:
        raise ValueError("Unsupported file format")

def extract_text_from_pdf(file):
    try:
        pdf_reader = PyPDF2.PdfReader(file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        raise Exception(f"Error reading PDF: {str(e)}")

def extract_text_from_docx(file):
    try:
        doc = Document(file)
        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"
        return text
    except Exception as e:
        raise Exception(f"Error reading DOCX: {str(e)}")

skill_extractor = SimpleSkillExtractor()
resume_parser = SimpleResumeParser()

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Resume Analysis API is running'})

@app.route('/api/comprehensive-analysis', methods=['POST'])
def comprehensive_analysis():
    try:
        if 'resume' not in request.files:
            return jsonify({'error': 'No resume file provided'}), 400
        
        resume_file = request.files['resume']
        
        if resume_file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        resume_text = extract_text_from_file(resume_file)
        
        if not resume_text.strip():
            return jsonify({'error': 'Could not extract text from the resume file'}), 400
        
        skills = skill_extractor.extract_skills(resume_text)
        parsed_data = resume_parser.parse_resume(resume_text)
        job_matches = generate_job_matches(skills)
        overall_score = calculate_overall_score(skills, parsed_data)
        
        return jsonify({
            'skills': skills,
            'job_matches': job_matches,
            'parsed_data': parsed_data,
            'overall_score': overall_score,
            'feedback': 'Resume analysis completed successfully!',
            'text_extracted': len(resume_text)
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def generate_job_matches(skills):
    jobs = {
        'Frontend Developer': ['javascript', 'react', 'html', 'css', 'angular', 'vue'],
        'Backend Developer': ['python', 'java', 'node.js', 'sql', 'mongodb', 'postgresql'],
        'Full Stack Developer': ['javascript', 'python', 'react', 'node.js', 'sql', 'html'],
        'Data Scientist': ['python', 'machine learning', 'data analysis', 'sql', 'pandas'],
        'DevOps Engineer': ['aws', 'docker', 'kubernetes', 'linux', 'jenkins', 'git']
    }
    
    matches = []
    technical_skills_lower = [s.lower() for s in skills['technical']]
    
    for job, required_skills in jobs.items():
        matched_skills = [skill for skill in required_skills if skill in technical_skills_lower]
        match_score = min(len(matched_skills) / len(required_skills) * 100, 100)
        
        matches.append({
            'title': job,
            'match_score': round(match_score),
            'match_level': 'high' if match_score >= 70 else 'medium' if match_score >= 50 else 'low'
        })
    
    matches.sort(key=lambda x: x['match_score'], reverse=True)
    return matches[:5]

def calculate_overall_score(skills, parsed_data):
    base_score = 50
    skills_score = min(len(skills['technical']) * 3 + len(skills['soft']) * 2, 30)
    experience_score = 10 if parsed_data['experience_level'] != 'Not specified' else 0
    education_score = min(len(parsed_data['education']) * 5, 10)
    
    return min(base_score + skills_score + experience_score + education_score, 100)

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
