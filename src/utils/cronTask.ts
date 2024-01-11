import {
  getUserService,
  updateUserWeatherService,
} from "../services/userService";
import nodemailer from "nodemailer";
import fs from "fs";
import PDFDocument from "pdfkit";

export const setWeatherHourly = async () => {
  try {
    console.log("=========================");
    const allUsers = await getUserService();
    allUsers.forEach(async (user: any) => {
      const setNewWeatherData = await updateUserWeatherService({
        id: user._id,
        location: user.location,
      });
    });
  } catch (error) {
    console.log("Crontask error-", error);
  }
};

export const sendWeatherReport = async () => {
  try {
    const allUsers = await getUserService();
    allUsers.forEach(async (user: any) => {
      console.log("---------------");
      let weatherDataSet = [];
      if (user.weatherData.length >= 3) {
        weatherDataSet = [];
        weatherDataSet.push(user.weatherData[user.weatherData.length - 3]);
        weatherDataSet.push(user.weatherData[user.weatherData.length - 2]);
        weatherDataSet.push(user.weatherData[user.weatherData.length - 1]);
        emailService(weatherDataSet, user.email);
      }
    });
  } catch (error) {
    console.log("Crontask error-", error);
  }
};

const emailService = async (data: any, email: String) => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "luxsiri812@gmail.com",
        pass: "ofbx znki bcvp grng",
      },
    });

    let mailDetails: any = {
      from: "luxsiri812@gmail.com",
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
