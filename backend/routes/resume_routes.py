from flask import Blueprint, request, jsonify
from utils.resume_parser import parse_resume_text

resume_bp = Blueprint("resume", __name__)
print("resume_bp-------------------->",resume_bp)

@resume_bp.route("/upload", methods=["POST"])
def upload_resume():
    print("working function------------------>")
    file = request.files.get("resume")

    if not file:
        return jsonify({"valid": False, "message": "No file uploaded"})

    text = file.read().decode(errors="ignore")
    parsed = parse_resume_text(text)

    if not parsed["is_valid_resume"]:
        return jsonify({
            "valid": False,
            "message": "Invalid resume format"
        })

    skill_count = len(parsed["skills"])

    # ðŸ“Š Accurate scoring logic
    skill_score = min((skill_count / 6) * 50, 50)
    education_score = 20 if parsed["education_found"] else 0
    experience_score = 20 if parsed["experience_found"] else 0
    structure_score = 10 if skill_count >= 4 else 5

    final_score = round(
        skill_score + education_score + experience_score + structure_score
    )

    return jsonify({
        "valid": True,
        "skills": parsed["skills"],
        "scores": {
            "final": final_score,
            "skills": round(skill_score),
            "experience": experience_score,
            "content": structure_score + education_score
        }
    })

# backend/routes/resume_routes.py




# backend/routes/resume_routes.py
# from flask import Blueprint, request, jsonify
# import os
# import re  # ADD THIS IMPORT
# from werkzeug.utils import secure_filename
# from datetime import datetime
# import uuid

# from utils.resume_parser import ResumeParser
# from utils.skill_extractor import SkillExtractor
# from utils.skill_database import ALL_SKILLS  # ADD THIS IMPORT

# # Initialize components
# resume_parser = ResumeParser()
# skill_extractor = SkillExtractor()

# resume_bp = Blueprint('resume', __name__)

# # Configuration
# ALLOWED_EXTENSIONS = {'pdf', 'docx', 'doc', 'txt'}
# MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB
# UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), '..', 'uploads', 'resumes')

# # Ensure upload directory exists
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# def allowed_file(filename):
#     return '.' in filename and \
#            filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# def _extract_name(text):
#     """Extract name from resume text"""
#     # Look for name patterns (usually at the beginning)
#     lines = text.strip().split('\n')
#     for i, line in enumerate(lines[:10]):  # Check first 10 lines
#         line = line.strip()
#         # Common name pattern: First Last or First M. Last
#         if re.match(r'^[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+$', line):
#             # Check it's not a section header or other text
#             if len(line) < 50 and not any(word in line.lower() for word in 
#                                          ['email', 'phone', 'linkedin', 'github', 'resume', 'cv']):
#                 return line
    
#     # Alternative: Look for the largest font text (often name is biggest)
#     return ""

# def _extract_email(text):
#     """Extract email from text"""
#     email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
#     matches = re.findall(email_pattern, text)
#     return matches[0] if matches else ""

# def _extract_phone(text):
#     """Extract phone number from text"""
#     phone_patterns = [
#         r'\+\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}',
#         r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}',
#         r'\d{3}[-.\s]?\d{3}[-.\s]?\d{4}'
#     ]
    
#     for pattern in phone_patterns:
#         matches = re.findall(pattern, text)
#         if matches:
#             return matches[0]
#     return ""

# @resume_bp.route('/upload', methods=['POST'])
# def upload_resume():
#     """
#     Handle resume upload and return JSON response with extracted data
#     """
#     try:
#         # Check if file is present
#         if 'resume' not in request.files:
#             return jsonify({
#                 "success": False,
#                 "error": "No file provided",
#                 "message": "Please select a resume file to upload"
#             }), 400
        
#         file = request.files['resume']
        
#         # Check if file is selected
#         if file.filename == '':
#             return jsonify({
#                 "success": False,
#                 "error": "No file selected",
#                 "message": "Please select a resume file"
#             }), 400
        
#         # Validate file
#         if not allowed_file(file.filename):
#             return jsonify({
#                 "success": False,
#                 "error": "Invalid file type",
#                 "message": f"Supported formats: {', '.join(ALLOWED_EXTENSIONS)}"
#             }), 400
        
#         # Check file size
#         file.seek(0, 2)  # Seek to end
#         file_size = file.tell()
#         file.seek(0)  # Reset pointer
        
#         if file_size > MAX_FILE_SIZE:
#             return jsonify({
#                 "success": False,
#                 "error": "File too large",
#                 "message": f"Maximum file size is {MAX_FILE_SIZE // (1024*1024)}MB"
#             }), 400
        
#         # Generate unique filename
#         original_filename = secure_filename(file.filename)
#         file_ext = os.path.splitext(original_filename)[1]
#         unique_filename = f"{uuid.uuid4().hex}{file_ext}"
#         file_path = os.path.join(UPLOAD_FOLDER, unique_filename)
        
#         # Save file
#         file.save(file_path)
        
