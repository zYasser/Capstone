# Pydantic models for request and response
from dataclasses import dataclass
from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class InverterCreate(BaseModel):
    model_name: str
    capacity: float
    efficiency: float = 0
    type: str
    manufacturer: str
    manufacture_date: datetime
    price: float


class InverterResponse(InverterCreate):
    inverter_id: int


@dataclass
class InverterUpdate(BaseModel):
    inverter_id: Optional[int] = None
    model_name: Optional[str] = None
    capacity: Optional[float] = None
    efficiency: Optional[float] = None
    type: Optional[str] = None
    manufacturer: Optional[str] = None
    manufacture_date: Optional[datetime] = None
    price: Optional[float]=None
