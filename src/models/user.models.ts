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
  weatherData: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Data", userSchema);
