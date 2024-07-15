import { z } from "zod";

export const UserDetailsSchema = z.object({
  full_name: z.string().min(2, "Must be 2 characters long").max(50),
  email_address: z.string().email(),
  phone_number: z.string().min(7),
  date_of_birth: z.string(),
  gender: z.union([z.literal("male"), z.literal("female"), z.literal("other")]),
  address: z.string().min(5),
  occupation: z.string().min(3),
  emergency_contact_name: z.string().min(2),
  emergency_contact_number: z.string().min(7),

  primary_care_physician: z
    .string()
    .min(3, "Must be 3 characters long")
    .max(20, "Must be 20 characters long"),
  insurance_provider: z
    .string()
    .min(3, "Must be 3 characters long")
    .max(20, "Must be 20 characters long"),
  insurance_policy_number: z
    .string()
    .min(3, "Must be 3 characters long")
    .max(20, "Must be 20 characters long"),
  allergies: z
    .string()
    .min(3, "Must be 3 characters long")
    .max(20, "Must be 20 characters long"),
  current_medications: z
    .string()
    .min(3, "Must be 3 characters long")
    .max(20, "Must be 20 characters long"),
  family_medical_history: z
    .string()
    .min(3, "Must be 3 characters long")
    .max(20, "Must be 20 characters long"),
  past_diagnosis: z
    .string()
    .min(3, "Must be 3 characters long")
    .max(20, "Must be 20 characters long"),
  identification_type: z
    .string()
    .min(3, "Must be 3 characters long")
    .max(20, "Must be 20 characters long"),
  identification_number: z
    .string()
    .min(3, "Must be 3 characters long")
    .max(20, "Must be 20 characters long"),
  scanned_copy_of_identification_document: z
    .string()
    .min(3, "Must be 3 characters long")
    .max(20, "Must be 20 characters long"),
  receive_treatment: z.boolean(),
  share_medical_info: z.boolean(),
  privacy_policy: z.boolean(),
});
