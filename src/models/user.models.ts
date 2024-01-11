import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
  },
  location: {
    required: true,
    type: String,
  },
  weatherData: [
    {
      date: { type: Date, default: Date.now },
      time: { type: String, default: Date.now },
      temperature: Number,
      weatherStatus: String,
      humidity: Number,
      windSpeed: Number,
      feels_like: String,
    },
  ],
});

const userModel = mongoose.model("Data", userSchema);
export default userModel;
 