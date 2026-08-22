"""
study_planner.py

Phase 4: Personalized Study Planner.

Pure planning logic only (no FastAPI/Pydantic imports) — mirrors the
style of services/analyzer.py, services/resume_analyzer.py, and
services/interview_analyzer.py from Phases 1-3.

No database, no external AI API, no randomness — the same input always
produces the same plan (deterministic), which keeps it reliable and easy
to demo during a hackathon.
"""

from datetime import date, timedelta
from typing import List, Dict, Set

# ---------------------------------------------------------------------------
# Tunable constants
# ---------------------------------------------------------------------------

# Hard cap on how many days of a plan we actually generate in the response.
# Without this, a target_date a year away would produce a huge JSON payload.
# The *summary* still reports the true total_study_days to the target date.
MAX_PLAN_DAYS = 30

# Minimum length of a single study session, in minutes. Used to decide how
# many subjects can realistically fit into one day's available study time.
MIN_SESSION_MINUTES = 20

# Extra weight given to a weak subject when splitting up daily study time,
# so it consistently gets more minutes than a normal subject (requirement 9).
WEAK_SUBJECT_WEIGHT = 1.5
NORMAL_SUBJECT_WEIGHT = 1.0

# Known subject -> list of topics, cycled day by day so the same subject
# doesn't repeat the same topic every time it's scheduled.
SUBJECT_TOPICS: Dict[str, List[str]] = {
    "dsa": [
        "Arrays and Linked Lists", "Stacks and Queues", "Trees and Binary Search Trees",
        "Graphs and Traversals", "Sorting Algorithms", "Dynamic Programming Basics",
    ],
    "dbms": [
        "Normalization", "ER Diagrams", "SQL Joins", "Transactions and ACID Properties",
        "Indexing", "Query Optimization",
    ],
    "computer networks": [
        "OSI Model", "TCP/IP Model", "Routing Algorithms", "Network Security Basics",
        "DNS and HTTP", "Congestion Control",
    ],
    "operating systems": [
        "Process Scheduling", "Memory Management", "Deadlocks", "File Systems",
        "Threads and Concurrency", "Virtual Memory",
    ],
    "python": [
        "Data Types and Control Flow", "Functions and Modules", "OOP in Python",
        "File Handling", "Exception Handling", "List/Dict Comprehensions",
    ],
    "java": [
        "OOP Fundamentals", "Collections Framework", "Exception Handling",
        "Multithreading", "JVM and Memory Management", "Streams and Lambdas",
    ],
    "mathematics": [
        "Probability and Statistics", "Linear Algebra Basics", "Calculus Fundamentals",
        "Discrete Mathematics", "Set Theory", "Combinatorics",
    ],
}

# Fallback topic rotation for any subject not found in SUBJECT_TOPICS above.
# This is what makes the planner "generic enough for arbitrary subjects".
GENERIC_TOPICS = [
    "Review fundamentals",
    "Practice important concepts",
    "Solve practice questions",
    "Revise weak topics",
    "Take a self-test",
]

# Task types cycled across days to add variety instead of always "Learning".
TASK_TYPE_CYCLE = ["Learning", "Learning", "Practice", "Revision"]


def _topics_for_subject(subject: str) -> List[str]:
    """Returns the topic rotation list for a subject, generic if unknown."""
    return SUBJECT_TOPICS.get(subject.strip().lower(), GENERIC_TOPICS)


def _task_type_for_day(day_index: int) -> str:
    """Cycles through task types so consecutive days aren't all 'Learning'."""
    return TASK_TYPE_CYCLE[day_index % len(TASK_TYPE_CYCLE)]


def _subjects_for_day(
    day_index: int,
    subjects: List[str],
    weak_subjects: Set[str],
    max_subjects_per_day: int,
) -> List[str]:
    """
    Decides which subjects appear on a given day (requirement 8: rotation).

    Weak subjects are always included — they need consistent daily
    attention. Remaining "slots" for the day are filled by rotating
    through the normal subjects using day_index as the rotation offset,
    so when there are more subjects than slots, no single normal subject
    ends up scheduled every single day.
    """
    weak_today = [s for s in subjects if s in weak_subjects]
    normal_subjects = [s for s in subjects if s not in weak_subjects]

    remaining_slots = max(0, max_subjects_per_day - len(weak_today))

    if not normal_subjects or remaining_slots == 0:
        chosen = weak_today if weak_today else subjects
        return chosen[:max_subjects_per_day]

    # Cyclic rotation: shift the normal-subject list by day_index so a
    # different subset is prioritized on different days (round-robin).
    shift = day_index % len(normal_subjects)
    rotated = normal_subjects[shift:] + normal_subjects[:shift]
    selected_normal = rotated[:remaining_slots]

    return weak_today + selected_normal


