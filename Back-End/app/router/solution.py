from fastapi import APIRouter, Depends
from app.schema import solutin
from app.config.database import get_db
from sqlalchemy.orm import Session
from app.entity.models import Devices
from app.utils.energyCalculation import totalConsumption
from app.utils.calcs import SolarCalculator
from app.utils.windCalculation import WindTurbineCalculator

router = APIRouter(prefix="/solution", tags=["solution"])


@router.post("", status_code=200)
async def generate_solution(
    req: solutin.SolutionRequest, db: Session = Depends(get_db)
):
    ids = [device.id for device in req.devices]
    usage = {device.id: device.daily_usage_duration for device in req.devices}

    consumption = db.query(Devices).filter(Devices.id.in_((ids))).all()
    total_consumption = totalConsumption(usage=usage, consumption=consumption)
    result = SolarCalculator(
        req.day_of_year, req.latitude, req.longitude, req.standard_time_min
    )
    result.calculate_all()
    return {"total_consumption": total_consumption, **result.get_results()}


@router.post("/wind", status_code=200)
async def generate_solution(
    req: solutin.SolutionRequestWind, db: Session = Depends(get_db)
):
    ids = [device.id for device in req.devices]
    usage = {device.id: device.daily_usage_duration for device in req.devices}

    consumption = db.query(Devices).filter(Devices.id.in_((ids))).all()
    total_consumption = totalConsumption(usage=usage, consumption=consumption)
    result = WindTurbineCalculator(
        average_wind_speed=5,
        rated_capacity=3.7,
        daily_electricity_usage=total_consumption,
        hours_per_day=24,
    )
    
    return result.calculate_all_metrics()
