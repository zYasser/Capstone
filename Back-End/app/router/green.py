from http import HTTPStatus
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schema import green
from app.entity.models import Inverter
from app.config.database import get_db
from app.utils.parital_updater import update_object

router = APIRouter(prefix="/api/green", tags=["green"])


@router.post("/inverters/", response_model=green.InverterResponse)
async def create_inverter(
    inverter: green.InverterCreate, db: Session = Depends(get_db)
):
    db_inverter = Inverter(**inverter.model_dump())
    db.add(db_inverter)
    db.commit()
    db.refresh(db_inverter)
    return db_inverter


@router.get("/inverters/", response_model=List[green.InverterResponse])
async def get_inverters(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(Inverter).offset(skip).limit(limit).all()


@router.get("/inverters/{inverter_id}", response_model=green.InverterResponse)
async def get_inverter_by_id(inverter_id: int, db: Session = Depends(get_db)):
    inverter = db.query(Inverter).filter(Inverter.inverter_id == inverter_id).first()
    if inverter is None:
        raise HTTPException(status_code=404, detail="Inverter not found")
    return inverter


@router.delete("/inverters/{inverter_id}", status_code=HTTPStatus.NO_CONTENT)
async def get_inverter_by_id(inverter_id: int, db: Session = Depends(get_db)):
    inverter = db.query(Inverter).filter(Inverter.inverter_id == inverter_id).delete()

    if inverter == 0:
        raise HTTPException(
            status_code=404, detail=f"Inverter with {inverter_id} id doesn't exist"
        )
    db.commit()


@router.patch(
    "/inverters/{inverter_id}",
    status_code=HTTPStatus.OK,
    response_model=green.InverterResponse,
)
async def get_inverter_by_id(
    new_inverter: green.InverterUpdate, inverter_id: int, db: Session = Depends(get_db)
):
    inverter = (
        db.query(Inverter).filter(Inverter.inverter_id == inverter_id).one_or_none()
    )
    if inverter is None:
        raise HTTPException(
            status_code=404, detail=f"Inverter with {inverter_id} id doesn't exist"
        )

    r = (
        db.query(Inverter)
        .filter(Inverter.inverter_id == inverter_id)
        .update(new_inverter.model_dump(exclude_none=True))
    )
    db.commit()
    db.refresh(inverter)
    return inverter


@router.get("/inverters", response_model=List[green.InverterResponse])
async def get_inverter_by_name(name: str, db: Session = Depends(get_db)):
    inverter = db.query(Inverter).filter(Inverter.model_name.ilike(f"%{name}%")).all()
    if inverter is None:
        raise HTTPException(status_code=404, detail="Inverter not found")

    return inverter
