# # backend/utils/skill_extractor.py
# import spacy
# from spacy.matcher import PhraseMatcher
# from typing import List, Dict, Set, Tuple
# import re
# from .text_cleaner import clean_text, normalize_skill_name
# from .skill_database import ALL_SKILLS, SKILL_DATABASE, SKILL_ALIASES

# class SkillExtractor:
#     def __init__(self, model_name: str = "en_core_web_sm"):
#         """
#         Initialize spaCy NLP model and PhraseMatcher
#         """
#         try:
#             self.nlp = spacy.load(model_name)
#         except:
#             # If model not found, download it
#             import subprocess
#             subprocess.run(["python", "-m", "spacy", "download", model_name])
#             self.nlp = spacy.load(model_name)
        
#         self.matcher = PhraseMatcher(self.nlp.vocab, attr="LOWER")
#         self._initialize_matcher()
    
#     def _initialize_matcher(self):
#         """
#         Initialize PhraseMatcher with skills from database
#         """
#         # Add all skills to matcher
#         for skill in ALL_SKILLS:
#             # Create pattern for skill
#             skill_patterns = [skill]
            
#             # Add variations
#             if ' ' in skill:
#                 # For multi-word skills, add version without spaces
#                 skill_patterns.append(skill.replace(' ', ''))
#                 skill_patterns.append(skill.replace(' ', '-'))
            
#             # Add patterns to matcher
#             for pattern in skill_patterns:
#                 doc = self.nlp(pattern)
#                 if len(doc) > 0:  # Ensure valid pattern
#                     self.matcher.add("SKILL", [doc])
        
#         # Add common abbreviations and variations
#         for alias, full_name in SKILL_ALIASES.items():
#             doc = self.nlp(alias)
#             if len(doc) > 0:
#                 self.matcher.add("SKILL_ALIAS", [doc])
    
#     def extract_skills(self, text: str) -> Dict[str, List[str]]:
#         """
#         Extract skills from text using multiple methods
#         """
#         if not text or not text.strip():
#             return {"skills": [], "categories": {}}
        
#         # Clean text
#         clean_text_content = clean_text(text)
        
#         # Method 1: spaCy PhraseMatcher
#         spacy_skills = self._extract_with_spacy(clean_text_content)
        
#         # Method 2: Keyword matching (as fallback)
#         keyword_skills = self._extract_with_keywords(clean_text_content)
        
#         # Method 3: Section-based extraction
#         section_skills = self._extract_from_sections(clean_text_content)
        
#         # Combine all skills
#         all_skills = set()
#         all_skills.update(spacy_skills)
#         all_skills.update(keyword_skills)
#         all_skills.update(section_skills)
        
#         # Normalize skill names
#         normalized_skills = set()
#         for skill in all_skills:
#             normalized = normalize_skill_name(skill)
#             if normalized:
#                 # Check if alias exists
#                 normalized = SKILL_ALIASES.get(normalized, normalized)
#                 normalized_skills.add(normalized.title())
        
#         # Categorize skills
#         categorized = self._categorize_skills(list(normalized_skills))
        
#         return {
#             "skills": sorted(list(normalized_skills)),
#             "categories": categorized,
#             "count": len(normalized_skills)
#         }
    
#     def _extract_with_spacy(self, text: str) -> Set[str]:
#         """
#         Extract skills using spaCy PhraseMatcher
#         """
#         doc = self.nlp(text)
#         matches = self.matcher(doc)
        
#         skills = set()
#         for match_id, start, end in matches:
#             span = doc[start:end]
#             skill_text = span.text.lower()
            
#             # Validate it's actually a skill (not just common word)
#             if self._is_valid_skill(skill_text, doc, start, end):
#                 skills.add(skill_text)
        
#         return skills
    
#     def _extract_with_keywords(self, text: str) -> Set[str]:
#         """
#         Fallback keyword-based extraction
#         """
#         skills = set()
#         words = re.findall(r'\b[\w+#.-]+\b', text.lower())
        
#         for word in words:
#             # Check single words
#             if word in ALL_SKILLS:
#                 skills.add(word)
            
#             # Check bi-grams
#             if len(word) > 2:  # Avoid very short words
#                 for skill in ALL_SKILLS:
#                     if ' ' in skill and word in skill:
#                         # Check if surrounding context matches
#                         skills.add(skill)
        
#         return skills
    
