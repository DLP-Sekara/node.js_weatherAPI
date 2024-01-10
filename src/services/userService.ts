import userModel from "../models/user.models";

export const getUserService = async () => {
  try {
    const userData = await userModel.find();
    return userData;
  } catch (error) {
    console.log("error in service- ", error);
    return error;
  }
};

export const getUserWeatherReportService = async (date: any) => {
  try {
    const userData = await userModel.find();
    return userData;
  } catch (error) {
    console.log("error in service- ", error);
    return error;
  }
};

export const saveUserService = async (data: any) => {
  try {
    const newUser = new userModel({
      email: data.email,
      location: data.location,
      weatherData: data.weatherData,
    });
    const userData = await newUser.save();
    return {message: 'User Added successfully !',userData};
  } catch (error) {
    console.log("error in service- ", error);
    return error;
  }
};

export const updateUserService = async (data: any) => {
  try {
    const { _id, ...updateData } = data;
    const userData = await userModel.findOneAndUpdate({ _id }, updateData);
    return { message: "User updated successfully !", userData };;
  } catch (error) {
    console.log("error in service- ", error);
    return error;
  }
};
