import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema({
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
  },
});

// const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);
const Topic = mongoose.models.User || mongoose.model("User", topicSchema);
export default Topic;
