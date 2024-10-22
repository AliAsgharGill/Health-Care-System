from sqlalchemy.orm import Session

from app.models.appointments import Appointments as appointments
from app.models.doctors import Doctor
from app.schemas.requests.appointments import AppointmentsSchema


def create_appointment(db: Session, appointment: AppointmentsSchema):
    db_appointment = appointments(**appointment.dict())
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment


def get_all_appointments(db: Session, skip: int = 0, limit: int = 100):
    return db.query(appointments).offset(skip).limit(limit).all()

# we need to import doctors here
def get_all_doctors(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Doctor).offset(skip).limit(limit).all()

def get_appointment_by_id(db: Session, appointment_id: int):
    return db.query(appointments).filter(appointments.id == appointment_id).first()


def update_appointment_by_id(
    db: Session, appointment_id: int, appointment: AppointmentsSchema
):
    db_appointment = (
        db.query(appointments).filter(appointments.id == appointment_id).first()
    )
    db_appointment.dr_name = appointment.dr_name
    db_appointment.reason = appointment.reason
    db_appointment.additionalComments = appointment.additionalComments
    db_appointment.expectedDate = appointment.expectedDate
    db_appointment.status = appointment.status
    db_appointment.patient_name = appointment.patient_name
    db.commit()
    db.refresh(db_appointment)
    return db_appointment


# patch request
def patch_appointment(db: Session, appointment_id: int, appointment: AppointmentsSchema):
    db_appointment = db.query(appointments).filter(appointments.id == appointment_id).first()
    if not db_appointment:
        return None

    if appointment.dr_name is not None:
        db_appointment.dr_name = appointment.dr_name
    if appointment.reason is not None:
        db_appointment.reason = appointment.reason
    if appointment.additionalComments is not None:
        db_appointment.additionalComments = appointment.additionalComments
    if appointment.expectedDate is not None:
        db_appointment.expectedDate = appointment.expectedDate
    if appointment.status is not None:
        db_appointment.status = appointment.status
    if appointment.patient_name is not None:    
        db_appointment.patient_name = appointment.patient_name
    db.commit()
    db.refresh(db_appointment)
    return db_appointment


def delete_appointment_by_id(db: Session, appointment_id: int):
    result = db.query(appointments).filter(appointments.id == appointment_id).delete()
    db.commit()
    return result > 0


def get_appointments_by_doctor_id(db: Session, doctor_id: int):
    return db.query(appointments).filter(appointments.id == doctor_id).all()
