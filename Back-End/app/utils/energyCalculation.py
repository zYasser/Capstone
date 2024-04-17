def totalConsumption(usage, consumption):
    total_consumpation = 0
    for r in consumption:
        total_consumpation = total_consumpation + (r.consumption_watt * usage[r.id])
        total_consumpation = total_consumpation + (
            r.standby_duration_hours * r.standby_power_consumption
        )
    return total_consumpation / 1000
