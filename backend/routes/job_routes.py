from flask import Blueprint, request, jsonify
from database import db

job_bp = Blueprint("job_bp", __name__)

@job_bp.route("/save", methods=["POST"])
def save_job():
    data = request.json
    db.jobs.insert_one(data)
    return jsonify({"message": "Job preference saved"}), 201

@job_bp.route("/all", methods=["GET"])
def get_jobs():
    jobs = list(db.jobs.find({}, {"_id": 0}))
    return jsonify(jobs)
