from typing import List
from pydantic import BaseModel


class Device(BaseModel):
    id: int
    daily_usage_duration: int


class SolutionRequest(BaseModel):
    devices: List[Device]
