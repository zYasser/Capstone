from fastapi import APIRouter, Depends
from app.schema import solutin
from app.config.database import get_db
from sqlalchemy.orm import Session
from app.entity.models import Devices
from utils.energyCalculation import totalConsumption
router = APIRouter(prefix="/solution", tags=["solution"])


@router.post("", status_code=200)
async def generate_solution(
    solution_req: solutin.SolutionRequest, db: Session = Depends(get_db)
):
    ids = [device.id for device in solution_req.devices]
    usage = {device.id: device.daily_usage_duration for device in solution_req.devices}

    consumption = db.query(Devices).filter(Devices.id.in_((ids))).all()
    total_consumption=totalConsumption(usage=usage, consumption=consumption)
    return total_consumption
