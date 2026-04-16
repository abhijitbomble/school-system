"""
E.D.I.T.H. Agent Orchestrator — The Brain
==========================================
Every Day, I Teach Him.

This is the autonomous orchestrator that transforms EduTutor from a
static chatbot into a J.A.R.V.I.S.-level personal companion.

Pipeline:
  1. PERCEIVE  → Classify intent (explain? frustrated? homework?)
  2. RETRIEVE  → Fetch student profile, homework, memory, timetable
  3. PLAN      → Build a personalized dynamic prompt
  4. EXECUTE   → Call LLM with full context + tools
  5. REMEMBER  → Store session insights for next time
"""

import json
from openai import OpenAI
from core.config import settings
from services.student_context import get_full_context
from services.intent_classifier import classify_intent, get_intent_strategy
from services.memory_store import get_student_memory, get_recent_topics, get_known_misconceptions
from services.textbook_rag import get_relevant_context

client = OpenAI(api_key=settings.OPENAI_API_KEY)


# ═══════════════════════════════════════════════════════════
# DYNAMIC PROMPT BUILDER — The Secret Sauce
# ═══════════════════════════════════════════════════════════

def build_dynamic_prompt(student_id: str, intent: str, query: str = "") -> str:
    """
    Constructs a hyper-personalized system prompt by assembling
    real-time student context, memory, intent strategy, and
    relevant textbook content via FAISS RAG.
    
    This is NOT a static string. It changes every single call.
    """
    ctx = get_full_context(student_id)
    profile = ctx["profile"]
    homework = ctx["homework"]
    timetable = ctx["timetable"]
    strategy = get_intent_strategy(intent)
    memory = get_student_memory(student_id)
    recent = get_recent_topics(student_id)
    misconceptions = get_known_misconceptions(student_id)

    # Format strengths and weaknesses
    strong = ", ".join([f"{s['subject']} ({s['score']}, {s['grade']})" for s in profile["strong_subjects"]])
    weak   = ", ".join([f"{s['subject']} ({s['score']}, {s['grade']})" for s in profile["weak_subjects"]])
    
    # Format homework alerts
    overdue_list = "\n".join([f"  ⚠️ {h['subject']}: {h['title']} (Due: {h['due']}, {h['days_late']} days late)" for h in homework["overdue"]]) or "  None — great job!"
    due_today_list = "\n".join([f"  📌 {h['subject']}: {h['title']}" for h in homework["due_today"]]) or "  None today"
    
    # Format memory context
    recent_topics_str = ", ".join(recent) if recent else "No previous sessions yet"
    misconceptions_str = "; ".join(misconceptions) if misconceptions else "None detected yet"
    session_count = len(memory.get("sessions", []))

    # RAG: Fetch relevant textbook content
    textbook_context = ""
    if query and intent in ("explain", "test_prep", "frustrated"):
        try:
            textbook_context = get_relevant_context(query, top_k=3)
            print(f"[RAG] Found textbook context for: {query[:50]}")
        except Exception as e:
            print(f"[RAG] Search failed (will proceed without): {e}")
            textbook_context = ""

    return f"""You are E.D.I.T.H. — {profile['name']}'s personal AI tutor and academic companion.
E.D.I.T.H. stands for "Every Day, I Teach Him."

You are NOT a textbook. You are NOT a search engine.
You are a warm, patient, brilliant friend who explains things so clearly
that even the hardest concepts feel simple.

Think of yourself as a mix of a cool older sibling + the best teacher in school.

═══════════════════════════════════════
📋 STUDENT PROFILE
═══════════════════════════════════════
Name: {profile['name']} ({profile['full_name']})
Class: {profile['standard']} {profile['division']}, Roll No. {profile['roll_no']}
Board: {profile['board']} ({profile['medium']})
Strong Subjects: {strong}
Weak Subjects: {weak}
Last Exam: {profile['last_exam']['name']} — {profile['last_exam']['total']} ({profile['last_exam']['percentage']}%), Rank {profile['last_exam']['rank']}
Learning Style: {profile['learning_style']}
Interests: {', '.join(profile['interests'])}
Personality: {profile['personality_notes']}

═══════════════════════════════════════
📚 HOMEWORK STATUS (Mention if relevant to the topic)
═══════════════════════════════════════
OVERDUE:
{overdue_list}

DUE TODAY:
{due_today_list}

═══════════════════════════════════════
🧠 MEMORY (What you remember from past sessions)
═══════════════════════════════════════
Total Past Sessions: {session_count}
Recently Covered Topics: {recent_topics_str}
Known Misconceptions: {misconceptions_str}

═══════════════════════════════════════
📖 TEXTBOOK REFERENCE (Ground your answer in this)
═══════════════════════════════════════
{textbook_context if textbook_context else "No specific textbook content retrieved. Use your own knowledge but stay within Maharashtra SSC syllabus."}

═══════════════════════════════════════
🎯 CURRENT INTENT: {intent.upper()}
STRATEGY: {strategy['tone']}
═══════════════════════════════════════

╔══════════════════════════════════════╗
║         PERSONALITY RULES            ║
╚══════════════════════════════════════╝

1. SPEAK IN SHORT BURSTS. Max {strategy['max_sentences_per_moment']} sentences per teaching moment. You're having a conversation, not giving a lecture.

2. USE {profile['name']}'S INTERESTS for analogies:
   - Cricket: "Think of gravity like a yorker — it always pulls DOWN"
   - Marvel: "Like Vibranium absorbs energy, so does a capacitor"
   - Space: "If you were on the Moon, you'd weigh 1/6th — imagine bowling there!"

3. IF THE STUDENT IS FRUSTRATED (intent = frustrated):
   - Be extra kind. Say: "Hey, this IS tricky — but you've cracked harder stuff before."
   - Break the concept into even smaller pieces. Use more visuals, fewer words.
   - Do NOT give a quiz when they're frustrated.

4. IF THE TOPIC IS A WEAK SUBJECT ({weak}):
   - Use MORE diagrams and animations (visual_action = DIAGRAM, ANIMATION, IMAGE)
   - Use FEWER text explanations
   - Go slower. Add an extra teaching moment if needed.

5. PROACTIVE HOMEWORK NUDGE:
   - If the topic being discussed relates to an overdue or pending homework, MENTION IT naturally.
   - Example: "By the way {profile['name']}, this connects to that History homework on Mughal Empire — want to tackle that together after this?"

6. NEVER DUMP A WALL OF TEXT. If you catch yourself writing more than 3 sentences, STOP and split into another teaching moment.

7. ADDRESS {profile['name'].upper()} BY NAME occasionally (not every sentence — that's creepy).

8. REMEMBER: The student is in {profile['standard']}. Do NOT explain things at a college level. Keep it age-appropriate and relatable.

╔══════════════════════════════════════╗
║         OUTPUT SCHEMA                ║
╚══════════════════════════════════════╝

STRICTLY return this JSON. No other format is acceptable.

{{
  "teaching_moments": [
    {{
      "speech": "Short, warm, conversational sentence(s).",
      "visual_action": "TEXT | MATH | DIAGRAM | IMAGE | ANIMATION",
      "visual_content": "String | KaTeX | Mermaid | Image_Prompt | SVG_Animation_Code"
    }}
  ],
  "question_data": null | {{ "type": "mcq", "text": "...", "options": ["A", "B", "C"] }},
  "proactive_suggestion": null | "A natural nudge about homework or upcoming tests"
}}

VISUAL STRATEGY:
- IMAGE: For textbook-quality illustrations. Put a detailed description in visual_content (it will be sent to DALL-E).
- ANIMATION: For moving/kinetic concepts. Write raw SVG code with <animate> tags.
- DIAGRAM: For structures/flowcharts. Write Mermaid code.
- MATH: For equations/formulas. Write KaTeX code.
- TEXT: For simple labeled text on the board.

ALWAYS include at least one non-TEXT visual in your explanation.
"""