#         # Extract text from resume
#         print(f"Processing resume: {original_filename}")
#         extracted_text = resume_parser.extract_text(file_path)
        
#         if not extracted_text or len(extracted_text.strip()) < 50:
#             return jsonify({
#                 "success": False,
#                 "error": "Text extraction failed",
#                 "message": "Could not extract sufficient text from the resume. Please ensure the file is not scanned or corrupted."
#             }), 400
        
#         # Extract sections
#         sections = resume_parser.extract_sections(extracted_text)
        
#         # Combine text for skill extraction (prioritize skills section)
#         all_text = extracted_text
#         if sections.get('skills'):
#             all_text = sections['skills'] + " " + extracted_text
        
#         # Extract skills
#         print("Extracting skills...")
#         skill_result = skill_extractor.extract_skills(all_text)
        
#         # Fallback if no skills found
#         if skill_result['count'] == 0:
#             # Try with just skills section
#             if sections.get('skills'):
#                 skill_result = skill_extractor.extract_skills(sections['skills'])
            
#             # If still no skills, try basic keyword matching
#             if skill_result['count'] == 0:
#                 words = re.findall(r'\b[\w+#.-]+\b', extracted_text.lower())
#                 found_skills = []
#                 for word in words:
#                     if word in ALL_SKILLS and word.title() not in found_skills:
#                         found_skills.append(word.title())
                
#                 if found_skills:
#                     skill_result = {
#                         "skills": sorted(found_skills),
#                         "categories": {"extracted": found_skills},
#                         "count": len(found_skills)
#                     }
        
#         # Extract metadata
#         metadata = {
#             "name": _extract_name(extracted_text),
#             "email": _extract_email(extracted_text),
#             "phone": _extract_phone(extracted_text)
#         }
        
#         # Prepare the JSON response
#         response_data = {
#             "success": True,
#             "message": "Resume processed successfully",
#             "data": {
#                 "filename": original_filename,
#                 "file_id": unique_filename,
#                 "upload_date": datetime.utcnow().isoformat() + "Z",
#                 "text_length": len(extracted_text),
#                 "sections_found": [key for key, value in sections.items() if value.strip()],
#                 "skills": skill_result,
#                 "metadata": metadata
#             }
#         }
        
#         print(f"Extracted {skill_result['count']} skills from resume")
        
#         return jsonify(response_data), 200
        
#     except Exception as e:
#         print(f"Error processing resume: {str(e)}")
#         import traceback
#         traceback.print_exc()
        
#         return jsonify({
#             "success": False,
#             "error": "Processing error",
#             "message": f"An error occurred while processing the resume: {str(e)}"
#         }), 500

# @resume_bp.route('/test-response', methods=['GET'])
# def test_response():
#     """
#     Test endpoint to see the JSON structure
#     """
#     test_data = {
#         "success": True,
#         "message": "Resume processed successfully",
#         "data": {
#             "filename": "john_doe_resume.pdf",
#             "file_id": "a1b2c3d4e5f6.pdf",
#             "upload_date": "2024-01-15T10:30:00.000Z",
#             "text_length": 1250,
#             "sections_found": ["education", "experience", "skills", "projects"],
#             "skills": {
#                 "skills": [
#                     "Python",
#                     "JavaScript",
#                     "React",
#                     "Node.js",
#                     "MongoDB",
#                     "AWS",
#                     "Docker",
#                     "Git",
#                     "REST API",
#                     "Agile"
#                 ],
#                 "categories": {
#                     "programming": ["Python", "JavaScript"],
#                     "web": ["React", "Node.js", "REST API"],
#                     "database": ["MongoDB"],
#                     "cloud_devops": ["AWS", "Docker"],
#                     "soft_skills": ["Git", "Agile"]
#                 },
#                 "count": 10
#             },
#             "metadata": {
#                 "name": "John Doe",
#                 "email": "john.doe@email.com",
#                 "phone": "+1 (123) 456-7890"
#             }
#         }
#     }
#     return jsonify(test_data), 200





# routes/resume_routes.py - Simplified version
# import os
# import uuid
# import logging
# from flask import Blueprint, request, jsonify, current_app
# from werkzeug.utils import secure_filename
# from datetime import datetime
# import traceback

# logger = logging.getLogger(__name__)

# resume_bp = Blueprint('resume', __name__)

# def allowed_file(filename):
#     """Check if file extension is allowed"""
#     return '.' in filename and \
#            filename.rsplit('.', 1)[1].lower() in current_app.config['ALLOWED_EXTENSIONS']

# # Simple text extraction functions (no external dependencies for now)
# def extract_text_from_file(file_path):
#     """Extract text from file - simplified version"""
#     try:
#         if file_path.endswith('.txt'):
#             with open(file_path, 'r', encoding='utf-8') as f:
#                 return f.read()
#         else:
#             # For PDF/DOCX, return placeholder text
#             return "This is a placeholder text for PDF/DOCX files. Install PyPDF2 and python-docx for full support."
#     except Exception as e:
#         logger.error(f"Error reading file: {e}")
#         return ""

