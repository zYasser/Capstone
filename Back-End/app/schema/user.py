
from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    user_id: int = None
    first_name: str
    last_name: str
    phone: str = None
    email: EmailStr
    nationality: str = None
    country: str = None
    street: str = None
    city: str = None
    state: str = None
    postal_code: str = None

class UserCreate(UserBase):
    password : str

    class Config:
        orm_mode = True