# ═══════════════════════════════════════════════════════════
# AGENT ORCHESTRATOR — The Full Pipeline
# ═══════════════════════════════════════════════════════════

def process_chat(messages: list, student_id: str = "aarav_sharma") -> dict:
    """
    The autonomous agent pipeline:
    1. PERCEIVE  → Classify the student's intent
    2. RETRIEVE  → Assemble full student context
    3. PLAN      → Build dynamic, personalized prompt
    4. EXECUTE   → Call GPT-4o with tools
    5. REPAIR    → Ensure output matches expected schema
    6. ENRICH    → Generate images/animations if requested
    """
    if not settings.OPENAI_API_KEY:
        return {
            "teaching_moments": [{"speech": "My brain needs an API key to work! Please add it to settings.", "visual_action": "TEXT", "visual_content": "API Key Missing"}],
            "question_data": None,
            "proactive_suggestion": None,
        }

    # ── STEP 1: PERCEIVE ──
    last_msg = messages[-1].content if messages else ""
    intent = classify_intent(last_msg)
    print(f"[E.D.I.T.H.] Intent: {intent} | Message: {last_msg[:60]}...")

    # ── STEP 2+3: RETRIEVE + PLAN (with RAG) ──
    dynamic_prompt = build_dynamic_prompt(student_id, intent, query=last_msg)

    # ── STEP 4: EXECUTE ──
    api_messages = [{"role": "system", "content": dynamic_prompt}]
    for m in messages[-12:]:  # Keep context window manageable
        api_messages.append({"role": m.role, "content": m.content})

    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=api_messages,
            response_format={"type": "json_object"},
            max_tokens=3000,
        )
        data = json.loads(response.choices[0].message.content)

        # ── STEP 5: REPAIR ──
        data = repair_response(data)

        # ── STEP 6: ENRICH ──
        data = enrich_multimedia(data)

        print(f"[E.D.I.T.H.] Generated {len(data.get('teaching_moments', []))} moments")
        return data

    except Exception as e:
        print(f"[E.D.I.T.H.] Error: {e}")
        return {
            "teaching_moments": [{"speech": f"Oops, {get_full_context(student_id)['profile']['name']}! My brain glitched for a second. Can you ask that again?", "visual_action": "TEXT", "visual_content": "System Error — Retrying..."}],
            "question_data": None,
            "proactive_suggestion": None,
        }


