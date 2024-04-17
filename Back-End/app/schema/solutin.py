from typing import List, Optional
from pydantic import BaseModel


class Device(BaseModel):
    id: int
    daily_usage_duration: int


class SolutionRequest(BaseModel):
    devices: Optional[List[Device]] = None
    latitude :float
    longitude :float 
    day_of_year:int 
    standard_time_min:int
