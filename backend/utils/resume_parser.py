# resume_parser.py

import re
import docx
import PyPDF2
from io import BytesIO

# ---------------------------------------------------------
# TEXT EXTRACTION FROM PDF / DOCX
# ---------------------------------------------------------

def extract_text_from_file(file):
    """
    Extract text from PDF or DOCX.
    Accepts:
      - FileStorage object (from Flask)
      - File handle opened as rb
    """

    # Handle FileStorage
    filename = getattr(file, "filename", None)

    # If FileStorage
    if filename:
        ext = filename.lower().split('.')[-1]
    else:
        # If it's a file object without filename (rb)
        ext = "pdf"  # assume PDF fallback

    try:
        # Reset pointer if possible
        try:
            file.seek(0)
        except:
            pass

        # -------------------------------------------------
        # PDF Extraction
        # -------------------------------------------------
        if ext == "pdf":
            try:
                reader = PyPDF2.PdfReader(file)
                text_content = ""

                for page in reader.pages:
                    t = page.extract_text()
                    if t:
                        text_content += t + "\n"

                return text_content
            except Exception as e:
                print("PDF extraction error:", e)
                return ""

        # -------------------------------------------------
        # DOCX Extraction
        # -------------------------------------------------
        elif ext in ["docx", "doc"]:
            try:
                # If file is FileStorage, convert to bytes first
                if hasattr(file, "read"):
                    data = file.read()
                    file = BytesIO(data)

                doc = docx.Document(file)
                text = "\n".join([p.text for p in doc.paragraphs])
                return text

            except Exception as e:
                print("DOCX extraction error:", e)
                return ""

        # -------------------------------------------------
        # UNKNOWN FORMAT
        # -------------------------------------------------
        else:
            return ""

    except Exception as e:
        print("extract_text_from_file ERROR:", str(e))
        return ""


# ---------------------------------------------------------
# SKILL EXTRACTOR
# ---------------------------------------------------------

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
            'soft': list(set(soft_found)),
            'tools': ['VS Code', 'Git', 'Postman', 'Figma'],
            'languages': list(set([
                s for s in technical_found
                if s.lower() in ['python', 'java', 'javascript', 'c++', 'typescript']
            ]))
        }


# ---------------------------------------------------------
# RESUME PARSER
# ---------------------------------------------------------

class SimpleResumeParser:

    def parse_resume(self, text):
        return {
            'experience_level': self.extract_experience_level(text),
            'education': self.extract_education(text),
            'achievements': self.extract_achievements(text),
            'personal_info': self.extract_personal_info(text)
        }

    def extract_experience_level(self, text):
        text_lower = text.lower()

        if any(word in text_lower for word in
               ['senior', 'lead', 'principal', 'manager', '5+', '6 years', '7 years',
                '8 years', '9 years', '10+', '5 years']):
            return 'Senior (5+ years)'

        elif any(word in text_lower for word in
                 ['mid-level', 'mid level', '3 years', '4 years', '3-5', '4-6']):
            return 'Mid-Level (3-5 years)'

        elif any(word in text_lower for word in
                 ['junior', 'entry', 'fresher', '0-2', '1 year', '2 years']):
            return 'Junior (0-2 years)'

        else:
            return 'Not specified'

    def extract_education(self, text):
        education = []
        degree_patterns = [
            r'bachelor[^.]*?(?:of|in)?\s*[a-zA-Z\s]+',
            r'master[^.]*?(?:of|in)?\s*[a-zA-Z\s]+',
            r'phd[^.]*?(?:of|in)?\s*[a-zA-Z\s]+',
            r'b\.?s\.?c?', r'm\.?s\.?c?', r'b\.?tech', r'm\.?tech'
        ]

        for pattern in degree_patterns:
            matches = re.findall(pattern, text, flags=re.IGNORECASE)
            for match in matches:
                education.append({
                    'degree': match.strip().title(),
                    'institution': 'University',
                    'year': '2020'
                })

        if not education:
            return [{
                'degree': "Bachelor's Degree",
                'institution': 'University',
                'year': '2020'
            }]

        return education

    def extract_achievements(self, text):
        achievements = []

        sentences = re.split(r'[.!?]+', text)
        keywords = ['achieved', 'led', 'managed', 'improved', 'increased',
                    'reduced', 'developed', 'created', 'implemented']

        for s in sentences:
            if any(k in s.lower() for k in keywords):
                s = s.strip()
                if len(s) > 10:
                    achievements.append(s)

        return achievements[:3]

    def extract_personal_info(self, text):
        # Email
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        emails = re.findall(email_pattern, text)

        # Phone
        phone_pattern = r'(\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}'
        phones = re.findall(phone_pattern, text)

        # Name (first line text)
        lines = [ln.strip() for ln in text.split("\n") if ln.strip()]
        name = lines[0] if lines else "Unknown"

        return {
            'name': name,
            'email': emails[0] if emails else '',
            'phone': phones[0] if phones else '',
            'location': '',
            'linkedin': ''
        }
