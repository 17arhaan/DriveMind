# backend/models/vision.py
from typing import List, Any
from pydantic import BaseModel

class VisionRequest(BaseModel):
    image_data: bytes  # base64-encoded JPEG from frontend

class BoundingBox(BaseModel):
    x1: float
    y1: float
    x2: float
    y2: float
    confidence: float
    class_id: int
    label: str

class VisionResponse(BaseModel):
    boxes: List[BoundingBox]
    inference_time_ms: float
