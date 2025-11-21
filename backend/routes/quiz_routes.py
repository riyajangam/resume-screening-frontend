# routes/quiz_routes.py

from flask import Blueprint, request, jsonify
from bson import ObjectId

from database import db
from models import ResumeModel
from utils.resume_parser import SimpleSkillExtractor

quiz_bp = Blueprint("quiz_routes", __name__, url_prefix="/api/quiz")

skill_extractor = SimpleSkillExtractor()

# ----------------------------------------------------------
# RE-RUN ASSESSMENT (MongoDB version)
# ----------------------------------------------------------
@quiz_bp.route("/assess_resume/<resume_id>", methods=["POST"])
def assess_resume(resume_id):
    payload = request.get_json() or {}

    # Parse skills
    job_skills_raw = payload.get("job_skills", "")
    job_skills = [s.strip().lower() for s in job_skills_raw.split(",") if s.strip()]

    # Fetch resume
    resume = ResumeModel.get_resume_by_id(resume_id)
    if not resume:
        return jsonify({"success": False, "error": "Resume not found"}), 404

    # Extract existing technical skills
    tech_skills = [s.lower() for s in resume.get("skills", {}).get("technical", [])]

    # Match
    matched = [s for s in job_skills if s in tech_skills]
    score = round((len(matched) / len(job_skills)) * 100, 2) if job_skills else 0

    verdict = (
        "Strong" if score >= 75 else
        "Average" if score >= 50 else
        "Weak"
    )

    assessment_data = {
        "resume_id": resume_id,
        "score": score,
        "verdict": verdict,
        "matched_skills": matched,
        "required_skills": job_skills,
        "created_at": resume.get("created_at")
    }

    db["assessments"].insert_one(assessment_data)

    return jsonify({
        "success": True,
        "assessment": assessment_data
    }), 200