def _allocate_minutes(
    today_subjects: List[str],
    weak_subjects: Set[str],
    total_minutes: int,
) -> Dict[str, int]:
    """
    Splits total_minutes across today_subjects by weight (weak subjects
    get more), rounded to the nearest 5 minutes. The last subject absorbs
    any rounding remainder so the day's total never exceeds total_minutes
    (requirement 5).
    """
    weights = {
        subject: (WEAK_SUBJECT_WEIGHT if subject in weak_subjects else NORMAL_SUBJECT_WEIGHT)
        for subject in today_subjects
    }
    total_weight = sum(weights.values())

    allocation: Dict[str, int] = {}
    allocated_so_far = 0

    for i, subject in enumerate(today_subjects):
        if i == len(today_subjects) - 1:
            # Last subject gets whatever remains, avoiding rounding drift.
            minutes = max(0, total_minutes - allocated_so_far)
        else:
            raw_minutes = (weights[subject] / total_weight) * total_minutes
            minutes = max(0, int(round(raw_minutes / 5) * 5))
        allocation[subject] = minutes
        allocated_so_far += minutes

    return allocation


def generate_study_plan(
    name: str,
    target_date: date,
    daily_hours: float,
    subjects: List[str],
    weak_subjects: List[str],
) -> Dict:
    """
    Builds a full, deterministic study plan from today until target_date.

    Caller (main.py) is responsible for validating that target_date is in
    the future, daily_hours > 0, subjects is non-empty, and weak_subjects
    is a subset of subjects — this function assumes already-valid input.
    """
    today = date.today()
    total_study_days = (target_date - today).days

    # Cap how many days of plan we actually generate to keep the response
    # a reasonable size, while the summary still reflects the true total.
    planning_horizon = min(total_study_days, MAX_PLAN_DAYS)

    weak_set = {s.strip() for s in weak_subjects}
    daily_minutes = int(round(daily_hours * 60))

    max_subjects_per_day = max(1, min(len(subjects), daily_minutes // MIN_SESSION_MINUTES))

    daily_plan: List[Dict] = []
    for day_index in range(planning_horizon):
        plan_date = today + timedelta(days=day_index + 1)

        today_subjects = _subjects_for_day(
            day_index=day_index,
            subjects=subjects,
            weak_subjects=weak_set,
            max_subjects_per_day=max_subjects_per_day,
        )

        minute_allocation = _allocate_minutes(
            today_subjects=today_subjects,
            weak_subjects=weak_set,
            total_minutes=daily_minutes,
        )

        tasks = []
        for subject in today_subjects:
            duration = minute_allocation[subject]
            if duration <= 0:
                continue  # skip zero-length tasks caused by rounding

            topics = _topics_for_subject(subject)
            topic = topics[day_index % len(topics)]

            tasks.append({
                "subject": subject,
                "duration_minutes": duration,
                "priority": "high" if subject in weak_set else "medium",
                "task_type": _task_type_for_day(day_index),
                "suggested_topic": topic,
            })

        daily_plan.append({
            "day": day_index + 1,
            "date": plan_date.isoformat(),
            "tasks": tasks,
        })

    total_planned_minutes = sum(
        task["duration_minutes"] for day in daily_plan for task in day["tasks"]
    )
    total_planned_hours = round(total_planned_minutes / 60, 2)

    if weak_set:
        subject_word = "it is" if len(weak_set) == 1 else "they are"
        recommended_focus = (
            f"Spend additional time on {', '.join(sorted(weak_set))} because "
            f"{subject_word} identified as weak subject(s)."
        )
    else:
        recommended_focus = (
            "No specific weak subjects were identified — maintain balanced "
            "coverage across all subjects."
        )

    summary = {
        "total_study_days": total_study_days,
        "planned_days_in_response": planning_horizon,
        "daily_available_hours": daily_hours,
        "total_planned_hours": total_planned_hours,
        "high_priority_subjects": sorted(weak_set),
        "recommended_focus": recommended_focus,
    }

    if total_study_days > planning_horizon:
        summary["note"] = (
            f"target_date is {total_study_days} days away. To keep the plan practical, "
            f"a detailed day-by-day schedule was generated for the first {planning_horizon} days — "
            f"repeat a similar weekly rhythm for the remaining days as you approach {target_date.isoformat()}."
        )

    return {
        "name": name,
        "target_date": target_date.isoformat(),
        "daily_hours": daily_hours,
        "priority_subjects": sorted(weak_set),
        "daily_plan": daily_plan,
        "summary": summary,
    }
