"""
resume_analyzer.py

Phase 2: Resume Analyzer & ATS-style Match Score.

Pure functions only (no FastAPI/Pydantic imports) — mirrors the style of
services/analyzer.py from Phase 1. Reuses CAREER_DATA from Phase 1 instead
of redefining any skill/career data.
"""

import re
from typing import List, Dict
from data.career_data import CAREER_DATA


# Keywords that suggest the resume mentions hands-on project/work experience,
# as opposed to just listing skills. Used to tailor improvement suggestions.
PROJECT_KEYWORDS = [
    "project", "projects", "built", "developed", "implemented",
    "internship", "worked on", "created", "designed", "deployed",
    "analysis", "case study",
]


def _normalize(text: str) -> str:
    """Lowercase for case-insensitive comparison."""
    return text.lower().strip()


def _skill_found_in_text(skill: str, normalized_resume: str) -> bool:
    """
    Checks whether a skill appears in the resume text.
    Uses word-boundary-aware matching so short skills like 'R' or 'C'
    don't accidentally match inside unrelated words.
    """
    pattern = r"\b" + re.escape(skill.lower()) + r"\b"
    return re.search(pattern, normalized_resume) is not None


def _contains_project_keywords(normalized_resume: str) -> bool:
    return any(keyword in normalized_resume for keyword in PROJECT_KEYWORDS)


def analyze_resume(name: str, career_goal: str, resume_text: str) -> Dict:
    """
    Compares resume_text against the required_skills and adjacent_skills
    for the selected career (reused from CAREER_DATA) and builds a full
    ATS-style match report.

    Caller must validate that career_goal exists in CAREER_DATA before
    calling this function (same pattern as analyze_career in Phase 1).
    """
    career_info = CAREER_DATA[career_goal]
    required_skills = career_info["required_skills"]
    adjacent_skills = career_info.get("adjacent_skills", [])

    normalized_resume = _normalize(resume_text)

    matched_required_skills = [
        skill for skill in required_skills
        if _skill_found_in_text(skill, normalized_resume)
    ]

    missing_skills = [
        skill for skill in required_skills
        if skill not in matched_required_skills
    ]

    relevant_adjacent_skills = [
        skill for skill in adjacent_skills
        if _skill_found_in_text(skill, normalized_resume)
    ]

    # detected_skills = every skill (required or adjacent) actually found
    # in the resume text, in the order they appear in CAREER_DATA.
    detected_skills = matched_required_skills + relevant_adjacent_skills

    total_required = len(required_skills)
    resume_match_percentage = (
        round((len(matched_required_skills) / total_required) * 100, 2)
        if total_required else 0.0
    )

    has_project_mentions = _contains_project_keywords(normalized_resume)

    improvement_suggestions = _build_suggestions(
        career_goal=career_goal,
        missing_skills=missing_skills,
        has_project_mentions=has_project_mentions,
        resume_match_percentage=resume_match_percentage,
    )

    message = (
        f"Your resume matches {len(matched_required_skills)} out of "
        f"{total_required} core skills required for {career_goal} "
        f"({resume_match_percentage}% match)."
    )

    return {
        "name": name,
        "career_goal": career_goal,
        "detected_skills": detected_skills,
        "matched_required_skills": matched_required_skills,
        "missing_skills": missing_skills,
        "relevant_adjacent_skills": relevant_adjacent_skills,
        "resume_match_percentage": resume_match_percentage,
        "improvement_suggestions": improvement_suggestions,
        "message": message,
    }


def _build_suggestions(
    career_goal: str,
    missing_skills: List[str],
    has_project_mentions: bool,
    resume_match_percentage: float,
) -> List[str]:
    """Generates simple, rule-based improvement suggestions."""
    suggestions: List[str] = []

    if missing_skills:
        shown = ", ".join(missing_skills[:5])
        suggestions.append(
            f"Add or highlight these missing skills relevant to {career_goal}: {shown}."
        )

    if not has_project_mentions:
        suggestions.append(
            "Mention specific projects or work experience (e.g. 'Built', "
            "'Developed', 'Implemented') — ATS systems and recruiters weigh "
            "demonstrated experience heavily, not just a skills list."
        )

    if resume_match_percentage < 50:
        suggestions.append(
            f"Your resume match score is below 50% for {career_goal}. "
            "Consider tailoring your resume more closely to this role before applying."
        )
    elif resume_match_percentage < 80:
        suggestions.append(
            "You're a reasonable match — filling in the remaining missing "
            "skills above could meaningfully strengthen your resume."
        )
    else:
        suggestions.append(
            f"Strong match for {career_goal}! Make sure the missing skills "
            "(if any) are at least mentioned if you have exposure to them."
        )

    if not suggestions:
        suggestions.append("Your resume looks well-aligned with this career goal.")

    return suggestions
