from pydantic import BaseModel, EmailStr, constr


class UserDetailSchema(BaseModel):
    full_name: str
    email_address: EmailStr
    phone_number: str
    date_of_birth: str
    gender: str
    address: str
    occupation: str | None = None
    emergency_contact_name: str
    emergency_contact_number: str
    primary_care_physician: str | None = None
    insurance_provider: str | None = None
    insurance_policy_number: str | None = None
    allergies: str | None = None
    current_medications: str | None = None
    family_medical_history: str | None = None
    past_diagnosis: str | None = None
    identification_type: str
    identification_number: str
    scanned_copy_of_identification_document: str | None = None
    receive_treatment: bool
    share_medical_info: bool
    privacy_policy: bool
