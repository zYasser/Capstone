from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


class SupportTicket(BaseModel):
    id: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    name: Optional[str] = None
    status: Optional[bool] = None
    topic: Optional[str] = None
    body: Optional[str] = None
    user_id: int


class SupportTicketReplay(SupportTicket):
    messages: Optional[List["SupportTicketMessage"]]
    email:str
    class Config:
        from_attributes = True


class SupportTicketMessage(BaseModel):
    id: Optional[int] = None
    message: str
    created_at: Optional[datetime] = None
    support_ticket_id: int
    user_email:str
