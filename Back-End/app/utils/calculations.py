import math


def calculate_gas(average_gas_consumption):
    gas_consumption_hourly = (average_gas_consumption/30) /24
    gas_consumption_hourly_KWH = (gas_consumption_hourly * 35300) / 3412

    gas_consumption_yearly_KWH = (gas_consumption_hourly_KWH * 24) * 365
    electricity_needed_yearly =  gas_consumption_yearly_KWH /4
    print( f"Electricity needed yearly: {electricity_needed_yearly}")

calculate_gas(200)