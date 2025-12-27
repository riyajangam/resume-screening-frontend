# test_spacy_upload.py
import requests
import os

print("Testing spaCy PhraseMatcher Skill Extraction")
print("=" * 50)

# Create a comprehensive test resume
test_resume = """JOHN DOE
Senior Software Engineer
john.doe@email.com

SUMMARY:
Experienced Full Stack Developer with 5+ years in web development.
Proficient in modern technologies and cloud infrastructure.

TECHNICAL SKILLS:
• Programming: Python, JavaScript, Java, TypeScript
• Web: React, Angular, Vue.js, Node.js, Express.js
• Backend: Django, Flask, Spring Boot, REST APIs, GraphQL
• Databases: MySQL, PostgreSQL, MongoDB, Redis, SQLite
• Cloud & DevOps: AWS, Azure, Docker, Kubernetes, Jenkins, Terraform
• Tools: Git, GitHub Actions, JIRA, VS Code, PyCharm
• Methodologies: Agile, Scrum, Kanban, DevOps, CI/CD

EXPERIENCE:
Senior Developer - Tech Solutions Inc. (2020-Present)
- Developed microservices using Python Flask and React
- Implemented CI/CD pipelines with GitHub Actions
- Managed AWS infrastructure with Terraform
- Led agile development teams using Scrum

EDUCATION:
Master of Science in Computer Science
Stanford University, 2015-2017
"""

# Save test file
with open("spacy_test_resume.txt", "w", encoding="utf-8") as f:
    f.write(test_resume)

print("Created test resume with diverse skills")

# Test the upload
try:
    with open("spacy_test_resume.txt", "rb") as f:
        files = {'resume': ('john_doe_resume.txt', f, 'text/plain')}
        data = {
            'name': 'John Doe',
            'email': 'john.doe@example.com'
        }
        
        print("\nSending request to /resume/upload...")
        response = requests.post('http://localhost:5000/resume/upload', 
                               files=files, data=data, timeout=10)
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            
            print(f"\n✅ SUCCESS!")
            print(f"Message: {result['message']}")
            print(f"Extraction Method: {result['data']['extractionMethod']}")
            
            skills_data = result['data']['analysis']['skills']
            print(f"\n📊 SKILL ANALYSIS:")
            print(f"Total Skills Found: {skills_data['count']}")
            
            print(f"\n🎯 SKILLS LIST:")
            for i, skill in enumerate(skills_data['list'], 1):
                print(f"  {i:2}. {skill}")
            
            print(f"\n📁 BY CATEGORY:")
            for category, skills in skills_data['categories'].items():
                if skills:
                    print(f"  {category}:")
                    for skill in skills:
                        print(f"    • {skill}")
            
            print(f"\n💡 RECOMMENDATIONS:")
            recs = result['data']['recommendations']
            print(f"  Top Skills: {', '.join(recs['topSkills'])}")
            print(f"  Missing Skills: {', '.join(recs['missingSkills'])}")
            print(f"  Suggested Roles: {', '.join(recs['suggestedRoles'])}")
            
        else:
            print(f"\n❌ FAILED!")
            print(f"Response: {response.text}")
            
except Exception as e:
    print(f"\n❌ Error: {e}")

# Cleanup
if os.path.exists("spacy_test_resume.txt"):
    os.remove("spacy_test_resume.txt")
    print("\n🧹 Cleaned up test file")

print("\n" + "=" * 50)
print("Test Complete!")