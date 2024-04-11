import math
import datetime


# class


def solar_altitude_angle(latitude, solar_declination_angle, hour_angle):
    """
    Calculate solar altitude angle.
    latitude: Latitude of the location (in degrees).
    solar_declination_angle: Solar declination angle (in degrees).
    hour_angle: Hour angle (in degrees).
    """
    return math.degrees(math.asin(math.sin(math.radians(latitude)) * math.sin(math.radians(solar_declination_angle)) +
                                   math.cos(math.radians(latitude)) * math.cos(math.radians(solar_declination_angle)) *
                                   math.cos(math.radians(hour_angle))))

def solar_declination_angle(day_of_year):
    """
    Calculate solar declination angle.
    day_of_year: Day of the year (1-365).
    """
    return 23.45 * math.sin(math.radians(360 * (283 + day_of_year) / 365))


# Example usage:
latitude = 40.7128  # Latitude of New York City
day_of_year = datetime.datetime.now().timetuple().tm_yday  # Get the current day of the year
hour_angle = 0  # For solar noon, typically considered as 12:00 PM
roof_direction = 180  # Assuming the roof is facing south

# Calculate solar declination angle
solar_declination = solar_declination_angle(170)

# Calculate solar altitude angle
solar_altitude = solar_altitude_angle(latitude, solar_declination, hour_angle)

# Calculate latitude angle

print("Solar Altitude Angle:", solar_altitude)
print("Solar Declination Angle:", solar_declination)
print("Roof Azimuth Angle:", roof_azimuth)
print("Latitude Angle:", latitude_angle)
