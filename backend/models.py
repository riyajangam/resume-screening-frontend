# models.py

"""
This file defines wrapper model classes for MongoDB.
It assumes you are using PyMongo or a similar Mongo client
and already initialized a database connection somewhere else
(e.g., in database.py)
"""

from bson import ObjectId
from database import db   # your database connection must expose `db`

class ResumeModel:
    COLLECTION = db["resumes"]

    @staticmethod
    def create_resume(data: dict):
        """Insert resume and return inserted ID"""
        res = ResumeModel.COLLECTION.insert_one(data)
        return str(res.inserted_id)

    @staticmethod
    def get_resume_by_id(resume_id: str):
        try:
            return ResumeModel.COLLECTION.find_one({"_id": ObjectId(resume_id)})
        except:
            return None

    @staticmethod
    def get_user_resumes(user_id: str, limit=10, skip=0):
        return list(
            ResumeModel.COLLECTION.find({"user_id": user_id})
                                 .skip(int(skip))
                                 .limit(int(limit))
        )


class UserModel:
    COLLECTION = db["users"]

    @staticmethod
    def create_or_update_user(data: dict):
        email = data["email"]
        existing = UserModel.COLLECTION.find_one({"email": email})

        if existing:
            UserModel.COLLECTION.update_one(
                {"email": email},
                {"$set": data}
            )
            existing.update(data)
            return existing
        else:
            res = UserModel.COLLECTION.insert_one(data)
            data["_id"] = res.inserted_id
            return data


class AnalysisSessionModel:
    COLLECTION = db["analysis_sessions"]

    @staticmethod
    def create_session(data: dict):
        res = AnalysisSessionModel.COLLECTION.insert_one(data)
        return str(res.inserted_id)

    @staticmethod
    def add_resume_to_session(session_id: str, resume_id: str):
        AnalysisSessionModel.COLLECTION.update_one(
            {"_id": ObjectId(session_id)},
            {"$push": {"resumes": resume_id}}
        )
