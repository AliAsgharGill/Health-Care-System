from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse

from app.crud.appointments import (create_appointment,
                                   delete_appointment_by_id,
                                   get_all_appointments, get_appointment_by_id,
                                   get_appointments_by_doctor_id,
                                   update_appointment_by_id)
from app.schemas.requests.appointments import AppointmentsSchema
from app.schemas.responses.appointments import AppointmentResponseSchema
from core.database.session import get_db

from core.fastapi.dependencies.authentication import AuthenticationRequired
from app.crud.doctors import get_doctor_by_name

appointments_router = APIRouter()



@appointments_router.get(
    "/", status_code=status.HTTP_200_OK, response_model=list[AppointmentResponseSchema]
)
def get_appointments_endpoint(db: Session = Depends(get_db)):
    appointments = get_all_appointments(db)
    if not appointments:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="appointments not found"
        )
    # content = []
    for appointment in appointments:
        doctor = get_doctor_by_name(db=db, dr_name=appointment.dr_name)
        response = {"id": appointment.id,
                            "patient_name": appointment.patient_name,
                            "reason": appointment.reason,
                            "additionalComments": appointment.additionalComments,
                            "expectedDate": appointment.expectedDate,
                            "status": str(appointment.status.name),
                            "doctor": {"id": doctor.id, "name": doctor.name, "image_url": doctor.image_url,}},
 
        # content.append(response)


    return JSONResponse(status_code=200, content=response)


@appointments_router.post(
    "/", status_code=status.HTTP_201_CREATED, response_model=AppointmentResponseSchema,
    dependencies=[Depends(AuthenticationRequired)]
)
def create_appointments_endpoint(
    appointments: AppointmentsSchema, db: Session = Depends(get_db)
):
    db_appointments = create_appointment(db, appointments)
    return db_appointments


@appointments_router.get(
    "/{appointment_id}",
    status_code=status.HTTP_200_OK,
    response_model=AppointmentResponseSchema,
)
def get_appointments_by_id_endpoint(appointment_id: int, db: Session = Depends(get_db)):
    db_appointments = get_appointment_by_id(db, appointment_id)
    if not db_appointments:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="appointment not found"
        )
    return db_appointments


@appointments_router.put(
    "/{appointment_id}",
    status_code=status.HTTP_200_OK,
    response_model=AppointmentResponseSchema,
    dependencies=[Depends(AuthenticationRequired)]
)
def update_appointments_by_id_endpoint(
    appointment_id: int, appointment: AppointmentsSchema, db: Session = Depends(get_db)
):
    db_appointments = update_appointment_by_id(db, appointment_id, appointment)
    if not db_appointments:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="appointment not found"
        )
    return db_appointments


@appointments_router.delete("/{appointment_id}", dependencies=[Depends(AuthenticationRequired)])
def delete_appointments_by_id_endpoint(
    appointment_id: int, db: Session = Depends(get_db)
):
    db_appointments = delete_appointment_by_id(db, appointment_id)
    if not db_appointments:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="appointment not found"
        )
    return {"message": "deleted successfully"}


@appointments_router.get(
    "/doctor/{doctor_id}",
    status_code=status.HTTP_200_OK,
    response_model=list[AppointmentResponseSchema],
)
def get_appointments_by_doctor_id_endpoint(
    doctor_id: int, db: Session = Depends(get_db)
):
    db_appointments = get_appointments_by_doctor_id(db, doctor_id)
    if not db_appointments:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="appointments not found"
        )
    return db_appointments
