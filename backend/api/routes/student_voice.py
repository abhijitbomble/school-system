import base64
from fastapi import APIRouter, File, UploadFile, WebSocket, WebSocketDisconnect
from fastapi.responses import JSONResponse
from services.voice_processor import transcribe_audio, synthesize_speech
from services.edututor_brain import process_chat
from models.schemas import ChatMessage

router = APIRouter()

@router.post("/voice")
async def edututor_voice(audio: UploadFile = File(...)):
    """Receives an audio blob, processes it through STT -> Brain -> TTS"""
    
    # 1. Read incoming audio bytes
    audio_bytes = await audio.read()
    
    # 2. STT: Whisper
    transcribed_text = transcribe_audio(audio_bytes)
    if not transcribed_text.strip():
        return JSONResponse(content={"error": "Could not understand audio"}, status_code=400)
        
    print(f"Heard: {transcribed_text}")
    
    # 3. Brain: Send transcribed text to our Socratic LLM
    # Note: In a real app we would pass historical context too, 
    # but for prototype we just send the current utterance.
    messages = [ChatMessage(role="user", content=transcribed_text)]
    ai_response_dict = process_chat(messages)
    teaching_moments = ai_response_dict.get("teaching_moments", [])
    question_data = ai_response_dict.get("question_data", None)
    
    # Process each moment: Generate audio for it
    processed_moments = []
    for moment in teaching_moments:
        speech_text = moment.get("speech", "")
        audio_bytes = synthesize_speech(speech_text)
        audio_b64 = ""
        if audio_bytes:
            audio_b64 = base64.b64encode(audio_bytes).decode('utf-8')
        
        processed_moments.append({
            "speech": speech_text,
            "visual_action": moment.get("visual_action", "TEXT"),
            "visual_content": moment.get("visual_content", ""),
            "audio_base64": audio_b64
        })

    return {
        "transcribed_input": transcribed_text,
        "teaching_moments": processed_moments,
        "question_data": question_data
    }

@router.websocket("/stream")
async def edututor_voice_stream(websocket: WebSocket):
    """Continuous WebSocket handler for incoming WebM bytes."""
    await websocket.accept()
    print("WebSocket connected for continuous audio.")
    try:
        while True:
            # 1. Wait for audio bits from React's silence-detector
            audio_bytes = await websocket.receive_bytes()
            
            # 2. STT: Whisper
            transcribed_text = transcribe_audio(audio_bytes)
            if not transcribed_text.strip():
                continue # ignore silence
                
            print(f"Heard (WS): {transcribed_text}")
            
            # 3. Brain: LLM Response (Teaching Moments)
            messages = [ChatMessage(role="user", content=transcribed_text)]
            ai_response_dict = process_chat(messages)
            teaching_moments = ai_response_dict.get("teaching_moments", [])
            question_data = ai_response_dict.get("question_data", None)
            
            # 4. Process each moment: Generate audio for it
            processed_moments = []
            for moment in teaching_moments:
                speech_text = moment.get("speech", "")
                audio_bytes = synthesize_speech(speech_text)
                audio_b64 = ""
                if audio_bytes:
                    audio_b64 = base64.b64encode(audio_bytes).decode('utf-8')
                
                processed_moments.append({
                    "speech": speech_text,
                    "visual_action": moment.get("visual_action", "TEXT"),
                    "visual_content": moment.get("visual_content", ""),
                    "audio_base64": audio_b64
                })
                 
            # 5. Push JSON message down the socket
            await websocket.send_json({
                "transcribed_input": transcribed_text,
                "teaching_moments": processed_moments,
                "question_data": question_data
            })
            
    except WebSocketDisconnect:
        print("WebSocket disconnected.")
    except Exception as e:
        print(f"WebSocket Error: {e}")
