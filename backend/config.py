# backend/config.py
import os

class Settings:
    PROJECT_NAME: str = "DriveMind Backend"
    API_V1_STR: str = "/api/v1"
    
    # Development defaults
    REDIS_URL: str = "redis://localhost:6379/0"
    DATABASE_URL: str = "postgresql+psycopg2://postgres:postgres@localhost:5432/drivemind"
    SECRET_KEY: str = "dev_secret_key_change_in_production"
    
    # For vision service - using a smaller model for development
    YOLO_MODEL_PATH: str = "yolov8n.pt"
    # For audio/NLP pipeline - using smaller models for development
    WHISPER_MODEL_NAME: str = "openai/whisper-small"
    SUMMARIZER_MODEL: str = "facebook/bart-large-cnn"
    
    # Maps / Route inference
    MAPS_API_KEY: str = "your_google_maps_api_key"
    RL_MODEL_PATH: str = "models/ppo_drivemind.zip"

settings = Settings()
