"""
Memory Store — The Agent's Long-Term Memory
============================================
Persists session summaries and mastery data per student.
After each tutoring session, the orchestrator saves:
- Topics covered
- Misconceptions detected
- Mastery level updates
- Emotional arc (frustrated → confident)

Before each session, the orchestrator loads this to avoid:
- Repeating explanations the student already mastered
- Missing known misconceptions
- Losing session continuity
"""

import json
from pathlib import Path
from datetime import datetime

MEMORY_DIR = Path(__file__).parent.parent / "data" / "student_memory"
MEMORY_DIR.mkdir(parents=True, exist_ok=True)


def save_session_summary(student_id: str, summary: dict):
    """
    Saves a session summary after a tutoring conversation ends.
    
    Expected summary format:
    {
        "topics_covered": ["Gravity", "Newton's Laws"],
        "misconceptions_found": ["Thinks mass = weight"],
        "mastery_updates": {"Gravity": "partial", "Newton's Laws": "strong"},
        "emotional_arc": "confused → curious → confident",
        "total_moments": 5,
        "mcqs_attempted": 2,
        "mcqs_correct": 1
    }
    """
    path = MEMORY_DIR / f"{student_id}.json"
    
    if path.exists():
        data = json.loads(path.read_text(encoding="utf-8"))
    else:
        data = {"student_id": student_id, "sessions": [], "mastery": {}}

    # Add timestamp
    summary["date"] = datetime.now().isoformat()
    data["sessions"].append(summary)

    # Update global mastery map
    for topic, level in summary.get("mastery_updates", {}).items():
        data["mastery"][topic] = {
            "level": level,
            "last_studied": summary["date"],
        }

    path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")


def get_student_memory(student_id: str) -> dict:
    """
    Returns the student's full memory — all past sessions and mastery levels.
    Returns empty defaults if no memory exists yet.
    """
    path = MEMORY_DIR / f"{student_id}.json"
    
    if not path.exists():
        return {
            "student_id": student_id,
            "sessions": [],
            "mastery": {},
            "is_new_student": True,
        }

    data = json.loads(path.read_text(encoding="utf-8"))
    data["is_new_student"] = False
    return data


def get_topic_mastery(student_id: str, topic: str) -> dict:
    """
    Returns what the student knows about a specific topic.
    Used by the orchestrator to decide explanation depth.
    """
    memory = get_student_memory(student_id)
    
    if topic in memory.get("mastery", {}):
        return memory["mastery"][topic]
    
    return {"level": "never_studied", "last_studied": None}


def get_known_misconceptions(student_id: str) -> list:
    """
    Returns all misconceptions detected across all sessions.
    Used to proactively address recurring misunderstandings.
    """
    memory = get_student_memory(student_id)
    misconceptions = []
    
    for session in memory.get("sessions", []):
        misconceptions.extend(session.get("misconceptions_found", []))
    
    return list(set(misconceptions))  # deduplicate


def get_recent_topics(student_id: str, n: int = 5) -> list:
    """
    Returns the N most recently studied topics.
    Used to maintain conversational continuity across sessions.
    """
    memory = get_student_memory(student_id)
    recent = []
    
    for session in reversed(memory.get("sessions", [])):
        for topic in session.get("topics_covered", []):
            if topic not in recent:
                recent.append(topic)
            if len(recent) >= n:
                return recent
    
    return recent
