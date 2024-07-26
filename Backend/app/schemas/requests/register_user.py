from pydantic import BaseModel


class RegisterUser(BaseModel):
    full_name: str
    email_address: str
    phone_number: str


class LoginUser(BaseModel):
    email_address: str
    phone_number: str


class GetUserByPhoneNumber(BaseModel):
    phone_number: str
