import re

def parse_resume_text(text):
    text = text.lower()

    SKILL_KEYWORDS = [
        "python", "java", "c++", "javascript", "react",
        "sql", "mongodb", "flask", "django", "node"
    ]

    skills = []
    for skill in SKILL_KEYWORDS:
        if skill in text:
            skills.append(skill.capitalize())

    education_found = "education" in text
    experience_found = "experience" in text or "internship" in text

    # 🚨 Resume validation rule
    is_valid_resume = education_found and len(skills) >= 2

    return {
        "skills": list(set(skills)),
        "education_found": education_found,
        "experience_found": experience_found,
        "is_valid_resume": is_valid_resume
    }
