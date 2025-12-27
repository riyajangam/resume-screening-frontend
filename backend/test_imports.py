# import sys
# print(f\"Python {sys.version}\")

# imports_to_test = [
#     (\"Flask\", \"flask\"),
#     (\"spaCy\", \"spacy\"),
#     (\"pdfplumber\", \"pdfplumber\"),
#     (\"python-docx\", \"docx\"),
#     (\"PyPDF2\", \"PyPDF2\"),
# ]

# print(\"\\nTesting imports...\")
# for name, module_name in imports_to_test:
#     try:
#         __import__(module_name)
#         print(f\"✓ {name} imported successfully\")
#     except ImportError as e:
#         print(f\"✗ {name} import failed: {e}\")

# # Test creating objects
# print(\"\\nTesting object creation...\")
# try:
#     import spacy
#     nlp = spacy.load(\"en_core_web_sm\")
#     print(\"✓ spaCy model loaded\")
# except Exception as e:
#     print(f\"✗ spaCy model error: {e}\")

# try:
#     from utils.resume_parser import ResumeParser
#     parser = ResumeParser()
#     print(\"✓ ResumeParser created\")
# except Exception as e:
#     print(f\"✗ ResumeParser error: {e}\")

# print(\"\\nChecking project structure...\")
# import os
# required_files = [
#     \"utils/resume_parser.py\",
#     \"utils/skill_extractor.py\", 
#     \"utils/skill_database.py\",
#     \"routes/resume_routes.py\"
# ]

# for file in required_files:
#     if os.path.exists(file):
#         print(f\"✓ {file} exists\")
#     else:
#         print(f\"✗ {file} missing\")

# test_imports.py

# test_imports.py - UPDATED VERSION


import sys
import os

# Add current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

print(f"Python {sys.version}")
print(f"Working directory: {os.getcwd()}")
print(f"Python path: {sys.path[:3]}...")

imports_to_test = [
    ("Flask", "flask"),
    ("spaCy", "spacy"),
    ("pdfplumber", "pdfplumber"),
    ("python-docx", "docx"),
    ("PyPDF2", "PyPDF2"),
]

print("\nTesting imports...")
for name, module_name in imports_to_test:
    try:
        __import__(module_name)
        print(f"✓ {name} imported successfully")
    except ImportError as e:
        print(f"✗ {name} import failed: {e}")

# Test creating objects
print("\nTesting object creation...")
try:
    import spacy
    nlp = spacy.load("en_core_web_sm")
    print("✓ spaCy model loaded")
except Exception as e:
    print(f"✗ spaCy model error: {e}")

try:
    # FIXED: Use relative import
    from utils.resume_parser import ResumeParser
    parser = ResumeParser()
    print("✓ ResumeParser created")
    
    # Test it
    test_text = "Python JavaScript React"
    sections = parser.extract_sections(test_text)
    print(f"✓ ResumeParser methods work")
except Exception as e:
    print(f"✗ ResumeParser error: {e}")

print("\nChecking project structure...")
required_files = [
    "utils/resume_parser.py",
    "utils/skill_extractor.py", 
    "utils/skill_database.py",
    "routes/resume_routes.py"
]

for file in required_files:
    if os.path.exists(file):
        print(f"✓ {file} exists")
    else:
        print(f"✗ {file} missing")
