# backend/models/user.py
from typing import Optional
from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    full_name: Optional[str]
    password: str

class UserRead(BaseModel):
    id: str
    username: str
    full_name: Optional[str]
    is_active: bool

class UserInDB(UserRead):
    hashed_password: str