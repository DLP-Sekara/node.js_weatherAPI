import {
  getUserService,
  updateUserWeatherService,
} from "../services/userService";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

//set weather Detils every 1h
export const setWeatherHourly = async () => {
  try {
    console.log("=========================");
    const allUsers = await getUserService();
    allUsers.forEach(async (user: any) => {
      await updateUserWeatherService({
        id: user._id,
        location: user.location,
      });
    });
  } catch (error) {
    console.log("Crontask error-", error);
  }
};

//genarate past 3hours weather report every 3h
export const sendWeatherReport = async () => {
  try {
    console.log("check ");
    const allUsers = await getUserService();
    allUsers.forEach(async (user: any) => {
      let weatherDataSet = [];
      if (user.weatherData.length >= 3) {
        weatherDataSet = [];
        weatherDataSet.push(user.weatherData[user.weatherData.length - 3]);
        weatherDataSet.push(user.weatherData[user.weatherData.length - 2]);
        weatherDataSet.push(user.weatherData[user.weatherData.length - 1]);

        await emailService(weatherDataSet, user.email);
      }
    });
  } catch (error) {
    console.log("Crontask error-", error);
  }
};

//send weather report via email
const emailService = async (data: any, email: String) => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.BASE_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    let mailDetails: any = {
      from: process.env.BASE_EMAIL,
      to: JSON.stringify(email),
      subject: `Hourly weather reports of ${data[0].city}`,
      text: "See attached JSON file for hourly weather reports.",
      attachments: [
        {
          filename: "weather_data.json",
          content: jsonData,
          encoding: "utf8",
        },
      ],
    };

    // sending email
    mailTransporter.sendMail(mailDetails, (err, data) => {
      if (err) {
        console.log("Error occurred:", err.message);
      } else {
        console.log("Email sent successfully");
      }
    });
  } catch (error) {
    console.log("email error-", error);
    return error;
  }
};
