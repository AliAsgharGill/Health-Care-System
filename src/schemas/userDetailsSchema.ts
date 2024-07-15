import { z } from "zod";

export const PersonalInfoSchema = z.object({
  full_name: z
    .string()
    .min(3, "Must be 3 characters long")
    .max(20, "Must be 20 characters long"),
  email_address: z
    .string()
    .email("Must be a valid email")
    .min(3, "Must be 3 characters long")
    .max(20, "Must be 20 characters long"),
  phone_number: z
    .string()
    .min(10, "Must be 10 characters long")
    .max(10, "Must be 10 characters long"),
  date_of_birth: z.date(),
  gender: z
    .string()
    .min(3, "Must be 3 characters long")
    .max(20, "Must be 20 characters long"),
  address: z
    .string()
    .min(3, "Must be 3 characters long")
    .max(20, "Must be 20 characters long"),
  occupation: z
    .string()
    .min(3, "Must be 3 characters long")
    .max(20, "Must be 20 characters long"),
  emergency_contact_name: z
    .string()
    .min(3, "Must be 3 characters long")
    .max(20, "Must be 20 characters long"),
  guardian_number: z
    .string()
    .min(3, "Must be 3 characters long")
    .max(20, "Must be 20 characters long"),
});

export const MedicalInfoSchema = z.object({
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
});

export const IdentificationInfoSchema = z.object({
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
});

export const ConstantInfoSchema = z.object({
  receive_treatment: z.boolean(),
  share_medical_info: z.boolean(),
  privacy_policy: z.boolean(),
});

export const UserDetailsSchema = z.object({
  personal_info: PersonalInfoSchema,
  medical_info: MedicalInfoSchema,
  identification_info: IdentificationInfoSchema,
  constant_info: ConstantInfoSchema,
});
