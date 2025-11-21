from flask import Blueprint, request, jsonify
from database import db

user_bp = Blueprint("user_bp", __name__)

@user_bp.route("/create", methods=["POST"])
def create_user():
    data = request.json
    db.users.insert_one(data)
    return jsonify({"message": "User created successfully"}), 201

@user_bp.route("/all", methods=["GET"])
def get_users():
    users = list(db.users.find({}, {"_id": 0}))
    return jsonify(users)
