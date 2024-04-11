def totalConsumption(usage , consumption):
    total_consumpation = 0
    for r in consumption:
        cost = cost + (r.consumption_watt * usage[r.id])
        cost = cost + (r.standby_duration_hours*r.standby_power_consumption)
    return total_consumpation/1000
