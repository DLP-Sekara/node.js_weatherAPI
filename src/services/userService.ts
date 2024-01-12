import userModel from "../models/user.models";
import {
  updateDataBody,
  userDetailInterface,
  userWeatherRepotCredentials,
  weatherDataCredentials,
} from "../utils/interfaces";
import { weatherDataByLocation } from "./weatherService";

//get all users
export const getUserService = async (): Promise<any> => {
  try {
    const userData = await userModel.find();
    return userData;
  } catch (error) {
    console.log("error in service- ", error);
    return error;
  }
};

//get weather report by email and date
export const getUserWeatherReportService = async (
  data: userWeatherRepotCredentials
) => {
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

//save new user
export const saveUserService = async (data: userDetailInterface) => {
  try {
    const checkAvailability = await userModel.findOne({ email: data.email });
    if (checkAvailability == null) {
      const weatherData = await weatherDataByLocation(data.location);
      if (weatherData != null) {
        const newUser = new userModel({
          email: data.email,
          location: data.location,
          weatherData: {
            date: new Date(),
            time: new Date().toTimeString(),
            city: weatherData.city,
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
        return "invalid location,check your location name again !";
      }
    } else {
      return { message: "Already existing user!" };
    }
  } catch (error) {
    console.log("error in service- ", error);
    return error;
  }
};

//update user
export const updateUserService = async (data: updateDataBody) => {
  try {
    const checkAvailability = await userModel.findOne({ email: data.email });
    const weatherData = await weatherDataByLocation(data.location);
    if (checkAvailability != null) {
      if (weatherData != null) {
        const { _id, ...updateData } = data;
        const userData = await userModel.findOneAndUpdate({ _id }, updateData);

        //add new location weather
        await updateUserWeatherService({
          id: _id,
          location: updateData.location,
        });
        return { message: "User updated successfully !", userData };
      } else {
        return "invalid location,check your location name again !";
      }
    } else {
      return { message: "No such user !" };
    }
  } catch (error) {
    console.log("error in service- ", error);
    return error;
  }
};

//update user weatherData
export const updateUserWeatherService = async (
  data: weatherDataCredentials
) => {
  try {
    const weatherData = await weatherDataByLocation(data.location);

    const user = await userModel.findById(data.id);
    user?.weatherData.push({
      date: new Date(),
      time: new Date().toTimeString(),
      city: weatherData.city,
      temperature: weatherData.temperature,
      weatherStatus: weatherData.weatherStatus,
      humidity: weatherData.humidity,
      windSpeed: weatherData.windSpeed,
      feels_like: weatherData.feels_like,
    });
    const userData = await user?.save();
    return { userData };
  } catch (error) {
    console.log("error in service- ", error);
    return error;
  }
};
