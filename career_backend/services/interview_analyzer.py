"""
interview_analyzer.py

Phase 3: Placement Readiness & Mock Interview.

Pure functions only (no FastAPI/Pydantic imports) — mirrors the style of
services/analyzer.py and services/resume_analyzer.py from Phases 1 and 2.

No external AI API, no database — simple, reliable keyword-based logic,
built for a 2-day hackathon.
"""

import re
from typing import List, Dict
from data.interview_data import INTERVIEW_DATA


def _normalize(text: str) -> str:
    """Lowercase for case-insensitive comparison."""
    return text.lower().strip()


def _keyword_found_in_text(keyword: str, normalized_text: str) -> bool:
    """
    Checks whether a keyword/phrase appears in the given text.
    Uses word-boundary-aware matching for single words; for multi-word
    phrases (e.g. "window function") falls back to a plain substring
    check since \\b boundaries around spaces behave the same either way.
    """
    pattern = r"\b" + re.escape(keyword.lower()) + r"\b"
    return re.search(pattern, normalized_text) is not None


# ---------------------------------------------------------------------------
# /api/interview/generate
# ---------------------------------------------------------------------------

def generate_interview_questions(career_goal: str) -> List[Dict]:
    """
    Returns the full list of mock interview questions for the given
    career goal, straight from INTERVIEW_DATA.

    Caller must validate that career_goal exists in INTERVIEW_DATA before
    calling this function (same pattern used in Phases 1 and 2).
    """
    return INTERVIEW_DATA[career_goal]


# ---------------------------------------------------------------------------
# /api/interview/evaluate
# ---------------------------------------------------------------------------

def evaluate_answer(
    career_goal: str,
    question: str,
    expected_keywords: List[str],
    answer: str,
) -> Dict:
    """
    Compares a student's spoken/typed answer against expected_keywords
    for a given interview question and produces a simple, explainable
    score out of 100 plus qualitative feedback.
    """
    normalized_answer = _normalize(answer)

    matched_keywords = [
        kw for kw in expected_keywords
        if _keyword_found_in_text(kw, normalized_answer)
    ]
    missing_keywords = [
        kw for kw in expected_keywords
        if kw not in matched_keywords
    ]

    total_keywords = len(expected_keywords)
    score = (
        round((len(matched_keywords) / total_keywords) * 100)
        if total_keywords else 0
    )

    strengths = _build_strengths(matched_keywords, normalized_answer)
    areas_for_improvement = _build_areas_for_improvement(
        missing_keywords, normalized_answer, score
    )
    feedback = _build_feedback(career_goal, score, matched_keywords, total_keywords)

    return {
        "career_goal": career_goal,
        "question": question,
        "score": score,
        "matched_keywords": matched_keywords,
        "missing_keywords": missing_keywords,
        "strengths": strengths,
        "areas_for_improvement": areas_for_improvement,
        "feedback": feedback,
    }


def _build_strengths(matched_keywords: List[str], normalized_answer: str) -> List[str]:
    strengths: List[str] = []

    if matched_keywords:
        shown = ", ".join(matched_keywords)
        strengths.append(f"Correctly mentioned key concept(s): {shown}.")

    word_count = len(normalized_answer.split())
    if word_count >= 40:
        strengths.append("Answer is detailed and well-elaborated.")

    if not strengths:
        strengths.append("Attempted the question — keep building on the core concepts.")

    return strengths


def _build_areas_for_improvement(
    missing_keywords: List[str],
    normalized_answer: str,
    score: int,
) -> List[str]:
    areas: List[str] = []

    if missing_keywords:
        shown = ", ".join(missing_keywords)
        areas.append(f"Try to include these key terms/concepts: {shown}.")

    word_count = len(normalized_answer.split())
    if word_count < 15:
        areas.append(
            "Answer is quite short — try explaining your reasoning with an "
            "example or more detail."
        )

    if score < 50:
        areas.append(
            "Consider revisiting the core concept behind this question before "
            "your next mock interview attempt."
        )

    if not areas:
        areas.append("Strong answer — no major gaps detected.")

    return areas


def _build_feedback(
    career_goal: str,
    score: int,
    matched_keywords: List[str],
    total_keywords: int,
) -> str:
    if score >= 80:
        tone = "Excellent answer!"
    elif score >= 50:
        tone = "Good attempt, with room to improve."
    else:
        tone = "This answer needs more work."

    return (
        f"{tone} You covered {len(matched_keywords)} out of {total_keywords} "
        f"key concepts expected for this {career_goal} interview question "
        f"(score: {score}/100)."
    )
