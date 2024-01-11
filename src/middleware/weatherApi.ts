import { Request, Response, NextFunction } from "express";
import { weatherDataByLocation } from "../services/weatherService";


interface ExtendedRequest extends Request {
  weatherData?: any; 
}
export const fetchWeather = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { location } = req.body;
    const response =await weatherDataByLocation(location);
    console.log('rr-',response);
    req.weatherData = response;
    next();
  } catch (error) {
    next(error);
  }
};
