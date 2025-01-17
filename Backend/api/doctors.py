from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.crud.doctors import add_doctor, get_all_doctors
from app.schemas.requests.doctors import DoctorsSchema
from app.schemas.responses.doctors import DoctorsResponse
from typing import List
from core.database.session import get_db
from core.fastapi.dependencies.authentication import AuthenticationRequired


get_doctors = APIRouter()


@get_doctors.get(
    "/", status_code=status.HTTP_200_OK, response_model=list[DoctorsResponse]
)
def get_doctors_endpoint(
    skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
):
    doctors = get_all_doctors(db, skip, limit)
    if not doctors:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="doctors not found"
        )
    return doctors


# Add doctor
@get_doctors.post(
    "/", status_code=status.HTTP_201_CREATED, dependencies=[Depends(AuthenticationRequired)]
)
def add_doctor_endpoint(doctor: DoctorsSchema, db: Session = Depends(get_db)):
    return add_doctor(db, doctor)
