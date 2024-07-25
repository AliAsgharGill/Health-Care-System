from pydantic import BaseModel
from datetime import date as Date

class AppointmentsSchema(BaseModel):
    dr_name: str
    reason: str
    additionalComments: str
    expectedDate: str
