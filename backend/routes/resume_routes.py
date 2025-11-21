# routes/resume_routes.py

from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from bson import ObjectId
import os
from datetime import datetime

from database import db
from models import ResumeModel, UserModel, AnalysisSessionModel
from utils.resume_parser import extract_text_from_file, SimpleSkillExtractor, SimpleResumeParser

resume_bp = Blueprint("resume_routes", __name__)

skill_extractor = SimpleSkillExtractor()
resume_parser = SimpleResumeParser()

# Allowed extensions
ALLOWED_EXTENSIONS = {'pdf', 'docx', 'doc'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# ----------------------------------------------------------
# UPLOAD RESUME + ANALYZE + SAVE IN DB
# ----------------------------------------------------------
@resume_bp.route("/upload", methods=["POST"])
def upload_resume():
    try:
        if 'resume' not in request.files:
            return jsonify({"success": False, "error": "No resume file provided"}), 400

        resume_file = request.files['resume']

        if resume_file.filename == "":
            return jsonify({"success": False, "error": "No file selected"}), 400

        if not allowed_file(resume_file.filename):
            return jsonify({"success": False, "error": "Invalid file type"}), 400

        filename = secure_filename(resume_file.filename)
        unique_name = f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{filename}"

        upload_folder = os.path.join(os.getcwd(), "uploads", "resumes")
        os.makedirs(upload_folder, exist_ok=True)

        file_path = os.path.join(upload_folder, unique_name)
        resume_file.save(file_path)

        # Extract text
        with open(file_path, "rb") as fh:
            text = extract_text_from_file(fh)

        if not text.strip():
            return jsonify({"success": False, "error": "Unable to read resume"}), 400

        # Analyze resume
        skills = skill_extractor.extract_skills(text)
        parsed = resume_parser.parse_resume(text)

        # Save to DB
        resume_data = {
            "file_name": unique_name,
            "file_path": file_path,
            "skills": skills,
            "parsed": parsed,
            "created_at": datetime.utcnow().isoformat()
        }

        resume_id = ResumeModel.create_resume(resume_data)

        return jsonify({
            "success": True,
            "resume_id": resume_id,
            "skills": skills,
            "parsed_data": parsed
        }), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# ----------------------------------------------------------
# GET A SPECIFIC RESUME BY ID
# ----------------------------------------------------------
@resume_bp.route("/<resume_id>", methods=["GET"])
def get_resume(resume_id):
    try:
        resume = ResumeModel.get_resume_by_id(resume_id)
        if not resume:
            return jsonify({"success": False, "error": "Resume not found"}), 404

        resume["_id"] = str(resume["_id"])

        return jsonify({"success": True, "resume": resume}), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
