import enum

from sqlalchemy import Column, Date, Enum, Integer, String

from core.database.session import Base


class status(enum.Enum):
    pending = "pending"
    scheduled = "scheduled"
    cancelled = "cancelled"


class Appointments(Base):
    __tablename__ = "appointments"
    id = Column(Integer, primary_key=True, autoincrement=True)
    dr_name = Column(String, nullable=True)
    reason = Column(String, nullable=True)
    additionalComments = Column(String, nullable=True)
    expectedDate = Column(String, nullable=True)
    patient_name = Column(String, nullable=True)
    status = Column(Enum(status), nullable=True)
