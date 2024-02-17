from typing import List
import uuid
from sqlalchemy import (
    Boolean,
    Column,
    Date,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    BOOLEAN,
    UUID,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.config.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    phone = Column(String(20), unique=True)
    email = Column(String, nullable=False, unique=True)
    nationality = Column(String)
    password = Column(
        String,
        nullable=False,
    )
    country = Column(String)
    street = Column(String)
    city = Column(String)
    state = Column(String)
    postal_code = Column(String(20))
    date_of_birth=Column(DateTime , nullable=False)


class SupportTicket(Base):
    __tablename__ = "support_ticket"
    id: Mapped[int] = mapped_column(primary_key=True)
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )
    updated_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )
    email = Column(
        String,
    )
    phone = Column(String(20))
    name = Column(
        String(50),
    )
    status = Column(Boolean, default=True)
    topic = Column(String)
    body = Column(String)
    messages: Mapped[List["SupportTicektMessage"]] = relationship(cascade="all, delete")


class SupportTicektMessage(Base):
    __tablename__ = "support_ticket_message"
    id = Column(Integer, primary_key=True, autoincrement=True)
    message = Column(String, nullable=False)
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )
    support_ticket_id: Mapped[int] = mapped_column(
        ForeignKey("support_ticket.id", ondelete="CASCADE")
    )


class Devices(Base):
    __tablename__ = "devices"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    power_rating = Column(String, nullable=False)
    type = Column(String)


class Inverter(Base):
    __tablename__ = "inverter"

    inverter_id = Column(Integer, primary_key=True, autoincrement=True)
    model_name = Column(String(255), nullable=False)
    capacity = Column(Float, nullable=False)
    efficiency = Column(Float)
    type = Column(String(255))
    manufacturer = Column(String(255))
    manufacture_date = Column(Date)
    price = Column(Float, nullable=False)


# Define the PVPanel class
class PVPanel(Base):
    __tablename__ = "pv_panel"

    panel_id = Column(Integer, primary_key=True, autoincrement=True)
    model_name = Column(String(255), nullable=False)
    capacity = Column(Float, nullable=False)
    efficiency = Column(Float)
    manufacturer = Column(String(255))
    manufacture_date = Column(Date)
    price = Column(Float, nullable=False)


# Define the WindPower class
class WindPower(Base):
    __tablename__ = "wind_power"

    wind_id = Column(Integer, primary_key=True, autoincrement=True)
    model_name = Column(String(255), nullable=False)
    capacity = Column(Float, nullable=False)
    height = Column(Float)
    rotor_diameter = Column(Float)
    efficiency = Column(Float)
    manufacturer = Column(String(255))
    manufacture_date = Column(Date)
    price = Column(Float, nullable=False)


class Token(Base):
    __tablename__ = "token"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    expire = Column(
        TIMESTAMP, nullable=False, 
    )
    def __str__(self):
        return f"Token(id={self.id}, user_id={self.user_id}, expire={self.expire})"