def repair_response(data: dict) -> dict:
    """
    Ensures the LLM output always matches our expected schema.
    Handles edge cases like missing keys or malformed JSON.
    """
    # Ensure teaching_moments exists and is non-empty
    if "teaching_moments" not in data or not data["teaching_moments"]:
        if "reply" in data:
            data["teaching_moments"] = [{
                "speech": data["reply"],
                "visual_action": "TEXT",
                "visual_content": "Summary",
            }]
        else:
            data["teaching_moments"] = [{
                "speech": "I was thinking about that. Can you tell me a bit more about what you'd like to know?",
                "visual_action": "TEXT",
                "visual_content": "Tutor is listening...",
            }]

    # Ensure question_data defaults to None
    if "question_data" not in data:
        data["question_data"] = None

    # Ensure proactive_suggestion defaults to None
    if "proactive_suggestion" not in data:
        data["proactive_suggestion"] = None

    return data


def enrich_multimedia(data: dict) -> dict:
    """
    Post-processes teaching moments to generate actual images
    from DALL-E when the AI requested an IMAGE visual_action.
    """
    for moment in data.get("teaching_moments", []):
        if moment.get("visual_action") == "IMAGE":
            try:
                img_response = client.images.generate(
                    model="dall-e-3",
                    prompt=f"Clean textbook-style educational illustration: {moment['visual_content']}. White background, detailed scientific labeling, suitable for Indian school curriculum.",
                    size="1024x1024",
                    quality="standard",
                    n=1,
                )
                moment["visual_content"] = img_response.data[0].url
            except Exception as e:
                print(f"[E.D.I.T.H.] DALL-E Error: {e}")
                # Graceful fallback — use a placeholder
                moment["visual_content"] = "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800"

    return data


# ═══════════════════════════════════════════════════════════
# PROACTIVE GREETING — Called on page load
# ═══════════════════════════════════════════════════════════

def generate_proactive_greeting(student_id: str = "aarav_sharma") -> dict:
    """
    Generates a personalized greeting when the student opens EduTutor.
    The agent proactively checks:
    - Overdue homework
    - Upcoming tests
    - Time of day
    - Recent study topics
    
    Returns a warm, contextual greeting without the student asking anything.
    """
    ctx = get_full_context(student_id)
    profile = ctx["profile"]
    homework = ctx["homework"]
    timetable = ctx["timetable"]
    recent = get_recent_topics(student_id)

    # Build context-aware greeting
    name = profile["name"]
    overdue_count = len(homework["overdue"])
    due_today_count = len(homework["due_today"])
    time_context = timetable.get("context", "")

    # Time-appropriate greeting
    from datetime import datetime
    hour = datetime.now().hour
    if hour < 12:
        time_greeting = "Good morning"
    elif hour < 17:
        time_greeting = "Good afternoon"
    else:
        time_greeting = "Hey"

    # Build the greeting parts
    parts = [f"{time_greeting}, {name}! 👋"]

    if overdue_count > 0:
        first_overdue = homework["overdue"][0]
        parts.append(f"I noticed your {first_overdue['subject']} homework on '{first_overdue['title']}' is overdue by {first_overdue['days_late']} days. Want me to help you knock it out quickly?")

    if due_today_count > 0 and overdue_count == 0:
        first_due = homework["due_today"][0]
        parts.append(f"You've got {first_due['subject']} homework due today — '{first_due['title']}'. Need any help with it?")

    if recent:
        parts.append(f"Last time we covered {recent[0]} — want to continue from there or start something new?")
    elif overdue_count == 0 and due_today_count == 0:
        parts.append("What would you like to learn today? I'm all ears!")

    if time_context == "evening_revision":
        parts.append("Evening's a great time for revision — your brain retains more now! 🧠")

    greeting_text = " ".join(parts)

    return {
        "greeting": greeting_text,
        "overdue_count": overdue_count,
        "due_today_count": due_today_count,
        "suggested_topics": recent[:3] if recent else ["Gravity", "Quadratic Equations", "Life Processes"],
    }
