from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils import hashing
from app.config.database import get_db
from app.schema.user import UserCreate, UserBase
from sqlalchemy.exc import IntegrityError
from ..entity import models

router = APIRouter(prefix="/api/user")


@router.post("/register", response_model=UserBase, status_code=201)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    user.password = hashing.hash(user.password)
    new_user = models.User(**user.dict())
    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except IntegrityError as e:

        raise HTTPException(status_code=400, detail="Email Already Exist")


@router.get("/{user_id}", response_model=UserBase)
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail=f"user with id: {id} doesn't exit")
    return user


@router.get(
    "",
    response_model=List[UserBase]
)
async def get_all_user(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users

