"""
Intent Classifier — The Agent's Ears
=====================================
Classifies the student's message BEFORE calling the LLM.
This allows the orchestrator to select the right strategy:
- explain → Deep visual teaching mode
- homework → Check homework status, offer help
- frustrated → Extra encouragement, simpler explanations
- greeting → Warm personal greeting with proactive suggestions
- confirm → Student understood — move to quiz
- revision → Quick recap of previously covered material
"""

INTENT_KEYWORDS = {
    "explain": [
        "explain", "what is", "how does", "tell me about", "teach me",
        "why does", "how to", "what are", "define", "describe",
        "show me", "demonstrate", "kya hai", "samjhao", "batao",
    ],
    "homework": [
        "homework", "assignment", "due", "submit", "pending",
        "overdue", "hw", "exercise", "project", "ghar ka kaam",
    ],
    "test_prep": [
        "test", "exam", "quiz", "practice", "revise", "revision",
        "prepare", "mock test", "question paper", "sample paper",
    ],
    "frustrated": [
        "i don't get it", "i don't understand", "this is hard",
        "confused", "help me", "I'm stuck", "too difficult",
        "can't understand", "samajh nahi aa raha", "mushkil",
    ],
    "greeting": [
        "hi", "hello", "hey", "good morning", "good evening",
        "what's up", "sup", "namaste", "namaskar",
    ],
    "confirm": [
        "yes", "clear", "understood", "got it", "samajh gaya",
        "samajla", "haa", "I get it", "makes sense", "ok next",
        "aage bado", "yep", "yeah", "ho",
    ],
    "off_topic": [
        "joke", "game", "play", "song", "movie", "who are you",
        "tell me a story", "bored", "fun",
    ],
}


def classify_intent(text: str) -> str:
    """
    Returns the most likely intent for a student message.
    Uses keyword matching — fast, deterministic, no LLM cost.
    
    Returns one of:
        explain, homework, test_prep, frustrated, greeting, confirm, off_topic
    """
    text_lower = text.lower().strip()

    # Priority order matters: frustrated > homework > explain > greeting > confirm
    priority_order = [
        "frustrated", "homework", "test_prep", "greeting", "confirm", "off_topic", "explain"
    ]

    for intent in priority_order:
        keywords = INTENT_KEYWORDS[intent]
        if any(kw in text_lower for kw in keywords):
            return intent

    # Default: assume they want to learn something
    return "explain"


def get_intent_strategy(intent: str) -> dict:
    """
    Returns pedagogical strategy hints based on the detected intent.
    The orchestrator uses this to guide the LLM's behavior.
    """
    strategies = {
        "explain": {
            "tone": "clear, visual, step-by-step",
            "max_sentences_per_moment": 3,
            "prefer_visual": True,
            "use_analogies": True,
            "include_quiz_at_end": True,
        },
        "homework": {
            "tone": "helpful, organized, action-oriented",
            "max_sentences_per_moment": 2,
            "prefer_visual": False,
            "use_analogies": False,
            "include_quiz_at_end": False,
        },
        "test_prep": {
            "tone": "focused, efficient, practice-heavy",
            "max_sentences_per_moment": 2,
            "prefer_visual": True,
            "use_analogies": False,
            "include_quiz_at_end": True,
        },
        "frustrated": {
            "tone": "extra encouraging, patient, simple language",
            "max_sentences_per_moment": 2,
            "prefer_visual": True,
            "use_analogies": True,
            "include_quiz_at_end": False,
        },
        "greeting": {
            "tone": "warm, friendly, proactive",
            "max_sentences_per_moment": 2,
            "prefer_visual": False,
            "use_analogies": False,
            "include_quiz_at_end": False,
        },
        "confirm": {
            "tone": "affirming, move to assessment",
            "max_sentences_per_moment": 1,
            "prefer_visual": False,
            "use_analogies": False,
            "include_quiz_at_end": True,
        },
        "off_topic": {
            "tone": "playful but redirecting",
            "max_sentences_per_moment": 2,
            "prefer_visual": False,
            "use_analogies": True,
            "include_quiz_at_end": False,
        },
    }
    return strategies.get(intent, strategies["explain"])
