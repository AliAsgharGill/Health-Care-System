import { IdentificationType, physicianOptions } from "../../public/assets/images/data/userFormData";

export type UserDetailsTypes = {
  full_name: string;
  email_address: string;
  phone_number: string;
  date_of_birth: string;
  gender: "male" | "female" | "other";
  address: string;
  occupation: string;
  emergency_contact_name: string;
  emergency_contact_number: string;
  primary_care_physician: (typeof physicianOptions)[number]["value"];
  insurance_provider: string;
  insurance_policy_number: string;
  allergies: string;
  current_medications: string;
  family_medical_history: string;
  past_diagnosis: string;
  identification_type: (typeof IdentificationType)[number]["value"];
  identification_number: string;
  scanned_copy_of_identification_document: string;
  receive_treatment: boolean;
  share_medical_info: boolean;
  privacy_policy: boolean;
};