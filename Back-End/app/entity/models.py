from typing import List
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, BOOLEAN
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.config.database import Base


class User(Base):
    __tablename__ = "user"

    user_id = Column(Integer, primary_key=True, autoincrement=True)
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
