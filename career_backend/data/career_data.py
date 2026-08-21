"""
career_data.py

Static knowledge base for the Career Roadmap & Skill Gap Analysis module.

There is NO database here on purpose (per hackathon requirements).
Everything lives in plain Python dictionaries so it's easy to read,
edit, and later migrate into a real database if needed.

Structure of CAREER_DATA[<career_name>]:
{
    "required_skills": [list of skills needed for this career],
    "skill_relevance": {
        # Optional overrides: skill -> True/False meaning
        # "is this skill considered relevant background for this career
        #  even if it's not strictly required".
        # Used to avoid flagging genuinely useful adjacent skills
        # (e.g. Excel for a Data Analyst) as irrelevant.
    },
    "roadmap": {
        "beginner":     {"duration": "...", "topics": [...]},
        "intermediate": {"duration": "...", "topics": [...]},
        "advanced":     {"duration": "...", "topics": [...]},
    },
    "projects": [list of suggested projects],
}
"""

CAREER_DATA = {
    "Data Analyst": {
        "required_skills": [
            "Python",
            "Excel",
            "SQL",
            "Statistics",
            "Data Visualization",
            "Power BI",
            "Pandas",
            "Data Cleaning",
        ],
        # Skills that are genuinely useful even though not in required_skills
        "adjacent_skills": ["R", "Google Sheets", "Tableau"],
        "roadmap": {
            "beginner": {
                "duration": "4-6 weeks",
                "topics": [
                    "Excel fundamentals (formulas, pivot tables, charts)",
                    "SQL basics (SELECT, WHERE, JOIN, GROUP BY)",
                    "Python basics (variables, loops, functions)",
                    "Statistics fundamentals (mean, median, mode, std dev)",
                ],
            },
            "intermediate": {
                "duration": "6-8 weeks",
                "topics": [
                    "Pandas & NumPy for data manipulation",
                    "Data cleaning and preprocessing techniques",
                    "Data visualization with Matplotlib/Seaborn",
                    "Power BI / Tableau dashboard building",
                    "Intermediate SQL (subqueries, window functions)",
                ],
            },
            "advanced": {
                "duration": "6-8 weeks",
                "topics": [
                    "A/B testing and hypothesis testing",
                    "Business storytelling with data",
                    "Automated reporting pipelines",
                    "Exploratory data analysis on real-world datasets",
                ],
            },
        },
        "projects": [
            "Sales performance dashboard using Power BI",
            "Customer churn analysis using Python & Pandas",
            "COVID-19 data trend analysis with SQL + visualization",
            "E-commerce sales EDA (Exploratory Data Analysis) project",
        ],
    },
    "Software Developer": {
        "required_skills": [
            "Python",
            "Data Structures",
            "Algorithms",
            "Git",
            "OOP",
            "REST APIs",
            "SQL",
            "Web Development",
        ],
        "adjacent_skills": ["C Programming", "Java", "JavaScript"],
        "roadmap": {
            "beginner": {
                "duration": "4-6 weeks",
                "topics": [
                    "Programming fundamentals in Python or Java",
                    "Object-Oriented Programming concepts",
                    "Git & GitHub version control",
                    "Basic data structures (arrays, lists, stacks, queues)",
                ],
            },
            "intermediate": {
                "duration": "8-10 weeks",
                "topics": [
                    "Algorithms (sorting, searching, recursion)",
                    "Database design & SQL",
                    "Building REST APIs (FastAPI/Flask/Node.js)",
                    "Frontend basics (HTML, CSS, React)",
                ],
            },
            "advanced": {
                "duration": "8-10 weeks",
                "topics": [
                    "System design fundamentals",
                    "Authentication & authorization",
                    "CI/CD and deployment (Docker, cloud basics)",
                    "Testing (unit tests, integration tests)",
                ],
            },
        },
        "projects": [
            "Full-stack To-Do app with React + FastAPI",
            "E-commerce REST API with authentication",
            "URL shortener service",
            "Personal portfolio website with a Python backend",
        ],
    },
    "Data Scientist": {
        "required_skills": [
            "Python",
            "Statistics",
            "Machine Learning",
            "Pandas",
            "NumPy",
            "SQL",
            "Data Visualization",
            "Deep Learning",
        ],
        "adjacent_skills": ["R", "Excel", "Cloud Computing"],
        "roadmap": {
            "beginner": {
                "duration": "6 weeks",
                "topics": [
                    "Python for data science (Pandas, NumPy)",
                    "Statistics & probability fundamentals",
                    "SQL for data extraction",
                    "Data visualization (Matplotlib/Seaborn)",
                ],
            },
            "intermediate": {
                "duration": "8-10 weeks",
                "topics": [
                    "Machine Learning fundamentals (regression, classification)",
                    "Scikit-learn model building & evaluation",
                    "Feature engineering",
                    "Model evaluation metrics",
                ],
            },
            "advanced": {
                "duration": "10-12 weeks",
                "topics": [
                    "Deep Learning basics (Neural Networks, TensorFlow/PyTorch)",
                    "NLP or Computer Vision specialization",
                    "Model deployment (Flask/FastAPI + cloud)",
                    "Working with big datasets and real-world case studies",
                ],
            },
        },
        "projects": [
            "House price prediction using regression",
            "Customer segmentation using clustering",
            "Sentiment analysis on social media data",
            "Image classification with a CNN",
        ],
    },
    "Cybersecurity Analyst": {
        "required_skills": [
            "Networking",
            "Linux",
            "Security Fundamentals",
            "Cryptography",
            "Ethical Hacking",
            "SIEM Tools",
            "Python",
        ],
        "adjacent_skills": ["Digital Electronics", "C Programming"],
        "roadmap": {
            "beginner": {
                "duration": "6 weeks",
                "topics": [
                    "Networking fundamentals (OSI model, TCP/IP)",
                    "Linux command line basics",
                    "Introduction to security concepts (CIA triad)",
                    "Basic cryptography concepts",
                ],
            },
            "intermediate": {
                "duration": "8 weeks",
                "topics": [
                    "Ethical hacking fundamentals (footprinting, scanning)",
                    "Vulnerability assessment tools (Nmap, Wireshark)",
                    "Web application security (OWASP Top 10)",
                    "Scripting for security automation with Python",
                ],
            },
            "advanced": {
                "duration": "8-10 weeks",
                "topics": [
                    "SIEM tools & log analysis (Splunk, ELK)",
                    "Incident response and threat hunting",
                    "Penetration testing methodology",
                    "Security certifications prep (Security+, CEH basics)",
                ],
            },
        },
        "projects": [
            "Home lab network vulnerability scan report",
            "Build a simple intrusion detection script in Python",
            "Web app penetration test on a deliberately vulnerable app (DVWA)",
            "Log analysis dashboard for detecting suspicious activity",
        ],
    },
    "UI/UX Designer": {
        "required_skills": [
            "Figma",
            "Wireframing",
            "User Research",
            "Prototyping",
            "Design Systems",
            "Visual Design",
            "Usability Testing",
        ],
        "adjacent_skills": ["HTML", "CSS"],
        "roadmap": {
            "beginner": {
                "duration": "4 weeks",
                "topics": [
                    "Design fundamentals (color, typography, layout)",
                    "Figma basics",
                    "Wireframing low-fidelity screens",
                    "Understanding user personas",
                ],
            },
            "intermediate": {
                "duration": "6 weeks",
                "topics": [
                    "User research methods & interviews",
                    "High-fidelity prototyping in Figma",
                    "Design systems and component libraries",
                    "Basic HTML/CSS to understand implementation",
                ],
            },
            "advanced": {
                "duration": "6-8 weeks",
                "topics": [
                    "Usability testing and iteration",
                    "Interaction design & micro-animations",
                    "Building an end-to-end case study",
                    "Portfolio building for job applications",
                ],
            },
        },
        "projects": [
            "Redesign a popular app's onboarding flow",
            "End-to-end UX case study for a food delivery app",
            "Design system for a fictional startup",
            "Mobile app prototype with full user flow in Figma",
        ],
    },
}

VALID_CAREERS = list(CAREER_DATA.keys())
