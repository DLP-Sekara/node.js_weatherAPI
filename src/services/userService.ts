import userModel from "../models/user.models";
import { WeatherData } from "../utils/interfaces";
import { weatherDataByLocation } from "./weatherService";

export const getUserService = async () => {
  try {
    const userData = await userModel.find();
    return userData;
  } catch (error) {
    console.log("error in service- ", error);
    return error;
  }
};

export const getUserWeatherReportService = async (data: any) => {
  try {
    const { email, date } = data;
    const checkAvailability = await userModel.findOne({ email: email });
    if (checkAvailability != null) {
      const dateObj = new Date(date);
      const userData = await userModel.find({
        email: email,
        "weatherData.date": {
          $gte: new Date(
            dateObj.getFullYear(),
            dateObj.getMonth(),
            dateObj.getDate()
          ),
          $lt: new Date(
            dateObj.getFullYear(),
            dateObj.getMonth(),
            dateObj.getDate() + 1
          ),
        },
      });
      return userData;
    } else {
      return { message: "No valid user !" };
    }
  } catch (error) {
    console.log("error in service- ", error);
    return error;
  }
};

export const saveUserService = async (data: any) => {
  try {
    const checkAvailability = await userModel.findOne({ email: data.email });
    if (checkAvailability == null) {
      console.log("done", checkAvailability);
      const weatherData = await weatherDataByLocation(data.location);
      const newUser = new userModel({
        email: data.email,
        location: data.location,
        weatherData: {
          date: new Date(),
          time: new Date().toTimeString(),
          temperature: weatherData.temperature,
          weatherStatus: weatherData.weatherStatus,
          humidity: weatherData.humidity,
          windSpeed: weatherData.windSpeed,
          feels_like: weatherData.feels_like,
        },
      });
      const userData = await newUser.save();
      return { message: "User Added successfully !", userData };
    } else {
      return { message: "Already existing user!" };
    }
  } catch (error) {
    console.log("error in service- ", error);
    return error;
  }
};

export const updateUserService = async (data: any) => {
  try {
    const { _id, ...updateData } = data;
    const userData = await userModel.findOneAndUpdate({ _id }, updateData);
    return { message: "User updated successfully !", userData };
  } catch (error) {
    console.log("error in service- ", error);
    return error;
  }
};
