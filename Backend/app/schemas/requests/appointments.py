from datetime import date as Date

from pydantic import BaseModel

from app.models.appointments import status


class AppointmentsSchema(BaseModel):
    dr_name: str | None = None
    reason: str | None = None
    additionalComments: str | None = None
    expectedDate: str | None = None
    patient_name: str | None = None
    status: str = status.pending
    