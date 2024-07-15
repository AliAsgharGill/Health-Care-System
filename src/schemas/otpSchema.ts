import { z } from "zod";

export const OtpSchema = z.object({
  otp: z
    .string()
    .min(6, "Must be 6 characters long")
    .max(6, "Must be 6 characters long"),
});
