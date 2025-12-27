# test_spacy_accuracy.py
import requests

print("Comparing spaCy vs Fallback Extraction")
print("=" * 50)

# Test different resumes
test_cases = [
    {
        "name": "Python Developer",
        "content": """Python Developer with Flask and Django experience.
        Knowledge of REST APIs and MySQL databases."""
    },
    {
        "name": "Full Stack Developer", 
        "content": """Full Stack Developer proficient in React, Node.js, and MongoDB.
        Experienced with AWS, Docker, and Git. Agile methodologies."""
    },
    {
        "name": "Data Scientist",
        "content": """Data Scientist with Machine Learning and Python skills.
        Proficient in Pandas, NumPy, TensorFlow, and Data Visualization."""
    }
]

for i, test in enumerate(test_cases, 1):
    print(f"\nTest Case {i}: {test['name']}")
    print("-" * 30)
    
    # Create temporary file
    filename = f"temp_test_{i}.txt"
    with open(filename, "w") as f:
        f.write(test['content'])
    
    try:
        with open(filename, "rb") as f:
            files = {'resume': (filename, f)}
            data = {'name': 'Test User', 'email': 'test@example.com'}
            
            response = requests.post('http://localhost:5000/resume/upload', 
                                   files=files, data=data)
            
            if response.status_code == 200:
                result = response.json()
                skills = result['data']['analysis']['skills']['list']
                method = result['data']['extractionMethod']
                print(f"Method: {method}")
                print(f"Skills: {skills}")
                print(f"Count: {len(skills)}")
            else:
                print(f"Failed: {response.text}")
                
    except Exception as e:
        print(f"Error: {e}")
    
    # Cleanup
    import os
    if os.path.exists(filename):
        os.remove(filename)

print("\n✅ Comparison complete!")