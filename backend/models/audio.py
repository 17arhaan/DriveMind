# backend/models/audio.py
from pydantic import BaseModel

class AudioRequest(BaseModel):
    audio_data: bytes  # base64-encoded WAV or MP3

class AudioResponse(BaseModel):
    transcription: str
    summary: str
    inference_time_ms: float
