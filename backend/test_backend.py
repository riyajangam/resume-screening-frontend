# test_backend.py
import sys
import os

print("Testing backend imports...")

# Try different import methods
try:
    # Method 1: Direct import
    from utils.resume_parser import ResumeParser
    print("✓ Import successful using: from utils.resume_parser import ResumeParser")
except ImportError as e1:
    print(f"✗ Method 1 failed: {e1}")
    
    try:
        # Method 2: Add to path and import
        sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
        from utils.resume_parser import ResumeParser
        print("✓ Import successful after adding to sys.path")
    except ImportError as e2:
        print(f"✗ Method 2 failed: {e2}")
        
        try:
            # Method 3: Try absolute import
            import utils.resume_parser
            print("✓ Import successful using: import utils.resume_parser")
        except ImportError as e3:
            print(f"✗ Method 3 failed: {e3}")
            print("\nTrying to check file structure...")
            
            # Check if files exist
            current_dir = os.path.dirname(os.path.abspath(__file__))
            print(f"Current directory: {current_dir}")
            
            resume_parser_path = os.path.join(current_dir, "utils", "resume_parser.py")
            print(f"Looking for: {resume_parser_path}")
            print(f"Exists: {os.path.exists(resume_parser_path)}")

# Test if we can create the parser
try:
    parser = ResumeParser()
    print("\n✓ ResumeParser object created successfully!")
    
    # Test a method
    test_result = parser.extract_sections("Test text")
    print(f"✓ extract_sections method works: {len(test_result)} sections found")
    
except NameError:
    print("\n✗ Could not create ResumeParser object")
except Exception as e:
    print(f"\n✗ Error creating parser: {e}")
    