import io
from openai import OpenAI
from core.config import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)

def transcribe_audio(audio_bytes: bytes) -> str:
    """Takes webm/ogg bytes, sends to Whisper, returns text."""
    if not settings.OPENAI_API_KEY:
        return "[API KEY MISSING] Mock transcription: How do I solve this math problem?"

    # OpenAI requires a file-like object with a name attribute ending in a valid extension
    file_obj = io.BytesIO(audio_bytes)
    file_obj.name = "audio.webm" 
    
    try:
        transcript = client.audio.transcriptions.create(
            model="whisper-1", 
            file=file_obj
        )
        return transcript.text
    except Exception as e:
        print(f"Whisper STT Error: {e}")
        return ""

def synthesize_speech(text: str) -> bytes:
    """Takes text, sends to TTS, returns MP3 audio bytes."""
    if not settings.OPENAI_API_KEY:
        return b"" # Mock return empty bytes
        
    try:
        response = client.audio.speech.create(
            model="tts-1",
            voice="alloy",
            input=text
        )
        return response.content
    except Exception as e:
        print(f"OpenAI TTS Error: {e}")
        return b""
