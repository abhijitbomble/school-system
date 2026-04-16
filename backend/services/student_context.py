"""
Student Context Service — The Agent's Eyes
==========================================
Provides real-time student data to the Agent Orchestrator.
In production, these fetch from a database.
Currently uses the same mock data as the frontend for consistency.
"""


def get_student_profile(student_id: str = "aarav_sharma") -> dict:
    """
    Returns the student's academic identity, strengths, weaknesses,
    and learning preferences. This is injected into every LLM prompt
    so the tutor can personalize its explanations.
    """
    # In production: query student DB by student_id
    return {
        "name": "Aarav",
        "full_name": "Aarav Sharma",
        "standard": "Std 8",
        "division": "Div A",
        "roll_no": 14,
        "medium": "English Medium",
        "board": "Maharashtra SSC",
        "strong_subjects": [
            {"subject": "Mathematics", "score": "62/70", "grade": "A+", "trend": "improving"},
            {"subject": "Geography",   "score": "48/50", "grade": "A+", "trend": "improving"},
        ],
        "weak_subjects": [
            {"subject": "History",  "score": "38/50", "grade": "B",  "trend": "flat"},
            {"subject": "Marathi",  "score": "42/50", "grade": "B+", "trend": "flat"},
        ],
        "last_exam": {
            "name": "Unit Test 2",
            "total": "342/400",
            "percentage": 85.5,
            "grade": "A+",
            "rank": "4th out of 41",
        },
        "learning_style": "Visual learner — prefers diagrams, animations, and real-world analogies over text walls",
        "interests": ["Cricket", "Marvel movies", "Space exploration"],
        "personality_notes": "Gets frustrated with long text. Responds well to encouragement and humor.",
    }


def get_homework_status(student_id: str = "aarav_sharma") -> dict:
    """
    Returns categorized homework items so the agent can proactively
    remind the student about overdue or upcoming tasks.
    """
    return {
        "overdue": [
            {"subject": "History",  "title": "Notes: Mughal Empire Ch. 4", "due": "8 Apr", "days_late": 7},
            {"subject": "Marathi",  "title": "निबंध: माझा आवडता सण",       "due": "7 Apr", "days_late": 8},
        ],
        "due_today": [
            {"subject": "Mathematics", "title": "Chapter 5 Exercise 5.3"},
            {"subject": "English",     "title": "Essay: My Favourite Season"},
        ],
        "pending": [
            {"subject": "Science",   "title": "Diagram: Digestive System",     "due": "Tomorrow"},
            {"subject": "Geography", "title": "Map Work: Physical Features",   "due": "12 Apr"},
        ],
        "recently_submitted": [
            {"subject": "Mathematics", "title": "Chapter 4 Exercise 4.1 & 4.2", "submitted": "5 Apr"},
            {"subject": "Science",     "title": "Lab Report: Water Cycle",       "submitted": "1 Apr"},
        ]
    }


def get_timetable_now(student_id: str = "aarav_sharma") -> dict:
    """
    Returns what class is happening right now and what's coming next.
    Allows the agent to make contextual suggestions like
    'Your Science class is in 20 minutes — want a quick revision?'
    """
    from datetime import datetime
    hour = datetime.now().hour

    # Simple time-based lookup (in production: query actual timetable DB)
    if hour < 8:
        return {"current_class": None, "next_class": "Mathematics with Mr. Deshmukh at 07:30", "context": "before_school"}
    elif hour < 9:
        return {"current_class": "Mathematics with Mr. Deshmukh (Room 203)", "next_class": "Science with Ms. Kulkarni at 08:20", "context": "in_school"}
    elif hour < 10:
        return {"current_class": "Science with Ms. Kulkarni (Lab 1)", "next_class": "English with Ms. Fernandes at 09:10", "context": "in_school"}
    elif hour < 14:
        return {"current_class": "Afternoon classes", "next_class": None, "context": "in_school"}
    elif hour < 18:
        return {"current_class": None, "next_class": None, "context": "after_school_study_time"}
    else:
        return {"current_class": None, "next_class": None, "context": "evening_revision"}


def get_full_context(student_id: str = "aarav_sharma") -> dict:
    """
    Assembles ALL context into a single object for the orchestrator.
    This is the complete 'world view' the agent has of the student.
    """
    return {
        "profile": get_student_profile(student_id),
        "homework": get_homework_status(student_id),
        "timetable": get_timetable_now(student_id),
    }
