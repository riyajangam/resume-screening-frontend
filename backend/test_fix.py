# test_fix.py - Test the backend fix
import requests
import os

def test_resume_upload():
    """Test the resume upload endpoint"""
    
    # Backend URL
    base_url = "http://localhost:5000"
    
    # Test file path (create a sample resume.txt in your backend folder)
    test_file_path = "test_resume.txt"
    
    if not os.path.exists(test_file_path):
        # Create a sample resume
        with open(test_file_path, "w") as f:
            f.write("""
            John Doe
            Software Developer
            
            Skills:
            - Python, JavaScript, React
            - Flask, Django, Node.js
            - MySQL, MongoDB
            - AWS, Docker
            - Git, Agile methodologies
            
            Experience:
            Senior Developer at Tech Corp
            - Developed web applications using Python and React
            - Implemented REST APIs
            - Managed AWS infrastructure
            
            Education:
            BS in Computer Science
            """)
    
    # Prepare request
    with open(test_file_path, "rb") as file:
        files = {
            'file': (test_file_path, file, 'text/plain')
        }
        
        data = {
            'fullName': 'John Doe',
            'email': 'john@example.com'
        }
        
        print("Testing resume upload...")
        response = requests.post(
            f"{base_url}/upload",
            files=files,
            data=data
        )
    
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
    
    return response.json()

if __name__ == "__main__":
    result = test_resume_upload()
    if result.get('success'):
        print("✅ Backend is working correctly!")
        print(f"Found {result['data']['skills']['count']} skills")
        print(f"Skills: {result['data']['skills']['list']}")
    else:
        print("❌ Backend test failed")