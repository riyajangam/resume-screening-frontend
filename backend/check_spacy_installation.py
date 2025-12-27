# check_spacy_installation.py
import sys

print("Checking spaCy Installation")
print("=" * 50)

# Check Python version
print(f"Python: {sys.version}")

# Try to import spaCy
try:
    import spacy
    print(f"✅ spaCy version: {spacy.__version__}")
    
    # Try to load model
    try:
        nlp = spacy.load("en_core_web_sm")
        print("✅ spaCy model 'en_core_web_sm' loaded successfully")
        
        # Test the model
        doc = nlp("Python and JavaScript are programming languages.")
        print(f"✅ NLP pipeline working: {[token.text for token in doc]}")
        
    except Exception as e:
        print(f"❌ Could not load spaCy model: {e}")
        print("Download with: python -m spacy download en_core_web_sm")
        
except ImportError:
    print("❌ spaCy not installed")
    print("Install with: pip install spacy")

# Check for PhraseMatcher
try:
    from spacy.matcher import PhraseMatcher
    print("✅ PhraseMatcher available")
except ImportError:
    print("❌ PhraseMatcher not available")

print("\nChecking backend endpoints...")
try:
    import requests
    response = requests.get('http://localhost:5000/resume/test')
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Backend running")
        print(f"spaCy available: {data.get('spaCy_available', False)}")
        print(f"Skill patterns: {data.get('skill_patterns_loaded', 0)}")
    else:
        print(f"❌ Backend error: {response.status_code}")
except:
    print("❌ Could not connect to backend")