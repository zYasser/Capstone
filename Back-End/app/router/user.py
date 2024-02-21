from datetime import timedelta
import datetime
import logging
import sys
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
from sqlalchemy.exc import IntegrityError, DataError
from ..entity import models
from app.utils.logger import configure_logging

configure_logging()

router = APIRouter(prefix="/api/user", tags=["user"])


logger = logging.getLogger(__name__)


def autenticate_user(user: models.User, password) -> bool:
    if not user:
        return False
    return hashing.verfiy_password(user.password, password)


@router.get("/me", response_model=UserBase)
def get_current_user(
    db: Session = Depends(get_db), token_data: TokenData = Depends(verify_access_token)
):
    user = db.query(models.User).filter(token_data.email == models.User.email).first()
    logging.info(
        f"Successfully retrieved user information for '{token_data.email}' in the 'get_current_user' endpoint."
    )

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
    logger.error(f"Forget Password Failed user with email :{email} doesn't exist ")


@router.post("/token")
def token(token: ChangePassword, db: Session = Depends(get_db)):
    print(token.token)
    try:
        tok = db.query(models.Token).filter(models.Token.id == token.token).first()
    except DataError as e:
        logger.error(f"Failed to change password Token {token.token} doesn't exist ")
        raise HTTPException(status_code=400, detail="Token is Expired")

    if tok is None or tok.expire < datetime.datetime.now():
        logger.error(f"Failed to change password Token {token.token} is expaired ")
        raise HTTPException(status_code=400, detail="Token is Expired")
    password = hashing.hash(token.password)
    query = sqlalchemy.text("UPDATE USERS SET password=:password WHERE ID = :user_id")
    result = db.execute(query, {"password": password, "user_id": tok.user_id})
    if result.rowcount == 0:
        logger.error(
            f"Failed to change passwrod,  Token Owner {tok.user_id} does not exist. "
        )
        raise HTTPException(status_code=400, detail="User doesn't exist")
    logger.info(f"User :{tok.user_id} Changed Password")
    db.commit()


@router.post("/register", response_model=UserBase, status_code=201)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    user.password = hashing.hash(user.password)
    new_user = models.User(**user.dict())
    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        logger.info(f"Successfully Registered User {new_user}")
        return new_user
    except IntegrityError as e:
        col = unique_constraint_handler.find_column(e._message())[0]
        if col != "":
            logger.error(f"Failed To Register User: {user}  , {col} Already Exist")
            raise HTTPException(status_code=400, detail=f"{col} Already Exist")
        logger.error(f"Failed To Register User: {user}  ,Something Went wrong {str(e)}")

        raise HTTPException(status_code=400, detail=f"Something went wrong")


@router.get("/", response_model=UserBase)
def get_user_by_id(id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.user_id == id).first()
    if not user:
        logger.error(f"User With id :{id} Doesn't exist")

        raise HTTPException(status_code=404, detail=f"user with id: {id} doesn't exit")
    logger.info(f"Successfully Fetch User with id: {id}")

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
    if user is None:
        logger.error(f"Failed to login , {form_data.username} email doesn't exist")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"User Doesn't exist"},
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not autenticate_user(user, form_data.password):
        logger.error(
            f"Failed to login user. Email: {user.email}. Reason: Incorrect password provided."
        )
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
    logger.info(f"User {user.email} successfully logged in")

    return res
