from sqlalchemy.orm import Session

from app.models.appointments import appointments
from app.schemas.requests.appointments import AppointmentsSchema


def create_appointment(db: Session, appointment: AppointmentsSchema):
    db_appointment = appointments(**appointment.dict())
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment


def get_all_appointments(db: Session, skip: int = 0, limit: int = 100):
    return db.query(appointments).offset(skip).limit(limit).all()


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
    db.commit()
    db.refresh(db_appointment)
    return db_appointment


def delete_appointment_by_id(db: Session, appointment_id: int):
    db.query(appointments).filter(appointments.id == appointment_id).delete()
    db.commit()
    return True


def get_appointments_by_doctor_id(db: Session, doctor_id: int):
    return db.query(appointments).filter(appointments.id == doctor_id).all()
