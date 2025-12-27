# fix_imports.py
import os
import sys
import subprocess

def check_and_install():
    """Check and install required packages"""
    print("Checking Python environment...")
    
    # Check Python version
    python_version = sys.version_info
    print(f"Python version: {python_version.major}.{python_version.minor}.{python_version.micro}")
    
    # Try to import Flask
    try:
        import flask
        print(f"✓ Flask is installed: {flask.__version__}")
    except ImportError:
        print("✗ Flask not found. Installing...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "Flask==2.3.3"])
    
    # Try to import Flask-CORS
    try:
        import flask_cors
        print(f"✓ Flask-CORS is installed")
    except ImportError:
        print("✗ Flask-CORS not found. Installing...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "Flask-CORS==4.0.0"])
    
    print("\nCreating necessary directories...")
    
    # Create directories
    dirs = ['uploads/resumes', 'logs', 'routes', 'utils']
    for dir_path in dirs:
        os.makedirs(dir_path, exist_ok=True)
        print(f"Created directory: {dir_path}")
    
    print("\n✅ Setup complete!")
    print("\nTo run the backend:")
    print("1. Navigate to the backend folder")
    print("2. Run: python app_simple.py")
    print("3. Server will start at: http://localhost:5000")

if __name__ == '__main__':
    check_and_install()