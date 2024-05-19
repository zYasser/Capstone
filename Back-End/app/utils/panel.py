from itertools import count
import math

# Constant data
PANEL_DATA = {
    "Canadian Solar CS6P-200PM": {
        "Price": 110,
        "Dimensions": "1638x982",
        "Energy_Production": 0.9,
        "Array_Area": 1.60,
        "Pmax": 200,
    },
    "Canadian Solar HiDM CS1U-MS": {
        "Price": 190,
        "Dimensions": "2078x992",
        "Energy_Production": 1.8,
        "Array_Area": 2.06,
        "Pmax": 400,
    },
    "Trina Solar Vertex TSM-DE20-600": {
        "Price": 250,
        "Dimensions": "2172x1303",
        "Energy_Production": 2.4,
        "Array_Area": 2.83,
        "Pmax": 600,
    },
}

INVERTER_DATA = {
    "HM-600NT": {
        "Length": 250,
        "Width": 170,
        "Array_Area": 0.042,
        "Power_Rating": 600,
        "Battery": False,
    },
    "GrowattSPH6000": {
        "Length": 545,
        "Width": 516,
        "Array_Area": 0.282,
        "Power_Rating": 6000,
        "Battery": 58,
    },
}

TRACKING_DATA = {
    "SINGLE AXIS": {
        "Southeastern Anatolia": 1254,
        "Mediterranean": 1688,
        "Eastern Anatolia": 1234,
        "Central Anatolia": 1278,
        "Aegean": 1502,
        "Marmara": 1179,
        "Black Sea": 1234,
    },
    "DUAL AXIS": {
        "Southeastern Anatolia": 1498,
        "Mediterranean": 1953,
        "Eastern Anatolia": 1459,
        "Central Anatolia": 1447,
        "Aegean": 1737,
        "Marmara": 1332,
        "Black Sea": 1459,
    },
    "FIXED": {
        "Southeastern Anatolia": 1062,
        "Mediterranean": 1494,
        "Eastern Anatolia": 1063,
        "Central Anatolia": 1167,
        "Aegean": 1350,
        "Marmara": 1104,
        "Black Sea": 1042,
    },
}


