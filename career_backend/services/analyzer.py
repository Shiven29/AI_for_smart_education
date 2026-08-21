"""
analyzer.py

Core logic for the Career Roadmap & Skill Gap Analysis module.
Pure functions only — no FastAPI/Pydantic imports here — so this
logic is easy to unit test on its own.
"""

from typing import List, Dict
from data.career_data import CAREER_DATA


def _normalize(skill: str) -> str:
    """Lowercase + strip so comparisons are case-insensitive."""
    return skill.strip().lower()


def analyze_career(name: str, career_goal: str, current_skills: List[str]) -> Dict:
    """
    Compares the student's current skills against the requirements
    of the selected career and builds a full response payload.
    """
    career_info = CAREER_DATA[career_goal]  # caller must validate existence first

    required_skills = career_info["required_skills"]
    adjacent_skills = career_info.get("adjacent_skills", [])
    roadmap = career_info["roadmap"]
    projects = career_info["projects"]

    # Normalized lookup sets for comparison
    required_lookup = {_normalize(s): s for s in required_skills}
    adjacent_lookup = {_normalize(s) for s in adjacent_skills}

    matched_skills = []
    irrelevant_skills = []

    for skill in current_skills:
        norm = _normalize(skill)
        if norm in required_lookup:
            matched_skills.append(required_lookup[norm])
        elif norm in adjacent_lookup:
            # Useful background skill, but not core-required.
            # Not flagged as irrelevant, just not counted as "matched".
            continue
        else:
            irrelevant_skills.append(skill)

    missing_skills = [
        skill for skill in required_skills
        if _normalize(skill) not in {_normalize(s) for s in current_skills}
    ]

    total_required = len(required_skills)
    match_percentage = (
        round((len(matched_skills) / total_required) * 100, 2)
        if total_required else 0.0
    )

    message = (
        f"You currently match {len(matched_skills)} out of {total_required} "
        f"core skills required for {career_goal}. Follow the roadmap below "
        f"to close the remaining skill gaps."
    )

    return {
        "name": name,
        "career_goal": career_goal,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "irrelevant_skills": irrelevant_skills,
        "skill_match_percentage": match_percentage,
        "roadmap": roadmap,
        "suggested_projects": projects,
        "message": message,
    }
