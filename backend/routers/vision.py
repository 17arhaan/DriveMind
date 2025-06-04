# backend/routers/vision.py
from fastapi import APIRouter, HTTPException, Depends
from ..models.vision import VisionRequest, VisionResponse
from ..services.vision_service import run_inference

router = APIRouter()

@router.post("/", response_model=VisionResponse)
async def infer_vision(payload: VisionRequest):
    """
    Accepts base64-encoded image bytes, runs YOLOv8 detection, and returns boxes.
    """
    try:
        output = run_inference(payload.image_data)
        return output
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
