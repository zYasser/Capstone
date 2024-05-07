import math

class SolarCalculator:
    def __init__(self, day_of_year, latitude, longitude, standard_time_min):
        self.day_of_year = day_of_year
        self.latitude = latitude
        self.longitude = longitude
        self.standard_time_min = standard_time_min
        self.SOLAR_CONSTANT = 1367  # Solar constant I₀ in W/m²
        self.EARTH_SUN_DISTANCE_AU = 1  # Average Earth-Sun distance in astronomical units (AU)
        self.eot = 5
        self.declination = None
        self.tst = None
        self.hour_angle = None
        self.solar_altitude = None
        self.angle_incidence = None
        self.solar_irr = None
        self.solar_azimuth = None

    def solar_declination(self):
        """Calculate solar declination δ in degrees."""
        self.declination = 23.27 * math.sin(math.radians(360 * (self.day_of_year + 283) / 365))

    def true_solar_time(self):
        """Calculate True Solar Time (TST) in minutes."""
        self.tst = self.standard_time_min + (self.eot * 4) + (self.longitude * 4)

    def solar_hour_angle(self):
        """Calculate Solar Hour Angle (ω) in degrees."""
        self.hour_angle = (self.tst / 4) - 180

    def calculate_all(self):
        self.solar_declination()
        self.true_solar_time()
        self.solar_hour_angle()
        
        phi = math.radians(self.latitude)
        delta = math.radians(self.declination)
        omega = math.radians(self.hour_angle)
        self.solar_altitude = math.degrees(math.asin(math.sin(phi) * math.sin(delta) + math.cos(phi) * math.cos(delta) * math.cos(omega)))

        self.angle_incidence = 90 - self.solar_altitude - self.declination

        self.solar_irr = self.SOLAR_CONSTANT * (math.cos(math.radians(self.angle_incidence)) / self.EARTH_SUN_DISTANCE_AU**2)

        delta_rad = math.radians(self.declination)
        omega_rad = math.radians(self.hour_angle)
        alpha_rad = math.radians(self.solar_altitude)
        self.solar_azimuth = math.degrees(math.asin(math.cos(delta_rad) * math.sin(omega_rad) / math.cos(alpha_rad)))

    def get_results(self):
        return {
            "Solar Declination": self.declination,
            "True Solar Time": self.tst,
            "Solar Hour Angle": self.hour_angle,
            "Solar Altitude": self.solar_altitude,
            "Angle of Incidence": self.angle_incidence,
            "Solar Irradiance": self.solar_irr,
            "Solar Azimuth Angle": self.solar_azimuth
        }

# Example usage:
day_of_year = 172
latitude = 39.92
longitude = 32.86
standard_time_min = 720  # Noon

solar_calc = SolarCalculator(day_of_year, latitude, longitude, standard_time_min)
solar_calc.calculate_all()
results = solar_calc.get_results()

for key, value in results.items():
    print(f"{key}: {value}")
