import { string, z } from "zod";
export const SignupSchema = z.object({
  full_name: string()
    .min(3, "At least 3 characters long")
    .max(50, "Less than 50 characters long"),
  email: string()
    .email("Please enter valid email address"),
  phone_number: string()
    .min(11, "At least 11 characters long")
    .max(13, "PMust be less than 13 characters long"),
});
