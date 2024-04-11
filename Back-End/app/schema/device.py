from pydantic import BaseModel


class DeviceBase(BaseModel):
    name: str
    power_rating: str
    type: str
    


class DeviceCreate(DeviceBase):
    pass


class Device(DeviceBase):
    id: int

    class Config:
        from_attributes = True
