# # backend/utils/text_cleaner.py
# import re
# import unicodedata

# def clean_text(text):
#     """
#     Clean and normalize text for better parsing
#     """
#     if not text:
#         return ""
    
#     # Remove non-ASCII characters but keep common symbols
#     text = unicodedata.normalize('NFKD', text).encode('ASCII', 'ignore').decode()
    
#     # Replace multiple spaces/newlines/tabs with single space
#     text = re.sub(r'\s+', ' ', text)
    
#     # Remove special characters but keep basic punctuation
#     text = re.sub(r'[^\w\s.,;:!?()\-/&+]', ' ', text)
    
#     # Convert to lowercase for consistency
#     text = text.lower()
    
#     # Remove extra whitespace
#     text = text.strip()
    
#     return text

# def normalize_skill_name(skill):
#     """
#     Normalize skill names for consistent matching
#     """
#     skill = skill.lower().strip()
    
#     # Remove version numbers
#     skill = re.sub(r'\s*\d+(\.\d+)*', '', skill)
    
#     # Remove common suffixes
#     skill = re.sub(r'\s*(framework|library|tool|software|technology)$', '', skill)
    
#     # Normalize spacing around symbols
#     skill = skill.replace(' +', '+').replace('+ ', '+')
#     skill = skill.replace(' .', '.').replace('. ', '.')
#     skill = skill.replace(' #', '#').replace('# ', '#')
    
#     return skill.strip()


# utils/text_cleaner.py
import re
import logging

logger = logging.getLogger(__name__)

def clean_text(text):
    """
    Clean and preprocess extracted text
    """
    if not text:
        return ""
    
    try:
        # Remove excessive whitespace
        text = re.sub(r'\s+', ' ', text)
        
        # Remove special characters but keep basic punctuation
        text = re.sub(r'[^\w\s.,!?-]', ' ', text)
        
        # Remove multiple consecutive dots
        text = re.sub(r'\.{2,}', '.', text)
        
        # Normalize line endings
        text = text.replace('\r\n', '\n').replace('\r', '\n')
        
        # Strip leading/trailing whitespace
        text = text.strip()
        
        logger.info(f"Cleaned text from {len(text)} to {len(text)} characters")
        return text
        
    except Exception as e:
        logger.error(f"Error cleaning text: {str(e)}")
        return text