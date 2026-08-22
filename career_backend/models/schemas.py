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


"""
schemas.py

Pydantic models used for request validation and response formatting.
"""

from typing import List, Dict, Optional
from datetime import date
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
    question: str = Field(..., example="What is the difference between WHERE and HAVING in SQL?")
    expected_keywords: List[str] = Field(
        ..., example=["WHERE", "HAVING", "filter", "aggregate"]
    )
    answer: str = Field(..., example="WHERE filters rows before grouping, HAVING filters after aggregation.")


class InterviewEvaluateResponse(BaseModel):
    career_goal: str
    question: str
    score: int
    matched_keywords: List[str]
    missing_keywords: List[str]
    strengths: List[str]
    areas_for_improvement: List[str]
    feedback: str


# ---------------------------------------------------------------------------
# Phase 4: Personalized Study Planner
# ---------------------------------------------------------------------------

class StudyPlanRequest(BaseModel):
    name: str = Field(..., example="Shiven")
    target_date: date = Field(..., example="2026-09-15")
    daily_hours: float = Field(..., gt=0, example=3)
    subjects: List[str] = Field(
        ..., min_length=1, example=["DBMS", "DSA", "Computer Networks"]
    )
    weak_subjects: List[str] = Field(default_factory=list, example=["DSA"])


class StudyTask(BaseModel):
    subject: str
    duration_minutes: int
    priority: str
    task_type: str
    suggested_topic: str


class DailyPlanEntry(BaseModel):
    day: int
    date: str
    tasks: List[StudyTask]


class StudyPlanSummary(BaseModel):
    total_study_days: int
    planned_days_in_response: int
    daily_available_hours: float
    total_planned_hours: float
    high_priority_subjects: List[str]
    recommended_focus: str
    note: Optional[str] = None


class StudyPlanResponse(BaseModel):
    name: str
    target_date: str
    daily_hours: float
    priority_subjects: List[str]
    daily_plan: List[DailyPlanEntry]
    summary: StudyPlanSummary

class AITutorRequest(BaseModel):
    message: str
    career_goal: str
    student_name: str = "Student"
    context: str = ""


class AITutorResponse(BaseModel):
    response: str