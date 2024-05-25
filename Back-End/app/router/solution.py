from datetime import datetime as dt
import datetime
from fastapi import APIRouter, Depends
from app.schema import solutin
from app.config.database import get_db
from sqlalchemy.orm import Session
from app.entity.models import Devices
from app.utils.energyCalculation import totalConsumption
from app.utils.calcs import SolarCalculator
from app.utils import windCalculation
from app.utils.panel import PVCalculation


PANELS = [
    "Canadian Solar CS6P-200PM",
    "Canadian Solar HiDM CS1U-MS",
    "Trina Solar Vertex TSM-DE20-600",
]
INVERTERS = ["HM-600NT", "GrowattSPH6000"]
TURBINE = ["Air Breeze", "Skystream 3.7", "SD6 6 kW Wind Turbine", "Bergey Excel 1kW"]


router = APIRouter(prefix="/solution", tags=["solution"])

direction_tracking_system = {
    "EAST": "SINGLE AXIS",
    "WEST": "SINGLE AXIS",
    "NORTH": "DUAL AXIS",
    "SOUTH": "FIXED",
    "SOUTHEAST": "SINGLE AXIS",
    "SOUTHWEST": "SINGLE AXIS",
    "NORTHEAST": "DUAL AXIS",
    "NORTHWEST": "DUAL AXIS",
}


def get_direction(degrees):
    if degrees == 0:
        return "NORTH"
    elif 0 < degrees < 90:
        return "NORTHEAST"
    elif 90 < degrees < 180:
        return "SOUTHEAST"
    elif degrees == 180:
        return "SOUTH"
    elif -90 < degrees < 0:
        return "NORTHWEST"
    elif degrees == -90:
        return "WEST"
    elif -180 < degrees < -90:
        return "SOUTHWEST"
    elif degrees == -180:
        return "SOUTH"
    else:
        return "Invalid degree value"


@router.post("", status_code=200)
async def generate_solution(
    req: solutin.SolutionRequest, db: Session = Depends(get_db)
):
    if req.solution_type == "":
        result = await solutinServicePV(req, db)
        wind = windCalculation.findAllCombination(
            daily_electricity_usage=req.average_consumption, wind_speed=req.windSpeed
        )
        wind = sorted(wind, key=lambda x: x["Energy Production"], reverse=True)[0]
        result = result["Solutions"]
        if wind["Energy Production"] > result["Energy Production"]:
            return wind

        return result
    if req.solution_type == "solar":
        return await findSpecificSolutin(req,db)


def findConsumption(req, db):
    ids = [device.device for device in req.selectedDeviceLists]
    usage = {device.device: device.consumption for device in req.selectedDeviceLists}
    consumption = db.query(Devices).filter(Devices.name.in_((ids))).all()
    total_consumption = totalConsumption(usage=usage, consumption=consumption)
    return total_consumption


def process_solar_calculation(req, day_of_year):
    # Current time in HH:MM format
    current_time = dt.now().strftime("%H:%M")

    # Calculate the effective area
    area = calculate_area(req.roof_size) * 0.85

    # Create a SolarCalculator instance
    result = SolarCalculator(
        day_of_year,
        req.latitude,
        req.longitude,
        standard_time_to_minutes(current_time),
        current_time,
    )

    # Perform all necessary calculations
    result.calculate_all()

    # Determine the direction and the corresponding tracking system
    direction = get_direction(result.solar_azimuth)
    tracking_system = direction_tracking_system[direction]

    return area, result, direction, tracking_system


async def findSpecificSolutin(req: solutin.SolutionRequest, db):
    # Get the current date
    current_date = datetime.date.today()

    # Get the day of the year
    day_of_year = current_date.timetuple().tm_yday
    total_consumption = req.average_consumption
    if len(req.selectedDeviceLists) != 0:
        total_consumption = findConsumption(req, db)
    area, result, direction, tracking_system = process_solar_calculation(
        req, day_of_year
    )
    calculation = PVCalculation(
        region=req.region,
        roof_size=area,
        panel_name=req.panel_type,
        energy_consuming=total_consumption,
        tracking_system=tracking_system,
        inverter_name=req.inverter_type,
        off_grid=req.grid_type == "off_grid",
        oversize=req.sizing == "oversizing",
        average_gas_consumption=req.averageGasBill,
    )
    solution = calculation.calculate()

    return {
        "total_consumption": total_consumption,
        **result.get_results(),
        "direction": direction,
        "tracking_system": tracking_system,
        "Solutions": solution,
    }


async def solutinServicePV(req: solutin.SolutionRequest, db):
    # Get the current date
    current_date = datetime.date.today()

    # Get the day of the year
    day_of_year = current_date.timetuple().tm_yday
    total_consumption = req.average_consumption
    if len(req.selectedDeviceLists) != 0:
        total_consumption = findConsumption(req, db)
    area, result, direction, tracking_system = process_solar_calculation(
        req, day_of_year
    )

    solutions = []
    for panel in PANELS:
        for inverter in INVERTERS:
            for off_grid in [True, False]:
                for oversize in [True, False]:
                    calculation = PVCalculation(
                        region=req.region,
                        roof_size=area,
                        panel_name=panel,
                        energy_consuming=total_consumption,
                        tracking_system=tracking_system,
                        inverter_name=inverter,
                        off_grid=off_grid,
                        oversize=oversize,
                        average_gas_consumption=req.averageGasBill,
                    )
                    solution = calculation.calculate()
                    if solution is not None:
                        solutions.append(solution)
    solutions = sorted(solutions, key=lambda x: x["Energy Production"], reverse=True)
    solution = solutions[0]

    return {
        "total_consumption": total_consumption,
        **result.get_results(),
        "direction": direction,
        "tracking_system": tracking_system,
        "Solutions": solutions[1],
    }


def calculate_area(dimensions):
    # Split the string into two parts
    length_str, width_str = dimensions.split("x")

    # Convert the parts to integers
    length = int(length_str)
    width = int(width_str)

    # Calculate the area
    area = length * width

    # Return the result
    return area


def standard_time_to_minutes(time):
    # Split the time string into hours and minutes
    hours, minutes = map(int, time.split(":"))

    # Convert hours to minutes and add to existing minutes
    total_minutes = hours * 60 + minutes

    return total_minutes


# @router.post("/wind", status_code=200)
# async def generate_solution(
#     req: solutin.SolutionRequestWind, db: Session = Depends(get_db)
# ):
#     ids = [device.id for device in req.devices]
#     usage = {device.id: device.daily_usage_duration for device in req.devices}

#     consumption = db.query(Devices).filter(Devices.id.in_((ids))).all()
#     total_consumption = totalConsumption(usage=usage, consumption=consumption)
#     # result = WindTurbineCalculator(
#     #     average_wind_speed=5,
#     #     rated_capacity=3.7,
#     #     daily_electricity_usage=total_consumption,
#     #     hours_per_day=24,
#     # )

#     return result.calculate_all_metrics()
