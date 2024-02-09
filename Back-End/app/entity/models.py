from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.orm import relationship

from app.config.database import Base


class User(Base):
    __tablename__ = "user"

    user_id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String(255), nullable=False)
    last_name = Column(String(255), nullable=False)
    phone = Column(String(20))
    email = Column(String(255), nullable=False, unique=True)
    nationality = Column(String(255))
    country = Column(String(255))

    address = relationship("Address", uselist=False, back_populates="user")


class Address(Base):
    __tablename__ = "address"

    address_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("user.user_id"), unique=True)
    street = Column(String(255))
    city = Column(String(255))
    state = Column(String(255))
    postal_code = Column(String(20))

    user = relationship("User", back_populates="address")
