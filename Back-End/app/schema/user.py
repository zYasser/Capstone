from typing import Optional
from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    user_id: int = None
    first_name: str
    last_name: str
    phone: str = None
    email: EmailStr
    nationality: str = None
    country: str = None
    street: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    postal_code: Optional[str] = None


class UserCreate(UserBase):
    password: str

    class Config:
        from_attributes = True


class ChangePassword(BaseModel):
    token: str
    password: str = None
