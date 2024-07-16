import { UserDetailsTypes } from "@/types/userDetailTypes";

export const defaultValues: UserDetailsTypes = {
    full_name: "",
    email_address: "",
    phone_number: "",
    date_of_birth: "",
    gender: "male",
    address: "",
    occupation: "",
    emergency_contact_name: "",
    emergency_contact_number: "",
  
    primary_care_physician: "dr_ali", 
    insurance_provider: "",
    insurance_policy_number: "",
    allergies: "",
    current_medications: "",
    family_medical_history: "",
    past_diagnosis: "",
  
    identification_type: "cnic_card",
    identification_number: "",
    scanned_copy_of_identification_document: "",
  
    receive_treatment: false,
    share_medical_info: false,
    privacy_policy: false,
  };