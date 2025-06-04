# backend/routers/users.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from typing import List

from ..models.user import UserCreate, UserRead
from ..services.user_service import get_user_by_username, create_user, authenticate_user
from ..dependencies import get_db

router = APIRouter()

@router.post("/signup", response_model=UserRead)
def signup(user_in: UserCreate, db: Session = Depends(get_db)):
    existing = get_user_by_username(db, user_in.username)
    if existing:
        raise HTTPException(status_code=400, detail="Username already registered")
    user = create_user(db, user_in.username, user_in.full_name, user_in.password)
    return UserRead.from_orm(user)

@router.post("/login")
def login(user_in: UserCreate, db: Session = Depends(get_db)):
    user = authenticate_user(db, user_in.username, user_in.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    # TODO: return JWT token here
    return {"detail": f"Welcome, {user.username}!"}

@router.get("/", response_model=List[UserRead])
def list_users(db: Session = Depends(get_db)):
    users = db.exec(select(UserTable)).all()
    return users
