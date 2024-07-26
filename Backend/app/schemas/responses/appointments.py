from pydantic import BaseModel


class AppointmentResponseSchema(BaseModel):
    id: int
    dr_name: str
    reason: str
    additionalComments: str
    expectedDate: str
    patient_name:str
    status: str
