import os

from dotenv import load_dotenv

load_dotenv()
from pydantic_settings import BaseSettings


class BaseConfig(BaseSettings):
    class config:
        # to write all attribute in upper case
        case_sensitive = True


class Config(BaseConfig):
    # name in the getenv must be same as in the .env file
    SQLITE3: str = os.getenv("SQLITE3")
    JWT_EXPIRE_MINUTES: int = 60 * 24
    JWT_SECRET_KEY: str = os.getenv("SECRET_KEY")
    JWT_ALGORITHM: str = "HS256"


config = Config()
