from pydantic import BaseModel


class DoctorsSchema(BaseModel):
    name: str
    image_url: str
