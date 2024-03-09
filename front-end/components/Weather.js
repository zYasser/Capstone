import React, { useEffect } from 'react';
import { fetchWeatherApi } from 'openmeteo';

const Weather = ({ latitude, longitude }) => {
  useEffect(() => {
    const fetchData = async () => {
      const params = {
        latitude: latitude,
        longitude: longitude,
        current: "temperature_2m"
      };
      
      const url = "https://api.open-meteo.com/v1/forecast";

        const responses = await fetchWeatherApi(url, params);

        // Process first location. Add a for-loop for multiple locations or weather models
        const response = responses[0];

        // Attributes for timezone and location
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const current = response.current();

        // Note: The order of weather variables in the URL query and the indices below need to match!
        const weatherData = {
          current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature2m: current.variables(0).value(),

          },
          
       }
        console.log('Current Temperature:', weatherData.current.temperature2m);
     
    };



    fetchData();
    
  }, [latitude, longitude]); // Run the fetch when latitude or longitude props change
  
};

export default Weather;
