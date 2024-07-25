from pydantic import BaseModel
from datetime import date as Date

from app.models.appointments import status
class AppointmentsSchema(BaseModel):
    dr_name: str
    reason: str
    additionalComments: str
    expectedDate: str
    status: str = status.pending