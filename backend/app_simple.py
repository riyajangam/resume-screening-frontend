# app_simple.py

import os
import uuid
import json
import traceback
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory, current_app
from flask_cors import CORS
from werkzeug.utils import secure_filename

# MongoDB Models
from models import ResumeModel, UserModel, AnalysisSessionModel

# Resume Parser + skills
from utils.resume_parser import extract_text_from_file, SimpleSkillExtractor, SimpleResumeParser

# ---------------------------------------------------------
# CSV Support
# ---------------------------------------------------------
import csv

def append_to_csv(csv_path, data):
    """Append a row to CSV; create file if missing."""
    file_exists = os.path.isfile(csv_path)

    os.makedirs(os.path.dirname(csv_path), exist_ok=True)

    with open(csv_path, "a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=data.keys())

        if not file_exists:
            writer.writeheader()

        writer.writerow(data)


# ---------------------------------------------------------
# Flask App
# ---------------------------------------------------------
app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Resume upload folder
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads", "resumes")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = {"pdf", "docx", "doc"}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Skill Parser
skill_extractor = SimpleSkillExtractor()
resume_parser = SimpleResumeParser()


# ---------------------------------------------------------
# Health Check
# ---------------------------------------------------------
@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        "status": "running",
        "timestamp": datetime.utcnow().isoformat()
    })


# ---------------------------------------------------------
# Comprehensive Resume Analysis
# ---------------------------------------------------------
@app.route('/api/comprehensive-analysis', methods=['POST'])
def comprehensive_analysis():
    file_path = None

    try:
        if 'resume' not in request.files:
            return jsonify({"success": False, "error": "No resume file provided"}), 400

        resume_file = request.files['resume']

        if resume_file.filename == "":
            return jsonify({"success": False, "error": "No file selected"}), 400

        if not allowed_file(resume_file.filename):
            return jsonify({"success": False, "error": "Invalid file type"}), 400

        # Extra inputs
        session_id = request.form.get("session_id")
        user_id = request.form.get("user_id")
        user_email = request.form.get("user_email")

        filename = secure_filename(resume_file.filename)
        unique_filename = f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{uuid.uuid4().hex[:8]}_{filename}"

        file_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        resume_file.save(file_path)

        # Extract text
        with open(file_path, "rb") as fh:
            resume_text = extract_text_from_file(fh)

        if not resume_text.strip():
            return jsonify({"success": False, "error": "Cannot extract text"}), 400

        # Analyze
        skills = skill_extractor.extract_skills(resume_text)
        parsed_data = resume_parser.parse_resume(resume_text)

        # Job matches (simple logic)
        job_matches = generate_job_matches(skills)
        overall_score = calculate_overall_score(skills, parsed_data)
        skill_gap = calculate_skills_gap(skills)

        ats_compatibility = {
            "score": max(40, overall_score - 10),
            "issues": ["Not enough achievements"] if len(parsed_data.get("achievements", [])) < 2 else [],
            "suggestions": ["Add more measurable achievements"]
        }

        analysis_results = {
            "overall_score": overall_score,
            "experience_level": parsed_data["experience_level"],
            "skills_gap": skill_gap,
            "ats_compatibility": ats_compatibility
        }

        # Save in MongoDB
        resume_data = {
            "file_name": unique_filename,
            "file_path": file_path,
            "skills": skills,
            "personal_info": parsed_data.get("personal_info", {}),
            "education": parsed_data.get("education", []),
            "achievements": parsed_data.get("achievements", []),
            "analysis_results": analysis_results,
            "job_matches": job_matches,
            "recommended_roles": [job["title"] for job in job_matches[:3]],
            "resume_score": overall_score,
            "session_id": session_id,
            "user_id": user_id,
            "created_at": datetime.utcnow().isoformat()
        }

        resume_id = ResumeModel.create_resume(resume_data)

        # Optional: Create or update user
        final_email = user_email or parsed_data["personal_info"].get("email")
        if final_email:
            UserModel.create_or_update_user({
                "email": final_email,
                "name": parsed_data["personal_info"].get("name"),
                "experience_level": parsed_data["experience_level"]
            })

        # Add to session
        if session_id:
            try:
                AnalysisSessionModel.add_resume_to_session(session_id, resume_id)
            except:
                pass

        # ---------------------------------------------------------
        # UPDATE CSV AUTOMATICALLY
        # ---------------------------------------------------------
        CSV_PATH = os.path.join(BASE_DIR, "uploads", "exceldata", "resume_data.csv")

        csv_row = {
            "resume_id": str(resume_id),
            "name": parsed_data["personal_info"].get("name", ""),
            "email": parsed_data["personal_info"].get("email", ""),
            "phone": parsed_data["personal_info"].get("phone", ""),
            "experience_level": parsed_data["experience_level"],
            "technical_skills": ", ".join(skills["technical"]),
            "soft_skills": ", ".join(skills["soft"]),
            "overall_score": overall_score,
            "recommended_roles": ", ".join(resume_data["recommended_roles"]),
            "uploaded_at": datetime.utcnow().isoformat()
        }

        append_to_csv(CSV_PATH, csv_row)

        return jsonify({
            "success": True,
            "resume_id": str(resume_id),
            "skills": skills,
            "parsed_data": parsed_data,
            "analysis_results": analysis_results
        })

    except Exception as e:
        current_app.logger.error(str(e))
        return jsonify({"success": False, "error": str(e)}), 500


