from flask import Blueprint, request, jsonify
from utils.resume_parser import parse_resume_text

resume_bp = Blueprint("resume", __name__)

@resume_bp.route("/upload", methods=["POST"])
def upload_resume():
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

    # 📊 Accurate scoring logic
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
