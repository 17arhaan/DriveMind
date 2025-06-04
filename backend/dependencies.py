# backend/dependencies.py
from typing import Generator
import redis
from sqlalchemy.orm import Session
from sqlmodel import Session as SQLModelSession, create_engine

from .config import settings

# Redis client singleton
_redis_client = None
def get_redis():
    global _redis_client
    if _redis_client is None:
        _redis_client = redis.from_url(settings.REDIS_URL, decode_responses=True)
    return _redis_client


# SQLModel/SQLAlchemy session
engine = create_engine(settings.DATABASE_URL, echo=False)

def get_db() -> Generator[SQLModelSession, None, None]:
    with SQLModelSession(engine) as session:
        yield session
