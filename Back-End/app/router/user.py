from datetime import timedelta
import datetime
from time import sleep
from typing import List
from venv import logger
from fastapi import APIRouter, Depends, HTTPException, status, Response
from fastapi.security import OAuth2PasswordRequestForm
import sqlalchemy
from sqlalchemy.orm import Session
from app.config.oauth2 import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    create_access_token,
    verify_access_token,
)
from app.schema.jwt import TokenData
from app.utils import hashing, send_email, unique_constraint_handler
from app.config.database import get_db
from app.schema.user import UserCreate, UserBase, ChangePassword
from sqlalchemy.exc import IntegrityError
from ..entity import models

router = APIRouter(prefix="/api/user", tags=["user"])


def autenticate_user(user: models.User, password) -> bool:
    if not user:
        return False
    return hashing.verfiy_password(user.password, password)


@router.get("/me", response_model=UserBase)
def get_current_user(
    db: Session = Depends(get_db), token_data: TokenData = Depends(verify_access_token)
):
    user = db.query(models.User).filter(token_data.email == models.User.email).first()
    return user


@router.post("/forgetpassword")
async def forgetpassowrd(email: str, db: Session = Depends(get_db)):

    query = sqlalchemy.select(models.User.id).where(models.User.email == email)
    result = db.execute(query).fetchone()
    if result is not None:
        token = models.Token(
            user_id=result[0],
            expire=datetime.datetime.now() + timedelta(minutes=15),
        )

        db.add(token)
        db.commit()
        db.refresh(token)
        send_email.send(email, token.id)
        return token


@router.post("/token")
def token(token: ChangePassword, db: Session = Depends(get_db)):
    print(token.token)
    tok = db.query(models.Token).filter(models.Token.id == token.token).first()
    print(tok)
    if tok is None or tok.expire < datetime.datetime.now():
        raise HTTPException(status_code=400, detail="Token is Expired")

    password = hashing.hash(token.password)
    query = sqlalchemy.text("UPDATE USERS SET password=:password WHERE ID = :user_id")
    result = db.execute(query, {"password": password, "user_id": tok.user_id})
    if result.rowcount == 0:
        raise HTTPException(status_code=400, detail="User doesn't exist")
    db.commit()


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
        logger.error(f"\033[91m {e._message()}\033[0m")
        col = unique_constraint_handler.find_column(e._message())[0]
        if col != "":
            raise HTTPException(status_code=400, detail=f"{col} Already Exist")
        raise HTTPException(status_code=400, detail=f"Something went wrong")


@router.get("/", response_model=UserBase)
def get_user_by_id(id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.user_id == id).first()
    if not user:
        raise HTTPException(status_code=404, detail=f"user with id: {id} doesn't exit")
    return user


@router.get("", response_model=List[UserBase])
def get_all_user(db: Session = Depends(get_db)):
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
        data={"email": user.email, "id": user.id},
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
