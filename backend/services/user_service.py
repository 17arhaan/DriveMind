# backend/services/user_service.py
from sqlalchemy.exc import NoResultFound
from sqlmodel import select
from passlib.context import CryptContext

from ..database.models import User as UserTable
from ..dependencies import get_db

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_username(db, username: str):
    stmt = select(UserTable).where(UserTable.username == username)
    result = db.exec(stmt)
    return result.one_or_none()

def create_user(db, username: str, full_name: str, password: str):
    hashed = pwd_context.hash(password)
    user = UserTable(username=username, full_name=full_name, hashed_password=hashed)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def authenticate_user(db, username: str, password: str):
    user = get_user_by_username(db, username)
    if not user:
        return None
    if not pwd_context.verify(password, user.hashed_password):
        return None
    return user
