import mongoose, { Schema } from "mongoose";

const userRegistrationSchema = new Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
    unique: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

// here we can specify collection name like here we defined User and in MongoDB it will be automatically users
const userRegistration =
  mongoose.models.User || mongoose.model("User", userRegistrationSchema);
export default userRegistration;