# # Simple skill extraction (no spaCy for now)
# def extract_skills_simple(text):
#     """Simple skill extraction without spaCy"""
#     # Common skills to look for
#     common_skills = [
#         'python', 'javascript', 'java', 'html', 'css', 'react', 'angular',
#         'vue', 'node', 'flask', 'django', 'mysql', 'mongodb', 'aws',
#         'docker', 'git', 'linux', 'agile', 'scrum', 'rest api'
#     ]
    
#     found_skills = []
#     text_lower = text.lower()
    
#     for skill in common_skills:
#         if skill in text_lower:
#             found_skills.append(skill.title())
    
#     return found_skills

# @resume_bp.route('/upload', methods=['POST'])
# def upload_resume():
#     """
#     Handle resume file upload - simplified version
#     """
#     try:
#         logger.info("Resume upload request received")
        
#         # Check if file is present
#         if 'file' not in request.files:
#             return jsonify({
#                 'success': False,
#                 'message': 'No file uploaded'
#             }), 400
        
#         file = request.files['file']
        
#         if file.filename == '':
#             return jsonify({
#                 'success': False,
#                 'message': 'No file selected'
#             }), 400
        
#         # Validate file
#         if not allowed_file(file.filename):
#             return jsonify({
#                 'success': False,
#                 'message': 'Invalid file type. Allowed: PDF, DOCX, DOC, TXT'
#             }), 400
        
#         # Get user data
#         full_name = request.form.get('fullName', '').strip()
#         email = request.form.get('email', '').strip()
        
#         # Generate unique filename
#         original_filename = secure_filename(file.filename)
#         file_extension = original_filename.rsplit('.', 1)[1].lower()
#         unique_filename = f"{uuid.uuid4().hex}.{file_extension}"
        
#         # Save file
#         upload_folder = current_app.config['UPLOAD_FOLDER']
#         file_path = os.path.join(upload_folder, unique_filename)
#         os.makedirs(upload_folder, exist_ok=True)
        
#         file.save(file_path)
#         logger.info(f"File saved to: {file_path}")
        
#         # Extract text
#         extracted_text = extract_text_from_file(file_path)
        
#         if not extracted_text or len(extracted_text.strip()) < 10:
#             return jsonify({
#                 'success': False,
#                 'message': 'Could not extract meaningful text from file'
#             }), 400
        
#         # Extract skills (simple version)
#         skills = extract_skills_simple(extracted_text)
        
#         # Prepare response
#         response = {
#             'success': True,
#             'message': 'Resume uploaded successfully',
#             'data': {
#                 'resumeId': str(uuid.uuid4()),
#                 'filename': original_filename,
#                 'fullName': full_name,
#                 'email': email,
#                 'uploadDate': datetime.now().isoformat(),
#                 'skills': {
#                     'count': len(skills),
#                     'list': skills
#                 },
#                 'textPreview': extracted_text[:200] + '...' if len(extracted_text) > 200 else extracted_text
#             }
#         }
        
#         logger.info(f"Processed resume for {full_name}. Found {len(skills)} skills.")
#         return jsonify(response), 200
        
#     except Exception as e:
#         logger.error(f"Error: {str(e)}")
#         logger.error(traceback.format_exc())
#         return jsonify({
#             'success': False,
#             'message': 'Internal server error',
#             'error': str(e)
#         }), 500

# @resume_bp.route('/test', methods=['GET'])
# def test_endpoint():
#     """Test endpoint"""
#     return jsonify({
#         'success': True,
#         'message': 'Resume routes are working',
#         'endpoints': {
#             'upload': '/api/resume/upload (POST)',
#             'test': '/api/resume/test (GET)'
#         }
#     })







def _get_missing_skills(found_skills):  # REMOVED 'self' parameter
    """Get recommended skills that are missing"""
    if not found_skills:
        return ['Python', 'Git', 'SQL']
    
    # Common important skills
    important_skills = ['Git', 'Docker', 'AWS', 'SQL', 'REST API']
    found_lower = [s.lower() for s in found_skills]
    
    missing = []
    for skill in important_skills:
        if skill.lower() not in found_lower:
            missing.append(skill)
    
    return missing[:3]

def _suggest_roles(skills):  # REMOVED 'self' parameter
    """Suggest roles based on skills"""
    if not skills:
        return ['Junior Developer', 'Entry-level Position']
    
    skill_count = len(skills)
    
    role_map = [
        (3, ['Junior Developer', 'Intern']),
        (6, ['Software Developer', 'Web Developer']),
        (10, ['Full Stack Developer', 'Backend Engineer', 'Frontend Developer']),
        (15, ['Senior Developer', 'Tech Lead', 'DevOps Engineer']),
        (20, ['Principal Engineer', 'Architect', 'Engineering Manager'])
    ]
    
    for threshold, roles in role_map:
        if skill_count <= threshold:
            return roles
    
    return ['Expert Developer', 'Technical Architect']