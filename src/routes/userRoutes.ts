import express from 'express';
import { getUser, getUserWeatherReport, saveUser, updateUser } from '../controller/userController';

const route=express.Router();
route.get('/getUser',getUser);
route.get('/getUser/:date',getUserWeatherReport);
route.post('/saveUser',saveUser);
route.put('/updateUser',updateUser);

export default route;