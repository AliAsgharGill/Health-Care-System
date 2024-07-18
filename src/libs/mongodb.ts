import { toast } from "@/components/ui/use-toast";
import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Successfully connected to MongoDB.");
  } catch (error) {
    toast({
      title: "Error",
      description: "Error connecting to MongoDB",
    });
  }
};

export default connectMongoDB;
