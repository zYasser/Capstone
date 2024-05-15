from datetime import datetime, timedelta
import math


class SolarCalculator:
    def __init__(self, day_of_year, latitude, longitude, standard_time_min, local_time):
        self.day_of_year = day_of_year
        self.latitude = latitude
        self.longitude = longitude
        self.standard_time_min = standard_time_min
        self.SOLAR_CONSTANT = 1367  # Solar constant I₀ in W/m²
        self.EARTH_SUN_DISTANCE_AU = (
            1  # Average Earth-Sun distance in astronomical units (AU)
        )
        self.eot = None
        self.declination = None
        self.tst = None
        self.hour_angle = None
        self.solar_altitude = None
        self.angle_incidence = None
        self.solar_irr = None
        self.solar_azimuth = None
        self.local_time = local_time
        self.lstm = 45
        self.tc = None
        self.local_solar_time = None

    def calculate_time_correction(self):
        self.tc = 4 * (self.longitude - self.lstm) + self.eot
        return self.tc

    def equation_of_time(self):
        b = (360 / 365) * (self.day_of_year - 81)
        term1 = 9.87 * math.sin(2 * math.radians(b))
        term2 = 7.53 * math.cos(math.radians(b))
        term3 = 1.5 * math.sin(math.radians(b))
        self.eot = term1 - term2 - term3
        return term1 - term2 - term3

    def solar_declination(self):
        """Calculate solar declination δ in degrees."""
        self.declination = round(
            23.45 * math.sin(math.radians((360 / 365) * (284 + self.day_of_year))), 2
        )

    def true_solar_time(self):
        """Calculate True Solar Time (TST) in minutes."""
        self.tst = self.standard_time_min + (self.eot * 4) + (self.longitude * 4)

    def solar_hour_angle(self):
        """Calculate Solar Hour Angle (ω) in degrees."""
        self.hour_angle = round(
            15 * (self._time_to_float(self.local_solar_time) - 12), 2
        )

    def _time_to_float(self, time_str):
        # Split the time string into hours and minutes
        hours, minutes = map(int, time_str.split(":"))

        # Convert the time to float with minutes as a fraction of an hour
        time_float = hours + minutes / 100

        return time_float

    def calculate_all(self):
        self.equation_of_time()
        self.solar_declination()
        self.calculate_time_correction()
        self.calculate_local_solar_time()
        self.true_solar_time()
        self.solar_hour_angle()

        phi = math.radians(self.latitude)
        delta = math.radians(self.declination)
        omega = math.radians(self.hour_angle)

        self.solar_altitude = math.degrees(
            math.asin(
                (math.sin(phi) * math.sin(delta))
                + (math.cos(phi) * math.cos(delta) * math.cos(omega))
            )
        )

        tilt_angle = 26.01
        self.angle_incidence = math.degrees(
            math.acos(
                math.sin(math.radians(self.latitude - tilt_angle)) * math.sin(delta)
                + math.cos(math.radians(self.latitude - tilt_angle))
                * math.cos(delta)
                * math.cos(omega)
            )
        )

        self.solar_irr = self.SOLAR_CONSTANT * (
            math.cos(math.radians(self.angle_incidence)) / self.EARTH_SUN_DISTANCE_AU**2
        )

        delta_rad = math.radians(self.declination)
        omega_rad = math.radians(self.hour_angle)
        alpha_rad = math.radians(self.solar_altitude)
        self.solar_azimuth = math.degrees(
            math.asin(math.cos(delta_rad) * math.sin(omega_rad) / math.cos(alpha_rad))
        )

    def calculate_local_solar_time(self):
        try:
            initial_time = datetime.strptime(self.local_time, "%H:%M")
            time_added = initial_time + timedelta(minutes=self.tc / 60.0)
            self.local_solar_time = time_added.strftime("%H:%M")

            return self.local_solar_time
        except Exception as e:
            print("wrong local date time , Use Time HH:MM ", e)

    def get_results(self):
        return {
            "Equation Of Time": self.eot,
            "Solar Declination": self.declination,
            "True Solar Time": self.tst,
            "Solar Hour Angle": self.hour_angle,
            "Solar Altitude": self.solar_altitude,
            "Angle of Incidence": self.angle_incidence,
            "Solar Irradiance": self.solar_irr,
            "Solar Azimuth Angle": self.solar_azimuth,
            "Time Correction Factor": self.tc,
            "local_solar_time": self.local_solar_time,
        }


# Example usage:
day_of_year = 126
latitude = 41.01
longitude = 28.97
standard_time_min = 720  # Noon

solar_calc = SolarCalculator(
    day_of_year, latitude, longitude, standard_time_min, local_time="12:00"
)
solar_calc.calculate_all()
results = solar_calc.get_results()

for key, value in results.items():
    print(f"{key}: {value}")
