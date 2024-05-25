import math

turbine_specs = {
    "Air Breeze": {
        "Start-up Wind Speed": "3.13 m/s",
        "Voltage": "48 VDC",
        "Tower Height": "2.74 m",
        "Blades": 3,
        "Rotor Diameter": 1.17,
        "Rated Power": 3.5,
        "Actual Power Generated": 1,
        "Swept Area": "1.07 m³",
        "Noise Level": "Low",
        "Price": 1374,
    },
    "Skystream 3.7": {
        "Start-up Wind Speed": "3.5 m/s",
        "Voltage": "240 VAC",
        "Tower Height": "10.6 m (adjustable)",
        "Blades": 3,
        "Rotor Diameter": 3.72,
        "Rated Power": 2.4,
        "Actual Power Generated": 21.6,
        "Swept Area": "10.87 m²",
        "Noise Level": "Low",
        "Price": 2932,
    },
    "SD6 6 kW Wind Turbine": {
        "Start-up Wind Speed": "2.5 m/s",
        "Voltage": "48 V",
        "Tower Height": "9 m (adjustable)",
        "Blades": 3,
        "Rotor Diameter": 5.6,
        "Rated Power": 6,
        "Actual Power Generated": 82.2,
        "Swept Area": "24.6 m²",
        "Noise Level": "Low",
        "Price": 28154,
    },
    "Bergey Excel 1kW": {
        "Start-up Wind Speed": "3 m/s",
        "Voltage": "48 V",
        "Tower Height": "9 m (adjustable)",
        "Blades": 3,
        "Rotor Diameter": 2.5,
        "Rated Power": 1,
        "Actual Power Generated": 6.7,
        "Swept Area": "4.9 m²",
        "Noise Level": "Low",
        "Price": 10796,
    },
}


class WindTurbineSystem:
    def __init__(
        self,
        rotor_diameter,
        wind_speed,
        time,
        actual_energy,
        rated_power,
        daily_electricity_usage,
        price_per_turbine,
        turbine_name,
        inverter_price=0,
        battery_price=0,
    ):
        self.air_density = 1.225
        self.system_loss = 0.15
        self.rotor_area = math.pi * ((rotor_diameter / 2) ** 2)
        self.wind_speed = wind_speed
        self.time = time
        self.actual_energy = actual_energy
        self.rated_power = rated_power
        self.daily_electricity_usage = daily_electricity_usage
        self.price_per_turbine = price_per_turbine
        self.inverter_price = inverter_price
        self.battery_price = battery_price
        self.turbine_name = turbine_name

    def power_available(self):
        power = (0.5 * self.air_density * self.rotor_area * self.wind_speed**3) / 1000
        return power

    def energy_output(self):
        energy = self.power_available() * self.time
        return energy

    def capacity_factor(self):
        capacity_factor = self.actual_energy / self.energy_output()
        return capacity_factor

    def daily_energy_production(self):
        daily_production = (
            self.rated_power * self.capacity_factor() * 24 * (1 - self.system_loss)
        )
        return daily_production

    def num_turbines_needed(self):
        num_turbines = math.ceil(
            self.daily_electricity_usage / self.daily_energy_production()
        )
        return num_turbines

    def system_loss_factor(self):
        system_loss_factor = self.system_loss / (
            self.system_loss + self.daily_energy_production()
        )
        return system_loss_factor

    def self_sufficiency_ratio(self):
        ssr = (self.daily_energy_production() / self.daily_electricity_usage) * 100
        return ssr

    def total_price(self):
        num_turbines = self.num_turbines_needed()
        total_cost = num_turbines * self.price_per_turbine
        total_cost += self.inverter_price + self.battery_price
        return total_cost

    def run_system_analysis(self):
        results = {}
        results["power_available"] = self.power_available()
        results["Theoretical Energy"] = self.energy_output()
        results["capacity_factor"] = self.capacity_factor()
        results["Energy Production"] = self.daily_energy_production()
        results["Turbine"] = {self.turbine_name: self.num_turbines_needed()}
        results["system_loss_factor"] = self.system_loss_factor()
        results["self_sufficiency_ratio"] = self.self_sufficiency_ratio()
        results["Carbon Footprint"] = 5 * self.daily_energy_production() * 365 * 25
        results["Total Price"] = self.total_price()
        return results


# Configurations
configurations = [
    {
        "Turbine": "Air Breeze",
        "Inverter": "AIMS Power Inverter",
        "Inverter Price": 1356,
        "Battery": None,
        "Battery Price": 0,
    },
    {
        "Turbine": "Skystream 3.7",
        "Inverter": "AALGO 2400w",
        "Inverter Price": 910,
        "Battery": None,
        "Battery Price": 0,
    },
    {
        "Turbine": "SD6 6 kW Wind Turbine",
        "Inverter": "MultiPlus 5kVA 48V",
        "Inverter Price": 1016,
        "Battery": "BYD B-Box HV 12.8 kWh",
        "Battery Price": 7532,
    },
    {
        "Turbine": "Bergey Excel 1kW",
        "Inverter": "KRXNY 1000W Pure Sine Wave Power Inverter",
        "Inverter Price": 137,
        "Battery": "Trojan T-105 Plus 6V Deep-Cycle Flooded Lead-Acid Battery",
        "Battery Price": 416 * 4,  # 4 batteries in series
    },
]
price_dict = {
    "Air Breeze": 1374,
    "AIMS Power Inverter": 1356,
    "Skystream 3.7": 2932,
    "AALGO 2400w": 910,
    "SD6 6 kW Wind Turbine": 28154,
    "MultiPlus 5kVA 48V": 1016,
    "BYD B-Box HV 12.8 kWh": 7532,
    "Bergey Excel 1kW": 10796,
    "KRXNY 1000W Pure Sine Wave Power Inverter": 137,
    "Trojan T-105 Plus 6V Deep-Cycle Flooded Lead-Acid Battery": 416,  # 4 batteries in series
}


def find_solution(wind_speed, daily_electricity_usage, inverter_name, turbine, battery):
    turbine_spec = turbine_specs[turbine]

    wind_turbine = WindTurbineSystem(
        rotor_diameter=turbine_spec["Rotor Diameter"],
        wind_speed=wind_speed,  # Example wind speed, can be modified
        time=24,
        actual_energy=turbine_spec["Actual Power Generated"],
        rated_power=turbine_spec["Rated Power"],
        daily_electricity_usage=daily_electricity_usage,  # Example daily usage, can be modified
        price_per_turbine=turbine_spec["Price"],
        inverter_price=price_dict[inverter_name],
        battery_price=price_dict[battery],
        turbine_name=turbine,
    )

    results = wind_turbine.run_system_analysis()
    return results


def findAllCombination(wind_speed, daily_electricity_usage):
    results = []
    for config in configurations:
        turbine_spec = turbine_specs[config["Turbine"]]
        wind_turbine = WindTurbineSystem(
            turbine_name=config["Turbine"],
            rotor_diameter=turbine_spec["Rotor Diameter"],
            wind_speed=wind_speed,
            time=24,
            actual_energy=turbine_spec["Actual Power Generated"],
            rated_power=turbine_spec["Rated Power"],
            daily_electricity_usage=daily_electricity_usage,
            price_per_turbine=turbine_spec["Price"],
            inverter_price=config["Inverter Price"],
            battery_price=config["Battery Price"],
        )

        result = wind_turbine.run_system_analysis()
        for key, value in result.items():
            print(f"{key}: {value}")
        results.append(result)
    return results


findAllCombination(12,300)