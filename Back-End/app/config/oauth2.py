from datetime import datetime, timedelta
from typing import Optional

from fastapi import Cookie, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

from app.schema.jwt import TokenData

from .env import settings

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/user/auth")
ACCESS_TOKEN_EXPIRE_MINUTES = 600


def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):

    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + datetime(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_access_token(access_token: str = Cookie(...)) -> TokenData:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            access_token.split(" ")[1], SECRET_KEY, algorithms=[ALGORITHM]
        )
        if payload.get("email") is None:
            raise credentials_exception
        token_data = TokenData(**payload)
    except JWTError as e:
        print(e)
        raise credentials_exception
    if token_data is None:
        raise credentials_exception
    return token_data


# can be extended to check if the user active or not from the session
def get_current_active_user(
    data: TokenData = Depends(verify_access_token),
) -> TokenData:
    return data
