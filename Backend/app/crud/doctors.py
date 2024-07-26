from sqlalchemy.orm import Session

from app.models.doctors import Doctor
from app.schemas.requests.doctors import DoctorsSchema


def get_all_doctors(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Doctor).offset(skip).limit(limit).all()


def get_doctor_by_name(db: Session, dr_name: str) -> Doctor | None:
    return db.query(Doctor).filter(Doctor.name == dr_name).first()


# Add doctor
def add_doctor(db: Session, doctor: DoctorsSchema):
    db_doctor = Doctor(**doctor.dict())
    db.add(db_doctor)
    db.commit()
    db.refresh(db_doctor)
    return db_doctor
