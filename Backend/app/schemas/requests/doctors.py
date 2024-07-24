from pydantic import BaseModel


class DoctorsSchema(BaseModel):
    id: int
    name: str
    image_url: str
