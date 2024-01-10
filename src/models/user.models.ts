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

const userModel = mongoose.model("Data", userSchema);
export default userModel;
