# database.py
import os
from dotenv import load_dotenv
from pymongo import MongoClient


load_dotenv()

# ------------------------------------------------
# MONGODB CLOUD (ATLAS) CONNECTION
# ------------------------------------------------

# Example:
# mongodb+srv://<username>:<password>@cluster0.abcd123.mongodb.net/?retryWrites=true&w=majority

MONGO_URI = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME", "major_project_db")

if not MONGO_URI:
    raise Exception("❌ ERROR: MONGO_URI not found in .env file")

client = MongoClient(MONGO_URI)

db = client[DATABASE_NAME]
# ✅ MongoDB Collections
resumes_collection = db["resumes"]
users_collection = db["users"]
jobs_collection = db["jobs"]

print("✅ Connected to MongoDB Atlas:", DATABASE_NAME)
