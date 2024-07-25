from pydantic import BaseModel


class AppointmentResponseSchema(BaseModel):
    id: int
    dr_name: str
    reason: str
    additionalComments: str
    expectedDate: str
    status: str
