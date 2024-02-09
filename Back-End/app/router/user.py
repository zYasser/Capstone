from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.schema.user import UserCreate , UserBase

from ..entity import models

router = APIRouter(prefix="/api/user")


@router.post("/create" , response_model=UserBase)
def create_user(user:UserCreate , db: Session = Depends(get_db)):
    user.password = hash(user.password)
    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
