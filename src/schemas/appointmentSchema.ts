import { z } from "zod";

const physicianOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  image: z.string().url(),
});

const appointmentSchema = z.object({
  drName: physicianOptionSchema,
  reason: z.string().min(1, "Reason is required"),
  additionalComments: z.string().optional(),
  expectedDate: z.string().min(1, "Expected date is required"), 
});

export { appointmentSchema, physicianOptionSchema };
