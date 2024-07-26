from pydantic import BaseModel


class ResponseUserDetailSchema(BaseModel):
    full_name: str
