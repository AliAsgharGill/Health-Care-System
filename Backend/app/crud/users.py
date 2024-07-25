from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.requests.register_user import RegisterUser
from app.schemas.requests.user_details import UserDetailSchema


def create_user(db: Session, user: RegisterUser):
    db_user = User(
        full_name=user.full_name,
        email_address=user.email_address,
        phone_number=user.phone_number,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# here we will add user details with the help of this function
def user_details(db: Session, user: UserDetailSchema):
    db_user = User( 
        full_name=user.full_name,
        email_address=user.email_address,
        phone_number=user.phone_number,
        date_of_birth=user.date_of_birth,
        gender=user.gender,
        address=user.address,
        occupation=user.occupation,
        emergency_contact_name=user.emergency_contact_name,
        emergency_contact_number=user.emergency_contact_number,
        primary_care_physician=user.primary_care_physician,
        insurance_provider=user.insurance_provider,
        insurance_policy_number=user.insurance_policy_number,
        allergies=user.allergies,
        current_medications=user.current_medications,
        family_medical_history=user.family_medical_history,
        past_diagnosis=user.past_diagnosis,
        identification_type=user.identification_type,
        identification_number=user.identification_number,
        scanned_copy_of_identification_document=user.scanned_copy_of_identification_document,
        receive_treatment=user.receive_treatment,
        share_medical_info=user.share_medical_info,
        privacy_policy=user.privacy_policy
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user