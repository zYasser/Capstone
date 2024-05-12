import math


class WindTurbineSystem:
    def __init__(
        self,
        rotor_diameter,
        system_loss,
        wind_speed,
        time,
        actual_energy,
        max_theoretical_energy,
        rated_power,
        daily_electricity_usage,
        energy_per_turbine,
    ):
        self.air_density = 1.225
        self.system_loss = system_loss
        self.rotor_area = 3.14 * ((rotor_diameter / 2) ** 2)
        self.wind_speed = wind_speed
        self.time = time
        self.actual_energy = actual_energy
        self.max_theoretical_energy = max_theoretical_energy
        self.rated_power = rated_power
        self.daily_electricity_usage = daily_electricity_usage
        self.energy_per_turbine = energy_per_turbine

    def power_available(self):
        power =( 0.5 * self.air_density * self.rotor_area * self.wind_speed**3)/1000
        return power

    def energy_output(self):
        energy = self.power_available() * self.time
        return energy

    def capacity_factor(self):
        capacity_factor = self.actual_energy / self.max_theoretical_energy
        return capacity_factor

    def daily_energy_production(self):
        daily_production = (
            self.rated_power
            * self.capacity_factor()
            * self.wind_speed
            * 24
            * (1 - self.system_loss)
        )
        return daily_production

    def num_turbines_needed(self):
        num_turbines = math.ceil(self.daily_electricity_usage / self.energy_per_turbine)
        return num_turbines

    def system_loss_factor(self):
        system_loss_factor = self.system_loss / (
            self.system_loss + self.daily_energy_production()
        )
        return system_loss_factor

    def self_sufficiency_ratio(self):
        ssr = (self.daily_energy_production() / self.daily_electricity_usage) * 100
        return ssr

    def run_system_analysis(self):
        results = {}
        results["power_available"] = self.power_available()
        results["energy_output"] = self.energy_output()
        results["capacity_factor"] = self.capacity_factor()
        results["daily_energy_production"] = self.daily_energy_production()
        results["num_turbines_needed"] = self.num_turbines_needed()
        results["system_loss_factor"] = self.system_loss_factor()
        results["self_sufficiency_ratio"] = self.self_sufficiency_ratio()
        return results


# Example usage:
system = WindTurbineSystem(
    system_loss=0.15,
    rotor_diameter=6.2,
    wind_speed=6.2,
    time=24,
    actual_energy=43.04,
    max_theoretical_energy=105.8,
    rated_power=6,
    daily_electricity_usage=1000,
    energy_per_turbine=1000,
)
analysis_results = system.run_system_analysis()

print(analysis_results)
