import { fetchWeatherApi } from 'openmeteo';

const Weather = async ({ latitude, longitude }) => {
  let currentDate = new Date();
  let oneYearAgo = new Date(currentDate);
  oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

  // Set end date to yesterday
  let endDate = new Date(currentDate);
  endDate.setDate(currentDate.getDate() - 1);

  console.log(endDate.toISOString().split('T')[0]);

  const url = "https://archive-api.open-meteo.com/v1/archive";
  const params = {
    "latitude": latitude,
    "longitude": longitude,
    //"start_date": oneYearAgo.toISOString().split('T')[0],
    //"end_date": endDate.toISOString().split('T')[0],
    "start_date": "2024-03-04",
    "end_date": "2024-04-03",
    "daily": "sunshine_duration",
    "hourly": "direct_normal_irradiance",
  };

  

  const responses = await fetchWeatherApi(url, params);

  // Helper function to form time ranges
  const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  let utcOffsetSeconds = response.utcOffsetSeconds();
  let daily = response.daily();

  if (daily) {
    let time = daily.time();
    let sunshineDuration = daily.variables(0)?.valuesArray();

    if (time && sunshineDuration) {
      const timeArray = range(Number(time), Number(daily.timeEnd()), daily.interval()).map(
        (t) => new Date((t + utcOffsetSeconds) * 1000)
      );

      // Calculate total sunshine duration and count of days
      let totalSunshineDuration = 0;
      let numberOfDays = 0;

      for (let i = 0; i < timeArray.length; i++) {
        // Check if sunshine duration is available for the day
        if (sunshineDuration[i] !== null && sunshineDuration[i] !== undefined) {
          totalSunshineDuration += sunshineDuration[i];
          numberOfDays++;
        }
      }

      // Calculate average yearly sunshine duration
      const averageSunshineDuration = totalSunshineDuration / numberOfDays;

      console.log("Yearly sunshine duration:", totalSunshineDuration / 3600);
      console.log("Average daily sunshine duration:", averageSunshineDuration/ 3600);

      const url2 = "https://api.open-meteo.com/v1/forecast";
      const responses2 = await fetchWeatherApi(url2, params);
  
      // Process first location. Add a for-loop for multiple locations or weather models
      const response2 = responses2[0];
  
      // Attributes for timezone and location
      utcOffsetSeconds = response2.utcOffsetSeconds();
      const hourly = response2.hourly();
  
      // Note: The order of weather variables in the URL query and the indices below need to match!
      const weatherData = {
        hourly: {
          time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
            (t) => new Date((t + utcOffsetSeconds) * 1000)
          ),
          directNormalIrradiance: hourly.variables(0).valuesArray(),
        },
      };
  
      // `weatherData` now contains a simple structure with arrays for datetime and weather data
      for (let i = 0; i < weatherData.hourly.time.length; i++) {
        console.log(
          weatherData.hourly.time[i].toISOString(),
          weatherData.hourly.directNormalIrradiance[i]
        );    
      }
    }
  }
};

export default Weather;
