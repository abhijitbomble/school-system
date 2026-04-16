"""
Proactive Greeting Endpoint
============================
Called when the student opens EduTutor.
Returns a personalized, context-aware greeting.
"""
from fastapi import APIRouter
from services.edututor_brain import generate_proactive_greeting

router = APIRouter()


@router.get("/greeting")
async def edututor_greeting(student_id: str = "aarav_sharma"):
    """
    Called on page load. Returns a warm, proactive greeting that
    references overdue homework, upcoming tests, or recent topics.
    """
    return generate_proactive_greeting(student_id)
