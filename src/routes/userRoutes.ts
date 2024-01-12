import express from "express";
import {
  getUser,
  getUserWeatherReport,
  saveUser,
  updateUser,
} from "../controller/userController";
import { body, validationResult } from "express-validator";
import {
  getUserWeatherValidations,
  saveUserValidations,
  updateUserValidations,
} from "../utils/validation";
const route = express.Router();

route.get("/getUser", getUser);
route.get("/getUserWeather", getUserWeatherValidations, getUserWeatherReport);
route.post("/saveUser", saveUserValidations, saveUser);
route.put("/updateUser", updateUserValidations, updateUser);

export default route;
