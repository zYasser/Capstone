def calculate_energy_production(effective_capacity, average_wind_speed, hours_per_day):
    daily_energy_production = effective_capacity * average_wind_speed * hours_per_day
    return daily_energy_production


def calculate_usable_energy_production(
    rated_capacity, derating_factor, average_wind_speed, hours_per_day
):
    effective_capacity = rated_capacity * derating_factor
    usable_energy_production = effective_capacity * average_wind_speed * hours_per_day
    return usable_energy_production


def calculate_number_of_turbines(daily_electricity_usage, usable_energy_per_turbine):
    return daily_electricity_usage / usable_energy_per_turbine


def calculate_effective_turbine_capacity(rated_capacity, derating_factor, system_loss):
    return rated_capacity * derating_factor * (1 - system_loss)


def calculate_system_loss_factor(system_losses, usable_energy_production):
    return system_losses / (system_losses + usable_energy_production)


# 7. Self-sufficiency ratio (SSR)
def calculate_self_sufficiency_ratio(usable_energy_production, daily_electricity_usage):
    return (usable_energy_production / daily_electricity_usage) * 100
