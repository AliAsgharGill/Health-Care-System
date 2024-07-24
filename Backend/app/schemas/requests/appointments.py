from pydantic import BaseModel


class AppointmentsSchema(BaseModel):
    dr_name: str
    reason: str
    additionalComments: str
    expectedDate: str