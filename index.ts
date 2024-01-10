import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import userRoute from './src/routes/userRoutes';

dotenv.config();
const app = express();
const port = process.env.PORT;


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.use(express.json());
//routes
app.use('/user',userRoute);

//mongodb connection
const url = `mongodb+srv://${process.env.MONOGO_db}:${process.env.MONGO_PASSWORD}@cluster0.5qzrcwe.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(url);
const con=mongoose.connection;
con.on("error", (error) => {
  console.log(error);
});
con.once("connected", () => {
  console.log("MongoDb Database Connected");
});