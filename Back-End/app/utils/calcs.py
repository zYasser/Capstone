import math


class SolarAnglesCalculator:
    def __init__(self, day_of_year, eot, longitude, standard_time ,altitude):
        self.altitude=altitude
        self.day_of_year = day_of_year
        self.eot = eot
        self.longitude = longitude
        self.standard_time = standard_time
        # Calculate solar declination angle
        self.solar_declination_angle = self.calculate_solar_declination_angle()
        self.tst = self.calculate_true_solar_time(self.standard_time)

        self.solar_hour_angle = self.calculate_solar_hour_angle(self.tst)

        self.solar_altitude_angle = self.solar_altitude_angle()
        self.angle_of_incidence=self

    def calculate_solar_declination_angle(self):
        return 23.45 * math.sin(math.radians(360 * (283 + self.day_of_year) / 365))

    def calculate_solar_altitude_angle(self):
        return math.degrees(math.asin(math.sin(math.radians(latitude)) * math.sin(math.radians(self.solar_declination_angle)) +
                                   math.cos(math.radians(latitude)) * math.cos(math.radians(self.solar_declination_angle)) *
                                   math.cos(math.radians(self.solar_hour_angle))))
    def calculate_solar_hour_angle(self, tst):
        return (tst / 4) - 180 + self.longitude

    def calculate_true_solar_time(self, standard_time):

        return standard_time + self.eot + 4 * self.longitude

    def calculate_angle_of_incidence(self):
        return 90 - self.altitude - self.solar_declination_angle


# Example usage:
day_of_year = 100
eot = 10  # example value
longitude = -75  # example value
latitude = 40  # example value
standard_time = 720  # Assuming standard time is 12:00 PM

solar_calculator = SolarAnglesCalculator(day_of_year, eot, longitude)
altitude, incidence_angle = solar_calculator.calculate_all_angles(
    latitude, standard_time
)

print("Solar Altitude Angle:", altitude)
print("Angle of Incidence:", incidence_angle)
