# Copy and paste this entire block:
'@'
# test_spacy_quick.py
import requests
import json

print("="*60)
print("QUICK SPAcy TEST")
print("="*60)

# 1. First check server
print("1. Checking server...")
try:
    r = requests.get("http://localhost:5000/", timeout=2)
    print(f"   ✅ Server OK: {r.status_code}")
except:
    print("   ❌ Server not running!")
    print("   Start with: python app_simple.py")
    exit()

# 2. Test endpoint info
print("\n2. Checking spaCy status...")
r = requests.get("http://localhost:5000/resume/test")
info = r.json()
print(f"   spaCy Available: {info.get('spaCy_available', False)}")
print(f"   Skill Patterns: {info.get('skill_patterns_loaded', 0)}")

# 3. Create test resume
test_content = """John Doe
Software Developer
Skills: Python, JavaScript, React, HTML, CSS, MongoDB, Git, AWS"""

with open("test_resume.txt", "w") as f:
    f.write(test_content)

# 4. Test upload
print("\n3. Testing resume upload...")
with open("test_resume.txt", "rb") as f:
    files = {'resume': ('test.txt', f)}
    data = {'name': 'John Doe', 'email': 'john@example.com'}
    
    r = requests.post("http://localhost:5000/resume/upload", files=files, data=data)
    
    print(f"   Status: {r.status_code}")
    
    if r.status_code == 200:
        result = r.json()
        print(f"   ✅ Success!")
        print(f"   Method: {result['data']['extractionMethod']}")
        print(f"   Skills found: {len(result['data']['analysis']['skills']['list'])}")
        print(f"   Skills: {result['data']['analysis']['skills']['list']}")
    else:
        print(f"   ❌ Failed: {r.text}")

# 5. Cleanup
import os
if os.path.exists("test_resume.txt"):
    os.remove("test_resume.txt")

print("\n" + "="*60)
print("TEST COMPLETE")
print("="*60)
'@ | Out-File -FilePath "test_spacy_quick.py" -Encoding UTF8'