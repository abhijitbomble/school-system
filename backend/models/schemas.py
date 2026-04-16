from pydantic import BaseModel
from typing import List, Optional

class ChatMessage(BaseModel):
    role: str # "user" or "assistant"
    content: str
    
class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    mode: Optional[str] = "text" # "text" or "voice"

class ChatResponse(BaseModel):
    reply: str
    visual_aid: Optional[dict] = None # For Notepad rendering
    audio_base64: Optional[str] = None # For typed voice interactions
