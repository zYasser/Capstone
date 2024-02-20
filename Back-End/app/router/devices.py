from fastapi import APIRouter, Depends, HTTPException
from app.config.database import get_db
from app.entity.models import Devices
from sqlalchemy.orm import Session

from app.schema.device import Device, DeviceCreate


router = APIRouter(prefix="/api", tags=["green"])


# CRUD operations
@router.post("/devices/", response_model=Device)
def create_device(device: DeviceCreate, db: Session = Depends(get_db)):
    db_device = Devices(**device.dict())
    db.add(db_device)
    db.commit()
    db.refresh(db_device)
    return db_device


@router.get("/devices/{device_id}", response_model=Device)
def read_device(device_id: int, db: Session = Depends(get_db)):
    db_device = db.query(Devices).filter(Devices.id == device_id).first()
    if db_device is None:
        raise HTTPException(status_code=404, detail="Device not found")
    return db_device


@router.put("/devices/{device_id}", response_model=Device)
def update_device(device_id: int, device: DeviceCreate, db: Session = Depends(get_db)):
    db_device = db.query(Devices).filter(Devices.id == device_id).first()
    if db_device is None:
        raise HTTPException(status_code=404, detail="Device not found")
    for key, value in device.dict().items():
        setattr(db_device, key, value)
    db.commit()
    db.refresh(db_device)
    return db_device


@router.delete("/devices/{device_id}", response_model=Device)
def delete_device(device_id: int, db: Session = Depends(get_db)):
    db_device = db.query(Devices).filter(Devices.id == device_id).first()
    if db_device is None:
        raise HTTPException(status_code=404, detail="Device not found")
    db.delete(db_device)
    db.commit()
    return db_device
