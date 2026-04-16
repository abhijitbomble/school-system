import base64
from fastapi import APIRouter
from models.schemas import ChatRequest, ChatResponse
from services.edututor_brain import process_chat
from services.voice_processor import synthesize_speech

router = APIRouter()

@router.post("/chat")
async def edututor_chat(request: ChatRequest):
    # Process through the brain
    ai_response_dict = process_chat(request.messages)
    teaching_moments = ai_response_dict.get("teaching_moments", [])
    question_data = ai_response_dict.get("question_data", None)
    
    # Process each moment: Generate audio for it if in voice mode
    processed_moments = []
    for moment in teaching_moments:
        speech_text = moment.get("speech", "")
        audio_b64 = ""
        
        if request.mode == "voice":
            audio_bytes = synthesize_speech(speech_text)
            if audio_bytes:
                audio_b64 = base64.b64encode(audio_bytes).decode('utf-8')
        
        processed_moments.append({
            "speech": speech_text,
            "visual_action": moment.get("visual_action", "TEXT"),
            "visual_content": moment.get("visual_content", ""),
            "audio_base64": audio_b64
        })

    return {
        "teaching_moments": processed_moments,
        "question_data": question_data
    }
