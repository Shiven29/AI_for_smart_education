"""
schemas.py

Pydantic models used for request validation and response formatting.
"""

from typing import List, Dict
from pydantic import BaseModel, Field


class CareerAnalyzeRequest(BaseModel):
    name: str = Field(..., example="Student")
    career_goal: str = Field(..., example="Data Analyst")
    current_skills: List[str] = Field(
        ...,
        example=["Python", "Excel", "C Programming", "Digital Electronics"],
    )


class RoadmapPhase(BaseModel):
    duration: str
    topics: List[str]


class Roadmap(BaseModel):
    beginner: RoadmapPhase
    intermediate: RoadmapPhase
    advanced: RoadmapPhase


class CareerAnalyzeResponse(BaseModel):
    name: str
    career_goal: str
    matched_skills: List[str]
    missing_skills: List[str]
    irrelevant_skills: List[str]
    skill_match_percentage: float
    roadmap: Roadmap
    suggested_projects: List[str]
    message: str

# ---------------------------------------------------------------------------
# Phase 2: Resume Analyzer & ATS-style Match Score
# ---------------------------------------------------------------------------

class ResumeAnalyzeRequest(BaseModel):
    name: str = Field(..., example="Student")
    career_goal: str = Field(..., example="Data Analyst")
    resume_text: str = Field(
        ...,
        example="I know Python, Excel and SQL. I have worked on data analysis projects.",
    )


class ResumeAnalyzeResponse(BaseModel):
    name: str
    career_goal: str
    detected_skills: List[str]
    matched_required_skills: List[str]
    missing_skills: List[str]
    relevant_adjacent_skills: List[str]
    resume_match_percentage: float
    improvement_suggestions: List[str]
    message: str

# ---------------------------------------------------------------------------
# Phase 3: Placement Readiness & Mock Interview
# ---------------------------------------------------------------------------

class InterviewGenerateRequest(BaseModel):
    name: str = Field(..., example="Student")
    career_goal: str = Field(..., example="Data Analyst")


class InterviewQuestion(BaseModel):
    question: str
    category: str
    difficulty: str
    expected_keywords: List[str]


class InterviewGenerateResponse(BaseModel):
    career_goal: str
    questions: List[InterviewQuestion]


class InterviewEvaluateRequest(BaseModel):
    career_goal: str = Field(..., example="Data Analyst")

    question: str = Field(
        ...,
        example="What is the difference between WHERE and HAVING in SQL?"
    )

    expected_keywords: List[str] = Field(
        ...,
        example=["WHERE", "HAVING", "filter", "aggregate"]
    )

    answer: str = Field(
        ...,
        example="WHERE filters rows before grouping, HAVING filters after aggregation."
    )


class InterviewEvaluateResponse(BaseModel):
    career_goal: str
    question: str
    score: int
    matched_keywords: List[str]
    missing_keywords: List[str]
    strengths: List[str]
    areas_for_improvement: List[str]
    feedback: str