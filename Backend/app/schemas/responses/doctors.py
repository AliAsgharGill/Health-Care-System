from pydantic import BaseModel


class DoctorsResponse(BaseModel):
    name: str
    image_url: str
