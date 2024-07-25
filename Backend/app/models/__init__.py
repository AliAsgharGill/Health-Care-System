from core.database.session import Base

from .doctors import Doctor
from .user import User
from .appointments import Appointments

__all__ = [
    "Base",
    "User",
    "Doctor",
    "Appointments",
]
