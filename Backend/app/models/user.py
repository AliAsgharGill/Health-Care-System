from sqlalchemy import Column, Date, Integer, String

from core.database.session import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    full_name = Column(String)
    email_address = Column(String, unique=True)
    phone_number = Column(String)
    date_of_birth = Column(Date)
    gender = Column(String)
    address = Column(String)
    occupation = Column(String)
    emergency_contact_name = Column(String)
    emergency_contact_number = Column(String)
    primary_care_physician = Column(String)
    insurance_provider = Column(String)
    insurance_policy_number = Column(String)
    allergies = Column(String)
    current_medications = Column(String)
    family_medical_history = Column(String)
    past_diagnosis = Column(String)
    identification_type = Column(String)
    identification_number = Column(String)
    scanned_copy_of_identification_document = Column(String)
    receive_treatment = Column(String)
    share_medical_info = Column(String)
    privacy_policy = Column(String)

    def __repr__(self):
        return f"<User(full_name={self.full_name}, email_address={self.email_address})>"

    def __str__(self):
        return self.__repr__()
