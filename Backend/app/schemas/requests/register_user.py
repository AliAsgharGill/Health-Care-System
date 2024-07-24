from pydantic import BaseModel


class RegisterUser(BaseModel):
    full_name: str
    email_address: str
    phone_number: str
