from flask import Blueprint, request, jsonify
from database import db

skill_bp = Blueprint("skill_bp", __name__)

@skill_bp.route("/save", methods=["POST"])
def save_skill():
    data = request.json
    db.skills.insert_one(data)
    return jsonify({"message": "Skills saved"}), 201

@skill_bp.route("/all", methods=["GET"])
def get_skills():
    skills = list(db.skills.find({}, {"_id": 0}))
    return jsonify(skills)
