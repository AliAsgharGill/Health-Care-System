from pydantic import BaseModel


class UserResponse(BaseModel):
    full_name: str
    email_address: str
    phone_number: str
