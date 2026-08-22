from datetime import date
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from data.career_data import CAREER_DATA, VALID_CAREERS
from data.interview_data import INTERVIEW_DATA

from models.schemas import (
    CareerAnalyzeRequest,
    CareerAnalyzeResponse,
    ResumeAnalyzeRequest,
    ResumeAnalyzeResponse,
    InterviewGenerateRequest,
    InterviewGenerateResponse,
    InterviewEvaluateRequest,
    InterviewEvaluateResponse,
    StudyPlanRequest,
    StudyPlanResponse,
    AITutorRequest,
    AITutorResponse,
)
from services.analyzer import analyze_career
from services.resume_analyzer import analyze_resume
from services.interview_analyzer import (
    generate_interview_questions,
    evaluate_answer,
)
from services.study_planner import generate_study_plan
from services.ai_service import ask_ai_tutor


app = FastAPI(
    title="AI-Powered Student Career & Placement Platform",
    description="Module 1: Career Roadmap & Skill Gap Analysis",
    version="1.0.0",
)


# CORS configuration — allows the React frontend to call this API
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    """Simple health-check / welcome route."""
    return {
        "message": "Career Roadmap & Skill Gap Analysis API is running.",
        "docs": "/docs",
        "supported_career_goals": VALID_CAREERS,
    }


@app.get("/api/career/list")
def list_careers():
    """Returns the list of career goals currently supported by the backend."""
    return {"careers": VALID_CAREERS}


@app.post("/api/career/analyze", response_model=CareerAnalyzeResponse)
def analyze(request: CareerAnalyzeRequest):
    """
    Accepts a student's name, career goal, and current skills.
    Returns matched/missing/irrelevant skills, a phased learning
    roadmap, and suggested projects for the chosen career.
    """

    if request.career_goal not in CAREER_DATA:
        raise HTTPException(
            status_code=400,
            detail=(
                f"Unsupported career_goal '{request.career_goal}'. "
                f"Supported values: {VALID_CAREERS}"
            ),
        )

    if not request.current_skills:
        raise HTTPException(
            status_code=400,
            detail="current_skills cannot be empty.",
        )

    result = analyze_career(
        name=request.name,
        career_goal=request.career_goal,
        current_skills=request.current_skills,
    )

    return result

# ---------------------------------------------------------------------------
# Phase 2: Resume Analyzer & ATS-style Match Score
# ---------------------------------------------------------------------------

@app.post("/api/resume/analyze", response_model=ResumeAnalyzeResponse)
def analyze_resume_endpoint(request: ResumeAnalyzeRequest):

    if request.career_goal not in CAREER_DATA:
        raise HTTPException(
            status_code=400,
            detail=(
                f"Unsupported career_goal '{request.career_goal}'. "
                f"Supported values: {VALID_CAREERS}"
            ),
        )

    if not request.resume_text.strip():
        raise HTTPException(
            status_code=400,
            detail="resume_text cannot be empty.",
        )

    result = analyze_resume(
        name=request.name,
        career_goal=request.career_goal,
        resume_text=request.resume_text,
    )

    return result
# ---------------------------------------------------------------------------
# Phase 3: Placement Readiness & Mock Interview
# ---------------------------------------------------------------------------

@app.post(
    "/api/interview/generate",
    response_model=InterviewGenerateResponse
)
def generate_interview_endpoint(request: InterviewGenerateRequest):

    if request.career_goal not in INTERVIEW_DATA:
        raise HTTPException(
            status_code=400,
            detail=(
                f"Unsupported career_goal '{request.career_goal}'. "
                f"Supported values: {VALID_CAREERS}"
            ),
        )

    questions = generate_interview_questions(
        career_goal=request.career_goal
    )

    return {
        "career_goal": request.career_goal,
        "questions": questions,
    }


@app.post(
    "/api/interview/evaluate",
    response_model=InterviewEvaluateResponse
)
def evaluate_interview_endpoint(request: InterviewEvaluateRequest):

    if request.career_goal not in CAREER_DATA:
        raise HTTPException(
            status_code=400,
            detail=(
                f"Unsupported career_goal '{request.career_goal}'. "
                f"Supported values: {VALID_CAREERS}"
            ),
        )

    if not request.answer.strip():
        raise HTTPException(
            status_code=400,
            detail="answer cannot be empty.",
        )

    if not request.expected_keywords:
        raise HTTPException(
            status_code=400,
            detail="expected_keywords cannot be empty.",
        )

    result = evaluate_answer(
        career_goal=request.career_goal,
        question=request.question,
        expected_keywords=request.expected_keywords,
        answer=request.answer,
    )

    return result

# ---------------------------------------------------------------------------
# Phase 4: Personalized Study Planner
# ---------------------------------------------------------------------------

@app.post(
    "/api/study-plan/generate",
    response_model=StudyPlanResponse
)
def generate_study_plan_endpoint(request: StudyPlanRequest):

    """
    Generates a personalized study plan based on the student's
    target date, available daily study hours, subjects, and weak subjects.
    """

    today = date.today()

    # Validate target date
    if request.target_date <= today:
        raise HTTPException(
            status_code=400,
            detail="target_date must be in the future.",
        )

    # Validate daily hours
    if request.daily_hours <= 0:
        raise HTTPException(
            status_code=400,
            detail="daily_hours must be greater than 0.",
        )

    # Validate subjects
    if not request.subjects:
        raise HTTPException(
            status_code=400,
            detail="subjects cannot be empty.",
        )

    # Validate weak subjects
    normalized_subjects = {
        subject.strip().lower()
        for subject in request.subjects
    }

    invalid_weak_subjects = [
        subject
        for subject in request.weak_subjects
        if subject.strip().lower() not in normalized_subjects
    ]

    if invalid_weak_subjects:
        raise HTTPException(
            status_code=400,
            detail=(
                "weak_subjects contains subjects not present "
                f"in subjects: {invalid_weak_subjects}"
            ),
        )

    result = generate_study_plan(
        name=request.name,
        target_date=request.target_date,
        daily_hours=request.daily_hours,
        subjects=request.subjects,
        weak_subjects=request.weak_subjects,
    )

    return result

# ---------------------------------------------------------------------------
# Phase 5: AI Career Tutor
# ---------------------------------------------------------------------------

@app.post(
    "/api/ai-tutor",
    response_model=AITutorResponse
)
def ai_tutor_endpoint(request: AITutorRequest):

    if not request.message.strip():
        raise HTTPException(
            status_code=400,
            detail="message cannot be empty."
        )

    try:
        response = ask_ai_tutor(
            message=request.message,
            career_goal=request.career_goal,
            student_name=request.student_name,
            context=request.context
        )

        return {
            "response": response
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"AI Tutor error: {str(e)}"
        )