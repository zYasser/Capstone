from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP

from app.config.database import Base


class User(Base):
    __tablename__ = "user"

    user_id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    phone = Column(String(20), unique=True)
    email = Column(String, nullable=False, unique=True)
    nationality = Column(String)
    password=Column(String , nullable=False , )
    country = Column(String)
    street = Column(String)  
    city = Column(String)    
    state = Column(String)   
    postal_code = Column(String(20))  
