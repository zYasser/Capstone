import math


class WindTurbineCalculator:
    def __init__(
        self,
        rated_capacity,
        average_wind_speed,
        hours_per_day,
        daily_electricity_usage,
    ):
        self.rated_capacity = rated_capacity
        self.average_wind_speed = average_wind_speed
        self.hours_per_day = hours_per_day
        self.daily_electricity_usage = daily_electricity_usage
        self.system_losses = 0.2
        self.derating_factor = 0.6

    def calculate_daily_energy_production(self):
        return round(
            self.calculate_effective_turbine_capacity()
            * self.average_wind_speed
            * self.hours_per_day,
            2,
        )

    def calculate_usable_energy_production(self):
        effective_capacity = self.calculate_effective_turbine_capacity()
        usable_energy_production = round(
            effective_capacity * self.average_wind_speed * self.hours_per_day, 2
        )
        return usable_energy_production

    def calculate_number_of_turbines_needed(self):
        usable_energy_per_turbine = self.calculate_usable_energy_production()
        return math.ceil(self.daily_electricity_usage / usable_energy_per_turbine)

    def calculate_effective_turbine_capacity(self):
        return round(
            self.rated_capacity * self.derating_factor * (1 - self.system_losses), 2
        )

    def calculate_system_loss_factor(self):
        usable_energy_production = self.calculate_usable_energy_production()
        return round(
            (
                self.system_losses
                / (self.system_losses + usable_energy_production)
                * 100
            ),
            4,
        )

    def calculate_self_sufficiency_ratio(self):
        usable_energy_production = self.calculate_usable_energy_production()
        return round((usable_energy_production / self.daily_electricity_usage) * 100, 2)

    def calculate_all_metrics(self):
        results = {
            "Daily Energy Production": self.calculate_daily_energy_production(),
            "Usable Energy Production": self.calculate_usable_energy_production(),
            "Number of Turbines Needed": self.calculate_number_of_turbines_needed(),
            "Effective Turbine Capacity": self.calculate_effective_turbine_capacity(),
            "System Loss Factor": self.calculate_system_loss_factor(),
            "Self Sufficiency Ratio": self.calculate_self_sufficiency_ratio(),
        }
        return results
