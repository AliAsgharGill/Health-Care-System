from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.crud.doctors import get_all_doctors
from app.schemas.requests.doctors import DoctorsSchema
from core.database.session import get_db

get_doctors = APIRouter()


@get_doctors.get("/")
def get_doctors_endpoint(
    skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
):
    doctors = get_all_doctors(db, skip, limit)
    if not doctors:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="doctors not found"
        )
    return doctors
