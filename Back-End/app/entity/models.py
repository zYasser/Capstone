from typing import List
import uuid
from sqlalchemy import (
    DECIMAL,
    Boolean,
    Column,
    Date,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    Numeric,
    String,
    BOOLEAN,
    UUID,
    Text,
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
    date_of_birth = Column(DateTime, nullable=False)
    district = Column(String)
    # Relationship with SupportTicket
    support_tickets = relationship("SupportTicket", back_populates="user")


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
    user_id = Column(Integer, ForeignKey("users.id"))  # Foreign key linking to User.id

    # Relationship with User
    user = relationship("User", back_populates="support_tickets")


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
    consumption_watt = Column(Integer)
    average_daily_usage_hour = Column(Numeric(5, 2))
    standby_power_consumption = Column(Integer)
    standby_duration_hours = Column(Integer)


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


class PVPanel(Base):
    __tablename__ = "panel"
    id = Column(Integer, primary_key=True, autoincrement=True)
    model = Column(
        String(255),
    )
    cell_technology = Column(
        String(255),
    )
    dimensions = Column(
        String(255),
    )
    weight = Column(
        Numeric(5, 1),
    )
    maximum_power = Column(
        Numeric(5, 1),
    )
    open_circuit_voltage = Column(
        Numeric(4, 1),
    )
    short_circuit_current = Column(
        Numeric(5, 2),
    )
    maximum_power_voltage = Column(
        Numeric(4, 1),
    )
    maximum_power_current = Column(
        Numeric(5, 2),
    )
    module_efficiency = Column(
        Numeric(4, 1),
    )
    maximum_system_voltage = Column(
        Integer,
    )
    power_temp_coefficient = Column(
        Numeric(4, 2),
    )
    voltage_temp_coefficient = Column(
        Numeric(4, 2),
    )
    current_temp_coefficient = Column(
        Numeric(5, 3),
    )
    operating_temp_range = Column(
        String(255),
    )
    maximum_wind_load = Column(
        Integer,
    )
    maximum_snow_load = Column(
        Integer,
    )
    junction_box = Column(
        String(255),
    )
    connector = Column(
        String(255),
    )


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
        TIMESTAMP,
        nullable=False,
    )
