# backend/services/vision_service.py
import time
import numpy as np
import cv2
import base64
from ultralytics import YOLO

from ..config import settings

# Initialize YOLO model once
model = YOLO(settings.YOLO_MODEL_PATH)

def decode_image(base64_bytes: bytes) -> np.ndarray:
    # base64_bytes is raw bytes (not str): first decode to string then b64decode
    img_array = base64.b64decode(base64_bytes)
    np_arr = np.frombuffer(img_array, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    return img

def run_inference(image_b64: bytes) -> dict:
    img = decode_image(image_b64)
    start = time.time()
    results = model(img, imgsz=640, conf=0.25)
    elapsed = (time.time() - start) * 1000  # ms

    boxes_out = []
    for r in results:
        # results[0].boxes.xyxy is a tensor (N×4)
        for box, cls_id, conf in zip(r.boxes.xyxy.cpu().numpy(), r.boxes.cls.cpu().numpy(), r.boxes.conf.cpu().numpy()):
            x1, y1, x2, y2 = box.tolist()
            label = model.names[int(cls_id)]
            boxes_out.append({
                "x1": x1,
                "y1": y1,
                "x2": x2,
                "y2": y2,
                "confidence": float(conf),
                "class_id": int(cls_id),
                "label": label
            })

    return {
        "boxes": boxes_out,
        "inference_time_ms": elapsed
    }
