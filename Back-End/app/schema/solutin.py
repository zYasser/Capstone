from typing import List, Optional
from pydantic import BaseModel


class Device(BaseModel):
    id: int
    daily_usage_duration: int


class SolutionRequest(BaseModel):
    devices: Optional[List[Device]] = None
    latitude: float
    longitude: float
    day_of_year: int
    standard_time_min: int
    region: str
    oversize: Optional[bool] = False
    off_grid: Optional[bool] = False
    gas: Optional[int] = None


class SolutionRequestWind(BaseModel):
    devices: Optional[List[Device]] = None
    wind_speed: float
    wind_direction: float
