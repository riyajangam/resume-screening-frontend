# create_all_files.py - Run this from WHEREVER you are
import os
import sys

print("Creating all necessary files in backend folder...")

# Get the backend folder path
current_dir = os.getcwd()
backend_path = os.path.join(current_dir, 'backend')

# If we're not in backend, try to find it
if not os.path.exists(backend_path):
    # Try one level up
    parent_dir = os.path.dirname(current_dir)
    backend_path = os.path.join(parent_dir, 'backend')
    
    if not os.path.exists(backend_path):
        print("❌ Could not find backend folder!")
        print(f"Current: {current_dir}")
        print(f"Looking for: {backend_path}")
        sys.exit(1)

print(f"Found backend folder: {backend_path}")

# Change to backend folder
os.chdir(backend_path)
print(f"Now in: {os.getcwd()}")

# Create essential files
files_to_create = {
    'install_spacy.py': '''import subprocess
import sys

print("Installing spaCy...")
packages = ['spacy==3.7.2', 'PyPDF2==3.0.1', 'python-docx==1.1.0']
for pkg in packages:
    subprocess.check_call([sys.executable, "-m", "pip", "install", pkg])
print("Downloading spaCy model...")
subprocess.check_call([sys.executable, "-m", "spacy", "download", "en_core_web_sm"])
print("✅ Done!")''',
    
    'test_spacy_basic.py': '''import requests
import os

print("Basic spaCy Test")
with open("test.txt", "w") as f:
    f.write("Python Developer with JavaScript skills")
with open("test.txt", "rb") as f:
    response = requests.post('http://localhost:5000/resume/upload', 
                           files={'resume': ('test.txt', f)},
                           data={'name': 'Test', 'email': 'test@test.com'})
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        print(f"Skills: {response.json()['data']['analysis']['skills']['list']}")
os.remove("test.txt")''',
    
    'quick_start.bat': '''@echo off
echo Starting Resume Screening Backend...
cd /d %~dp0
call venv\\Scripts\\activate.bat
python app_simple.py
pause''',
    
    'README_TESTING.md': '''# Testing Guide

## Quick Start:
1. Open TWO PowerShell windows
2. Window 1: Run server
   cd backend
   venv\\Scripts\\Activate.ps1
   python app_simple.py
3. Window 2: Run tests
   cd backend
   venv\\Scripts\\Activate.ps1
   python test_spacy_basic.py

## Files:
- app_simple.py - Main Flask server
- routes/resume_routes.py - Upload endpoint with spaCy
- test_spacy_basic.py - Basic test
- install_spacy.py - Install dependencies'''
}

# Create the files
for filename, content in files_to_create.items():
    if not os.path.exists(filename):
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Created: {filename}")
    else:
        print(f"Already exists: {filename}")

print(f"\n✅ Files created in: {backend_path}")
print("\nNow run:")
print("1. cd backend")
print("2. venv\\Scripts\\Activate.ps1")
print("3. python app_simple.py")