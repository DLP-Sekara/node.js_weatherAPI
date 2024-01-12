import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const api_id = process.env.API_ID;

export const weatherDataByLocation = async (location: string): Promise<any> => {
  try {
    const todayResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_id}&units=metric`
    );
    if (todayResponse.status === 200) {
      const weatherData = {
        city: todayResponse.data.name,
        temperature: todayResponse.data.main.temp,
        weatherStatus: todayResponse.data.weather[0].main,
        humidity: todayResponse.data.main.humidity,
        windSpeed: todayResponse.data.wind.speed,
        feels_like: todayResponse.data.main.feels_like,
      };
      return weatherData;
    }else{
      console.log("invalid location,check your location name again !");
      return null
    }
  } catch (error) {
    console.log("weather service error- ", error);
    return null;
  }
};
