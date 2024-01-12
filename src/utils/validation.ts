import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

//save user validations
export const saveUserValidations = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, location } = req.body;
  if (!email || email === "") {
    return res.json({ message: "Email not provided", status: 400 });
  }

  if (!location || location === "") {
    return res.json({ message: "Location not provided", status: 400 });
  }

  return next();
};

//update user validations
export const updateUserValidations = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id,email, location } = req.body;
  if (!_id || _id === "") {
    return res.json({ message: "user Id not provided", status: 400 });
  }

  if (!email || email === "") {
    return res.json({ message: "Email not provided", status: 400 });
  }

  if (!location || location === "") {
    return res.json({ message: "Location not provided", status: 400 });
  }

  return next();
};


//get user weather by date validations
export const getUserWeatherValidations = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, date } = req.body;
  if (!email || email === "") {
    return res.json({ message: "Email not provided", status: 400 });
  }

  if (!date || date === "") {
    return res.json({ message: "date not provided", status: 400 });
  }

  return next();
};