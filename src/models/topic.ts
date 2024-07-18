import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  } ,
});

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);
export default Topic;
