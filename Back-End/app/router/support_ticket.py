from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.entity.models import SupportTicket
from app.schema.support_ticket import SupportTicket as ST


router = APIRouter(prefix="/api/ticket", tags=["ticket"])


@router.get("/all", response_model=List[ST])
def get_all_ticket(db: Session = Depends(get_db)):
    result = db.query(SupportTicket).all()
    return result


@router.post("", status_code=201, response_model=ST)
def create_support_ticket(support_ticket: ST, db: Session = Depends(get_db)):
    ticket = SupportTicket(**support_ticket.model_dump(exclude_none=True))

    db.add(ticket)
    db.commit()
    db.refresh(ticket)
    return ticket


@router.get("", response_model=ST)
def get_ticket_by_id(id: int, db: Session = Depends(get_db)):
    ticket = db.query(SupportTicket).filter(SupportTicket.id == id).first()
    if not ticket:
        raise HTTPException(
            status_code=404, detail=f"Ticket with id: {id} doesn't exit"
        )
    return ticket

