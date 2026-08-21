"""
interview_data.py

Static question bank for the Placement Readiness & Mock Interview module
(Phase 3). Mirrors the style of data/career_data.py — plain Python
dictionaries, no database.

Structure of INTERVIEW_DATA[<career_name>]:
[
    {
        "question": "...",
        "category": "Technical" | "Behavioral" | "Conceptual" | "Tools" | ...,
        "difficulty": "Beginner" | "Intermediate" | "Advanced",
        "expected_keywords": [list of keywords a good answer should mention],
    },
    ...
]

Career names match CAREER_DATA in data/career_data.py exactly, so both
modules stay in sync.
"""

INTERVIEW_DATA = {
    "Data Analyst": [
        {
            "question": "What is the difference between WHERE and HAVING in SQL?",
            "category": "Technical",
            "difficulty": "Beginner",
            "expected_keywords": ["WHERE", "HAVING", "filter", "aggregate", "group by"],
        },
        {
            "question": "How would you handle missing or null values in a dataset?",
            "category": "Technical",
            "difficulty": "Intermediate",
            "expected_keywords": ["missing values", "null", "mean", "median", "drop", "imputation"],
        },
        {
            "question": "What is a pivot table and when would you use one?",
            "category": "Tools",
            "difficulty": "Beginner",
            "expected_keywords": ["pivot table", "summarize", "excel", "aggregate", "rows", "columns"],
        },
        {
            "question": "Explain the difference between correlation and causation.",
            "category": "Conceptual",
            "difficulty": "Intermediate",
            "expected_keywords": ["correlation", "causation", "relationship", "cause", "variable"],
        },
        {
            "question": "Describe a data analysis project you have worked on and the impact it had.",
            "category": "Behavioral",
            "difficulty": "Beginner",
            "expected_keywords": ["project", "data", "insight", "impact", "result"],
        },
        {
            "question": "What are window functions in SQL and why are they useful?",
            "category": "Technical",
            "difficulty": "Advanced",
            "expected_keywords": ["window function", "partition by", "rank", "row_number", "over"],
        },
    ],
    "Software Developer": [
        {
            "question": "What is the difference between an array and a linked list?",
            "category": "Technical",
            "difficulty": "Beginner",
            "expected_keywords": ["array", "linked list", "memory", "index", "pointer", "insertion"],
        },
        {
            "question": "Explain the concept of Object-Oriented Programming and its main principles.",
            "category": "Conceptual",
            "difficulty": "Beginner",
            "expected_keywords": ["encapsulation", "inheritance", "polymorphism", "abstraction", "class", "object"],
        },
        {
            "question": "What is the time complexity of binary search and why?",
            "category": "Technical",
            "difficulty": "Intermediate",
            "expected_keywords": ["binary search", "log n", "sorted", "divide", "complexity"],
        },
        {
            "question": "What is a REST API and what makes it 'RESTful'?",
            "category": "Technical",
            "difficulty": "Intermediate",
            "expected_keywords": ["rest", "api", "http", "stateless", "endpoint", "get", "post"],
        },
        {
            "question": "Describe a challenging bug you fixed and how you approached debugging it.",
            "category": "Behavioral",
            "difficulty": "Beginner",
            "expected_keywords": ["bug", "debug", "issue", "fix", "test"],
        },
        {
            "question": "What is the difference between SQL and NoSQL databases?",
            "category": "Technical",
            "difficulty": "Advanced",
            "expected_keywords": ["sql", "nosql", "schema", "relational", "scalability", "document"],
        },
    ],
    "Data Scientist": [
        {
            "question": "What is the difference between supervised and unsupervised learning?",
            "category": "Conceptual",
            "difficulty": "Beginner",
            "expected_keywords": ["supervised", "unsupervised", "labeled", "clustering", "regression", "classification"],
        },
        {
            "question": "What is overfitting and how can you prevent it?",
            "category": "Technical",
            "difficulty": "Intermediate",
            "expected_keywords": ["overfitting", "regularization", "cross-validation", "training", "generalize"],
        },
        {
            "question": "Explain the bias-variance tradeoff.",
            "category": "Conceptual",
            "difficulty": "Advanced",
            "expected_keywords": ["bias", "variance", "tradeoff", "underfitting", "overfitting"],
        },
        {
            "question": "What evaluation metrics would you use for a classification problem?",
            "category": "Technical",
            "difficulty": "Intermediate",
            "expected_keywords": ["accuracy", "precision", "recall", "f1", "confusion matrix"],
        },
        {
            "question": "Describe a machine learning project you built end-to-end.",
            "category": "Behavioral",
            "difficulty": "Beginner",
            "expected_keywords": ["model", "data", "project", "train", "result"],
        },
        {
            "question": "What is the difference between a CNN and an RNN, and when would you use each?",
            "category": "Technical",
            "difficulty": "Advanced",
            "expected_keywords": ["cnn", "rnn", "image", "sequence", "convolution", "recurrent"],
        },
    ],
    "Cybersecurity Analyst": [
        {
            "question": "What is the CIA triad in cybersecurity?",
            "category": "Conceptual",
            "difficulty": "Beginner",
            "expected_keywords": ["confidentiality", "integrity", "availability", "cia triad"],
        },
        {
            "question": "What is the difference between symmetric and asymmetric encryption?",
            "category": "Technical",
            "difficulty": "Intermediate",
            "expected_keywords": ["symmetric", "asymmetric", "encryption", "public key", "private key"],
        },
        {
            "question": "What is a firewall and how does it protect a network?",
            "category": "Technical",
            "difficulty": "Beginner",
            "expected_keywords": ["firewall", "traffic", "filter", "network", "rules"],
        },
        {
            "question": "Explain SQL injection and how to prevent it.",
            "category": "Technical",
            "difficulty": "Intermediate",
            "expected_keywords": ["sql injection", "input validation", "parameterized query", "sanitize"],
        },
        {
            "question": "Describe how you would respond to a suspected security breach.",
            "category": "Behavioral",
            "difficulty": "Intermediate",
            "expected_keywords": ["incident response", "contain", "investigate", "log", "report"],
        },
        {
            "question": "What is penetration testing and what are its main phases?",
            "category": "Technical",
            "difficulty": "Advanced",
            "expected_keywords": ["penetration testing", "reconnaissance", "scanning", "exploitation", "reporting"],
        },
    ],
    "UI/UX Designer": [
        {
            "question": "What is the difference between UI and UX design?",
            "category": "Conceptual",
            "difficulty": "Beginner",
            "expected_keywords": ["ui", "ux", "interface", "experience", "usability"],
        },
        {
            "question": "What is a wireframe and why is it useful early in the design process?",
            "category": "Tools",
            "difficulty": "Beginner",
            "expected_keywords": ["wireframe", "layout", "low-fidelity", "structure", "prototype"],
        },
        {
            "question": "How do you conduct user research before designing a product?",
            "category": "Technical",
            "difficulty": "Intermediate",
            "expected_keywords": ["user research", "interview", "persona", "survey", "usability testing"],
        },
        {
            "question": "What is a design system and why do teams use one?",
            "category": "Conceptual",
            "difficulty": "Intermediate",
            "expected_keywords": ["design system", "consistency", "components", "reusable", "style guide"],
        },
        {
            "question": "Describe a project where user feedback changed your design.",
            "category": "Behavioral",
            "difficulty": "Beginner",
            "expected_keywords": ["feedback", "user", "iterate", "design", "test"],
        },
        {
            "question": "How do you approach accessibility in your designs?",
            "category": "Technical",
            "difficulty": "Advanced",
            "expected_keywords": ["accessibility", "contrast", "screen reader", "wcag", "inclusive"],
        },
    ],
}
