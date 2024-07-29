from pydantic import BaseModel


class AppointmentResponseSchema(BaseModel):
    id: int | None = None
    dr_name: str | None = None
    reason: str | None = None
    additionalComments: str | None = None
    expectedDate: str | None = None
    patient_name:str | None = None
    status: str | None = None