#     def _extract_from_sections(self, text: str) -> Set[str]:
#         """
#         Extract skills specifically from skills section
#         """
#         skills = set()
        
#         # Look for skills section
#         skills_section_patterns = [
#             r'skills?\s*[:]?(.*?)(?=(experience|education|projects|certifications|$))',
#             r'technical\s+skills?\s*[:]?(.*?)(?=(experience|education|projects|certifications|$))',
#             r'competencies?\s*[:]?(.*?)(?=(experience|education|projects|certifications|$))'
#         ]
        
#         for pattern in skills_section_patterns:
#             matches = re.search(pattern, text, re.IGNORECASE | re.DOTALL)
#             if matches:
#                 skills_text = matches.group(1)
#                 # Split by common delimiters
#                 skill_items = re.split(r'[,;•\-·\n|]', skills_text)
#                 for item in skill_items:
#                     item = item.strip()
#                     if item and len(item) > 1:
#                         normalized = normalize_skill_name(item)
#                         if normalized in ALL_SKILLS:
#                             skills.add(normalized)
        
#         return skills
    
#     def _is_valid_skill(self, text: str, doc, start: int, end: int) -> bool:
#         """
#         Validate if matched text is actually a skill (not common word)
#         """
#         # Skip very common short words
#         if len(text) < 3:
#             return False
        
#         # Check if it's in our skill database
#         if text not in ALL_SKILLS:
#             # Check aliases
#             if text not in SKILL_ALIASES:
#                 return False
        
#         # Check part-of-speech (optional, for better filtering)
#         try:
#             # Skip if it's likely a verb
#             pos = doc[start].pos_
#             if pos == "VERB":
#                 return False
#         except:
#             pass
        
#         return True
    
#     def _categorize_skills(self, skills: List[str]) -> Dict[str, List[str]]:
#         """
#         Categorize skills into groups
#         """
#         categorized = {category: [] for category in SKILL_DATABASE.keys()}
        
#         for skill in skills:
#             skill_lower = skill.lower()
#             found = False
            
#             for category, skill_set in SKILL_DATABASE.items():
#                 if skill_lower in skill_set:
#                     categorized[category].append(skill)
#                     found = True
#                     break
            
#             if not found:
#                 # Check aliases
#                 aliased = SKILL_ALIASES.get(skill_lower, skill_lower)
#                 for category, skill_set in SKILL_DATABASE.items():
#                     if aliased in skill_set:
#                         categorized[category].append(skill)
#                         break
#                 else:
#                     # Add to uncategorized
#                     if 'uncategorized' not in categorized:
#                         categorized['uncategorized'] = []
#                     categorized['uncategorized'].append(skill)
        
#         # Remove empty categories
#         return {k: v for k, v in categorized.items() if v}




# utils/skill_extractor.py - Minimal version without spaCy
import logging

logger = logging.getLogger(__name__)

class SimpleSkillExtractor:
    def __init__(self):
        self.skills_database = {
            "Programming": ["Python", "JavaScript", "Java", "C++", "C#", "Ruby", "Go", "Swift"],
            "Web": ["HTML", "CSS", "React", "Angular", "Vue", "Node.js", "Express", "Django", "Flask"],
            "Database": ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "Redis"],
            "Cloud": ["AWS", "Azure", "Docker", "Kubernetes", "Linux"],
            "Tools": ["Git", "GitHub", "JIRA", "VS Code", "PyCharm"]
        }
        
        # Create a flat list of all skills
        self.all_skills = []
        for category, skills in self.skills_database.items():
            self.all_skills.extend([skill.lower() for skill in skills])
    
    def extract_skills(self, text):
        """Simple skill extraction without NLP"""
        if not text:
            return []
        
        text_lower = text.lower()
        found_skills = []
        
        for skill in self.all_skills:
            if skill in text_lower:
                # Convert to title case for display
                found_skills.append(skill.title())
        
        # Remove duplicates while preserving order
        unique_skills = []
        for skill in found_skills:
            if skill not in unique_skills:
                unique_skills.append(skill)
        
        logger.info(f"Found {len(unique_skills)} skills")
        return unique_skills
    
    def categorize_skills(self, skills):
        """Categorize skills"""
        categorized = {}
        skills_lower = [s.lower() for s in skills]
        
        for category, category_skills in self.skills_database.items():
            for skill in category_skills:
                if skill.lower() in skills_lower:
                    if category not in categorized:
                        categorized[category] = []
                    categorized[category].append(skill)
        
        return categorized