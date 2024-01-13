import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./src/routes/userRoutes";
import cron from "node-cron";
import { sendWeatherReport, setWeatherHourly } from "./src/utils/cronTask";

//configs
dotenv.config();
const app = express();
const port = process.env.PORT;

//connection
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.use(express.json());

//routes
app.use("/user", userRoute);

//mongodb connection
const url = `mongodb+srv://${process.env.MONOGO_db}:${process.env.MONGO_PASSWORD}@cluster0.5qzrcwe.mongodb.net/?retryWrites=true&w=majority`;
//const url = "mongodb://localhost/weatherAPI";
mongoose.connect(url);
const con = mongoose.connection;
con.on("error", (error) => {
  console.log(error);
});
con.once("connected", () => {
  console.log("MongoDb Database Connected");
});

//cron job
cron.schedule("0 */1 * * *", async () => {
  try {
    await setWeatherHourly();
  } catch (error) {
    console.log("cron error-", error);
  }
});

cron.schedule("0 */3 * * *", async () => {
  try {
    await sendWeatherReport();
  } catch (error) {
    console.log("cron error-", error);
  }
});

//The correct cron time frame is below, temporally I use a little time frame.
//  0 */1 * * *
//  0 */3 * * *
