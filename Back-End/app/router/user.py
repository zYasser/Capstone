from datetime import timedelta
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, Response
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.config.oauth2 import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    create_access_token,
    verify_access_token,
)
from app.schema.jwt import TokenData
from app.utils import hashing
from app.config.database import get_db
from app.schema.user import UserCreate, UserBase
from sqlalchemy.exc import IntegrityError
from ..entity import models

router = APIRouter(prefix="/api/user", tags=["user"])


def autenticate_user(user: models.User, password) -> bool:
    if not user:
        return False
    return hashing.verfiy_password(user.password, password)


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


@router.get("/", response_model=UserBase)
def get_user_by_id(id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.user_id == id).first()
    if not user:
        raise HTTPException(status_code=404, detail=f"user with id: {id} doesn't exit")
    return user


@router.get("", response_model=List[UserBase])
async def get_all_user(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users


@router.post("/login")
def login(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):

    # making sure the user is in our DB
    user = db.query(models.User).filter(form_data.username == models.User.email).first()

    if not autenticate_user(user, form_data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    # give token expiration date
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    access_token = create_access_token(
        data={"email": user.email, "id": user.user_id},
        expires_delta=access_token_expires,
    )
    response.set_cookie(
        key="access_token", value=f"bearer {access_token}", httponly=True
    )  # set HttpOnly cookie in response

    res = {
        "access_token": access_token,
        "token_type": "bearer",
    }

    return res


@router.get("/me", response_model=UserBase)
def get_current_user(
    db: Session = Depends(get_db), token_data: TokenData = Depends(verify_access_token)
):
    user = db.query(models.User).filter(token_data.email == models.User.email).first()
    return user
