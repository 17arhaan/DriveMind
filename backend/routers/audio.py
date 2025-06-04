# backend/routers/audio.py
from fastapi import APIRouter, HTTPException
from ..models.audio import AudioRequest, AudioResponse
from ..services.audio_service import transcribe_and_summarize

router = APIRouter()

@router.post("/", response_model=AudioResponse)
async def infer_audio(payload: AudioRequest):
    """
    Accepts base64-encoded audio bytes, returns transcription + summary.
    """
    try:
        result = transcribe_and_summarize(payload.audio_data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
