import { z } from "zod";



const appointmentSchema = z.object({
  dr_name: z.string().min(1, "Please enter Dr Name"),
  patient_name: z.string().min(3, "Please enter patient name"),
  reason: z.string().min(1, "Reason is required"),
  additionalComments: z.string().optional(),
  expectedDate: z.string().min(1, "Expected date is required"),
  status: z.string().optional(),
});

export { appointmentSchema };
