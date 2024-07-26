from core.database.session import Base

from .appointments import Appointments
from .doctors import Doctor
from .user import User

__all__ = [
    "Base",
    "User",
    "Doctor",
    "Appointments",
]
