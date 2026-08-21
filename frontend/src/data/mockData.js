export const DEFAULT_CAREER_ROLES = [
  {
    id: 'data-analyst',
    title: 'DATA ANALYST',
    icon: '📊',
    iconName: 'BarChart3',
    description: 'Transform data into insights and help organizations make smarter decisions.',
    skills: ['SQL', 'Python', 'Power BI'],
    allRequiredSkills: ['SQL', 'Python', 'Excel', 'Power BI', 'Statistics', 'Tableau', 'Data Cleaning'],
    color: '#38BDF8',
    stats: '85k+ open jobs'
  },
  {
    id: 'software-developer',
    title: 'Software Developer',
    icon: '💻',
    iconName: 'Laptop',
    description: 'Build products & systems that scale to millions of users worldwide.',
    skills: ['JavaScript', 'React', 'Node.js'],
    allRequiredSkills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Git', 'Data Structures', 'REST APIs'],
    color: '#6366F1',
    stats: '140k+ open jobs'
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    icon: '🤖',
    iconName: 'Bot',
    description: 'Model the future using machine learning and advanced statistical algorithms.',
    skills: ['Python', 'Machine Learning', 'PyTorch'],
    allRequiredSkills: ['Python', 'Machine Learning', 'Linear Algebra', 'PyTorch', 'SQL', 'Scikit-Learn', 'Deep Learning'],
    color: '#A855F7',
    stats: '60k+ open jobs'
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    icon: '🔒',
    iconName: 'ShieldCheck',
    description: 'Protect what matters against evolving vulnerabilities and cyber threats.',
    skills: ['Network Security', 'Linux', 'SIEM'],
    allRequiredSkills: ['Network Security', 'Linux', 'SIEM', 'Penetration Testing', 'Wireshark', 'Cryptography'],
    color: '#F59E0B',
    stats: '50k+ open jobs'
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    icon: '🎨',
    iconName: 'Palette',
    description: 'Design experiences that delight users with intuitive, stunning interfaces.',
    skills: ['Figma', 'User Research', 'Wireframing'],
    allRequiredSkills: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Usability Testing'],
    color: '#EC4899',
    stats: '45k+ open jobs'
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud & DevOps Engineer',
    icon: '☁️',
    iconName: 'Cloud',
    description: 'Architect scalable cloud infrastructure, CI/CD pipelines and reliability.',
    skills: ['AWS', 'Docker', 'Kubernetes'],
    allRequiredSkills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux', 'Monitoring'],
    color: '#06B6D4',
    stats: '75k+ open jobs'
  }
];

export const POPULAR_SKILLS = [
  'Python', 'SQL', 'Excel', 'Power BI', 'Tableau', 'JavaScript', 'React', 'Node.js',
  'Git', 'HTML/CSS', 'Java', 'C++', 'C Programming', 'Digital Electronics',
  'Statistics', 'Machine Learning', 'Pandas', 'AWS', 'Docker', 'Figma', 'Linux'
];

export const SAMPLE_RESUME_TEXT = `SHIVEN SHARMA
Computer Science Undergraduate | Aspiring Data Analyst
Email: student@university.edu | GitHub: github.com/student | LinkedIn: linkedin.com/in/student

SUMMARY
Motivated student with a strong foundation in Python programming, Excel modeling, and data manipulation. Passionate about uncovering business insights and creating automated data pipelines. Seeking an entry-level Data Analyst role.

EDUCATION
B.Tech in Computer Science & Engineering | 2022 - 2026
Relevant Coursework: Database Management Systems, Object-Oriented Programming, C Programming, Digital Electronics, Probability & Statistics.

TECHNICAL SKILLS
- Languages & Tools: Python, Excel, Git, basic C Programming, Jupyter Notebooks
- Libraries: Pandas, NumPy, Matplotlib
- Core Competencies: Data Cleaning, Exploratory Data Analysis, Problem Solving

PROJECTS
1. E-Commerce Sales Insights (Python, Pandas, Excel)
- Processed 10,000+ transaction rows to compute monthly revenue trends and customer churn.
- Cleaned missing categorical fields and generated pivot summary tables.

2. Student Academic Performance Tracker (Python)
- Developed a command-line script to calculate GPA percentiles and export CSV reports.`;

