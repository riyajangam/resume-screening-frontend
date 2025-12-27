# Copy and paste this entire block:
'@'
# test_spacy_pdf.py
import requests
import os

print("="*60)
print("PDF RESUME TEST (if PyPDF2 installed)")
print("="*60)

# First check if PyPDF2 is available
try:
    import PyPDF2
    print("✅ PyPDF2 is installed")
    
    # Create a simple PDF test (would need actual PDF creation)
    print("Note: Would test PDF upload here")
    print("Need actual PDF file to test")
    
except ImportError:
    print("❌ PyPDF2 not installed")
    print("Install with: pip install PyPDF2")

print("\nTesting with TXT file instead...")

# Create test resume
resume_content = """Software Engineer Resume

TECHNICAL SKILLS:
Programming: Python, Java, C++, JavaScript
Web: HTML, CSS, React, Angular, Vue.js
Database: MySQL, MongoDB, PostgreSQL, Redis
Cloud: AWS, Azure, Google Cloud, Docker, Kubernetes
Tools: Git, GitHub, JIRA, Jenkins, Terraform
Methodologies: Agile, Scrum, DevOps, CI/CD

EXPERIENCE:
Senior Software Engineer - TechCorp (2020-Present)
- Developed microservices using Python and Docker
- Implemented CI/CD pipelines with Jenkins
- Managed AWS cloud infrastructure
- Led agile development teams"""

with open("engineer_resume.txt", "w") as f:
    f.write(resume_content)

# Test upload
try:
    with open("engineer_resume.txt", "rb") as f:
        files = {'resume': ('engineer.txt', f)}
        data = {'name': 'Software Engineer', 'email': 'engineer@example.com'}
        
        r = requests.post('http://localhost:5000/resume/upload', 
                        files=files, data=data, timeout=10)
        
        print(f"\nStatus: {r.status_code}")
        
        if r.status_code == 200:
            result = r.json()
            print(f"✅ Success!")
            print(f"Method: {result['data']['extractionMethod']}")
            print(f"Total Skills: {result['data']['analysis']['skills']['count']}")
            
            skills = result['data']['analysis']['skills']['list']
            if skills:
                print(f"\nTop 10 Skills:")
                for i, skill in enumerate(skills[:10], 1):
                    print(f"  {i}. {skill}")
                
            # Save full result
            import json
            with open("pdf_test_result.json", "w") as out:
                json.dump(result, out, indent=2)
            print(f"\n📄 Full result saved to: pdf_test_result.json")
            
except Exception as e:
    print(f"❌ Error: {e}")

# Cleanup
if os.path.exists("engineer_resume.txt"):
    os.remove("engineer_resume.txt")

print("\n" + "="*60)
print("PDF TEST COMPLETE")
print("="*60)
'@ | Out-File -FilePath "test_spacy_pdf.py" -Encoding UTF8'