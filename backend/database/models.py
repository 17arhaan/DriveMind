from datetime import datetime
from typing import Optional
import uuid

from sqlmodel import SQLModel, Field

class Trip(SQLModel, table=True):
    id: Optional[str] = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    user_id: str
    start_time: datetime
    end_time: Optional[datetime]
    path: str  # GeoJSON or encoded polyline
    distance_m: float
    eta_s: float
    reward: Optional[float]  # RL reward
    created_at: datetime = Field(default_factory=datetime.utcnow)


class User(SQLModel, table=True):
    id: Optional[str] = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    username: str = Field(index=True, unique=True)
    full_name: Optional[str]
    hashed_password: str
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
