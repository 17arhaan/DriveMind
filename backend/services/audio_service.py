# backend/services/audio_service.py
import time
import base64
import tempfile
from transformers import pipeline

from ..config import settings

# Initialize once
stt = pipeline("automatic-speech-recognition", model=settings.WHISPER_MODEL_NAME)
summarizer = pipeline("summarization", model=settings.SUMMARIZER_MODEL)

def transcribe_and_summarize(audio_b64: bytes) -> dict:
    # Decode base64 to bytes, write to temp file, run pipelines
    audio_bytes = base64.b64decode(audio_b64)
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        tmp.write(audio_bytes)
        tmp_path = tmp.name

    start = time.time()
    transcription = stt(tmp_path)["text"]
    summary = summarizer(transcription, max_length=60, min_length=20)[0]["summary_text"]
    elapsed = (time.time() - start) * 1000

    return {
        "transcription": transcription,
        "summary": summary,
        "inference_time_ms": elapsed
    }
