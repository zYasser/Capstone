from datetime import datetime

import os
import sys
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.entity.models import SupportTicektMessage, SupportTicket
from app.schema.support_ticket import (
    SupportTicket as ST,
    SupportTicketMessage as TicketMessage,
)


router = APIRouter(prefix="/api/ticket", tags=["ticket"])


@router.get("/all", response_model=List[ST])
async def get_all_ticket(db: Session = Depends(get_db)):
    result = db.query(SupportTicket).all()
    return result


@router.post("", status_code=201, response_model=ST)
async def create_support_ticket(support_ticket: ST, db: Session = Depends(get_db)):
    ticket = SupportTicket(**support_ticket.model_dump(exclude_none=True))

    db.add(ticket)
    db.commit()
    db.refresh(ticket)
    return ticket


@router.get("", response_model=ST)
async def get_ticket_by_id(id: int, db: Session = Depends(get_db)):
    ticket = db.query(SupportTicket).filter(SupportTicket.id == id).first()
    if not ticket:
        raise HTTPException(
            status_code=404, detail=f"Ticket with id: {id} doesn't exit"
        )
    return ticket


@router.delete(
    "",
)
async def delete_ticker(id: int, db: Session = Depends(get_db)):
    ticket = db.query(SupportTicket).filter(SupportTicket.id == id).delete()
    if ticket == 0:
        raise HTTPException(
            status_code=404, detail=f"Ticket with id: {id} doesn't exit"
        )
    db.commit()


@router.post("/replay", response_model=TicketMessage)
async def replay_to_ticket(message: TicketMessage, db: Session = Depends(get_db)):

    id = message.support_ticket_id
    try:
        ticket = db.query(SupportTicket).filter(SupportTicket.id == id).first()
        if ticket is None:
            raise HTTPException(
                status_code=404, detail=f"Ticket with id: {id} doesn't exit"
            )
        message.support_ticket_id = id
        db.query(SupportTicket).where(SupportTicket.id == id).update(
            {SupportTicket.updated_at: datetime.now()}
        )

        msg = SupportTicektMessage(**message.model_dump(exclude_none=True))
        db.add(msg)
        db.commit()
        db.refresh(msg)
        return msg
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno, e)
        db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Something Went Wrong Try Again later"
        )


@router.get("/messages")
async def get_all_message(id: int, db: Session = Depends(get_db)):
    # db.query(SupportTicket).join(
    #     SupportTicektMessage, SupportTicket.id == SupportTicektMessage.id, isouter=True
    # )
    stmt = (
        select(SupportTicektMessage)
        .join(
            SupportTicket,
        )
        .where(
            id == SupportTicket.id,
        )
    )
    result = db.execute(stmt).scalars().all()
    return result
