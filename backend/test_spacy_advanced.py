# Copy and paste this entire block:
'@'
# test_spacy_advanced.py
import requests
import json

print("="*70)
print("ADVANCED SPAcy PHRASEMATCHER TEST")
print("="*70)

def test_resume(name, content):
    print(f"\n📝 Testing: {name}")
    print("-" * 40)
    
    # Save to file
    filename = f"temp_{name.replace(' ', '_')}.txt"
    with open(filename, "w") as f:
        f.write(content)
    
    try:
        with open(filename, "rb") as f:
            files = {'resume': (f'{name}.txt', f)}
            data = {'name': 'Test User', 'email': 'test@example.com'}
            
            r = requests.post('http://localhost:5000/resume/upload', 
                            files=files, data=data, timeout=10)
            
            if r.status_code == 200:
                result = r.json()
                
                skills = result['data']['analysis']['skills']['list']
                method = result['data']['extractionMethod']
                
                print(f"✅ Method: {method}")
                print(f"✅ Skills: {len(skills)}")
                print(f"✅ List: {skills}")
                
                # Show categories
                categories = result['data']['analysis']['skills']['categories']
                if categories:
                    for cat, items in categories.items():
                        if items:
                            print(f"  {cat}: {items}")
                
                return True
            else:
                print(f"❌ Failed: {r.status_code}")
                return False
                
    except Exception as e:
        print(f"❌ Error: {e}")
        return False
    finally:
        import os
        if os.path.exists(filename):
            os.remove(filename)

# Test cases
test_cases = [
    {
        "name": "Python Developer",
        "content": """Python Developer with Django and Flask experience.
        Databases: MySQL, PostgreSQL.
        Tools: Git, Docker, AWS.
        Methodologies: Agile, Scrum."""
    },
    {
        "name": "Web Developer",
        "content": """Web Developer skilled in:
        Frontend: HTML5, CSS3, JavaScript, React, Angular
        Backend: Node.js, Express.js
        Database: MongoDB
        Cloud: AWS, Azure"""
    },
    {
        "name": "Data Scientist",
        "content": """Data Scientist proficient in:
        Python, R, SQL
        Machine Learning, Deep Learning
        TensorFlow, PyTorch, Scikit-learn
        Pandas, NumPy, Tableau
        Big Data, Hadoop"""
    }
]

print("\nRunning test cases...")
print("="*70)

success = 0
for test in test_cases:
    if test_resume(test["name"], test["content"]):
        success += 1

print(f"\n📊 Results: {success}/{len(test_cases)} passed")
print("="*70)

# Test different endpoints
print("\n🔧 Testing other endpoints...")
try:
    # List all skills
    r = requests.get('http://localhost:5000/resume/skills')
    if r.status_code == 200:
        data = r.json()
        print(f"Total skills in DB: {data.get('total_skills', 0)}")
    
    # Check health
    r = requests.get('http://localhost:5000/health')
    print(f"Health: {r.json().get('status', 'unknown')}")
    
except Exception as e:
    print(f"Endpoint error: {e}")

print("\n" + "="*70)
print("ADVANCED TEST COMPLETE")
print("="*70)
'@ | Out-File -FilePath "test_spacy_advanced.py" -Encoding UTF8'