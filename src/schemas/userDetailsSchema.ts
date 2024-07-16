import { z } from "zod";
import {
  IdentificationType,
  physicianOptions,
} from "../../public/assets/data/userFormData";

export const UserDetailsSchema = z.object({
  full_name: z.string().min(2, "Must be 2 characters long").max(50),
  email_address: z.string().email(),
  phone_number: z.string().min(7),
  date_of_birth: z.string({
    required_error: "Date of Birth is required",
  }),
  gender: z.enum(["male", "female", "other"]),
  address: z.string().min(5),
  occupation: z.string().min(3),
  emergency_contact_name: z.string().min(2),
  emergency_contact_number: z.string().min(7),

  primary_care_physician: z.enum(
    physicianOptions.map((option) => option.value) as [string, ...string[]],
    {
      required_error: "Primary Care Physician is required",
    }
  ),
  insurance_provider: z
    .string()
    .min(3, "Must be 3 characters long")
    .max(50, "Must be 50 characters long"),
  insurance_policy_number: z
    .string()
    .min(3, "Must be 3 characters long")
    .max(50, "Must be 50 characters long"),
  allergies: z
    .string()
    .min(3, "Must be 3 characters long")
    .max(50, "Must be 50 characters long"),
  current_medications: z
    .string()
    .min(3, "Must be 3 characters long")
    .max(100, "Must be 50 characters long"),
  family_medical_history: z
    .string()
    .min(3, "Must be 3 characters long")
    .max(50, "Must be 50 characters long"),
  past_diagnosis: z
    .string()
    .min(3, "Must be 3 characters long")
    .max(50, "Must be 50 characters long"),
  identification_type: z.enum(
    IdentificationType.map((option) => option.value) as [string, ...string[]],
    {
      required_error: "Identification Type is required",
    }
  ),
  identification_number: z.string().min(3, "Must be 3 characters long"),
  scanned_copy_of_identification_document: z
    .string()
    .min(3, "Must be 3 characters long"),
  receive_treatment: z.boolean(),
  share_medical_info: z.boolean(),
  privacy_policy: z.boolean(),
});
