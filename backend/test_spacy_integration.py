# test_spacy_integration.py
import requests

# Test if spaCy is working
response = requests.get('http://localhost:5000/resume/test')
data = response.json()
print(f"spaCy available: {data.get('spaCy_available')}")
print(f"Skill patterns loaded: {data.get('skill_patterns_loaded')}")

# Test upload with spaCy
test_resume = """
Software Developer with Python, JavaScript, and React experience.
Proficient in AWS, Docker, and Kubernetes.
Experienced with MySQL and MongoDB databases.
Familiar with Agile methodologies and Git.
"""

with open("test_spacy.txt", "w") as f:
    f.write(test_resume)

with open("test_spacy.txt", "rb") as f:
    files = {'resume': ('test.txt', f)}
    data = {'name': 'Test', 'email': 'test@example.com'}
    
    response = requests.post('http://localhost:5000/resume/upload', files=files, data=data)
    
    if response.status_code == 200:
        result = response.json()
        print(f"\nExtraction method: {result['data']['extractionMethod']}")
        print(f"Skills found: {result['data']['analysis']['skills']['list']}")