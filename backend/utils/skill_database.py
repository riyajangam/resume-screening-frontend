# # backend/utils/skill_database.py
# """
# Comprehensive skill database for extraction
# Organized by categories for better matching
# """

# SKILL_DATABASE = {
#     # Programming Languages
#     "programming": {
#         "python", "javascript", "java", "c++", "c#", "php", "ruby", "swift", "kotlin",
#         "typescript", "go", "rust", "scala", "r", "matlab", "perl", "bash", "shell",
#         "html", "css", "sass", "less", "dart", "haskell", "lua", "groovy", "objective-c"
#     },
    
#     # Web Development
#     "web": {
#         "react", "angular", "vue", "django", "flask", "express", "spring", "laravel",
#         "node.js", "nodejs", "next.js", "nuxt.js", "jquery", "bootstrap", "tailwind",
#         "wordpress", "drupal", "joomla", "graphql", "rest api", "soap", "webpack",
#         "gulp", "grunt", "npm", "yarn"
#     },
    
#     # Mobile Development
#     "mobile": {
#         "react native", "flutter", "android", "ios", "xamarin", "ionic", "cordova",
#         "swiftui", "jetpack compose", "kotlin multiplatform"
#     },
    
#     # Databases
#     "database": {
#         "mysql", "postgresql", "mongodb", "redis", "oracle", "sql server", "sqlite",
#         "cassandra", "elasticsearch", "dynamodb", "firebase", "mariadb", "neo4j",
#         "cosmos db", "couchbase", "arangodb"
#     },
    
#     # Cloud & DevOps
#     "cloud_devops": {
#         "aws", "azure", "google cloud", "gcp", "docker", "kubernetes", "jenkins",
#         "gitlab ci", "github actions", "terraform", "ansible", "chef", "puppet",
#         "linux", "ubuntu", "centos", "debian", "nginx", "apache", "ci/cd",
#         "microservices", "serverless", "lambda"
#     },
    
#     # Data Science & ML
#     "data_science": {
#         "pandas", "numpy", "scikit-learn", "tensorflow", "pytorch", "keras",
#         "opencv", "nltk", "spacy", "tableau", "power bi", "apache spark",
#         "hadoop", "hive", "pig", "kafka", "airflow", "jupyter", "databricks",
#         "machine learning", "deep learning", "computer vision", "nlp"
#     },
    
#     # Soft Skills & Tools
#     "soft_skills": {
#         "communication", "leadership", "teamwork", "problem solving", "time management",
#         "project management", "agile", "scrum", "kanban", "jira", "confluence",
#         "trello", "asana", "slack", "microsoft office", "excel", "powerpoint",
#         "word", "outlook", "google workspace"
#     },
    
#     # Frameworks & Libraries
#     "frameworks": {
#         "spring boot", ".net", "asp.net", "entity framework", "hibernate",
#         "pytest", "jest", "mocha", "chai", "selenium", "cypress", "junit",
#         "testng", "log4j", "logback", "slf4j"
#     }
# }

# # Create a flattened set for easy matching
# ALL_SKILLS = set()
# for category in SKILL_DATABASE.values():
#     ALL_SKILLS.update(category)

# # Aliases and variations
# SKILL_ALIASES = {
#     "js": "javascript",
#     "py": "python",
#     "cplusplus": "c++",
#     "csharp": "c#",
#     "node": "node.js",
#     "reactjs": "react",
#     "vuejs": "vue",
#     "angularjs": "angular",
#     "postgres": "postgresql",
#     "mongo": "mongodb",
#     "gcp": "google cloud",
#     "aws cloud": "aws",
#     "azure cloud": "azure",
#     "ml": "machine learning",
#     "dl": "deep learning",
#     "cv": "computer vision"
# }

# backend/utils/skill_database.py
"""
Comprehensive skill database for extraction
"""

SKILL_DATABASE = {
    "programming": {
        "python", "javascript", "java", "c++", "c#", "php", "ruby", "swift", "kotlin",
        "typescript", "go", "rust", "scala", "r", "matlab", "perl", "bash", "shell",
        "html", "css", "sass", "less", "dart", "haskell", "lua", "groovy", "objective-c"
    },
    "web": {
        "react", "angular", "vue", "django", "flask", "express", "spring", "laravel",
        "node.js", "nodejs", "next.js", "nuxt.js", "jquery", "bootstrap", "tailwind",
        "wordpress", "drupal", "joomla", "graphql", "rest api", "soap", "webpack",
        "gulp", "grunt", "npm", "yarn"
    },
    "mobile": {
        "react native", "flutter", "android", "ios", "xamarin", "ionic", "cordova",
        "swiftui", "jetpack compose", "kotlin multiplatform"
    },
    "database": {
        "mysql", "postgresql", "mongodb", "redis", "oracle", "sql server", "sqlite",
        "cassandra", "elasticsearch", "dynamodb", "firebase", "mariadb", "neo4j",
        "cosmos db", "couchbase", "arangodb"
    },
    "cloud_devops": {
        "aws", "azure", "google cloud", "gcp", "docker", "kubernetes", "jenkins",
        "gitlab ci", "github actions", "terraform", "ansible", "chef", "puppet",
        "linux", "ubuntu", "centos", "debian", "nginx", "apache", "ci/cd",
        "microservices", "serverless", "lambda"
    },
    "data_science": {
        "pandas", "numpy", "scikit-learn", "tensorflow", "pytorch", "keras",
        "opencv", "nltk", "spacy", "tableau", "power bi", "apache spark",
        "hadoop", "hive", "pig", "kafka", "airflow", "jupyter", "databricks",
        "machine learning", "deep learning", "computer vision", "nlp"
    },
    "soft_skills": {
        "communication", "leadership", "teamwork", "problem solving", "time management",
        "project management", "agile", "scrum", "kanban", "jira", "confluence",
        "trello", "asana", "slack", "microsoft office", "excel", "powerpoint",
        "word", "outlook", "google workspace"
    },
    "frameworks": {
        "spring boot", ".net", "asp.net", "entity framework", "hibernate",
        "pytest", "jest", "mocha", "chai", "selenium", "cypress", "junit",
        "testng", "log4j", "logback", "slf4j"
    }
}

# Create a flattened set for easy matching
ALL_SKILLS = set()
for category in SKILL_DATABASE.values():
    ALL_SKILLS.update(category)

# Aliases and variations
SKILL_ALIASES = {
    "js": "javascript",
    "py": "python",
    "cplusplus": "c++",
    "csharp": "c#",
    "node": "node.js",
    "reactjs": "react",
    "vuejs": "vue",
    "angularjs": "angular",
    "postgres": "postgresql",
    "mongo": "mongodb",
    "gcp": "google cloud",
    "aws cloud": "aws",
    "azure cloud": "azure",
    "ml": "machine learning",
    "dl": "deep learning",
    "cv": "computer vision"
}