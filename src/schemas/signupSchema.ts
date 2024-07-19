import { z } from "zod";

export const SignupSchema = z.object({
  full_name: z
    .string()
    .min(3, "At least 3 characters long")
    .max(50, "Less than 50 characters long"),
  email: z.string().email("Please enter a valid email address"),
  phone_number: z.string().min(11, "Write like 03001234567").max(11, "Less than 10 digits long"),
  isVerified: z.boolean(),
});
