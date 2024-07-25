import { z } from "zod";



const appointmentSchema = z.object({
  dr_name: z.string().min(1, "Dr Name is required"),
  reason: z.string().min(1, "Reason is required"),
  additionalComments: z.string().optional(),
  expectedDate: z.string().min(1, "Expected date is required"),
  status: z.string().optional(),
});

export { appointmentSchema };
