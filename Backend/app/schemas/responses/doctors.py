from pydantic import BaseModel


class DoctorsResponse(BaseModel):
    id: int
    name: str
    image_url: str
