from typing import List, Optional
from pydantic import BaseModel


class Device(BaseModel):
    device: str
    consumption: float


class SolutionRequest(BaseModel):
    roof_size: Optional[str] = None
    selectedDeviceLists: Optional[List[Device]] = None
    latitude: float
    longitude: float
    region: str
    sizing: Optional[str] = False
    off_grid: Optional[bool] = False
    averageGasBill: Optional[int] = None
    solution_type: Optional[str] = None
    grid_type: Optional[str] = None
    inverter_type: Optional[str] = None

    wind_type: Optional[str] = None
    panel_type: Optional[str] = None
    purpose: Optional[str] = None
    average_consumption: Optional[int] = None
    windSpeed: Optional[float] = None
    


class SolutionRequestWind(BaseModel):
    devices: Optional[List[Device]] = None
    wind_speed: float
    wind_direction: float