class PVCalculation:
    def __init__(
        self,
        panel_name,
        roof_size,
        tracking_system,
        region,
        energy_consuming,
        inverter_name=None,
        average_gas_consumption=None,
        oversize=False,
        off_grid=False,
    ):
        self.panel_name = panel_name
        self.inverter_name = inverter_name
        self.roof_size = roof_size
        self.energy_consuming = energy_consuming
        self.average_gas_consumption = average_gas_consumption
        self.electricity_needed_yearly = (
            self.calculate_gas_to_electricity() if average_gas_consumption else 0
        )
        self.dc = TRACKING_DATA[tracking_system][region]
        self.panel = PANEL_DATA[panel_name]
        self.inverter = INVERTER_DATA[inverter_name] if inverter_name else None
        self.oversize = oversize
        self.off_grid = off_grid

    def calculate(self):
        if self.inverter_name == "HM-600NT" and self.off_grid:
            return None
        if self.average_gas_consumption:
            return self.calculate_all_gas()
        else:
            return self.calculate_all_without_gas()

    def calculate_all_without_gas(self):

        energy_consuming = self.calculate_energy_consuming()
        inital_energy_consuming = energy_consuming
        battery_capacity = self.calculate_battery_capacity(energy_consuming)
        initial_num_panel = self.calculate_initial_num_panel()
        num_of_inverters = self.calculate_num_of_inverters(energy_consuming)
        area = self.calculate_area(initial_num_panel, num_of_inverters)
        num_of_panel = self.calculate_num_of_panel()
        energy_production = self.calculate_energy_production()

        if initial_num_panel != num_of_panel:
            energy_consuming, num_of_inverters = self.adjust_panels_and_inverters(
                initial_num_panel, num_of_panel, energy_consuming, num_of_inverters
            )
            energy_production = self.dc * energy_consuming
            battery_capacity = self.calculate_battery_capacity(
                (num_of_panel - initial_num_panel) * self.panel["Energy_Production"]
            )

        if (
            self.oversize
            and energy_consuming < num_of_inverters * self.inverter["Power_Rating"]
        ):
            num_of_inverters = self.additional_inverter(
                math.floor(energy_consuming * 0.9 * 1000), num_of_inverters
            )

        return self.get_results(
            energy_consuming,
            num_of_panel,
            area,
            num_of_inverters,
            battery_capacity,
            energy_production,
        )

    def calculate_all_gas(self):
        energy_consuming = self.calculate_energy_consuming()
        battery_capacity = self.calculate_battery_capacity(self.energy_consuming)
        initial_num_panel = self.calculate_initial_num_panel()
        num_of_inverters = self.calculate_num_of_inverters(energy_consuming)
        clean_energy = self.calculate_clean_energy(energy_consuming)
        area = self.calculate_area(initial_num_panel, num_of_inverters)
        num_of_panel = self.calculate_num_of_panel()
        energy_production = self.calculate_energy_production()
        if (
            energy_consuming < num_of_inverters * self.inverter["Power_Rating"]
            and self.oversize
        ):
            num_of_inverters = self.additional_inverter(
                num_of_panel * self.panel["Pmax"] * 0.9, num_of_inverters
            )

        if initial_num_panel != num_of_panel:
            energy_consuming, num_of_inverters = self.adjust_panels_and_inverters(
                initial_num_panel, num_of_panel, energy_consuming, num_of_inverters
            )
            battery_capacity = self.calculate_battery_capacity(
                (num_of_panel - initial_num_panel) * self.panel["Energy_Production"]
            )

            energy_production = self.dc * energy_consuming
        if (
            self.oversize
            and energy_consuming < num_of_inverters * self.inverter["Power_Rating"]
        ):
            num_of_inverters = self.additional_inverter(
                math.floor(energy_consuming * 0.9 * 1000), num_of_inverters
            )
        return self.get_results(
            energy_consuming,
            num_of_panel,
            area,
            num_of_inverters,
            battery_capacity,
            energy_production,
            clean_energy,
        )

    def additional_inverter(self, energy_solar, num_of_inverters):
        main_inverter = math.floor(energy_solar / (self.inverter["Power_Rating"]))
        remaing = energy_solar - (main_inverter * self.inverter["Power_Rating"])
        weak_inverter = INVERTER_DATA["HM-600NT"]
        return {
            self.inverter_name: main_inverter,
            "HM-600NT": round(remaing / weak_inverter["Power_Rating"]),
        }

    def calculate_energy_consuming(self):
        return (1.2 * self.energy_consuming * 365) / self.dc

    def calculate_battery_capacity(self, energy_consuming):
        if self.inverter_name == "GrowattSPH6000" and self.off_grid:
            return (energy_consuming * 1000 * 3) / (self.inverter["Battery"] * 0.85 * 2)
        return None

    def calculate_initial_num_panel(self):
        num = round((self.energy_consuming * 1.2) / self.panel["Energy_Production"], 2)
        return math.ceil(num)

    def calculate_num_of_inverters(self, energy_consuming):
        return math.ceil(
            ((energy_consuming * 0.8) * 1000) / self.inverter["Power_Rating"]
        )

    def calculate_area(self, initial_num_panel, num_of_inverters):
        return ((initial_num_panel * self.panel["Array_Area"]) * 1.15) + (
            self.inverter["Array_Area"] * num_of_inverters
        )

    def calculate_num_of_panel(self):
        return math.ceil((self.roof_size - 3) / (self.panel["Array_Area"] * 1.15))

    def calculate_energy_production(self):
        return 1.2 * self.energy_consuming * 365

    def calculate_clean_energy(self, energy_consuming):
        return (energy_consuming * self.dc - self.electricity_needed_yearly) / 365

    def adjust_panels_and_inverters(
        self, initial_num_panel, num_of_panel, energy_consuming, num_of_inverters
    ):
        num = num_of_panel - initial_num_panel
        dc_output = num * self.panel["Pmax"]
        remaining_inverter_area = math.ceil(
            (dc_output * 0.8) / self.inverter["Power_Rating"]
        )
        num_of_inverters += remaining_inverter_area
        energy_consuming += dc_output / 1000
        return energy_consuming, num_of_inverters

    def get_results(
        self,
        energy_consuming,
        num_of_panel,
        area,
        num_of_inverters,
        battery_capacity,
        energy_production,
        clean_energy=None,
    ):
        if type(num_of_inverters) is int:
            num_of_inverters = {"Name": self.inverter_name, "count": num_of_inverters}
        if battery_capacity is not None:
            battery_capacity = {
                "Name": "Sonnen Eco GEN3 ECO15",
                "Battery Count": round(((battery_capacity * 58) / 1000) / 15),
            }
        if clean_energy is not None:
            clean_energy = round(clean_energy, 2)

        return {
            "DC System Size": round(energy_consuming, 2),
            "Panels": {"name": self.panel_name, "count": num_of_panel},
            "Area": round(area, 2),
            "Inverters": num_of_inverters,
            "Battery Capacity": battery_capacity,
            "Energy Production": round(energy_production, 2),
            "Clean Energy": clean_energy,
            "Carbon Footprint": round((0.699 * energy_production) / 1000, 2),
        }

    def calculate_gas_to_electricity(self):
        gas_consumption_hourly = (self.average_gas_consumption / 30) / 24
        gas_consumption_hourly_KWH = (gas_consumption_hourly * 35300) / 3412
        gas_consumption_yearly_KWH = gas_consumption_hourly_KWH * 24 * 365
        return gas_consumption_yearly_KWH / 4


# # Example usage
# calculation = PVCalculation(
#     region="Aegean",
#     roof_size=128,
#     panel_name="Trina Solar Vertex TSM-DE20-600",
#     energy_consuming=46.6,
#     tracking_system="SINGLE AXIS",
#     inverter_name="GrowattSPH6000",
# )
# Example usage
calculation = PVCalculation(
    region="Central Anatolia",
    roof_size=48,
    panel_name="Trina Solar Vertex TSM-DE20-600",
    energy_consuming=28,
    tracking_system="SINGLE AXIS",
    inverter_name="HM-600NT",
    average_gas_consumption=200,
)

results = calculation.calculate()
