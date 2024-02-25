from http import HTTPStatus
import logging
import sys
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schema import green
from app.entity.models import Inverter
from app.config.database import get_db
from app.utils.parital_updater import update_object
from app.utils.logger import configure_logging


configure_logging()
router = APIRouter(prefix="/api/green", tags=["green"])
# Configure logging
# Configure logging format
logger = logging.getLogger(__name__)


@router.post("/inverters/", response_model=green.InverterResponse)
async def create_inverter(
    inverter: green.InverterCreate, db: Session = Depends(get_db)
):
    db_inverter = Inverter(**inverter.model_dump())
    db.add(db_inverter)
    db.commit()
    db.refresh(db_inverter)
    logger.info(f"Inverter created: {db_inverter}")
    return db_inverter


@router.get("/inverters/", response_model=List[green.InverterResponse])
async def get_inverters(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    if skip != 0:
        skip = skip * limit
    inverters = db.query(Inverter).offset(skip).limit(limit).all()
    logger.info(f"Fetched {len(inverters)} inverters from the database")
    return inverters


@router.get("/inverters/{inverter_id}", response_model=green.InverterResponse)
async def get_inverter_by_id(inverter_id: int, db: Session = Depends(get_db)):
    inverter = db.query(Inverter).filter(Inverter.inverter_id == inverter_id).first()
    if inverter is None:
        logger.error(f"Inverter with ID {inverter_id} not found")
        raise HTTPException(status_code=404, detail="Inverter not found")
    logger.info(f"Retrieved inverter: {inverter.model_name} Id: {inverter_id}")
    return inverter


@router.delete("/inverters/{inverter_id}", status_code=HTTPStatus.NO_CONTENT)
async def delete_inverter_by_id(inverter_id: int, db: Session = Depends(get_db)):
    deleted_count = (
        db.query(Inverter).filter(Inverter.inverter_id == inverter_id).delete()
    )

    if deleted_count == 0:
        logger.error(f"Inverter with ID {inverter_id} not found")
        raise HTTPException(
            status_code=404, detail=f"Inverter with {inverter_id} id doesn't exist"
        )
    db.commit()
    logger.info(f"Inverter with ID {inverter_id} deleted successfully")


@router.patch(
    "/inverters/{inverter_id}",
    status_code=HTTPStatus.OK,
    response_model=green.InverterResponse,
)
async def update_inverter_by_id(
    new_inverter: green.InverterUpdate, inverter_id: int, db: Session = Depends(get_db)
):
    inverter = (
        db.query(Inverter).filter(Inverter.inverter_id == inverter_id).one_or_none()
    )
    if inverter is None:
        logger.error(f"Inverter with ID {inverter_id} not found")
        raise HTTPException(
            status_code=404, detail=f"Inverter with {inverter_id} id doesn't exist"
        )

    updated_count = (
        db.query(Inverter)
        .filter(Inverter.inverter_id == inverter_id)
        .update(new_inverter.model_dump(exclude_none=True))
    )

    db.commit()
    if updated_count == 0:
        logger.error(f"Failed to update inverter with ID {inverter_id}")
    else:
        logger.info(f"Inverter with ID {inverter_id} updated successfully")
    db.refresh(inverter)
    return inverter


@router.get("/inverters", response_model=List[green.InverterResponse])
async def get_inverter_by_name(name: str, db: Session = Depends(get_db)):
    inverters = db.query(Inverter).filter(Inverter.model_name.ilike(f"%{name}%")).all()
    if not inverters:
        logger.error(f"Inverter with name containing '{name}' not found")
        raise HTTPException(status_code=404, detail="Inverter not found")

    logger.info(f"Retrieved inverters with name containing '{name}': {inverters}")
    return inverters
