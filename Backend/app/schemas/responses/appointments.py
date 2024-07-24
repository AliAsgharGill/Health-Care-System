from pydantic import BaseModel


class AppointmentResponseSchema(BaseModel):
    dr_name: str
    reason: str
    additionalComments: str
    expectedDate: str
