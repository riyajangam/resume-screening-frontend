# install_spacy.py
import subprocess
import sys

def install_spacy():
    print("Installing spaCy and dependencies...")
    
    packages = [
        'spacy==3.7.2',
        'PyPDF2==3.0.1',
        'python-docx==1.1.0'
    ]
    
    for package in packages:
        print(f"Installing {package}...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])
    
    print("\nDownloading spaCy model...")
    try:
        subprocess.check_call([sys.executable, "-m", "spacy", "download", "en_core_web_sm"])
        print("✅ spaCy model downloaded successfully!")
    except:
        print("⚠️  Could not download model automatically.")
        print("Run manually: python -m spacy download en_core_web_sm")
    
    print("\n✅ Installation complete!")
    print("Restart your Flask server to use spaCy PhraseMatcher.")

if __name__ == "__main__":
    install_spacy()