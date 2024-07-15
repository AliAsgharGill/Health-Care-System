export type UserDetailsTypes = {
  personal_info: PersonalInfoTypes;
  medical_info: MedicalInfoTypes;
  identification_info: IdentificationInfoTypes;
  constant_info: ConstantInfoTypes;
};
export type PersonalInfoTypes = {
  full_name: string;
  email_address: string;
  phone_number: string;
  date_of_birth: Date;
  gender: string;
  address: string;
  occupation: string;
  emergency_contact_name: string;
  guardian_number: string;
};

export type MedicalInfoTypes = {
  primary_care_physician: string;
  insurance_provider: string;
  insurance_policy_number: string;
  allergies: string;
  current_medications: string;
  family_medical_history: string;
  past_diagnosis: string;
};

export type IdentificationInfoTypes = {
  identification_type: string;
  identification_number: string;
  scanned_copy_of_identification_document: string;
};

export type ConstantInfoTypes = {
  receive_treatment: boolean;
  share_medical_info: boolean;
  privacy_policy: boolean;
};
