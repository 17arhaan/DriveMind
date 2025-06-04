# backend/main.py
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .routers import health, vision, audio, route, users

app = FastAPI(title=settings.PROJECT_NAME)

# CORS—allow your frontend’s origin once deployed
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ← lock this down in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(health.router, prefix="/ping", tags=["health"])
app.include_router(vision.router, prefix=f"{settings.API_V1_STR}/infer/vision", tags=["vision"])
app.include_router(audio.router, prefix=f"{settings.API_V1_STR}/infer/audio", tags=["audio"])
app.include_router(route.router, prefix=f"{settings.API_V1_STR}/infer/route", tags=["route"])
app.include_router(users.router, prefix=f"{settings.API_V1_STR}/users", tags=["users"])

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
