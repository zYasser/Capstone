import math
from pvlib import solarposition


def solar_declination(day_of_year):
    """
    Calculates the solar declination (δ) in degrees
    """
    # return 23.45 * math.sin(math.radians(360 * (284 + day_of_year) / 365))
    return math.degrees(23.45 * math.sin(math.radians(360 * (283 + day_of_year) / 365)))


def solar_hour_angle(tst, longitude):
    """
    Calculates the solar hour angle (ω) in degrees
    """
    return (tst / 4) - 180 + longitude


def true_solar_time(standard_time, eot, longitude):
    """
    Calculates the true solar time (TST) in minutes
    """
    return standard_time + eot + 4 * longitude


def solar_altitude(latitude, declination, hour_angle):
    """
    Calculates the solar altitude (α) in degrees
    """
    return math.degrees(
        math.asin(
            math.sin(math.radians(latitude)) * math.sin(math.radians(declination))
            + math.cos(math.radians(latitude))
            * math.cos(math.radians(declination))
            * math.cos(math.radians(hour_angle))
        )
    )


def angle_of_incidence(altitude, declination):
    """
    Calculates the angle of incidence (θ) in degrees
    """
    return 90 - altitude + declination


# Example usage
day_of_year = 101
latitude = 40.7  # Degrees North
longitude = -74  # Degrees West
standard_time = 12 * 60  # 12 PM in minutes

decl = solar_declination(day_of_year)
tst = true_solar_time(standard_time, 5, longitude)
hour_angle = solar_hour_angle(tst, longitude)
alt = solar_altitude(latitude, decl, hour_angle)
aoi = angle_of_incidence(alt, decl)
print(decl)
