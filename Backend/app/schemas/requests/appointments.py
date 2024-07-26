from datetime import date as Date

from pydantic import BaseModel

from app.models.appointments import status


class AppointmentsSchema(BaseModel):
    dr_name: str
    reason: str
    additionalComments: str
    expectedDate: str
    patient_name: str
    status: str = status.pending