# ---------------------------------------------------------
# DOWNLOAD CSV FILE
# ---------------------------------------------------------
@app.route('/api/download/csv', methods=['GET'])
def download_csv():
    folder = os.path.join(BASE_DIR, "uploads", "exceldata")
    return send_from_directory(folder, "resume_data.csv", as_attachment=True)


# ---------------------------------------------------------
# DOWNLOAD RESUME FILE BY FILENAME
# ---------------------------------------------------------
@app.route('/uploads/resumes/<path:filename>', methods=['GET'])
def download_resume_file(filename):
    folder = os.path.join(BASE_DIR, "uploads", "resumes")
    return send_from_directory(folder, filename, as_attachment=True)


# ---------------------------------------------------------
# DOWNLOAD RESUME USING resume_id
# ---------------------------------------------------------
@app.route('/api/resume/<resume_id>/download', methods=['GET'])
def download_resume_by_id(resume_id):
    resume = ResumeModel.get_resume_by_id(resume_id)
    
    if not resume:
        return jsonify({"success": False, "error": "Resume not found"}), 404

    filename = resume.get("file_name")
    folder = os.path.join(BASE_DIR, "uploads", "resumes")

    return send_from_directory(folder, filename, as_attachment=True)


# ---------------------------------------------------------
# Job Matching + Score Calculators
# ---------------------------------------------------------
def generate_job_matches(skills):
    jobs = {
        'Frontend Developer': ['javascript', 'react', 'html', 'css'],
        'Backend Developer': ['python', 'java', 'node.js', 'sql'],
        'Full Stack Developer': ['javascript', 'python', 'react', 'node.js'],
        'Data Scientist': ['python', 'machine learning', 'data analysis'],
    }

    matches = []
    tech = [s.lower() for s in skills.get("technical", [])]

    for job, required in jobs.items():
        matched = [s for s in required if s in tech]
        score = round((len(matched) / len(required)) * 100, 2)

        matches.append({
            "title": job,
            "match_percentage": score,
            "matching_skills": matched,
            "missing_skills": list(set(required) - set(matched))
        })

    return sorted(matches, key=lambda x: x["match_percentage"], reverse=True)


def calculate_overall_score(skills, parsed):
    base = 50
    tech_score = min(len(skills["technical"]) * 3, 30)
    soft_score = min(len(skills["soft"]) * 2, 15)
    exp_score = 10 if parsed["experience_level"] != "Not specified" else 0
    return min(base + tech_score + soft_score + exp_score, 100)


def calculate_skills_gap(skills):
    total_possible = 20
    actual = len(skills["technical"])
    return int((1 - (actual / total_possible)) * 100)


# ---------------------------------------------------------
# Register Blueprints
# ---------------------------------------------------------
from routes.user_routes import user_bp
from routes.resume_routes import resume_bp
from routes.job_routes import job_bp
from routes.skill_routes import skill_bp
from routes.quiz_routes import quiz_bp

app.register_blueprint(user_bp, url_prefix="/api/user")
app.register_blueprint(resume_bp, url_prefix="/api/resume")
app.register_blueprint(job_bp, url_prefix="/api/job")
app.register_blueprint(skill_bp, url_prefix="/api/skill")
app.register_blueprint(quiz_bp, url_prefix="/api/quiz")


# ---------------------------------------------------------
# Start The Server
# ---------------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
