import { Request, Response } from "express";
import { getUserService, getUserWeatherReportService, saveUserService, updateUserService } from "../services/userService";

export const getUser = async (req: Request, res: Response) => {
  try {
    const response=await getUserService();
    res.send(response);
  } catch (error) {
    console.log("error- ", error);
    return error;
  }
};

export const getUserWeatherReport=async (req:Request,res:Response) => {
    try{
        const response = await getUserWeatherReportService(req.body);
        res.send(response);
    }catch(error){
        console.log('error- ',error);
        res.send(error);
    }
}

export const saveUser = async (req: Request, res: Response) => {
  try {
    const response = await saveUserService(req.body);
    res.send(response);
  } catch (error) {
    console.log("error- ", error);
    return error;
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const response = await updateUserService(req.body);
    res.send(response);
  } catch (error) {
    console.log("error- ", error);
    res.send(error);
  }
};