export const MOCK_ANALYSIS_DATA = {
  "Data Analyst": {
    matched_skills: ["Python", "Excel"],
    missing_skills: ["SQL", "Statistics", "Power BI", "Tableau"],
    irrelevant_skills: ["C Programming", "Digital Electronics"],
    skill_match_percentage: 25,
    roadmap: [
      {
        step: 1,
        title: "Python & Excel",
        status: "completed",
        description: "Foundation in data manipulation & spreadsheets",
        skills: ["Python", "Excel"]
      },
      {
        step: 2,
        title: "SQL · NEXT",
        status: "active",
        description: "Relational databases, queries, JOINs & aggregation",
        skills: ["SQL", "PostgreSQL", "Database Design"],
        priority: "HIGH",
        insight: "Master SQL - one of the core skills missing from your profile."
      },
      {
        step: 3,
        title: "Statistics",
        status: "upcoming",
        description: "Probability, hypothesis testing & exploratory data analysis",
        skills: ["Hypothesis Testing", "A/B Testing", "Probability"]
      },
      {
        step: 4,
        title: "Power BI",
        status: "upcoming",
        description: "Interactive business dashboards and storytelling",
        skills: ["Power BI", "DAX", "Data Storytelling"]
      },
      {
        step: 5,
        title: "Career Ready",
        status: "target",
        description: "Interview prep, portfolio validation & application ready",
        skills: ["Mock Interviews", "Resume ATS", "Portfolio Review"]
      }
    ],
    suggested_projects: [
      {
        id: "proj-1",
        icon: "📊",
        title: "Sales Performance Dashboard",
        practice: "Practice: SQL + Power BI",
        level: "Beginner → Intermediate",
        description: "Design an end-to-end interactive dashboard for multi-region retail sales metrics.",
        tags: ["SQL", "Power BI", "Data Modeling"],
        deliverables: [
          "SQL schema & aggregated queries",
          "Star schema data model",
          "Interactive Power BI report with dynamic slicers"
        ],
        githubTemplate: "https://github.com/careeros-templates/sales-dashboard",
        starterCodeSnippet: `-- Query monthly regional sales volume
SELECT 
    region,
    DATE_TRUNC('month', order_date) AS sales_month,
    SUM(total_amount) AS revenue,
    COUNT(DISTINCT order_id) AS total_orders
FROM sales_transactions
GROUP BY 1, 2
ORDER BY sales_month DESC, revenue DESC;`
      },
      {
        id: "proj-2",
        icon: "🧹",
        title: "Data Cleaning Challenge",
        practice: "Practice: Python + Pandas",
        level: "Beginner → Intermediate",
        description: "Clean messy real-world customer datasets with missing values, format inconsistencies, and outliers.",
        tags: ["Python", "Pandas", "Data Integrity"],
        deliverables: [
          "Automated Pandas pipeline",
          "Data quality report",
          "Jupyter notebook showcase with before/after benchmarks"
        ],
        githubTemplate: "https://github.com/careeros-templates/data-cleaning-pipeline",
        starterCodeSnippet: `import pandas as pd
import numpy as np

# Load raw transaction logs
df = pd.read_csv('raw_customers.csv')

# Handle missing emails & normalize phone format
df['email'] = df['email'].fillna('unknown@domain.com')
df['phone'] = df['phone'].astype(str).str.replace(r'\\D', '', regex=True)

print(f"Cleaned dataset: {len(df)} records verified.")`
      }
    ],
    message: "AI analysis complete. You are 25% aligned with the Data Analyst role. Focus on SQL next!"
  }
};
